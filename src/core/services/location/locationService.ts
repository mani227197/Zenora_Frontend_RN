export type LocationPermissionStatus =
  | 'unavailable'
  | 'denied'
  | 'blocked'
  | 'whenInUse'
  | 'always';

export type GeoPoint = {
  latitude: number;
  longitude: number;
};

export type GeofenceRegion = GeoPoint & {
  id: string;
  radius: number;
  name: string;
};

export type LocationService = {
  getPermissionStatus(): Promise<LocationPermissionStatus>;
  requestForegroundPermission(): Promise<LocationPermissionStatus>;
  requestBackgroundPermission(): Promise<LocationPermissionStatus>;
  startGeofencing(regions: GeofenceRegion[]): Promise<void>;
  stopGeofencing(regionIds?: string[]): Promise<void>;
};

export function createNoopLocationService(): LocationService {
  return {
    getPermissionStatus: async () => 'unavailable',
    requestForegroundPermission: async () => 'unavailable',
    requestBackgroundPermission: async () => 'unavailable',
    startGeofencing: async () => undefined,
    stopGeofencing: async () => undefined,
  };
}
