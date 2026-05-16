import type { Metadata } from "next";
import { DynamicPageContent } from "./DynamicPageContent";
import { safeFetch, getApiUrl } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const res = await safeFetch(getApiUrl(`/api/v1/cms/${slug}`));
    if (res.ok) {
        const data = await res.json();
        const brandName = "GurucraftPro";
        return {
            title: data.title ? `${data.title} | ${brandName}` : brandName,
            description: data.meta?.description || data.tagline || "Premium Digital Studio Services",
        };
    }
  } catch (e) {}
  return { title: "GurucraftPro" };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <DynamicPageContent slug={slug} />;
}
