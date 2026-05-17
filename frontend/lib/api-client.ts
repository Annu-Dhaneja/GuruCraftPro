import { getApiUrl } from "./utils";

export interface ApiClientOptions extends RequestInit {
  timeout?: number;
  retries?: number;
  skipAuth?: boolean;
}

export class ApiError extends Error {
  status: number;
  statusText: string;
  data: any;

  constructor(status: number, statusText: string, data: any, message?: string) {
    super(message || `API Error: ${status} ${statusText}`);
    this.name = "ApiError";
    this.status = status;
    this.statusText = statusText;
    this.data = data;
  }
}

/**
 * Robust centralized fetch client for all API interactions.
 * Features:
 * - Auth Token Injection
 * - Standardized Error Handling & Response Normalization
 * - Fail-safe Request Timeout Aborts
 * - Automated Retries with Exponential Backoff for Network/Server Glitches
 */
export async function apiClient<T = any>(
  path: string,
  options: ApiClientOptions = {}
): Promise<T> {
  const { timeout = 8000, retries = 2, skipAuth = false, ...fetchOptions } = options;
  const url = getApiUrl(path);

  const headers: Record<string, string> = {
    ...((fetchOptions.headers as Record<string, string>) || {}),
  };

  // 1. Auth token injection
  if (!skipAuth && typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  // 2. Set default content type if payload is present and not FormData/URLSearchParams
  if (fetchOptions.body && !(fetchOptions.body instanceof FormData) && !(fetchOptions.body instanceof URLSearchParams)) {
    headers["Content-Type"] = headers["Content-Type"] || "application/json";
  }

  let attempt = 0;
  while (attempt <= retries) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        cache: "no-store",
        credentials: "include",
        ...fetchOptions,
        headers,
        signal: controller.signal,
      });

      clearTimeout(id);

      // Handle HTTP errors
      if (!response.ok) {
        let errorData = null;
        try {
          errorData = await response.json();
        } catch (_) {
          // Response body was not JSON
        }
        throw new ApiError(response.status, response.statusText, errorData);
      }

      // 3. Response Normalization: parse JSON if content-type matches, otherwise text
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return (await response.json()) as T;
      }
      return (await response.text()) as unknown as T;
    } catch (error: any) {
      clearTimeout(id);
      attempt++;

      const isAbort = error.name === "AbortError";
      const isRetryable =
        isAbort ||
        error.status === 408 ||
        error.status === 502 ||
        error.status === 503 ||
        error.status === 504;

      // If we have exhausted all retries or error is non-retryable (e.g. 400, 401, 403, 404), throw
      if (attempt > retries || !isRetryable) {
        if (isAbort) {
          console.error(`[API Client] Fetch timed out for URL: ${url} after ${timeout}ms`);
        } else {
          console.error(`[API Client] Fetch error for URL: ${url}:`, error.message || error);
        }
        throw error;
      }

      const backoffTime = attempt * 1000;
      console.warn(
        `[API Client] Temporary issue. Retrying fetch to ${url} (Attempt ${attempt}/${retries}) in ${backoffTime}ms...`
      );
      await new Promise((resolve) => setTimeout(resolve, backoffTime));
    }
  }

  throw new Error("[API Client] Request failed after maximum retry attempts.");
}
