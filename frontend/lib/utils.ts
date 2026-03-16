import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getApiUrl(path: string = "") {
  const defaultProdUrl = "https://virtual-try-backend-v0o0.onrender.com";
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || defaultProdUrl;
  // Remove trailing slash from baseUrl and leading slash from path
  const cleanBase = baseUrl.replace(/\/$/, "");
  const cleanPath = path.replace(/^\//, "");

  return cleanPath ? `${cleanBase}/${cleanPath}` : cleanBase;
}
