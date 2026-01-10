import { useState } from "react";
import { Routine } from "@/types/routine";
import { ACTIVITY_ICONS, CATEGORY_COLORS } from "@/data/activities";
import { cn } from "@/lib/utils";
import { Clock, ChevronRight, Printer } from "lucide-react";
import { GenderSelectDialog, GenderOption } from "@/components/GenderSelectDialog";
import { exportRoutineToPdf } from "@/lib/pdfExport";
import { toast } from "sonner";

interface RoutineCardProps {
  routine: Routine;
  onClick: () => void;
}

export function RoutineCard({ routine, onClick }: RoutineCardProps) {
  const [showGenderDialog, setShowGenderDialog] = useState(false);
  
  const totalDuration = routine.activities.reduce((sum, a) => sum + a.duration, 0);
  const completedCount = routine.activities.filter((a) => a.completed).length;
  const progress = routine.activities.length > 0 
    ? (completedCount / routine.activities.length) * 100 
    : 0;

  const typeColors = {
    morning: "from-sunshine/20 to-coral/20",
    evening: "from-lavender/20 to-sky/20",
    custom: "from-mint/20 to-primary/20",
  };

  const handlePrintClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowGenderDialog(true);
  };

  const handleGenderSelect = async (gender: GenderOption) => {
    const toastId = toast.loading("Generating PDF...");
    try {
      await exportRoutineToPdf(routine, {
        showCheckboxes: true,
        showDuration: true,
        iconSize: "large",
        gender,
      });
      toast.dismiss(toastId);
      toast.success("PDF ready!", { duration: 2000 });
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Failed to generate PDF");
      console.error("PDF export error:", error);
    }
  };

  return (
    <>
      <button
        onClick={onClick}
        className={cn(
          "w-full p-4 rounded-2xl bg-gradient-to-br text-left transition-all active:scale-98 shadow-card",
          typeColors[routine.type]
        )}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-bold text-lg text-foreground">{routine.name}</h3>
            <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
              <Clock className="w-4 h-4" />
              <span>{totalDuration} min</span>
              <span className="mx-1">•</span>
              <span>{routine.activities.length} activities</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrintClick}
              className="p-2 text-primary hover:bg-primary/20 rounded-lg transition-colors"
              title="Print as PDF"
            >
              <Printer className="w-5 h-5" />
            </button>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>

        {/* Activity preview */}
        <div className="flex gap-2 mb-3">
          {routine.activities.slice(0, 4).map((activity) => {
            const IconComponent = ACTIVITY_ICONS[activity.icon];
            return (
              <div
                key={activity.id}
                className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center",
                  CATEGORY_COLORS[activity.category]
                )}
              >
                {IconComponent && (
                  <IconComponent className="w-5 h-5 text-primary-foreground" />
                )}
              </div>
            );
          })}
          {routine.activities.length > 4 && (
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
              <span className="text-sm font-medium text-muted-foreground">
                +{routine.activities.length - 4}
              </span>
            </div>
          )}
        </div>

        {/* Progress bar */}
        {progress > 0 && (
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </button>

      <GenderSelectDialog
        open={showGenderDialog}
        onOpenChange={setShowGenderDialog}
        onSelect={handleGenderSelect}
      />
    </>
  );
}