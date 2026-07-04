import type {KeyValueStorage} from '../storage';

const navigationStateKey = 'navigation.state.v1';

export type NavigationStatePersistence = {
  restoreState<TState>(): Promise<TState | undefined>;
  persistState<TState>(state: TState): Promise<void>;
  clearState(): Promise<void>;
};

export function createNavigationStatePersistence(
  storage: KeyValueStorage,
): NavigationStatePersistence {
  return {
    async restoreState() {
      const serializedState = await storage.getString(navigationStateKey);
      return serializedState ? JSON.parse(serializedState) : undefined;
    },
    async persistState(state) {
      await storage.setString(navigationStateKey, JSON.stringify(state));
    },
    clearState: () => storage.remove(navigationStateKey),
  };
}
