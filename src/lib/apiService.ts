import { API_BASE_URL } from "@/config";
import { cacheKey, cacheRead, cacheWrite } from "@/lib/localStorageCache";

interface ApiOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
  bypassCacheRead?: boolean;
}

const CACHED_ENDPOINTS: string[] = [
  "/testimonials",
  "/engagement-model",
  "/expertise-industries",
  "/creative-work",
  "/read-our-review",
  "/yoast-seo/public",
  "/website-settings",
];

function shouldCache(endpoint: string): boolean {
  return CACHED_ENDPOINTS.some((e) => endpoint === e || endpoint.startsWith(e));
}

const inFlightGetRequests = new Map<string, Promise<unknown>>();

async function apiService<T>(
  endpoint: string,
  options: ApiOptions = {},
): Promise<T> {
  const { params, ...fetchOptions } = options;
  const headers = new Headers(fetchOptions.headers || {});

  if (
    !(fetchOptions.body instanceof FormData) &&
    typeof fetchOptions.body === "object" &&
    fetchOptions.body !== null
  ) {
    headers.append("Content-Type", "application/json");
    fetchOptions.body = JSON.stringify(fetchOptions.body);
  }

  let url = `${API_BASE_URL}${endpoint}`;
  if (params) {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, String(value));
      }
    });
    if (queryParams.toString()) {
      url += `?${queryParams.toString()}`;
    }
  }

  const method = (fetchOptions.method || "GET").toUpperCase();
  const isGet = method === "GET";

  if (isGet && shouldCache(endpoint) && !options.bypassCacheRead) {
    const key = cacheKey(
      endpoint,
      params as Record<string, string | number | boolean | undefined>,
    );
    const cached = cacheRead<T>(key);
    if (cached !== null) {
      return cached;
    }
  }

  const requestKey = `${method}:${url}`;
  if (isGet && inFlightGetRequests.has(requestKey)) {
    return inFlightGetRequests.get(requestKey) as Promise<T>;
  }

  const requestPromise = (async (): Promise<T> => {
    const response = await fetch(url, {
      ...fetchOptions,
      headers,
    });

    if (!response.ok) {
      let errorData: any;
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: response.statusText };
      }
      throw new Error(
        errorData?.message || `HTTP error! status: ${response.status}`,
      );
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = (await response.json()) as T;

      if (isGet && shouldCache(endpoint)) {
        const key = cacheKey(
          endpoint,
          params as Record<string, string | number | boolean | undefined>,
        );
        cacheWrite(key, data);
      }

      return data;
    }

    return null as T;
  })();

  if (isGet) {
    inFlightGetRequests.set(requestKey, requestPromise as Promise<unknown>);
    requestPromise.finally(() => {
      inFlightGetRequests.delete(requestKey);
    });
  }

  return requestPromise;
}

export default apiService;
