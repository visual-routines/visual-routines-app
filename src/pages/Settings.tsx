import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MobileLayout } from "@/components/MobileLayout";
import { useSettings } from "@/hooks/useSettings";
import { getRoutines } from "@/lib/storage";
import { getCustomActivities, deleteCustomActivity } from "@/lib/customActivities";
import { CustomActivity } from "@/types/customActivity";
import { ACTIVITY_PNG_ICONS } from "@/data/activityIcons";
import { AddCustomActivityDialog } from "@/components/AddCustomActivityDialog";
import { APP_VERSION } from "@/lib/version";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import {
  Sun,
  Moon,
  Monitor,
  Trash2,
  Download,
  Upload,
  Type,
  Contrast,
  Clock,
  RefreshCw,
  User,
  Info,
  Sparkles,
  Pencil,
} from "lucide-react";
import { GenderPreference } from "@/lib/settings";

const STORAGE_KEY = "kids-routines";

export default function Settings() {
  const { t, i18n } = useTranslation();
  const { settings, updateSettings } = useSettings();
  const [customActivities, setCustomActivities] = useState<CustomActivity[]>(() => getCustomActivities());
  const [editingActivity, setEditingActivity] = useState<CustomActivity | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleClearAllRoutines = () => {
    localStorage.removeItem(STORAGE_KEY);
    toast.success(t("settings.allRoutinesCleared"));
  };

  const handleExportData = () => {
    const routines = getRoutines();
    const data = JSON.stringify(routines, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `visual-routines-backup-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(t("settings.exportSuccess"));
  };

  const handleImportData = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string);
          if (Array.isArray(data)) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            toast.success(t("settings.importSuccess"));
            window.location.reload();
          } else {
            toast.error(t("settings.invalidFile"));
          }
        } catch {
          toast.error(t("settings.invalidFile"));
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const handleDeleteCustomActivity = (id: string) => {
    deleteCustomActivity(id);
    setCustomActivities(getCustomActivities());
    toast.success(t("customActivity.deleted"));
  };

  const handleEditCustomActivity = (activity: CustomActivity) => {
    setEditingActivity(activity);
    setEditDialogOpen(true);
  };

  const handleActivityUpdated = () => {
    setCustomActivities(getCustomActivities());
    setEditingActivity(null);
  };

  const themeOptions = [
    { value: "light", icon: Sun, labelKey: "settings.light" },
    { value: "dark", icon: Moon, labelKey: "settings.dark" },
    { value: "system", icon: Monitor, labelKey: "settings.system" },
  ] as const;

  const genderOptions: { value: GenderPreference; emoji: string; labelKey: string }[] = [
    { value: "boy", emoji: "👦", labelKey: "gender.boy" },
    { value: "girl", emoji: "👧", labelKey: "gender.girl" },
  ];

  const durationOptions = [1, 2, 3, 5, 10, 15];

  return (
    <MobileLayout title={t("settings.title")} showBack>
      <div className="p-4 space-y-6">
        {/* Appearance Section */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Sun className="w-5 h-5 text-primary" />
            {t("settings.appearance")}
          </h2>

          <div className="bg-card rounded-2xl p-4 space-y-4 shadow-sm">
            {/* Theme */}
            <div className="flex items-center justify-between">
              <Label className="text-base">{t("settings.theme")}</Label>
              <div className="flex gap-1">
                {themeOptions.map(({ value, icon: Icon }) => (
                  <Button
                    key={value}
                    variant={settings.theme === value ? "default" : "outline"}
                    size="icon"
                    className="w-10 h-10 rounded-xl"
                    onClick={() => updateSettings({ theme: value })}
                  >
                    <Icon className="w-5 h-5" />
                  </Button>
                ))}
              </div>
            </div>

            <Separator />

            {/* Language */}
            <div className="flex items-center justify-between">
              <Label className="text-base">{t("settings.language")}</Label>
              <Select
                value={i18n.language}
                onValueChange={(value) => i18n.changeLanguage(value)}
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="nb">Norsk Bokmål</SelectItem>
                  <SelectItem value="mk">Македонски</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Defaults Section */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Clock className="w-5 h-5 text-secondary" />
            {t("settings.defaults")}
          </h2>

          <div className="bg-card rounded-2xl p-4 space-y-4 shadow-sm">
            {/* Default Gender */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                <Label className="text-base">{t("settings.defaultGender")}</Label>
              </div>
              <div className="flex gap-1">
                {genderOptions.map(({ value, emoji }) => (
                  <Button
                    key={value}
                    variant={settings.defaultGender === value ? "default" : "outline"}
                    size="sm"
                    className="px-3 rounded-xl"
                    onClick={() => updateSettings({ defaultGender: value })}
                  >
                    {emoji}
                  </Button>
                ))}
              </div>
            </div>

            <Separator />

            {/* Default Duration */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <Label className="text-base">{t("settings.defaultDuration")}</Label>
              </div>
              <Select
                value={String(settings.defaultDuration)}
                onValueChange={(value) => updateSettings({ defaultDuration: Number(value) })}
              >
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {durationOptions.map((min) => (
                    <SelectItem key={min} value={String(min)}>
                      {min} {t("settings.min")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Default Auto Reset */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-muted-foreground" />
                <Label className="text-base">{t("settings.defaultAutoReset")}</Label>
              </div>
              <Switch
                checked={settings.defaultAutoReset}
                onCheckedChange={(checked) => updateSettings({ defaultAutoReset: checked })}
              />
            </div>
          </div>
        </section>

        {/* Accessibility Section */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Type className="w-5 h-5 text-accent" />
            {t("settings.accessibility")}
          </h2>

          <div className="bg-card rounded-2xl p-4 space-y-4 shadow-sm">
            {/* Large Text */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Type className="w-4 h-4 text-muted-foreground" />
                <Label className="text-base">{t("settings.largeText")}</Label>
              </div>
              <Switch
                checked={settings.largeText}
                onCheckedChange={(checked) => updateSettings({ largeText: checked })}
              />
            </div>

            <Separator />

            {/* High Contrast */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Contrast className="w-4 h-4 text-muted-foreground" />
                <Label className="text-base">{t("settings.highContrast")}</Label>
              </div>
              <Switch
                checked={settings.highContrast}
                onCheckedChange={(checked) => updateSettings({ highContrast: checked })}
              />
            </div>
          </div>
        </section>

        {/* Custom Activities Section */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            {t("customActivity.manageTitle")}
          </h2>

          <div className="bg-card rounded-2xl p-4 shadow-sm">
            {customActivities.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-muted-foreground text-sm">
                  {t("customActivity.noCustomActivities")}
                </p>
                <p className="text-muted-foreground text-xs mt-1">
                  {t("customActivity.createCustomActivities")}
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {customActivities.map((activity) => {
                  const iconPath = ACTIVITY_PNG_ICONS[activity.icon];
                  return (
                    <div
                      key={activity.id}
                      className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl"
                    >
                      <div className="w-10 h-10 rounded-lg bg-card flex items-center justify-center shrink-0">
                        {iconPath && (
                          <img src={iconPath} alt={activity.name} className="w-7 h-7 object-contain" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">{activity.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {t(`categories.${activity.category}`)} • {activity.defaultDuration} {t("settings.min")}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-8 h-8"
                          onClick={() => handleEditCustomActivity(activity)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="w-8 h-8 text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>{t("customActivity.deleteConfirmTitle")}</AlertDialogTitle>
                              <AlertDialogDescription>
                                {t("customActivity.deleteConfirmDescription")}
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>{t("settings.cancel")}</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteCustomActivity(activity.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                {t("settings.clearAll")}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Data Management Section */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Download className="w-5 h-5 text-primary" />
            {t("settings.dataManagement")}
          </h2>

          <div className="bg-card rounded-2xl p-4 space-y-3 shadow-sm">
            <Button
              variant="outline"
              className="w-full justify-start gap-3 h-12 rounded-xl"
              onClick={handleExportData}
            >
              <Download className="w-5 h-5" />
              {t("settings.exportRoutines")}
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start gap-3 h-12 rounded-xl"
              onClick={handleImportData}
            >
              <Upload className="w-5 h-5" />
              {t("settings.importRoutines")}
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 h-12 rounded-xl text-destructive hover:text-destructive border-destructive/30 hover:bg-destructive/10"
                >
                  <Trash2 className="w-5 h-5" />
                  {t("settings.clearAllRoutines")}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{t("settings.clearConfirmTitle")}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {t("settings.clearConfirmDescription")}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{t("settings.cancel")}</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleClearAllRoutines}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    {t("settings.clearAll")}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </section>

        {/* About Section */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Info className="w-5 h-5 text-muted-foreground" />
            {t("settings.about")}
          </h2>

          <div className="bg-card rounded-2xl p-4 shadow-sm">
            <div className="text-center space-y-2">
              <p className="text-lg font-bold text-foreground">{t("app.name")}</p>
              <p className="text-sm text-muted-foreground">{t("settings.version")} {APP_VERSION.display}</p>
              <p className="text-sm text-muted-foreground">{t("about.madeWith")}</p>
            </div>
          </div>
        </section>
      </div>

      <AddCustomActivityDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onActivityCreated={handleActivityUpdated}
        editActivity={editingActivity}
      />
    </MobileLayout>
  );
}
