import { Activity } from "@/types/routine";
import { ACTIVITY_ICONS, CATEGORY_COLORS } from "@/data/activities";
import { cn } from "@/lib/utils";
import { GripVertical, Trash2, Check, Minus, Plus } from "lucide-react";

interface RoutineActivityItemProps {
  activity: Activity;
  onRemove?: () => void;
  onComplete?: () => void;
  onDurationChange?: (newDuration: number) => void;
  isDragging?: boolean;
  showControls?: boolean;
  showDurationControls?: boolean;
  isViewMode?: boolean;
}

export function RoutineActivityItem({
  activity,
  onRemove,
  onComplete,
  onDurationChange,
  isDragging,
  showControls = true,
  showDurationControls = false,
  isViewMode = false,
}: RoutineActivityItemProps) {
  const IconComponent = ACTIVITY_ICONS[activity.icon];

  const handleDecrease = () => {
    if (activity.duration > 1 && onDurationChange) {
      onDurationChange(activity.duration - 1);
    }
  };

  const handleIncrease = () => {
    if (onDurationChange) {
      onDurationChange(activity.duration + 1);
    }
  };

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
        {showDurationControls && onDurationChange ? (
          <div className="flex items-center gap-2 mt-1">
            <button
              onClick={handleDecrease}
              disabled={activity.duration <= 1}
              className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="text-sm font-medium text-foreground min-w-[3rem] text-center">
              {activity.duration} min
            </span>
            <button
              onClick={handleIncrease}
              className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <p className="text-xs text-muted-foreground">{activity.duration} min</p>
        )}
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
