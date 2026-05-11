const TTL_MS = 15 * 24 * 60 * 60 * 1000;

interface CacheEntry<T> {
  data: T;
  savedAt: number;
  expiresAt: number;
}

export function cacheRead<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;

    const entry: CacheEntry<T> = JSON.parse(raw);
    if (Date.now() > entry.expiresAt) {
      localStorage.removeItem(key);
      return null;
    }
    return entry.data;
  } catch {
    return null;
  }
}

export function cacheWrite<T>(key: string, data: T): void {
  if (typeof window === "undefined") return;
  try {
    const entry: CacheEntry<T> = {
      data,
      savedAt: Date.now(),
      expiresAt: Date.now() + TTL_MS,
    };
    localStorage.setItem(key, JSON.stringify(entry));
  } catch {}
}

export function cacheDelete(key: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(key);
  } catch {}
}

export function cacheKey(
  endpoint: string,
  params?: Record<string, string | number | boolean | undefined>,
): string {
  if (!params) return `api_cache:${endpoint}`;
  const sorted = Object.entries(params)
    .filter(([, v]) => v !== undefined)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${v}`)
    .join("&");
  return `api_cache:${endpoint}${sorted ? `?${sorted}` : ""}`;
}
