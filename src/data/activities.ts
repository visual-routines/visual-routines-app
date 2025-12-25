import { Activity } from "@/types/routine";
import { 
  Sun, Moon, Utensils, Bath, Shirt, BookOpen, 
  Gamepad2, Music, Bike, Palette, BedDouble, Clock,
  Sparkles, Star, Heart, Brush, Apple, Coffee,
  Droplets, HandMetal, Glasses, Backpack, PenTool, 
  Ruler, FileText, Eraser, Pencil, NotebookPen, Target,
  CheckCircle, School, Sandwich, Cookie, GlassWater,
  Footprints, Umbrella, CloudRain, Snowflake, Thermometer,
  Monitor, Smartphone, Tablet, Ban, Trophy, Users,
  ShowerHead, Scissors, FolderOpen, Search, MapPin,
  Timer, Laptop, Volume2
} from "lucide-react";

export type ActivityCategory = "morning" | "hygiene" | "meals" | "play" | "learning" | "evening" | "clothing" | "school" | "organization";

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
  droplets: Droplets,
  hand: HandMetal,
  glasses: Glasses,
  backpack: Backpack,
  pen: PenTool,
  ruler: Ruler,
  file: FileText,
  eraser: Eraser,
  pencil: Pencil,
  notebook: NotebookPen,
  target: Target,
  check: CheckCircle,
  school: School,
  sandwich: Sandwich,
  cookie: Cookie,
  water: GlassWater,
  footprints: Footprints,
  umbrella: Umbrella,
  rain: CloudRain,
  snow: Snowflake,
  thermometer: Thermometer,
  monitor: Monitor,
  smartphone: Smartphone,
  tablet: Tablet,
  ban: Ban,
  trophy: Trophy,
  users: Users,
  shower: ShowerHead,
  scissors: Scissors,
  folder: FolderOpen,
  search: Search,
  mappin: MapPin,
  timer: Timer,
  laptop: Laptop,
  volume: Volume2,
};

export const CATEGORY_COLORS: Record<ActivityCategory, string> = {
  morning: "bg-morning",
  hygiene: "bg-hygiene",
  meals: "bg-meals",
  play: "bg-play",
  learning: "bg-learning",
  evening: "bg-evening",
  clothing: "bg-clothing",
  school: "bg-school",
  organization: "bg-organization",
};

export const CATEGORY_LABELS: Record<ActivityCategory, string> = {
  morning: "Morning",
  hygiene: "Hygiene",
  meals: "Meals",
  play: "Play",
  learning: "Learning",
  evening: "Evening",
  clothing: "Clothing",
  school: "School",
  organization: "Organization",
};

