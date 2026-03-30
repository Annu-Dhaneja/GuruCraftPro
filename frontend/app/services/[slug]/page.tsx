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
  const { slug } = await params;

  try {
    const res = await fetch(getApiUrl(`/api/v1/cms/${slug}`), {
      cache: 'no-store'
    });
    if (res.ok) {
      serviceData = await res.json();
      console.log(`[CMS] Fetched content for ${slug}:`, serviceData ? "SUCCESS" : "EMPTY");
    } else {
        console.error(`[CMS] Failed to fetch content for ${slug}: ${res.status}`);
        return notFound();
    }
  } catch (error) {
    console.error(`Failed to fetch service content for ${slug}:`, error);
    return notFound();
  }

  return (
    <main className="flex min-h-screen flex-col">
      <ServiceTemplate data={serviceData} />
      <Footer />
    </main>
  );
}
