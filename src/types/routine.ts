import { ActivityCategory } from "@/data/activities";

export interface Activity {
  id: string;
  templateId: string;
  name: string;
  icon: string;
  category: ActivityCategory;
  duration: number;
  order: number;
  completed?: boolean;
}

export interface Routine {
  id: string;
  name: string;
  type: "morning" | "evening" | "custom";
  activities: Activity[];
  createdAt: string;
  updatedAt: string;
}

export interface RoutineTemplate {
  id: string;
  name: string;
  description: string;
  type: "morning" | "evening";
  activities: Omit<Activity, "id" | "completed">[];
}
