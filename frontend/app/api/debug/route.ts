import { NextResponse } from "next/server";

export async function GET() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "NOT_SET";
  const vercelUrl = process.env.VERCEL_URL || "NOT_SET";
  const nodeEnv = process.env.NODE_ENV || "NOT_SET";
  
  // Try to fetch from the backend
  let backendStatus = "unknown";
  try {
    const res = await fetch(`${apiUrl}/health`, { 
      cache: "no-store",
      signal: AbortSignal.timeout(5000)
    });
    if (res.ok) {
      const data = await res.json();
      backendStatus = JSON.stringify(data);
    } else {
      backendStatus = `HTTP ${res.status} ${res.statusText}`;
    }
  } catch (e: any) {
    backendStatus = `Error: ${e.message}`;
  }

  return NextResponse.json({
    NEXT_PUBLIC_API_URL: apiUrl,
    VERCEL_URL: vercelUrl,
    NODE_ENV: nodeEnv,
    backendStatus,
    timestamp: new Date().toISOString(),
  });
}
