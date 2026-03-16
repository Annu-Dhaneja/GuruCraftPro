export function getApiUrl(path: string = "") {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL as string;

  const cleanBase = baseUrl.replace(/\/$/, "");
  const cleanPath = path.replace(/^\//, "");

  return cleanPath ? `${cleanBase}/${cleanPath}` : cleanBase;
}
