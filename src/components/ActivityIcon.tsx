import { ACTIVITY_PNG_ICONS } from "@/data/activityIcons";
import { ACTIVITY_ICONS } from "@/data/activities";
import { cn } from "@/lib/utils";

interface ActivityIconProps {
  activityId: string;
  iconKey?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "w-6 h-6",
  md: "w-8 h-8",
  lg: "w-12 h-12",
};

export function ActivityIcon({ 
  activityId, 
  iconKey, 
  className,
  size = "md" 
}: ActivityIconProps) {
  // Check if we have a PNG icon for this activity
  const pngIcon = ACTIVITY_PNG_ICONS[activityId];
  
  if (pngIcon) {
    return (
      <img 
        src={pngIcon} 
        alt="" 
        className={cn(sizeClasses[size], "object-contain", className)}
      />
    );
  }
  
  // Fall back to Lucide icon
  const LucideIcon = iconKey ? ACTIVITY_ICONS[iconKey] : undefined;
  
  if (LucideIcon) {
    return <LucideIcon className={cn(sizeClasses[size], className)} />;
  }
  
  // Default fallback
  return <div className={cn(sizeClasses[size], "bg-muted rounded", className)} />;
}
