import { ActivityCategory } from "@/data/activities";

export interface CustomActivity {
  id: string;
  name: string;
  icon: string; // Activity icon ID from existing icons
  category: ActivityCategory;
  defaultDuration: number;
  createdAt: string;
}
