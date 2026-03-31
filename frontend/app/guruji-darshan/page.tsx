import type { Metadata } from "next";
import { GurujiDarshanContent } from "@/components/home/GurujiDarshanContent";
import { Footer } from "@/components/footer/Footer";

export const metadata: Metadata = {
    title: "Guruji Ke Sakshat Darshan | Annu Design Studio",
    description: "Experience the divine presence with Guruji Ke Sakshat Darshan (AR 3D View) and Premium Guruji Satsang Box.",
};

import { getApiUrl } from "@/lib/utils";

export const dynamic = 'force-dynamic';

export default async function GurujiDarshanPage() {
    let gurujiData: any = {};
    let fetchError = false;
    
    try {
        const url = getApiUrl("/api/v1/cms/guruji");
        console.log(`[CMS] Fetching guruji content from: ${url}`);
        
        const res = await fetch(url, {
            cache: 'no-store',
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (res.ok) {
            const contentType = res.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                gurujiData = await res.json();
                console.log(`[CMS] Successfully fetched guruji content`);
            } else {
                console.warn(`[CMS] Expected JSON but got ${contentType}`);
                fetchError = true;
            }
        } else {
            console.error(`[CMS] Failed to fetch guruji content: ${res.status} ${res.statusText}`);
            fetchError = true;
        }
    } catch (error) {
        console.error("Failed to fetch guruji content:", error);
        fetchError = true;
    }

    // Default structure for sub-components to prevent crashes
    const safeData = gurujiData || {};

    return (
        <main className="flex min-h-screen flex-col bg-background overflow-x-hidden w-full pt-16">
            {fetchError && (
                <div className="bg-yellow-500/10 border-b border-yellow-500/20 py-2 text-center text-sm text-yellow-600 dark:text-yellow-400">
                    Running in offline/fallback mode. Some sections may show default content.
                </div>
            )}
            
            <GurujiDarshanContent data={safeData} />
            <Footer />
        </main>
    );
}
