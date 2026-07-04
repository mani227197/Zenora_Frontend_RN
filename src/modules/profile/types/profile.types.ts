import type {AuthenticatedUser, UserSettings} from '../../authentication/types';

export type CurrentUser = AuthenticatedUser & {
  createdAt?: string;
  updatedAt?: string;
};

export type UpdateSettingsInput = Partial<UserSettings>;

export type UpdateSettingsResponse = {
  message: string;
  user: CurrentUser;
};
