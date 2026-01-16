import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IconPickerDialog } from "./IconPickerDialog";
import { ACTIVITY_PNG_ICONS } from "@/data/activityIcons";
import { ActivityCategory } from "@/data/activities";
import { CustomActivity } from "@/types/customActivity";
import { saveCustomActivity } from "@/lib/customActivities";
import { useSettings } from "@/hooks/useSettings";
import { Plus, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

const DEFAULT_ICON = "proud-mom"; // Default icon for new custom activities

const CATEGORIES: ActivityCategory[] = [
  "morning",
  "hygiene",
  "meals",
  "play",
  "learning",
  "evening",
  "clothing",
];

interface AddCustomActivityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onActivityCreated: (activity: CustomActivity) => void;
  editActivity?: CustomActivity | null;
}

export function AddCustomActivityDialog({
  open,
  onOpenChange,
  onActivityCreated,
  editActivity,
}: AddCustomActivityDialogProps) {
  const { t } = useTranslation();
  const { settings } = useSettings();
  
  const [name, setName] = useState(editActivity?.name || "");
  const [icon, setIcon] = useState(editActivity?.icon || DEFAULT_ICON);
  const [category, setCategory] = useState<ActivityCategory>(
    editActivity?.category || "morning"
  );
  const [duration, setDuration] = useState(
    editActivity?.defaultDuration || settings.defaultDuration
  );
  const [iconPickerOpen, setIconPickerOpen] = useState(false);

  const isEditMode = Boolean(editActivity);

  const handleSubmit = () => {
    if (!name.trim()) return;

    const activity: CustomActivity = {
      id: editActivity?.id || `custom-${Date.now()}`,
      name: name.trim(),
      icon,
      category,
      defaultDuration: duration,
      createdAt: editActivity?.createdAt || new Date().toISOString(),
    };

    saveCustomActivity(activity);
    onActivityCreated(activity);
    
    // Reset form
    setName("");
    setIcon(DEFAULT_ICON);
    setCategory("morning");
    setDuration(settings.defaultDuration);
    onOpenChange(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen && editActivity) {
      setName(editActivity.name);
      setIcon(editActivity.icon);
      setCategory(editActivity.category);
      setDuration(editActivity.defaultDuration);
    } else if (!newOpen) {
      setName("");
      setIcon(DEFAULT_ICON);
      setCategory("morning");
      setDuration(settings.defaultDuration);
    }
    onOpenChange(newOpen);
  };

  const iconPath = ACTIVITY_PNG_ICONS[icon];

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? t("customActivity.editTitle") : t("customActivity.addTitle")}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {/* Icon selector */}
            <div className="flex flex-col items-center gap-3">
              <button
                onClick={() => setIconPickerOpen(true)}
                className={cn(
                  "relative w-20 h-20 rounded-2xl border-2 border-dashed border-border",
                  "bg-muted/50 flex items-center justify-center transition-all",
                  "hover:border-primary hover:bg-primary/5"
                )}
              >
                {iconPath ? (
                  <img
                    src={iconPath}
                    alt="Selected icon"
                    className="w-14 h-14 object-contain"
                  />
                ) : (
                  <Plus className="w-8 h-8 text-muted-foreground" />
                )}
                <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Pencil className="w-3 h-3 text-primary-foreground" />
                </span>
              </button>
              <p className="text-xs text-muted-foreground">
                {t("customActivity.tapToChangeIcon")}
              </p>
            </div>

            {/* Name input */}
            <div className="space-y-2">
              <Label htmlFor="activity-name">{t("customActivity.name")}</Label>
              <Input
                id="activity-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("customActivity.namePlaceholder")}
              />
            </div>

            {/* Category selector */}
            <div className="space-y-2">
              <Label>{t("customActivity.category")}</Label>
              <Select value={category} onValueChange={(v) => setCategory(v as ActivityCategory)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {t(`categories.${cat}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Duration selector */}
            <div className="space-y-2">
              <Label>{t("customActivity.duration")}</Label>
              <Select value={String(duration)} onValueChange={(v) => setDuration(Number(v))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 5, 10, 15, 20, 30].map((min) => (
                    <SelectItem key={min} value={String(min)}>
                      {min} {t("settings.min")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              {t("settings.cancel")}
            </Button>
            <Button onClick={handleSubmit} disabled={!name.trim()}>
              {isEditMode ? t("customActivity.save") : t("customActivity.add")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <IconPickerDialog
        open={iconPickerOpen}
        onOpenChange={setIconPickerOpen}
        selectedIcon={icon}
        onSelectIcon={setIcon}
      />
    </>
  );
}
