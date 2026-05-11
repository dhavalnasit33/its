import { API_BASE_URL } from '@/config';
import { getToken } from './authUtils';
import { useToast } from '@/hooks/use-toast';

interface ApiOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

async function apiService<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
  const { params, ...fetchOptions } = options;
  const headers = new Headers(fetchOptions.headers || {});
  const token = getToken();

  // Add token if present
  if (token) {
    headers.append('Authorization', `Bearer ${token}`);
  }

  // Handle JSON bodies
  if (!(fetchOptions.body instanceof FormData) && typeof fetchOptions.body === 'object' && fetchOptions.body !== null) {
    headers.append('Content-Type', 'application/json');
    fetchOptions.body = JSON.stringify(fetchOptions.body);
  }

  // Build URL with params
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

  const response = await fetch(url, {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch (e) {
      errorData = { message: response.statusText };
    }
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json() as Promise<T>;
  }

  return {} as Promise<T>;
}

export default apiService;
