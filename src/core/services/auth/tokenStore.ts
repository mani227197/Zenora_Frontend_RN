import type {KeyValueStorage} from '../../storage';

const accessTokenKey = 'auth.accessToken';
const refreshTokenKey = 'auth.refreshToken';

export type TokenPair = {
  accessToken: string;
  refreshToken?: string;
};

export type TokenStore = {
  getAccessToken(): Promise<string | null>;
  getRefreshToken(): Promise<string | null>;
  saveTokens(tokens: TokenPair): Promise<void>;
  clear(): Promise<void>;
};

export function createTokenStore(storage: KeyValueStorage): TokenStore {
  return {
    getAccessToken: () => storage.getString(accessTokenKey),
    getRefreshToken: () => storage.getString(refreshTokenKey),
    async saveTokens(tokens) {
      await storage.setString(accessTokenKey, tokens.accessToken);

      if (tokens.refreshToken) {
        await storage.setString(refreshTokenKey, tokens.refreshToken);
      }
    },
    async clear() {
      await Promise.all([
        storage.remove(accessTokenKey),
        storage.remove(refreshTokenKey),
      ]);
    },
  };
}
