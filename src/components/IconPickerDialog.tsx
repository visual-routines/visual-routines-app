import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ACTIVITY_PNG_ICONS } from "@/data/activityIcons";
import { cn } from "@/lib/utils";

// Group icons by category for easier browsing
const ICON_GROUPS = {
  hygiene: ["brush-teeth", "wash-hands-with-soap", "wash-face-with-soap", "shower", "bathtub", "brush-hair"],
  clothing: ["put-shirt-on", "put-pants-on", "socks", "shoes", "hoodie", "sweater"],
  meals: ["eating-sandwich", "eating-fruit", "eating-cookie", "drink-water"],
  learning: ["homework", "reading", "school-desk", "pencil-case"],
  play: ["video-game", "tablet", "laptop", "school-recess"],
  organization: ["find-school-backpack", "organize-desk", "fold-clothes"],
  time: ["morning", "midday", "afternoon", "night", "alarm-clock"],
  other: ["proud-mom", "proud-mom-and-dad", "umbrella", "glasses-in-case"],
};

interface IconPickerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedIcon: string;
  onSelectIcon: (iconId: string) => void;
}

export function IconPickerDialog({
  open,
  onOpenChange,
  selectedIcon,
  onSelectIcon,
}: IconPickerDialogProps) {
  const { t } = useTranslation();
  const [activeGroup, setActiveGroup] = useState<string>("hygiene");

  const groupLabels: Record<string, string> = {
    hygiene: t("categories.hygiene"),
    clothing: t("categories.clothing"),
    meals: t("categories.meals"),
    learning: t("categories.learning"),
    play: t("categories.play"),
    organization: t("categories.organization"),
    time: t("categories.morning"),
    other: t("customActivity.other"),
  };

  const handleSelect = (iconId: string) => {
    onSelectIcon(iconId);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>{t("customActivity.chooseIcon")}</DialogTitle>
        </DialogHeader>

        {/* Category tabs */}
        <div className="flex gap-1.5 overflow-x-auto pb-2 -mx-2 px-2">
          {Object.keys(ICON_GROUPS).map((group) => (
            <Button
              key={group}
              variant={activeGroup === group ? "default" : "outline"}
              size="sm"
              className="shrink-0 rounded-full text-xs"
              onClick={() => setActiveGroup(group)}
            >
              {groupLabels[group]}
            </Button>
          ))}
        </div>

        {/* Icons grid */}
        <ScrollArea className="h-64">
          <div className="grid grid-cols-4 gap-3 p-1">
            {ICON_GROUPS[activeGroup as keyof typeof ICON_GROUPS].map((iconId) => {
              const iconPath = ACTIVITY_PNG_ICONS[iconId];
              if (!iconPath) return null;

              return (
                <button
                  key={iconId}
                  onClick={() => handleSelect(iconId)}
                  className={cn(
                    "aspect-square rounded-xl border-2 p-2 transition-all hover:scale-105",
                    selectedIcon === iconId
                      ? "border-primary bg-primary/10"
                      : "border-border bg-card hover:border-primary/50"
                  )}
                >
                  <img
                    src={iconPath}
                    alt={iconId}
                    className="w-full h-full object-contain"
                  />
                </button>
              );
            })}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
