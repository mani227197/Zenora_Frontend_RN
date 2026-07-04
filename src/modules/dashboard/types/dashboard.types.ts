import type {Habit} from '../../habits/types';
import type {Obligation} from '../../obligations/types';

export type TodayDashboard = {
  date: string;
  habits: Habit[];
  dueObligations: Obligation[];
  summary: {
    totalHabits: number;
    completedHabits: number;
    pendingObligations: number;
  };
};
