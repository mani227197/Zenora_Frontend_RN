import type {HttpClient} from '../../../core/network';
import type {CreateLocationInput, SavedLocation} from '../types';

export type LocationsApi = {
  list(): Promise<SavedLocation[]>;
  create(input: CreateLocationInput): Promise<SavedLocation>;
};

export function createLocationsApi(httpClient: HttpClient): LocationsApi {
  return {
    list: () => httpClient.get<SavedLocation[]>('/locations'),
    create: input =>
      httpClient.post<SavedLocation, CreateLocationInput>('/locations', input),
  };
}
