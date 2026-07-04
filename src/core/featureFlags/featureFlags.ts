import type {AppConfig} from '../config';

export type FeatureFlagKey =
  | 'backgroundLocation'
  | 'geofencing'
  | 'notificationTapRouting'
  | 'offlineRetryQueue'
  | 'todayRecommendations'
  | 'verboseNetworkLogging';

export type FeatureFlagService = {
  isEnabled(key: FeatureFlagKey): boolean;
  getAll(): Record<FeatureFlagKey, boolean>;
};

const defaultFlags: Record<FeatureFlagKey, boolean> = {
  backgroundLocation: true,
  geofencing: true,
  notificationTapRouting: true,
  offlineRetryQueue: true,
  todayRecommendations: true,
  verboseNetworkLogging: false,
};

export function createFeatureFlagService(
  config: AppConfig,
): FeatureFlagService {
  const flags = {
    ...defaultFlags,
    ...config.featureFlagOverrides,
  };

  return {
    isEnabled: key => flags[key],
    getAll: () => ({...flags}),
  };
}
