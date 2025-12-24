import { useNavigate } from "react-router-dom";
import { MobileLayout } from "@/components/MobileLayout";
import { ROUTINE_TEMPLATES } from "@/data/templates";
import { ACTIVITY_ICONS, CATEGORY_COLORS } from "@/data/activities";
import { Routine, Activity } from "@/types/routine";
import { saveRoutine } from "@/lib/storage";
import { Sun, Moon, Clock } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const Templates = () => {
  const navigate = useNavigate();

  const useTemplate = (templateId: string) => {
    const template = ROUTINE_TEMPLATES.find((t) => t.id === templateId);
    if (!template) return;

    const activities: Activity[] = template.activities.map((a, index) => ({
      ...a,
      id: `${a.templateId}-${Date.now()}-${index}`,
    }));

    const routine: Routine = {
      id: `routine-${Date.now()}`,
      name: template.name,
      type: template.type,
      activities,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveRoutine(routine);
    toast.success(`Created "${template.name}"!`);
    navigate("/");
  };

  return (
    <MobileLayout>
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">Templates</h1>
        <p className="text-muted-foreground mb-6">
          Quick-start with ready-made routines
        </p>

        <div className="space-y-4">
          {ROUTINE_TEMPLATES.map((template) => {
            const totalDuration = template.activities.reduce(
              (sum, a) => sum + a.duration,
              0
            );

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
                      {template.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {template.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{totalDuration} min</span>
                  <span className="mx-1">•</span>
                  <span>{template.activities.length} activities</span>
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

                <button
                  onClick={() => useTemplate(template.id)}
                  className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-xl transition-all active:scale-98"
                >
                  Use Template
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
