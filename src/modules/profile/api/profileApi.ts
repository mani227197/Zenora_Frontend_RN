import type {HttpClient} from '../../../core/network';
import type {
  CurrentUser,
  UpdateSettingsInput,
  UpdateSettingsResponse,
} from '../types';

export type ProfileApi = {
  getMe(): Promise<CurrentUser>;
  updateSettings(input: UpdateSettingsInput): Promise<UpdateSettingsResponse>;
};

export function createProfileApi(httpClient: HttpClient): ProfileApi {
  return {
    getMe: () => httpClient.get<CurrentUser>('/me'),
    updateSettings: input =>
      httpClient.patch<UpdateSettingsResponse, UpdateSettingsInput>(
        '/me/settings',
        input,
      ),
  };
}
