export type KeyValueStorage = {
  getString(key: string): Promise<string | null>;
  setString(key: string, value: string): Promise<void>;
  remove(key: string): Promise<void>;
};

export class InMemoryStorage implements KeyValueStorage {
  private values = new Map<string, string>();

  async getString(key: string) {
    return this.values.get(key) ?? null;
  }

  async setString(key: string, value: string) {
    this.values.set(key, value);
  }

  async remove(key: string) {
    this.values.delete(key);
  }
}
