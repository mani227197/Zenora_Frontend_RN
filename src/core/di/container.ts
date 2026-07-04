import {appConfig, type AppConfig} from '../config';
import {createFeatureFlagService, type FeatureFlagService} from '../featureFlags';
import {createHttpClient, type HttpClient} from '../network';
import {
  createConsoleLogger,
  createNoopAnalytics,
  createNoopCrashReporter,
  type Analytics,
  type CrashReporter,
  type Logger,
} from '../observability';
import {createTokenStore, type TokenStore} from '../services/auth/tokenStore';
import {
  createNoopLocationService,
  type LocationService,
} from '../services/location';
import {
  createNoopNotificationService,
  type NotificationService,
} from '../services/notifications';
import {InMemoryStorage, type KeyValueStorage} from '../storage';
import {
  createLinkingConfig,
  createNavigationStatePersistence,
  type NavigationStatePersistence,
} from '../navigation';
import {createAuthApi, type AuthApi} from '../../modules/authentication/api/authApi';
import {
  createDashboardApi,
  type DashboardApi,
} from '../../modules/dashboard/api/dashboardApi';
import {createHabitsApi, type HabitsApi} from '../../modules/habits/api/habitsApi';
import {
  createLocationsApi,
  type LocationsApi,
} from '../../modules/locations/api/locationsApi';
import {
  createObligationsApi,
  type ObligationsApi,
} from '../../modules/obligations/api/obligationsApi';
import {createProfileApi, type ProfileApi} from '../../modules/profile/api/profileApi';

export type AppContainer = {
  config: AppConfig;
  logger: Logger;
  analytics: Analytics;
  crashReporter: CrashReporter;
  storage: KeyValueStorage;
  tokenStore: TokenStore;
  httpClient: HttpClient;
  featureFlags: FeatureFlagService;
  locationService: LocationService;
  notificationService: NotificationService;
  navigationPersistence: NavigationStatePersistence;
  linking: ReturnType<typeof createLinkingConfig>;
  api: {
    auth: AuthApi;
    dashboard: DashboardApi;
    habits: HabitsApi;
    locations: LocationsApi;
    obligations: ObligationsApi;
    profile: ProfileApi;
  };
};

export function createAppContainer(
  overrides: Partial<Pick<AppContainer, 'config' | 'storage' | 'logger'>> = {},
): AppContainer {
  const config = overrides.config ?? appConfig;
  const logger = overrides.logger ?? createConsoleLogger(config);
  const storage = overrides.storage ?? new InMemoryStorage();
  const analytics = createNoopAnalytics();
  const crashReporter = createNoopCrashReporter();
  const tokenStore = createTokenStore(storage);
  const httpClient = createHttpClient(config, logger, tokenStore);

  return {
    config,
    logger,
    analytics,
    crashReporter,
    storage,
    tokenStore,
    httpClient,
    featureFlags: createFeatureFlagService(config),
    locationService: createNoopLocationService(),
    notificationService: createNoopNotificationService(),
    navigationPersistence: createNavigationStatePersistence(storage),
    linking: createLinkingConfig(config),
    api: {
      auth: createAuthApi(httpClient, tokenStore),
      dashboard: createDashboardApi(httpClient),
      habits: createHabitsApi(httpClient),
      locations: createLocationsApi(httpClient),
      obligations: createObligationsApi(httpClient),
      profile: createProfileApi(httpClient),
    },
  };
}

export const appContainer = createAppContainer();
