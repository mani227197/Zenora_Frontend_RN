export type AnalyticsEvent =
  | 'app_opened'
  | 'deep_link_opened'
  | 'login_submitted'
  | 'habit_created'
  | 'obligation_marked_paid'
  | 'notification_tapped'
  | 'geofence_entered';

export type Analytics = {
  identify(userId: string, traits?: Record<string, unknown>): void;
  track(event: AnalyticsEvent, properties?: Record<string, unknown>): void;
  reset(): void;
};

export function createNoopAnalytics(): Analytics {
  return {
    identify: () => undefined,
    track: () => undefined,
    reset: () => undefined,
  };
}
