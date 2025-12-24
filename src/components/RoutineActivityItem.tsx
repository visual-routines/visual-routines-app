import { Activity } from "@/types/routine";
import { ACTIVITY_ICONS, CATEGORY_COLORS } from "@/data/activities";
import { cn } from "@/lib/utils";
import { GripVertical, Trash2, Check } from "lucide-react";

interface RoutineActivityItemProps {
  activity: Activity;
  onRemove?: () => void;
  onComplete?: () => void;
  isDragging?: boolean;
  showControls?: boolean;
  isViewMode?: boolean;
}

export function RoutineActivityItem({
  activity,
  onRemove,
  onComplete,
  isDragging,
  showControls = true,
  isViewMode = false,
}: RoutineActivityItemProps) {
  const IconComponent = ACTIVITY_ICONS[activity.icon];

  return (
    <div
      className={cn(
        "flex items-center gap-3 p-3 rounded-xl bg-card shadow-card transition-all",
        isDragging && "shadow-playful scale-105",
        activity.completed && "opacity-60"
      )}
    >
      {showControls && !isViewMode && (
        <GripVertical className="w-5 h-5 text-muted-foreground cursor-grab active:cursor-grabbing" />
      )}
      
      {isViewMode && (
        <button
          onClick={onComplete}
          className={cn(
            "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all",
            activity.completed
              ? "bg-primary border-primary text-primary-foreground"
              : "border-muted-foreground hover:border-primary"
          )}
        >
          {activity.completed && <Check className="w-5 h-5" />}
        </button>
      )}

      <div
        className={cn(
          "flex items-center justify-center rounded-lg p-2 shrink-0",
          CATEGORY_COLORS[activity.category]
        )}
      >
        {IconComponent && (
          <IconComponent className="w-6 h-6 text-primary-foreground" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className={cn(
          "font-semibold text-foreground truncate",
          activity.completed && "line-through"
        )}>
          {activity.name}
        </p>
        <p className="text-xs text-muted-foreground">{activity.duration} min</p>
      </div>

      {showControls && !isViewMode && onRemove && (
        <button
          onClick={onRemove}
          className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
