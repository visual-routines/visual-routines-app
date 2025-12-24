import { Activity } from "@/types/routine";
import { 
  Sun, Moon, Utensils, Bath, Shirt, BookOpen, 
  Gamepad2, Music, Bike, Palette, BedDouble, Clock,
  Sparkles, Star, Heart, Brush, Apple, Coffee
} from "lucide-react";

export type ActivityCategory = "morning" | "hygiene" | "meals" | "play" | "learning" | "evening";

export interface ActivityTemplate {
  id: string;
  name: string;
  icon: string;
  category: ActivityCategory;
  defaultDuration: number;
}

export const ACTIVITY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  sun: Sun,
  moon: Moon,
  utensils: Utensils,
  bath: Bath,
  shirt: Shirt,
  book: BookOpen,
  gamepad: Gamepad2,
  music: Music,
  bike: Bike,
  palette: Palette,
  bed: BedDouble,
  clock: Clock,
  sparkles: Sparkles,
  star: Star,
  heart: Heart,
  brush: Brush,
  apple: Apple,
  coffee: Coffee,
};

export const CATEGORY_COLORS: Record<ActivityCategory, string> = {
  morning: "bg-morning",
  hygiene: "bg-hygiene",
  meals: "bg-meals",
  play: "bg-play",
  learning: "bg-learning",
  evening: "bg-evening",
};

export const CATEGORY_LABELS: Record<ActivityCategory, string> = {
  morning: "Morning",
  hygiene: "Hygiene",
  meals: "Meals",
  play: "Play",
  learning: "Learning",
  evening: "Evening",
};

export const ACTIVITY_TEMPLATES: ActivityTemplate[] = [
  // Morning
  { id: "wake-up", name: "Wake Up", icon: "sun", category: "morning", defaultDuration: 5 },
  { id: "get-dressed", name: "Get Dressed", icon: "shirt", category: "morning", defaultDuration: 10 },
  
  // Hygiene
  { id: "brush-teeth", name: "Brush Teeth", icon: "sparkles", category: "hygiene", defaultDuration: 3 },
  { id: "take-bath", name: "Take Bath", icon: "bath", category: "hygiene", defaultDuration: 15 },
  { id: "wash-hands", name: "Wash Hands", icon: "sparkles", category: "hygiene", defaultDuration: 2 },
  { id: "brush-hair", name: "Brush Hair", icon: "brush", category: "hygiene", defaultDuration: 5 },
  
  // Meals
  { id: "breakfast", name: "Breakfast", icon: "coffee", category: "meals", defaultDuration: 20 },
  { id: "lunch", name: "Lunch", icon: "utensils", category: "meals", defaultDuration: 25 },
  { id: "dinner", name: "Dinner", icon: "utensils", category: "meals", defaultDuration: 25 },
  { id: "snack", name: "Snack Time", icon: "apple", category: "meals", defaultDuration: 10 },
  
  // Play
  { id: "outdoor-play", name: "Outdoor Play", icon: "bike", category: "play", defaultDuration: 30 },
  { id: "video-games", name: "Video Games", icon: "gamepad", category: "play", defaultDuration: 30 },
  { id: "music-time", name: "Music Time", icon: "music", category: "play", defaultDuration: 20 },
  { id: "art-crafts", name: "Art & Crafts", icon: "palette", category: "play", defaultDuration: 30 },
  
  // Learning
  { id: "homework", name: "Homework", icon: "book", category: "learning", defaultDuration: 30 },
  { id: "reading", name: "Reading", icon: "book", category: "learning", defaultDuration: 20 },
  
  // Evening
  { id: "bedtime-story", name: "Bedtime Story", icon: "book", category: "evening", defaultDuration: 15 },
  { id: "go-to-bed", name: "Go to Bed", icon: "bed", category: "evening", defaultDuration: 5 },
];
