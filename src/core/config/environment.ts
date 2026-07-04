type ProcessLike = {
  env?: Record<string, string | undefined>;
};

declare const process: ProcessLike | undefined;
declare const __DEV__: boolean;

export type AppEnvironment = 'development' | 'staging' | 'qa' | 'production';

export type AppConfig = {
  appName: string;
  environment: AppEnvironment;
  apiBaseUrl: string;
  apiTimeoutMs: number;
  deepLinkScheme: string;
  deepLinkPrefixes: string[];
  featureFlagOverrides: Partial<Record<string, boolean>>;
};

const environmentBaseUrls: Record<AppEnvironment, string> = {
  development: 'http://10.0.2.2:5001',
  staging: 'https://staging-api.zenora.com',
  qa: 'https://qa-api.zenora.com',
  production: 'https://api.zenora.com',
};

function getEnvValue(key: string): string | undefined {
  return typeof process !== 'undefined' ? process.env?.[key] : undefined;
}

function toBoolean(value: string | undefined): boolean | undefined {
  if (value === undefined) {
    return undefined;
  }

  return ['1', 'true', 'yes', 'on'].includes(value.toLowerCase());
}

function normalizeEnvironment(value: string | undefined): AppEnvironment {
  if (
    value === 'development' ||
    value === 'staging' ||
    value === 'qa' ||
    value === 'production'
  ) {
    return value;
  }

  return typeof __DEV__ !== 'undefined' && __DEV__ ? 'development' : 'production';
}

const environment = normalizeEnvironment(getEnvValue('APP_ENV'));
const deepLinkScheme = getEnvValue('DEEPLINK_SCHEME') ?? 'zenora';

export const appConfig: AppConfig = {
  appName: 'Zenora',
  environment,
  apiBaseUrl: getEnvValue('API_BASE_URL') ?? environmentBaseUrls[environment],
  apiTimeoutMs: Number(getEnvValue('API_TIMEOUT_MS') ?? 15000),
  deepLinkScheme,
  deepLinkPrefixes: [
    `${deepLinkScheme}://`,
    `https://${environment === 'production' ? 'app' : environment}.zenora.com`,
  ],
  featureFlagOverrides: {
    geofencing: toBoolean(getEnvValue('ENABLE_GEOFENCING')),
    backgroundLocation: toBoolean(getEnvValue('ENABLE_BACKGROUND_LOCATION')),
    notificationTapRouting: toBoolean(getEnvValue('ENABLE_NOTIFICATION_TAPS')),
    verboseNetworkLogging: toBoolean(getEnvValue('ENABLE_VERBOSE_LOGGING')),
  },
};
