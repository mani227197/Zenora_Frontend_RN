export type UserSettings = {
  reminderEnabled: boolean;
  morningReminderTime: string;
  eveningReminderTime: string;
  currency: string;
};

export type AuthenticatedUser = {
  id: string;
  name: string;
  email: string;
  settings: UserSettings;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type RegisterInput = LoginInput & {
  name: string;
};

export type AuthResponse = {
  message: string;
  token: string;
  user: AuthenticatedUser;
};
