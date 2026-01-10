import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MobileLayout } from "@/components/MobileLayout";
import { RoutineCard } from "@/components/RoutineCard";
import { Routine } from "@/types/routine";
import { getRoutines } from "@/lib/storage";
import { Plus, Sparkles, Printer } from "lucide-react";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) {
    return { text: "Good morning!", emoji: "☀️", subtitle: "Let's have a great day with your routines" };
  } else if (hour >= 12 && hour < 17) {
    return { text: "Good afternoon!", emoji: "🌤️", subtitle: "Keep up the great work with your routines" };
  } else {
    return { text: "Good evening!", emoji: "🌙", subtitle: "Wind down with your evening routines" };
  }
};

const Index = () => {
  const navigate = useNavigate();
  const [routines, setRoutines] = useState<Routine[]>([]);
  const greeting = getGreeting();

  useEffect(() => {
    setRoutines(getRoutines());
  }, []);

  return (
    <MobileLayout>
      <div className="px-4 py-6">
        {/* Welcome section */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-1">
            {greeting.text} {greeting.emoji}
          </h1>
          <p className="text-muted-foreground">
            {greeting.subtitle}
          </p>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <button
            onClick={() => navigate("/create")}
            className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 transition-all active:scale-95"
          >
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
              <Plus className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="text-left">
              <p className="font-bold text-foreground">New Routine</p>
              <p className="text-xs text-muted-foreground">Create custom</p>
            </div>
          </button>

          <button
            onClick={() => navigate("/templates")}
            className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/10 transition-all active:scale-95"
          >
            <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-secondary-foreground" />
            </div>
            <div className="text-left">
              <p className="font-bold text-foreground">Templates</p>
              <p className="text-xs text-muted-foreground">Quick start</p>
            </div>
          </button>
        </div>

        {/* Routines list */}
        <div>
          <h2 className="text-lg font-bold text-foreground mb-4">
            Your Routines
          </h2>

          {routines.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                No routines yet
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                Create visual routines your kids can follow
              </p>
              <p className="text-xs text-muted-foreground mb-4 flex items-center justify-center gap-1">
                <Printer className="w-3.5 h-3.5" />
                Print them as beautiful PDFs!
              </p>
              <button
                onClick={() => navigate("/create")}
                className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl transition-all active:scale-95"
              >
                Create Routine
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {routines.map((routine) => (
                <RoutineCard
                  key={routine.id}
                  routine={routine}
                  onClick={() => navigate(`/routine/${routine.id}`)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  );
};

export default Index;
