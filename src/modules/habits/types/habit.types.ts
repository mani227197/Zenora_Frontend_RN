export type HabitFrequency = 'daily' | 'weekly';
export type HabitTimeOfDay = 'morning' | 'afternoon' | 'evening' | 'anytime';
export type HabitStatus = 'pending' | 'done' | 'skipped';

export type Habit = {
  _id: string;
  userId: string;
  title: string;
  frequency: HabitFrequency;
  timeOfDay: HabitTimeOfDay;
  locationId: string | null;
  isActive: boolean;
  todayStatus: HabitStatus;
  createdAt: string;
  updatedAt: string;
};

export type CreateHabitInput = {
  title: string;
  frequency?: HabitFrequency;
  timeOfDay?: HabitTimeOfDay;
  locationId?: string | null;
};

export type UpdateHabitInput = Partial<CreateHabitInput> & {
  isActive?: boolean;
};
