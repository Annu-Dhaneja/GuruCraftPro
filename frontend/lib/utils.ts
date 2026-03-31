import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getApiUrl(path: string = "") {
  const defaultProdUrl = "https://virtual-trys.onrender.com";
  let baseUrl = process.env.NEXT_PUBLIC_API_URL || defaultProdUrl;

  // Ensure absolute URL on server-side if baseUrl is relative
  if (typeof window === 'undefined' && !baseUrl.startsWith('http')) {
    // In Vercel environment, we can use VERCEL_URL but it doesn't include protocol
    const vUrl = process.env.VERCEL_URL;
    if (vUrl) {
      baseUrl = `https://${vUrl}${baseUrl.startsWith('/') ? '' : '/'}${baseUrl}`;
    } else {
      // Fallback for local server-side if no VERCEL_URL
      baseUrl = defaultProdUrl;
    }
  }

  // Remove trailing slash from baseUrl and leading slash from path
  const cleanBase = baseUrl.replace(/\/$/, "");
  const cleanPath = path.replace(/^\//, "");

  return cleanPath ? `${cleanBase}/${cleanPath}` : cleanBase;
}
