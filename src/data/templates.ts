import { RoutineTemplate } from "@/types/routine";

export const ROUTINE_TEMPLATES: RoutineTemplate[] = [
  {
    id: "morning-basic",
    name: "Morning Routine",
    description: "Start the day right with this simple morning routine",
    type: "morning",
    activities: [
      { templateId: "wake-up", name: "Wake Up", icon: "sun", category: "morning", duration: 5, order: 0 },
      { templateId: "brush-teeth", name: "Brush Teeth", icon: "sparkles", category: "hygiene", duration: 3, order: 1 },
      { templateId: "get-dressed", name: "Get Dressed", icon: "shirt", category: "morning", duration: 10, order: 2 },
      { templateId: "breakfast", name: "Breakfast", icon: "coffee", category: "meals", duration: 20, order: 3 },
    ],
  },
  {
    id: "evening-basic",
    name: "Bedtime Routine",
    description: "Wind down and get ready for a good night's sleep",
    type: "evening",
    activities: [
      { templateId: "take-bath", name: "Take Bath", icon: "bath", category: "hygiene", duration: 15, order: 0 },
      { templateId: "brush-teeth", name: "Brush Teeth", icon: "sparkles", category: "hygiene", duration: 3, order: 1 },
      { templateId: "bedtime-story", name: "Bedtime Story", icon: "book", category: "evening", duration: 15, order: 2 },
      { templateId: "go-to-bed", name: "Go to Bed", icon: "bed", category: "evening", duration: 5, order: 3 },
    ],
  },
  {
    id: "morning-complete",
    name: "Complete Morning",
    description: "A thorough morning routine with everything covered",
    type: "morning",
    activities: [
      { templateId: "wake-up", name: "Wake Up", icon: "sun", category: "morning", duration: 5, order: 0 },
      { templateId: "brush-teeth", name: "Brush Teeth", icon: "sparkles", category: "hygiene", duration: 3, order: 1 },
      { templateId: "wash-hands", name: "Wash Face", icon: "sparkles", category: "hygiene", duration: 3, order: 2 },
      { templateId: "brush-hair", name: "Brush Hair", icon: "brush", category: "hygiene", duration: 5, order: 3 },
      { templateId: "get-dressed", name: "Get Dressed", icon: "shirt", category: "morning", duration: 10, order: 4 },
      { templateId: "breakfast", name: "Breakfast", icon: "coffee", category: "meals", duration: 20, order: 5 },
    ],
  },
];
