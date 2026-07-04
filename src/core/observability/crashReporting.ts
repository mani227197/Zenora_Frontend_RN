export type CrashReporter = {
  setUser(userId: string | null): void;
  setAttribute(key: string, value: string): void;
  recordError(error: Error, context?: Record<string, unknown>): void;
};

export function createNoopCrashReporter(): CrashReporter {
  return {
    setUser: () => undefined,
    setAttribute: () => undefined,
    recordError: () => undefined,
  };
}
