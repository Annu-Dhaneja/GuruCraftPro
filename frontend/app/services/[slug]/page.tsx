import type { Metadata } from "next";
import { ServiceTemplate } from "@/components/services/ServiceTemplate";
import { Footer } from "@/components/footer/Footer";
import { getApiUrl } from "@/lib/utils";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const formatTitle = (s: string) => (s || "Service").split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  return {
    title: `${formatTitle(slug)} | Gurucraftpro`,
    description: `Premium ${formatTitle(slug)} services by Gurucraftpro Design Studio.`
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  let serviceData: any = null;
  let fetchError = false;
  const { slug } = await params;

  try {
    const url = getApiUrl(`/api/v1/cms/${slug}`);
    console.log(`[CMS] Fetching content for service: ${slug} from: ${url}`);
    
    const res = await fetch(url, {
      cache: 'no-store',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (res.ok) {
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            serviceData = await res.json();
            console.log(`[CMS] Successfully fetched content for ${slug}`);
        } else {
            console.warn(`[CMS] Expected JSON but got ${contentType}`);
            fetchError = true;
        }
    } else {
        console.error(`[CMS] Failed to fetch content for ${slug}: ${res.status} ${res.statusText}`);
        if (res.status === 404) return notFound();
        fetchError = true;
    }
  } catch (error) {
    console.error(`Failed to fetch service content for ${slug}:`, error);
    fetchError = true;
  }

  // Default structure for sub-components to prevent crashes
  const safeData = serviceData || {};

  return (
    <main className="flex min-h-screen flex-col pt-16">
        {fetchError && (
            <div className="bg-yellow-500/10 border-b border-yellow-500/20 py-2 text-center text-sm text-yellow-600 dark:text-yellow-400">
                Running in offline/fallback mode. Some sections may show default content.
            </div>
        )}
        
        <ServiceTemplate data={safeData} />
        <Footer />
    </main>
  );
}
