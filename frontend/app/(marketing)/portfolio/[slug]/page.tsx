import type { Metadata } from "next";
import { PortfolioProjectTemplate } from "@/components/portfolio/PortfolioProjectTemplate";
import { getApiUrl, safeFetch } from "@/lib/utils";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const res = await safeFetch(getApiUrl(`/api/v1/cms/portfolio/${slug}`), { cache: 'no-store' }, 5000);
    if (res.ok) {
        const data = await res.json();
        const brandName = "GurucraftPro";
        return {
            title: `${data.title} | Portfolio`,
            description: data.description || `Explore our collection of elite design work.`,
        };
    }
  } catch (e) {}
  return { title: "Portfolio Project | GurucraftPro" };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let projectData: any = null;
  let related: any[] = [];

  try {
    const url = getApiUrl(`/api/v1/cms/portfolio/${slug}`);
    const res = await safeFetch(url, { cache: 'no-store' }, 8000);
    
    if (res.ok) {
        const data = await res.json();
        projectData = data.project || data;
        related = data.related || [];
    } else if (res.status === 404) {
        return notFound();
    }
  } catch (error) {
    console.error(`Failed to fetch project ${slug}:`, error);
  }

  if (!projectData) return notFound();

  return <PortfolioProjectTemplate project={projectData} relatedProjects={related} />;
}
