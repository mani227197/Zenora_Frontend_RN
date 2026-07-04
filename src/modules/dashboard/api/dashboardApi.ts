import type {HttpClient} from '../../../core/network';
import type {TodayDashboard} from '../types';

export type DashboardApi = {
  getToday(): Promise<TodayDashboard>;
};

export function createDashboardApi(httpClient: HttpClient): DashboardApi {
  return {
    getToday: () => httpClient.get<TodayDashboard>('/dashboard/today'),
  };
}
