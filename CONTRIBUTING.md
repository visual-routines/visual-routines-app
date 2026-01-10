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

## Adding or Correcting Translations

The app uses i18next for internationalization. Translation files are located in `src/i18n/locales/`.

### Supported Languages

| Code | Language        | File |
|------|-----------------|------|
| `en` | English         | `en.json` |
| `es` | Español         | `es.json` |
| `fr` | Français        | `fr.json` |
| `nb` | Norsk Bokmål    | `nb.json` |
| `mk` | Македонски      | `mk.json` |

### Correcting Existing Translations

1. Open the appropriate locale file in `src/i18n/locales/`
2. Find the key you want to correct
3. Update the translation value

Example: Correcting a Spanish translation
```json
// In src/i18n/locales/es.json
{
  "home": {
    "createRoutine": "Crear Rutina"  // Corrected value
  }
}
```

### Adding a New Language

#### Step 1: Create the Locale File

Copy an existing locale file (e.g., `en.json`) and rename it with the appropriate language code:

```
src/i18n/locales/de.json   // German
src/i18n/locales/it.json   // Italian
src/i18n/locales/pt.json   // Portuguese
```

#### Step 2: Translate All Keys

Translate every string value in the file. The structure must remain identical to other locale files.

Key sections to translate:
- `app` - App name
- `nav` - Navigation labels
- `greeting` - Time-based greetings
- `home` - Home screen text
- `create` - Routine creation form
- `view` - Routine viewing screen
- `templates` - Templates page
- `settings` - Settings page
- `about` - About section
- `gender` - Gender selection dialog
- `categories` - Activity category names
- `activities` - All activity names (90+ items)
- `templateNames` - Template display names
- `templateDescriptions` - Template descriptions

#### Step 3: Register the Language

Update `src/i18n/index.ts`:

```typescript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import es from './locales/es.json';
import fr from './locales/fr.json';
import nb from './locales/nb.json';
import mk from './locales/mk.json';
import de from './locales/de.json';  // Add import

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
    fr: { translation: fr },
    nb: { translation: nb },
    mk: { translation: mk },
    de: { translation: de },  // Add resource
  },
  // ...
});
```

#### Step 4: Add to Language Selector

Update `src/pages/Settings.tsx` to include the new language option:

```tsx
<SelectContent>
  <SelectItem value="en">English</SelectItem>
  <SelectItem value="es">Español</SelectItem>
  <SelectItem value="fr">Français</SelectItem>
  <SelectItem value="nb">Norsk Bokmål</SelectItem>
  <SelectItem value="mk">Македонски</SelectItem>
  <SelectItem value="de">Deutsch</SelectItem>  {/* Add option */}
</SelectContent>
```

### Translation Keys Reference

| Section | Example Key | Description |
|---------|-------------|-------------|
| `nav.*` | `nav.home` | Navigation menu items |
| `greeting.*` | `greeting.morning` | Time-based greetings |
| `create.*` | `create.saveRoutine` | Routine creation UI |
| `view.*` | `view.completed` | Routine viewing UI |
| `settings.*` | `settings.theme` | Settings page UI |
| `activities.*` | `activities.brush-teeth` | Activity display names |
| `categories.*` | `categories.hygiene` | Category labels |

### Using Translations in Code

```tsx
import { useTranslation } from "react-i18next";

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t("nav.home")}</h1>
      <p>{t("create.minTotal", { duration: 15 })}</p>
    </div>
  );
}
```

### Tips for Quality Translations

1. **Keep it kid-friendly**: Use simple, friendly language appropriate for children
2. **Match context**: Consider where the text appears (buttons should be short, descriptions can be longer)
3. **Test in-app**: Always test translations in the actual app to check layout and context
4. **Preserve placeholders**: Keep `{{variable}}` placeholders intact (e.g., `{{duration}} min`)

---

## Testing Your Changes

1. Run the app locally: `npm run dev`
2. Navigate to "Create Routine" to see new activities
3. Navigate to "Templates" to see new templates
4. Navigate to "Settings" to test language switching
5. Try adding activities to a routine to ensure they work

---

## File Reference

| File | Purpose |
|------|---------|
| `src/data/activities.ts` | Activity templates and categories |
| `src/data/templates.ts` | Routine templates |
| `src/data/activityIcons.ts` | PNG icon mappings |
| `src/assets/activity-icons/` | Custom PNG icons |
| `src/types/routine.ts` | TypeScript interfaces |
| `src/i18n/index.ts` | i18next configuration |
| `src/i18n/locales/*.json` | Translation files |
