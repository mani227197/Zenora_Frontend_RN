export const routes = {
  auth: 'Auth',
  dashboard: 'Dashboard',
  habits: 'Habits',
  obligations: 'Obligations',
  profile: 'Profile',
} as const;

export type RouteName = (typeof routes)[keyof typeof routes];

export type RootStackParamList = {
  Auth: undefined;
  Dashboard: undefined;
  Habits: {habitId?: string} | undefined;
  Obligations: {obligationId?: string} | undefined;
  Profile: undefined;
};
