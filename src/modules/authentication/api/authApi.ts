import type {HttpClient} from '../../../core/network';
import type {TokenStore} from '../../../core/services/auth/tokenStore';
import type {AuthResponse, LoginInput, RegisterInput} from '../types';

export type AuthApi = {
  login(input: LoginInput): Promise<AuthResponse>;
  register(input: RegisterInput): Promise<AuthResponse>;
  logout(): Promise<void>;
};

export function createAuthApi(
  httpClient: HttpClient,
  tokenStore: TokenStore,
): AuthApi {
  async function persistSession(response: AuthResponse) {
    await tokenStore.saveTokens({accessToken: response.token});
    return response;
  }

  return {
    async login(input) {
      const response = await httpClient.post<AuthResponse, LoginInput>(
        '/auth/login',
        input,
        {authenticated: false},
      );
      return persistSession(response);
    },
    async register(input) {
      const response = await httpClient.post<AuthResponse, RegisterInput>(
        '/auth/register',
        input,
        {authenticated: false},
      );
      return persistSession(response);
    },
    logout: () => tokenStore.clear(),
  };
}
