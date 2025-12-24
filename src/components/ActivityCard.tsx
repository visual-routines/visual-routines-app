import { ACTIVITY_ICONS, CATEGORY_COLORS, ActivityCategory } from "@/data/activities";
import { cn } from "@/lib/utils";

interface ActivityCardProps {
  name: string;
  icon: string;
  category: ActivityCategory;
  duration?: number;
  onClick?: () => void;
  selected?: boolean;
  showDuration?: boolean;
  size?: "sm" | "md" | "lg";
}

export function ActivityCard({
  name,
  icon,
  category,
  duration,
  onClick,
  selected,
  showDuration = true,
  size = "md",
}: ActivityCardProps) {
  const IconComponent = ACTIVITY_ICONS[icon];
  
  const sizeClasses = {
    sm: "p-2 gap-1",
    md: "p-3 gap-2",
    lg: "p-4 gap-3",
  };
  
  const iconSizes = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };
  
  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center rounded-xl bg-card shadow-card transition-all duration-200 active:scale-95",
        sizeClasses[size],
        selected && "ring-2 ring-primary ring-offset-2 ring-offset-background",
        onClick && "cursor-pointer hover:shadow-playful"
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center rounded-lg p-2",
          CATEGORY_COLORS[category]
        )}
      >
        {IconComponent && (
          <IconComponent className={cn(iconSizes[size], "text-primary-foreground")} />
        )}
      </div>
      <span className={cn("font-semibold text-foreground mt-1 text-center leading-tight", textSizes[size])}>
        {name}
      </span>
      {showDuration && duration && (
        <span className={cn("text-muted-foreground", size === "sm" ? "text-[10px]" : "text-xs")}>
          {duration} min
        </span>
      )}
    </button>
  );
}
