# Contributing: Adding Activities and Templates

This guide explains how to add new activities and routine templates to the Visual Routines app.

## Adding New Activities

Activities are defined in `src/data/activities.ts`.

### Step 1: Add the Activity Icon (Optional)

If using a custom PNG icon:
1. Add your icon image to `src/assets/activity-icons/`
2. Update `src/data/activityIcons.ts` to map the icon

If using a Lucide icon:
1. Import the icon at the top of `src/data/activities.ts`
2. Add it to the `ACTIVITY_ICONS` object

```typescript
// Example: Adding a new Lucide icon
import { Camera } from "lucide-react";

export const ACTIVITY_ICONS = {
  // ... existing icons
  camera: Camera,
};
```

### Step 2: Add the Activity Template

Add your activity to the `ACTIVITY_TEMPLATES` array:

```typescript
export const ACTIVITY_TEMPLATES: ActivityTemplate[] = [
  // ... existing activities
  
  // Your new activity
  { 
    id: "take-photo",           // Unique identifier (kebab-case)
    name: "Take Photo",          // Display name
    icon: "camera",              // Icon key from ACTIVITY_ICONS
    category: "play",            // One of the ActivityCategory values
    defaultDuration: 5           // Duration in minutes
  },
];
```

### Available Categories

| Category       | Description                    |
|----------------|--------------------------------|
| `morning`      | Wake up, time indicators       |
| `hygiene`      | Brushing teeth, washing, bath  |
| `meals`        | Breakfast, lunch, snacks       |
| `play`         | Games, outdoor, screen time    |
| `learning`     | Homework, reading, exams       |
| `evening`      | Bedtime, night routines        |
| `clothing`     | Getting dressed, shoes, etc.   |
| `school`       | School desk, finding items     |
| `organization` | Pencil case, backpack packing  |

### Step 3: Add Category Styling (If New Category)

If you're adding a new category, update these objects:

```typescript
// In src/data/activities.ts
export const CATEGORY_COLORS: Record<ActivityCategory, string> = {
  // ... existing
  newcategory: "bg-newcategory",
};

export const CATEGORY_LABELS: Record<ActivityCategory, string> = {
  // ... existing
  newcategory: "New Category",
};
```

Then add the color in `src/index.css`:
```css
.bg-newcategory {
  @apply bg-purple-100;
}
```

---

## Adding New Routine Templates

Templates are defined in `src/data/templates.ts`.

### Template Structure

```typescript
import { RoutineTemplate } from "@/types/routine";

export const ROUTINE_TEMPLATES: RoutineTemplate[] = [
  {
    id: "my-new-routine",                    // Unique identifier
    name: "My New Routine",                   // Display name
    description: "A helpful description",     // Shown in template picker
    type: "morning",                          // "morning" or "evening"
    activities: [
      { 
        templateId: "wake-up",                // Must match an activity id
        name: "Wake Up",                      // Display name
        icon: "sun",                          // Icon key
        category: "morning",                  // Activity category
        duration: 5,                          // Duration in minutes
        order: 0                              // Order in routine (0-indexed)
      },
      // Add more activities...
    ],
  },
];
```

### Important Notes

1. **templateId must exist**: The `templateId` should match an `id` from `ACTIVITY_TEMPLATES` for consistency
2. **Order matters**: Use sequential `order` values starting from 0
3. **Category consistency**: Use the same category as defined in `ACTIVITY_TEMPLATES`

### Example: Adding a "Getting Ready for School" Template

```typescript
{
  id: "school-prep",
  name: "Getting Ready for School",
  description: "Everything needed before leaving for school",
  type: "morning",
  activities: [
    { templateId: "wake-up", name: "Wake Up", icon: "sun", category: "morning", duration: 5, order: 0 },
    { templateId: "brush-teeth", name: "Brush Teeth", icon: "sparkles", category: "hygiene", duration: 3, order: 1 },
    { templateId: "get-dressed", name: "Get Dressed", icon: "shirt", category: "clothing", duration: 10, order: 2 },
    { templateId: "breakfast", name: "Breakfast", icon: "coffee", category: "meals", duration: 20, order: 3 },
    { templateId: "find-school-backpack", name: "Find Backpack", icon: "search", category: "school", duration: 2, order: 4 },
  ],
}
```

---

## Testing Your Changes

1. Run the app locally: `npm run dev`
2. Navigate to "Create Routine" to see new activities
3. Navigate to "Templates" to see new templates
4. Try adding activities to a routine to ensure they work

---

## File Reference

| File | Purpose |
|------|---------|
| `src/data/activities.ts` | Activity templates and categories |
| `src/data/templates.ts` | Routine templates |
| `src/data/activityIcons.ts` | PNG icon mappings |
| `src/assets/activity-icons/` | Custom PNG icons |
| `src/types/routine.ts` | TypeScript interfaces |
