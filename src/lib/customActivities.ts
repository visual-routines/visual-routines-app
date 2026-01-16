import { CustomActivity } from "@/types/customActivity";

const CUSTOM_ACTIVITIES_KEY = "custom-activities";

export const getCustomActivities = (): CustomActivity[] => {
  try {
    const data = localStorage.getItem(CUSTOM_ACTIVITIES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveCustomActivity = (activity: CustomActivity): void => {
  const activities = getCustomActivities();
  const existingIndex = activities.findIndex((a) => a.id === activity.id);

  if (existingIndex >= 0) {
    activities[existingIndex] = activity;
  } else {
    activities.push(activity);
  }

  localStorage.setItem(CUSTOM_ACTIVITIES_KEY, JSON.stringify(activities));
};

export const deleteCustomActivity = (id: string): void => {
  const activities = getCustomActivities().filter((a) => a.id !== id);
  localStorage.setItem(CUSTOM_ACTIVITIES_KEY, JSON.stringify(activities));
};

export const getCustomActivityById = (id: string): CustomActivity | undefined => {
  return getCustomActivities().find((a) => a.id === id);
};

export const clearAllCustomActivities = (): void => {
  localStorage.removeItem(CUSTOM_ACTIVITIES_KEY);
};