export const ACTIVITY_TEMPLATES: ActivityTemplate[] = [
  // Morning / Time of Day
  { id: "wake-up", name: "Wake Up", icon: "sun", category: "morning", defaultDuration: 5 },
  { id: "morning", name: "Morning", icon: "sun", category: "morning", defaultDuration: 5 },
  { id: "midday", name: "Midday", icon: "sun", category: "morning", defaultDuration: 5 },
  { id: "afternoon", name: "Afternoon", icon: "sun", category: "morning", defaultDuration: 5 },
  { id: "alarm-clock", name: "Alarm Clock", icon: "clock", category: "morning", defaultDuration: 2 },
  
  // Hygiene - Teeth
  { id: "brush-teeth", name: "Brush Teeth", icon: "sparkles", category: "hygiene", defaultDuration: 3 },
  { id: "put-toothpaste-on-toothbrush", name: "Put Toothpaste on Toothbrush", icon: "sparkles", category: "hygiene", defaultDuration: 1 },
  { id: "rinse-mouth-with-water", name: "Rinse Mouth with Water", icon: "droplets", category: "hygiene", defaultDuration: 1 },
  { id: "rinse-toothbrush", name: "Rinse Toothbrush", icon: "droplets", category: "hygiene", defaultDuration: 1 },
  
  // Hygiene - Bathing
  { id: "take-bath", name: "Take Bath", icon: "bath", category: "hygiene", defaultDuration: 15 },
  { id: "bathtub", name: "Bathtub", icon: "bath", category: "hygiene", defaultDuration: 15 },
  { id: "shower", name: "Shower", icon: "shower", category: "hygiene", defaultDuration: 10 },
  
  // Hygiene - Hands
  { id: "wash-hands", name: "Wash Hands", icon: "sparkles", category: "hygiene", defaultDuration: 2 },
  { id: "wash-hands-with-soap", name: "Wash Hands with Soap", icon: "sparkles", category: "hygiene", defaultDuration: 2 },
  { id: "wash-hands-with-water", name: "Wash Hands with Water", icon: "droplets", category: "hygiene", defaultDuration: 1 },
  { id: "dry-hands-with-towel", name: "Dry Hands with Towel", icon: "hand", category: "hygiene", defaultDuration: 1 },
  
  // Hygiene - Face
  { id: "wash-face-with-soap", name: "Wash Face with Soap", icon: "sparkles", category: "hygiene", defaultDuration: 2 },
  { id: "wash-face-with-water", name: "Wash Face with Water", icon: "droplets", category: "hygiene", defaultDuration: 1 },
  { id: "dry-face-with-towel", name: "Dry Face with Towel", icon: "hand", category: "hygiene", defaultDuration: 1 },
  
  // Hygiene - Hair
  { id: "brush-hair", name: "Brush Hair", icon: "brush", category: "hygiene", defaultDuration: 5 },
  { id: "brushing-hair", name: "Brushing Hair", icon: "brush", category: "hygiene", defaultDuration: 5 },
  
  // Hygiene - Other
  { id: "put-towel-on-hook", name: "Put Towel on Hook", icon: "target", category: "hygiene", defaultDuration: 1 },
  
  // Clothing - Basics
  { id: "get-dressed", name: "Get Dressed", icon: "shirt", category: "clothing", defaultDuration: 10 },
  { id: "put-shirt-on", name: "Put Shirt On", icon: "shirt", category: "clothing", defaultDuration: 3 },
  { id: "take-shirt-off", name: "Take Shirt Off", icon: "shirt", category: "clothing", defaultDuration: 2 },
  { id: "put-pants-on", name: "Put Pants On", icon: "shirt", category: "clothing", defaultDuration: 3 },
  { id: "socks", name: "Socks", icon: "footprints", category: "clothing", defaultDuration: 2 },
  
  // Clothing - Shoes
  { id: "shoes", name: "Shoes", icon: "footprints", category: "clothing", defaultDuration: 3 },
  { id: "shoes-2", name: "Shoes 2", icon: "footprints", category: "clothing", defaultDuration: 3 },
  { id: "tying-shoelaces", name: "Tying Shoelaces", icon: "footprints", category: "clothing", defaultDuration: 3 },
  { id: "tie-shoe-grab-laces", name: "Tie Shoe Grab Laces", icon: "footprints", category: "clothing", defaultDuration: 2 },
  { id: "crocs", name: "Crocs", icon: "footprints", category: "clothing", defaultDuration: 2 },
  { id: "sandals", name: "Sandals", icon: "footprints", category: "clothing", defaultDuration: 2 },
  { id: "rubber-boots", name: "Rubber Boots", icon: "footprints", category: "clothing", defaultDuration: 3 },
  
  // Clothing - Outerwear
  { id: "hoodie", name: "Hoodie", icon: "shirt", category: "clothing", defaultDuration: 2 },
  { id: "hoodie-with-zipper", name: "Hoodie with Zipper", icon: "shirt", category: "clothing", defaultDuration: 3 },
  { id: "sweater", name: "Sweater", icon: "shirt", category: "clothing", defaultDuration: 2 },
  { id: "rain-jacket", name: "Rain Jacket", icon: "rain", category: "clothing", defaultDuration: 2 },
  
  // Clothing - Accessories
  { id: "scarf", name: "Scarf", icon: "thermometer", category: "clothing", defaultDuration: 2 },
  { id: "gloves", name: "Gloves", icon: "hand", category: "clothing", defaultDuration: 2 },
  { id: "winter-hat", name: "Winter Hat", icon: "snow", category: "clothing", defaultDuration: 1 },
  { id: "sports-cap", name: "Sports Cap", icon: "sun", category: "clothing", defaultDuration: 1 },
  { id: "umbrella", name: "Umbrella", icon: "umbrella", category: "clothing", defaultDuration: 1 },
  { id: "glasses-in-case", name: "Glasses in Case", icon: "glasses", category: "clothing", defaultDuration: 2 },
  
  // Clothing - Laundry
  { id: "clothes-laundry-basket", name: "Clothes Laundry Basket", icon: "folder", category: "clothing", defaultDuration: 2 },
  { id: "fold-clothes", name: "Fold Clothes", icon: "shirt", category: "clothing", defaultDuration: 10 },
  
  // Meals
  { id: "breakfast", name: "Breakfast", icon: "coffee", category: "meals", defaultDuration: 20 },
  { id: "lunch", name: "Lunch", icon: "utensils", category: "meals", defaultDuration: 25 },
  { id: "lunch-at-school", name: "Lunch at School", icon: "utensils", category: "meals", defaultDuration: 30 },
  { id: "dinner", name: "Dinner", icon: "utensils", category: "meals", defaultDuration: 25 },
  { id: "snack", name: "Snack Time", icon: "apple", category: "meals", defaultDuration: 10 },
  { id: "eating-cookie", name: "Eating Cookie", icon: "cookie", category: "meals", defaultDuration: 5 },
  { id: "eating-fruit", name: "Eating Fruit", icon: "apple", category: "meals", defaultDuration: 5 },
  { id: "eating-sandwich", name: "Eating Sandwich", icon: "sandwich", category: "meals", defaultDuration: 10 },
  { id: "drink-water", name: "Drink Water", icon: "water", category: "meals", defaultDuration: 2 },
  
  // Play
  { id: "outdoor-play", name: "Outdoor Play", icon: "bike", category: "play", defaultDuration: 30 },
  { id: "video-games", name: "Video Games", icon: "gamepad", category: "play", defaultDuration: 30 },
  { id: "video-game", name: "Video Game", icon: "gamepad", category: "play", defaultDuration: 30 },
  { id: "video-game-not-allowed", name: "Video Game Not Allowed", icon: "ban", category: "play", defaultDuration: 0 },
  { id: "music-time", name: "Music Time", icon: "music", category: "play", defaultDuration: 20 },
  { id: "art-crafts", name: "Art & Crafts", icon: "palette", category: "play", defaultDuration: 30 },
  { id: "tablet", name: "Tablet", icon: "tablet", category: "play", defaultDuration: 30 },
  { id: "tablet-not-allowed", name: "Tablet Not Allowed", icon: "ban", category: "play", defaultDuration: 0 },
  { id: "phone", name: "Phone", icon: "smartphone", category: "play", defaultDuration: 15 },
  { id: "phone-not-allowed", name: "Phone Not Allowed", icon: "ban", category: "play", defaultDuration: 0 },
  { id: "laptop", name: "Laptop", icon: "laptop", category: "play", defaultDuration: 30 },
  { id: "laptop-not-allowed", name: "Laptop Not Allowed", icon: "ban", category: "play", defaultDuration: 0 },
  { id: "school-recess", name: "School Recess", icon: "bike", category: "play", defaultDuration: 15 },
  
  // Learning - Reading & Homework
  { id: "homework", name: "Homework", icon: "book", category: "learning", defaultDuration: 30 },
  { id: "doing-homework", name: "Doing Homework", icon: "book", category: "learning", defaultDuration: 30 },
  { id: "homework-done", name: "Homework Done", icon: "check", category: "learning", defaultDuration: 2 },
  { id: "reading", name: "Reading", icon: "book", category: "learning", defaultDuration: 20 },
  
  // Learning - Exams
  { id: "exam", name: "Exam", icon: "file", category: "learning", defaultDuration: 45 },
  { id: "exam-done", name: "Exam Done", icon: "check", category: "learning", defaultDuration: 2 },
  
  // School - Desk & Classroom
  { id: "school-desk", name: "School Desk", icon: "school", category: "school", defaultDuration: 5 },
  { id: "organize-desk", name: "Organize Desk", icon: "folder", category: "school", defaultDuration: 5 },
  
  // School - Find Items
  { id: "find-school-backpack", name: "Find School Backpack", icon: "search", category: "school", defaultDuration: 2 },
  { id: "find-lunch-bag", name: "Find Lunch Bag", icon: "search", category: "school", defaultDuration: 2 },
  { id: "find-pencil", name: "Find Pencil", icon: "search", category: "school", defaultDuration: 1 },
  { id: "find-eraser", name: "Find Eraser", icon: "search", category: "school", defaultDuration: 1 },
  { id: "find-ruler", name: "Find Ruler", icon: "search", category: "school", defaultDuration: 1 },
  { id: "find-marker", name: "Find Marker", icon: "search", category: "school", defaultDuration: 1 },
  { id: "find-notebook", name: "Find Notebook", icon: "search", category: "school", defaultDuration: 1 },
  { id: "find-textbook", name: "Find Textbook", icon: "search", category: "school", defaultDuration: 2 },
  { id: "find-homework-sheet", name: "Find Homework Sheet", icon: "search", category: "school", defaultDuration: 1 },
  { id: "find-glasses", name: "Find Glasses", icon: "search", category: "school", defaultDuration: 2 },
  { id: "find-compass", name: "Find Compass", icon: "search", category: "school", defaultDuration: 1 },
  { id: "find-whiteboard", name: "Find Whiteboard", icon: "search", category: "school", defaultDuration: 2 },
  
  // Organization - Pencil Case
  { id: "pencil-case", name: "Pencil Case", icon: "pen", category: "organization", defaultDuration: 2 },
  { id: "put-pencil-in-case", name: "Put Pencil in Case", icon: "pencil", category: "organization", defaultDuration: 1 },
  { id: "take-pencil-out-of-case", name: "Take Pencil out of Case", icon: "pencil", category: "organization", defaultDuration: 1 },
  { id: "put-eraser-in-pencil-case", name: "Put Eraser in Pencil Case", icon: "eraser", category: "organization", defaultDuration: 1 },
  { id: "take-eraser-out-of-pencil-case", name: "Take Eraser out of Pencil Case", icon: "eraser", category: "organization", defaultDuration: 1 },
  { id: "put-ruler-in-pencil-case", name: "Put Ruler in Pencil Case", icon: "ruler", category: "organization", defaultDuration: 1 },
  { id: "take-ruler-out-of-pencil-case", name: "Take Ruler out of Pencil Case", icon: "ruler", category: "organization", defaultDuration: 1 },
  { id: "put-marker-in-pencil-case", name: "Put Marker in Pencil Case", icon: "pen", category: "organization", defaultDuration: 1 },
  { id: "take-marker-out-of-pencil-case", name: "Take Marker out of Pencil Case", icon: "pen", category: "organization", defaultDuration: 1 },
  { id: "put-compass-in-pencil-case", name: "Put Compass in Pencil Case", icon: "target", category: "organization", defaultDuration: 1 },
  { id: "take-compass-out-of-pencil-case", name: "Take Compass out of Pencil Case", icon: "target", category: "organization", defaultDuration: 1 },
  
  // Organization - Backpack
  { id: "put-pencil-case-in-backpack", name: "Put Pencil Case in Backpack", icon: "backpack", category: "organization", defaultDuration: 1 },
  { id: "take-pencil-case-out-of-backpack", name: "Take Pencil Case out of Backpack", icon: "backpack", category: "organization", defaultDuration: 1 },
  { id: "put-notebook-in-backpack", name: "Put Notebook in Backpack", icon: "backpack", category: "organization", defaultDuration: 1 },
  { id: "take-notebook-out-of-backpack", name: "Take Notebook out of Backpack", icon: "backpack", category: "organization", defaultDuration: 1 },
  
  // Evening
  { id: "night", name: "Night", icon: "moon", category: "evening", defaultDuration: 5 },
  { id: "bedtime-story", name: "Bedtime Story", icon: "book", category: "evening", defaultDuration: 15 },
  { id: "go-to-bed", name: "Go to Bed", icon: "bed", category: "evening", defaultDuration: 5 },
  
  // Rewards / Achievements
  { id: "proud-mom", name: "Proud Mom", icon: "trophy", category: "evening", defaultDuration: 5 },
  { id: "proud-mom-and-dad", name: "Proud Mom and Dad", icon: "users", category: "evening", defaultDuration: 5 },
];
