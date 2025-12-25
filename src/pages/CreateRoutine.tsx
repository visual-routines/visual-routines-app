import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { ACTIVITY_TEMPLATES, CATEGORY_LABELS, ActivityCategory } from "@/data/activities";
import { Activity, Routine } from "@/types/routine";
import { saveRoutine } from "@/lib/storage";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const CATEGORIES: ActivityCategory[] = ["morning", "hygiene", "meals", "play", "learning", "evening"];

const CreateRoutine = () => {
  const navigate = useNavigate();
  const [routineName, setRoutineName] = useState("");
  const [routineType, setRoutineType] = useState<"morning" | "evening" | "custom">("morning");
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ActivityCategory>("morning");

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
    const newActivity: Activity = {
      id: `${template.id}-${Date.now()}`,
      templateId: template.id,
      name: template.name,
      icon: template.icon,
      category: template.category,
      duration: template.defaultDuration,
      order: activities.length,
    };
    setActivities([...activities, newActivity]);
    toast.success(`Added ${template.name}`);
  };

  const removeActivity = (id: string) => {
    setActivities(activities.filter((a) => a.id !== id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setActivities((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);
        // Update order property
        return newItems.map((item, index) => ({ ...item, order: index }));
      });
    }
  };

  const handleSave = () => {
    if (!routineName.trim()) {
      toast.error("Please enter a routine name");
      return;
    }
    if (activities.length === 0) {
      toast.error("Add at least one activity");
      return;
    }

    const routine: Routine = {
      id: `routine-${Date.now()}`,
      name: routineName,
      type: routineType,
      activities,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveRoutine(routine);
    toast.success("Routine saved!");
    navigate("/");
  };

  const filteredTemplates = ACTIVITY_TEMPLATES.filter(
    (t) => t.category === selectedCategory
  );

  const totalDuration = activities.reduce((sum, a) => sum + a.duration, 0);

  return (
    <MobileLayout title="Create Routine" showBack>
      <div className="px-4 py-4 space-y-6">
        {/* Routine name */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Routine Name
          </label>
          <input
            type="text"
            value={routineName}
            onChange={(e) => setRoutineName(e.target.value)}
            placeholder="e.g., Morning Routine"
            className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Routine type */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Type
          </label>
          <div className="flex gap-2">
            {(["morning", "evening", "custom"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setRoutineType(type)}
                className={cn(
                  "flex-1 py-2 px-3 rounded-xl font-medium capitalize transition-all",
                  routineType === type
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Current activities with drag and drop */}
        {activities.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-foreground">
                Activities ({activities.length})
              </label>
              <span className="text-sm text-muted-foreground">
                {totalDuration} min total
              </span>
            </div>
            <p className="text-xs text-muted-foreground mb-2">
              Drag to reorder activities
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
            Add Activities
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
                {CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>

          {/* Activity grid */}
          <div className="grid grid-cols-3 gap-3">
            {filteredTemplates.map((template) => (
              <ActivityCard
                key={template.id}
                id={template.id}
                name={template.name}
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
            Save Routine
          </button>
        </div>
      </div>
    </MobileLayout>
  );
};

export default CreateRoutine;
