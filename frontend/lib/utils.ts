import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getApiUrl(path: string = "") {
  let baseUrl = process.env.NEXT_PUBLIC_API_URL || "";

  const isServer = typeof window === 'undefined';
  
  // Detect if we are running in a production/live deployment
  let isProductionEnv = false;
  
  if (!isServer) {
    const host = window.location.hostname;
    isProductionEnv = host !== 'localhost' && host !== '127.0.0.1';
  } else {
    // On Server-side, Vercel sets VERCEL_URL for all deployments.
    // If it is present, or NODE_ENV is production, we are in production environment.
    const isVercel = !!process.env.VERCEL_URL;
    const isProdNode = process.env.NODE_ENV === 'production';
    isProductionEnv = isVercel || isProdNode;
  }

  // Fail-safe override: If running in production but the API URL points to localhost or is empty,
  // dynamically route all requests to the live backend.
  if (isProductionEnv) {
    if (!baseUrl || baseUrl.includes('localhost') || baseUrl.includes('127.0.0.1')) {
      baseUrl = "https://gurucraft-pro-backend.vercel.app";
    }
  }

  // Ensure absolute URL on server-side if baseUrl is relative
  if (isServer && !baseUrl.startsWith('http')) {
    const vUrl = process.env.VERCEL_URL;
    if (vUrl) {
      baseUrl = `https://${vUrl}${baseUrl.startsWith('/') ? '' : '/'}${baseUrl}`;
    } else {
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
      cache: "no-store",
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
  return fetch(url, { 
    cache: "no-store",
    credentials: "include",
    ...options, 
    headers 
  });
}
