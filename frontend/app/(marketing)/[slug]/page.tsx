import type { Metadata } from "next";
import { DynamicPageContent } from "./DynamicPageContent";
import { pagesService } from "@/services/api/pages";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const data = await pagesService.getPage(slug, { skipAuth: true });
    if (data) {
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
