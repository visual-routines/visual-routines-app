import { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Plus, Layout, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { AboutSheet } from "./AboutSheet";

interface MobileLayoutProps {
  children: ReactNode;
  title?: string;
  showBack?: boolean;
  rightAction?: ReactNode;
}

const NAV_ITEMS = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/create", icon: Plus, label: "Create" },
  { path: "/templates", icon: Layout, label: "Templates" },
];

export function MobileLayout({ children, title, showBack, rightAction }: MobileLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg pt-12">
        <div className="flex items-center justify-between px-4 py-3">
          {showBack ? (
            <button
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 text-foreground hover:bg-muted rounded-lg"
            >
              ←
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <Sun className="w-6 h-6 text-primary" />
              <span className="font-bold text-lg text-foreground">Visual Routines</span>
            </div>
          )}
          
          {title && (
            <h1 className="text-lg font-bold text-foreground absolute left-1/2 -translate-x-1/2">
              {title}
            </h1>
          )}
          
          <div className="flex items-center">
            {rightAction}
            {!showBack && <AboutSheet />}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-auto pb-28">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border safe-bottom">
        <div className="flex items-center justify-around py-2">
          {NAV_ITEMS.map(({ path, icon: Icon, label }) => {
            const isActive = location.pathname === path;
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={cn(
                  "flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-all",
                  isActive
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs font-medium">{label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
