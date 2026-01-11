import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MobileLayout } from "@/components/MobileLayout";
import { RoutineActivityItem } from "@/components/RoutineActivityItem";
import { GenderSelectDialog, GenderOption } from "@/components/GenderSelectDialog";
import { Routine } from "@/types/routine";
import { getRoutineById, saveRoutine, deleteRoutine } from "@/lib/storage";
import { checkAndResetRecurringRoutine } from "@/lib/routineReset";
import { Trash2, RotateCcw, Clock, Download, RefreshCw, Pencil } from "lucide-react";
import { toast } from "sonner";
import { exportRoutineToPdf } from "@/lib/pdfExport";

const ViewRoutine = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [routine, setRoutine] = useState<Routine | null>(null);
  const [showGenderDialog, setShowGenderDialog] = useState(false);

  useEffect(() => {
    if (id) {
      const found = getRoutineById(id);
      if (found) {
        const checkedRoutine = checkAndResetRecurringRoutine(found);
        setRoutine(checkedRoutine);
      } else {
        navigate("/");
      }
    }
  }, [id, navigate]);

  if (!routine) return null;

  const toggleComplete = (activityId: string) => {
    const updated = {
      ...routine,
      activities: routine.activities.map((a) =>
        a.id === activityId ? { ...a, completed: !a.completed } : a
      ),
    };
    setRoutine(updated);
    saveRoutine(updated);
  };

  const resetProgress = () => {
    const updated = {
      ...routine,
      activities: routine.activities.map((a) => ({ ...a, completed: false })),
    };
    setRoutine(updated);
    saveRoutine(updated);
    toast.success(t("view.progressReset"));
  };

  const handleDelete = () => {
    if (confirm(t("view.deleteConfirm"))) {
      deleteRoutine(routine.id);
      toast.success(t("view.routineDeleted"));
      navigate("/");
    }
  };

  const handleExportClick = () => {
    setShowGenderDialog(true);
  };

  const handleGenderSelect = async (gender: GenderOption) => {
    const toastId = toast.loading(t("view.generatingPdf"));
    try {
      await exportRoutineToPdf(routine, {
        showCheckboxes: true,
        showDuration: true,
        iconSize: "large",
        gender,
      });
      toast.dismiss(toastId);
      toast.success(t("view.pdfReady"), { duration: 2000 });
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(t("view.pdfFailed"));
      console.error("PDF export error:", error);
    }
  };

  const completedCount = routine.activities.filter((a) => a.completed).length;
  const totalDuration = routine.activities.reduce((sum, a) => sum + a.duration, 0);
  const progress = routine.activities.length > 0 
    ? (completedCount / routine.activities.length) * 100 
    : 0;

  return (
    <MobileLayout
      title={routine.name}
      showBack
      rightAction={
        <div className="flex items-center gap-1">
          <button
            onClick={() => navigate(`/edit/${routine.id}`)}
            className="p-2 text-primary hover:bg-primary/10 rounded-lg"
            title="Edit routine"
          >
            <Pencil className="w-5 h-5" />
          </button>
          <button
            onClick={handleExportClick}
            className="p-2 text-primary hover:bg-primary/10 rounded-lg"
            title="Export as PDF"
          >
            <Download className="w-5 h-5" />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 text-destructive hover:bg-destructive/10 rounded-lg"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      }
    >
      <div className="px-4 py-4 space-y-6">
        {/* Progress section */}
        <div className="bg-card rounded-2xl p-4 shadow-card">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-2xl font-bold text-foreground">
                {completedCount}/{routine.activities.length}
              </p>
              <p className="text-sm text-muted-foreground">{t("view.completed")}</p>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{totalDuration} min</span>
            </div>
          </div>

          {routine.recurring && (
            <div className="flex items-center gap-2 mb-3 text-sm text-primary">
              <RefreshCw className="w-4 h-4" />
              <span>{t("view.dailyResetEnabled")}</span>
            </div>
          )}

          {/* Progress bar */}
          <div className="h-3 bg-muted rounded-full overflow-hidden mb-3">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          {progress === 100 && (
            <div className="text-center py-2">
              <span className="text-2xl">🎉</span>
              <p className="font-bold text-foreground">{t("view.allDone")}</p>
            </div>
          )}

          {completedCount > 0 && (
            <button
              onClick={resetProgress}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              {t("view.resetProgress")}
            </button>
          )}
        </div>

        {/* Activities list */}
        <div>
          <h2 className="text-lg font-bold text-foreground mb-3">{t("view.activities")}</h2>
          <div className="space-y-2">
            {routine.activities.map((activity) => (
              <RoutineActivityItem
                key={activity.id}
                activity={activity}
                isViewMode
                onComplete={() => toggleComplete(activity.id)}
              />
            ))}
          </div>
        </div>
      </div>

      <GenderSelectDialog
        open={showGenderDialog}
        onOpenChange={setShowGenderDialog}
        onSelect={handleGenderSelect}
      />
    </MobileLayout>
  );
};

export default ViewRoutine;
