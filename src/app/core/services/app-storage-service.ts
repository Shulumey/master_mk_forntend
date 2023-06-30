export interface AppStorageService {
  get<T>(key: string): T | null;

  set<T>(key: string, val: T): void
}
