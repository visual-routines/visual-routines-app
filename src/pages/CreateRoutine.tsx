import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { MobileLayout } from "@/components/MobileLayout";
import { ActivityCard } from "@/components/ActivityCard";
import { SortableActivity } from "@/components/SortableActivity";
import { ACTIVITY_TEMPLATES, ActivityCategory } from "@/data/activities";
import { Activity, Routine } from "@/types/routine";
import { saveRoutine, getRoutines, getRoutineById, saveDraft, getDraft, clearDraft } from "@/lib/storage";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Printer } from "lucide-react";

const FIRST_ROUTINE_TIP_KEY = "hasSeenPdfTip";

const CATEGORIES: ActivityCategory[] = ["morning", "hygiene", "meals", "play", "learning", "evening", "clothing"];

const CreateRoutine = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id: editId } = useParams<{ id: string }>();
  const templateData = location.state as {
    fromTemplate?: boolean;
    name?: string;
    activities?: Activity[];
    recurring?: boolean;
  } | null;
  const { t } = useTranslation();
  const [routineName, setRoutineName] = useState("");
  const routineType = "custom" as const;
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ActivityCategory>("morning");
  const [recurring, setRecurring] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [existingRoutine, setExistingRoutine] = useState<Routine | null>(null);

  const isEditMode = Boolean(editId);

  // Load existing routine for edit mode, template data, OR draft for create mode
  useEffect(() => {
    if (editId) {
      // Edit mode: load existing routine
      const routine = getRoutineById(editId);
      if (routine) {
        setExistingRoutine(routine);
        setRoutineName(routine.name);
        setActivities(routine.activities);
        setRecurring(routine.recurring || false);
      } else {
        toast.error(t("edit.routineNotFound"));
        navigate("/");
        return;
      }
    } else if (templateData?.fromTemplate) {
      // Template mode: load template data for editing
      setRoutineName(templateData.name || "");
      setActivities(templateData.activities || []);
      setRecurring(templateData.recurring || false);
      // Clear the navigation state to prevent re-loading on refresh
      window.history.replaceState({}, document.title);
    } else {
      // Create mode: load draft
      const draft = getDraft();
      if (draft) {
        setRoutineName(draft.name);
        setActivities(draft.activities);
        setRecurring(draft.recurring);
        if (draft.name || draft.activities.length > 0) {
          toast.info(t("create.draftRestored"));
        }
      }
    }
    setIsInitialized(true);
  }, [editId, navigate, t, templateData]);

  // Auto-save draft when state changes (only in create mode)
  const saveDraftDebounced = useCallback(() => {
    if (!isInitialized || isEditMode) return;
    saveDraft({ name: routineName, activities, recurring, updatedAt: new Date().toISOString() });
  }, [routineName, activities, recurring, isInitialized, isEditMode]);

  useEffect(() => {
    if (!isInitialized || isEditMode) return;
    const timer = setTimeout(saveDraftDebounced, 500);
    return () => clearTimeout(timer);
  }, [saveDraftDebounced, isInitialized, isEditMode]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const addActivity = (template: typeof ACTIVITY_TEMPLATES[0]) => {
    const activityName = t(`activities.${template.id}` as any) || template.name;
    const newActivity: Activity = {
      id: `${template.id}-${Date.now()}`,
      templateId: template.id,
      name: activityName,
      icon: template.icon,
      category: template.category,
      duration: template.defaultDuration,
      order: activities.length,
    };
    setActivities([...activities, newActivity]);
    toast.success(t("create.added", { name: activityName }));
  };

  const removeActivity = (id: string) => {
    setActivities(activities.filter((a) => a.id !== id));
  };

  const updateActivityDuration = (id: string, newDuration: number) => {
    setActivities(activities.map((a) => 
      a.id === id ? { ...a, duration: newDuration } : a
    ));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setActivities((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);
        return newItems.map((item, index) => ({ ...item, order: index }));
      });
    }
  };

  const handleSave = () => {
    if (!routineName.trim()) {
      toast.error(t("create.pleaseEnterName"));
      return;
    }
    if (activities.length === 0) {
      toast.error(t("create.addAtLeastOne"));
      return;
    }

    if (isEditMode && existingRoutine) {
      // Update existing routine
      const updatedRoutine: Routine = {
        ...existingRoutine,
        name: routineName,
        activities,
        recurring,
        updatedAt: new Date().toISOString(),
        lastResetDate: recurring ? (existingRoutine.lastResetDate || new Date().toISOString().split("T")[0]) : undefined,
      };
      saveRoutine(updatedRoutine);
      toast.success(t("edit.routineUpdated"));
      navigate(`/routine/${editId}`);
    } else {
      // Create new routine
      const existingRoutines = getRoutines();
      const isFirstRoutine = existingRoutines.length === 0;
      const hasSeenTip = localStorage.getItem(FIRST_ROUTINE_TIP_KEY);

      const routine: Routine = {
        id: `routine-${Date.now()}`,
        name: routineName,
        type: routineType,
        activities,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        recurring,
        lastResetDate: recurring ? new Date().toISOString().split("T")[0] : undefined,
      };

      saveRoutine(routine);
      clearDraft();
      toast.success(t("create.routineSaved"));

      if (isFirstRoutine && !hasSeenTip) {
        localStorage.setItem(FIRST_ROUTINE_TIP_KEY, "true");
        setTimeout(() => {
          toast(
            <div className="flex items-start gap-3">
              <Printer className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold">{t("create.pdfTipTitle")}</p>
                <p className="text-sm text-muted-foreground">
                  {t("create.pdfTipDescription")}
                </p>
              </div>
            </div>,
            { duration: 5000 }
          );
        }, 500);
      }

      navigate("/");
    }
  };

  const filteredTemplates = ACTIVITY_TEMPLATES.filter(
    (template) => template.category === selectedCategory
  );

  const totalDuration = activities.reduce((sum, a) => sum + a.duration, 0);

  return (
    <MobileLayout title={isEditMode ? t("edit.title") : t("create.title")} showBack>
      <div className="px-4 py-4 space-y-6">
        {/* Routine name */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            {t("create.routineName")}
          </label>
          <input
            type="text"
            value={routineName}
            onChange={(e) => setRoutineName(e.target.value)}
            placeholder={t("create.namePlaceholder")}
            className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Recurring toggle */}
        <div className="flex items-center justify-between bg-card rounded-xl p-4 border border-border">
          <div>
            <p className="font-semibold text-foreground">{t("create.dailyReset")}</p>
            <p className="text-sm text-muted-foreground">{t("create.dailyResetDescription")}</p>
          </div>
          <button
            onClick={() => setRecurring(!recurring)}
            className={cn(
              "w-12 h-7 rounded-full transition-colors relative shrink-0",
              recurring ? "bg-primary" : "bg-muted"
            )}
          >
            <span
              className={cn(
                "absolute left-0 top-1 w-5 h-5 rounded-full bg-white shadow transition-transform",
                recurring ? "translate-x-6" : "translate-x-1"
              )}
            />
          </button>
        </div>

        {/* Current activities with drag and drop */}
        {activities.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-foreground">
                {t("create.activities")} ({activities.length})
              </label>
              <span className="text-sm text-muted-foreground">
                {t("create.minTotal", { duration: totalDuration })}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mb-2">
              {t("create.dragToReorder")}
            </p>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={activities.map((a) => a.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-2">
                  {activities.map((activity) => (
                    <SortableActivity
                      key={activity.id}
                      activity={activity}
                      onRemove={() => removeActivity(activity.id)}
                      onDurationChange={(newDuration) => updateActivityDuration(activity.id, newDuration)}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </div>
        )}

        {/* Activity picker */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            {t("create.addActivities")}
          </label>
          
          {/* Category tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-3 -mx-4 px-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {t(`categories.${cat}`)}
              </button>
            ))}
          </div>

          {/* Activity grid */}
          <div className="grid grid-cols-3 gap-3">
            {filteredTemplates.map((template) => (
              <ActivityCard
                key={template.id}
                id={template.id}
                name={t(`activities.${template.id}` as any) || template.name}
                icon={template.icon}
                category={template.category}
                duration={template.defaultDuration}
                onClick={() => addActivity(template)}
                size="sm"
              />
            ))}
          </div>
        </div>

        {/* Save button */}
        <div className="pt-4">
          <button
            onClick={handleSave}
            className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl transition-all active:scale-98 shadow-playful"
          >
            {isEditMode ? t("edit.saveChanges") : t("create.saveRoutine")}
          </button>
        </div>
      </div>
    </MobileLayout>
  );
};

export default CreateRoutine;
