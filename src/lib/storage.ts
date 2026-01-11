import { Routine, Activity } from "@/types/routine";

const STORAGE_KEY = "kids-routines";
const DRAFT_KEY = "routine-draft";

export interface RoutineDraft {
  name: string;
  activities: Activity[];
  recurring: boolean;
  updatedAt: string;
}

export const getRoutines = (): Routine[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveRoutine = (routine: Routine): void => {
  const routines = getRoutines();
  const existingIndex = routines.findIndex((r) => r.id === routine.id);
  
  if (existingIndex >= 0) {
    routines[existingIndex] = { ...routine, updatedAt: new Date().toISOString() };
  } else {
    routines.push(routine);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(routines));
};

export const deleteRoutine = (id: string): void => {
  const routines = getRoutines().filter((r) => r.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(routines));
};

export const getRoutineById = (id: string): Routine | undefined => {
  return getRoutines().find((r) => r.id === id);
};

// Draft management
export const saveDraft = (draft: RoutineDraft): void => {
  localStorage.setItem(DRAFT_KEY, JSON.stringify({ ...draft, updatedAt: new Date().toISOString() }));
};

export const getDraft = (): RoutineDraft | null => {
  try {
    const data = localStorage.getItem(DRAFT_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

export const clearDraft = (): void => {
  localStorage.removeItem(DRAFT_KEY);
};
