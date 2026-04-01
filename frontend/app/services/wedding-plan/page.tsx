import type { Metadata } from "next";
import { WeddingPlanContent } from "@/components/services/WeddingPlanContent";
import { Footer } from "@/components/footer/Footer";
import { getApiUrl } from "@/lib/utils";

export const dynamic = 'force-dynamic';


export async function generateMetadata(): Promise<Metadata> {
    try {
        const res = await fetch(getApiUrl("/api/v1/cms/wedding-plan"), { cache: 'no-store' });
        if (res.ok) {
            const data = await res.json();
            if (data.meta) {
                return {
                    title: data.meta.title || "Luxury Wedding Planning | Annu Design Studio",
                    description: data.meta.description || "Experience the epitome of elegance with our bespoke wedding planning services."
                };
            }
        }
    } catch (e) {
        console.error("Metadata fetch error:", e);
    }
    return {
        title: "Luxury Wedding Planning | Annu Design Studio",
        description: "Experience the epitome of elegance with our bespoke wedding planning services.",
    };
}

export default async function WeddingPlanPage() {
    let weddingData = null;
    try {
        const res = await fetch(getApiUrl("/api/v1/cms/wedding-plan"), { cache: 'no-store' });
        if (res.ok) {
            weddingData = await res.json();
        }
    } catch (e) {
        console.error("Failed to fetch wedding data:", e);
    }

    return (
        <main className="min-h-screen bg-[#FCFBF7]">
            <WeddingPlanContent data={weddingData} />
            <Footer />
        </main>
    );
}

