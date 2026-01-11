import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Activity } from "@/types/routine";
import { RoutineActivityItem } from "./RoutineActivityItem";
import { GripVertical } from "lucide-react";

interface SortableActivityProps {
  activity: Activity;
  onRemove: () => void;
  onDurationChange: (newDuration: number) => void;
}

export const SortableActivity = ({ activity, onRemove, onDurationChange }: SortableActivityProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: activity.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative">
      <div className="flex items-center gap-2">
        <button
          className="touch-none p-2 text-muted-foreground hover:text-foreground transition-colors"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <RoutineActivityItem 
            activity={activity} 
            onRemove={onRemove}
            onDurationChange={onDurationChange}
            showDurationControls
          />
        </div>
      </div>
    </div>
  );
};
