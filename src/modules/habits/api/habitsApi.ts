import type {HttpClient} from '../../../core/network';
import type {
  CreateHabitInput,
  Habit,
  HabitStatus,
  UpdateHabitInput,
} from '../types';

export type HabitsApi = {
  list(): Promise<Habit[]>;
  create(input: CreateHabitInput): Promise<Habit>;
  update(habitId: string, input: UpdateHabitInput): Promise<Habit>;
  updateStatus(habitId: string, todayStatus: HabitStatus): Promise<Habit>;
};

export function createHabitsApi(httpClient: HttpClient): HabitsApi {
  return {
    list: () => httpClient.get<Habit[]>('/habits'),
    create: input => httpClient.post<Habit, CreateHabitInput>('/habits', input),
    update: (habitId, input) =>
      httpClient.put<Habit, UpdateHabitInput>(`/habits/${habitId}`, input),
    updateStatus: (habitId, todayStatus) =>
      httpClient.patch<Habit, {todayStatus: HabitStatus}>(
        `/habits/${habitId}/status`,
        {todayStatus},
      ),
  };
}
