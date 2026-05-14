import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getApiUrl(path: string = "") {
  let baseUrl = process.env.NEXT_PUBLIC_API_URL || "";

  // Ensure absolute URL on server-side if baseUrl is relative
  if (typeof window === 'undefined' && !baseUrl.startsWith('http')) {
    // In Vercel environment, we can use VERCEL_URL but it doesn't include protocol
    const vUrl = process.env.VERCEL_URL;
    if (vUrl) {
      baseUrl = `https://${vUrl}${baseUrl.startsWith('/') ? '' : '/'}${baseUrl}`;
    } else {
      // Fallback for local server-side if no VERCEL_URL
      baseUrl = "";
    }
  }

  // Remove trailing slash from baseUrl and leading slash from path
  const cleanBase = baseUrl.replace(/\/$/, "");
  const cleanPath = path.replace(/^\//, "");

  return cleanPath ? `${cleanBase}/${cleanPath}` : cleanBase;
}

export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export function unslugify(slug: string) {
  const specialCases: Record<string, string> = {
    "guru-ji-art": "GURU JI ART",
    "vantage-ecom": "VANTAGE ECOM",
    "7-day-cloths": "7 DAY CLOTHS",
    "game-design": "GAME DESIGN",
    "wedding-plan": "WEDDING PLAN",
    "photo-editor": "PHOTO EDITOR"
  };

  if (specialCases[slug.toLowerCase()]) return specialCases[slug.toLowerCase()];

  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export async function safeFetch(url: string, options: RequestInit = {}, timeout = 8000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error: unknown) {
    clearTimeout(id);
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (error instanceof Error && error.name === 'AbortError') {
      console.warn(`[CMS] Fetch timed out for URL: ${url} after ${timeout}ms`);
    } else {
      console.error(`[CMS] Fetch error for URL: ${url}:`, errorMessage);
    }
    return {
      ok: false,
      status: 408,
      statusText: 'Request Timeout',
      json: async () => ({}),
      headers: new Headers(),
    } as Response;
  }
}

/**
 * Reusable authenticated fetch wrapper.
 * Automatically injects the JWT token from localStorage.
 * Use this for all admin/protected API calls to avoid duplicate code.
 */
export async function fetchWithAuth(
  path: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
  const url = getApiUrl(path);
  const headers: Record<string, string> = {
    ...((options.headers as Record<string, string>) || {}),
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  // Only set Content-Type for non-FormData bodies
  if (options.body && !(options.body instanceof FormData)) {
    headers["Content-Type"] = headers["Content-Type"] || "application/json";
  }
  return fetch(url, { ...options, headers });
}
