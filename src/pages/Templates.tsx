import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MobileLayout } from "@/components/MobileLayout";
import { ROUTINE_TEMPLATES } from "@/data/templates";
import { ACTIVITY_ICONS, CATEGORY_COLORS } from "@/data/activities";
import { Routine, Activity } from "@/types/routine";
import { saveRoutine } from "@/lib/storage";
import { Sun, Moon, Clock, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const Templates = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [recurringState, setRecurringState] = useState<Record<string, boolean>>({});

  const toggleRecurring = (templateId: string) => {
    setRecurringState((prev) => ({ ...prev, [templateId]: !prev[templateId] }));
  };

  const useTemplate = (templateId: string) => {
    const template = ROUTINE_TEMPLATES.find((t) => t.id === templateId);
    if (!template) return;

    const isRecurring = recurringState[templateId] || false;
    const templateName = t(`templateNames.${template.id}` as any);

    const activities: Activity[] = template.activities.map((a, index) => ({
      ...a,
      id: `${a.templateId}-${Date.now()}-${index}`,
    }));

    const routine: Routine = {
      id: `routine-${Date.now()}`,
      name: templateName,
      type: template.type,
      activities,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      recurring: isRecurring,
      lastResetDate: isRecurring ? new Date().toISOString().split("T")[0] : undefined,
    };

    saveRoutine(routine);
    toast.success(t("templates.created", { name: templateName }));
    navigate("/");
  };

  return (
    <MobileLayout>
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">{t("templates.title")}</h1>
        <p className="text-muted-foreground mb-6">
          {t("templates.subtitle")}
        </p>

        <div className="space-y-4">
          {ROUTINE_TEMPLATES.map((template) => {
            const totalDuration = template.activities.reduce(
              (sum, a) => sum + a.duration,
              0
            );
            const templateName = t(`templateNames.${template.id}` as any);
            const templateDescription = t(`templateDescriptions.${template.id}` as any);

            return (
              <div
                key={template.id}
                className={cn(
                  "p-4 rounded-2xl bg-gradient-to-br shadow-card",
                  template.type === "morning"
                    ? "from-sunshine/20 to-coral/20"
                    : "from-lavender/20 to-sky/20"
                )}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center",
                      template.type === "morning" ? "bg-sunshine" : "bg-lavender"
                    )}
                  >
                    {template.type === "morning" ? (
                      <Sun className="w-6 h-6 text-foreground" />
                    ) : (
                      <Moon className="w-6 h-6 text-foreground" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-foreground">
                      {templateName}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {templateDescription}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{t("templates.min", { duration: totalDuration })}</span>
                  <span className="mx-1">•</span>
                  <span>{t("templates.activities", { count: template.activities.length })}</span>
                </div>

                {/* Activity preview */}
                <div className="flex gap-2 mb-4">
                  {template.activities.map((activity, idx) => {
                    const IconComponent = ACTIVITY_ICONS[activity.icon];
                    return (
                      <div
                        key={idx}
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
                </div>

                {/* Recurring toggle */}
                <div className="flex items-center justify-between bg-background/50 rounded-xl p-3 mb-3">
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">{t("templates.dailyReset")}</span>
                  </div>
                  <button
                    onClick={() => toggleRecurring(template.id)}
                    className={cn(
                      "w-10 h-6 rounded-full transition-colors relative shrink-0",
                      recurringState[template.id] ? "bg-primary" : "bg-muted"
                    )}
                  >
                    <span
                      className={cn(
                        "absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform",
                        recurringState[template.id] ? "translate-x-4" : "translate-x-0.5"
                      )}
                    />
                  </button>
                </div>

                <button
                  onClick={() => useTemplate(template.id)}
                  className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-xl transition-all active:scale-98"
                >
                  {t("templates.useTemplate")}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </MobileLayout>
  );
};

export default Templates;
