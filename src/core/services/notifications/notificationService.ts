export type NotificationPermissionStatus =
  | 'unavailable'
  | 'denied'
  | 'blocked'
  | 'granted'
  | 'provisional';

export type ScheduleNotificationInput = {
  id: string;
  title: string;
  body: string;
  fireDate: string;
  data?: Record<string, string>;
};

export type NotificationService = {
  getPermissionStatus(): Promise<NotificationPermissionStatus>;
  requestPermission(): Promise<NotificationPermissionStatus>;
  schedule(input: ScheduleNotificationInput): Promise<void>;
  cancel(id: string): Promise<void>;
};

export function createNoopNotificationService(): NotificationService {
  return {
    getPermissionStatus: async () => 'unavailable',
    requestPermission: async () => 'unavailable',
    schedule: async () => undefined,
    cancel: async () => undefined,
  };
}
