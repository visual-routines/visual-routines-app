import { Routine } from "@/types/routine";
import { getRoutines, saveRoutine } from "@/lib/storage";

const getTodayDate = (): string => {
  return new Date().toISOString().split("T")[0];
};

export const checkAndResetRecurringRoutine = (routine: Routine): Routine => {
  if (!routine.recurring) return routine;

  const today = getTodayDate();
  
  // If already reset today, no change needed
  if (routine.lastResetDate === today) return routine;

  // Reset all activities and update lastResetDate
  const updatedRoutine: Routine = {
    ...routine,
    activities: routine.activities.map((a) => ({ ...a, completed: false })),
    lastResetDate: today,
  };

  saveRoutine(updatedRoutine);
  return updatedRoutine;
};

export const checkAndResetAllRecurringRoutines = (): void => {
  const routines = getRoutines();
  const today = getTodayDate();

  routines.forEach((routine) => {
    if (routine.recurring && routine.lastResetDate !== today) {
      const updatedRoutine: Routine = {
        ...routine,
        activities: routine.activities.map((a) => ({ ...a, completed: false })),
        lastResetDate: today,
      };
      saveRoutine(updatedRoutine);
    }
  });
};
