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
    try {
        const res = await fetch(getApiUrl("/api/v1/cms/guruji"), {
            cache: 'no-store'
        });
        if (res.ok) {
            gurujiData = await res.json();
        }
    } catch (error) {
        console.error("Failed to fetch guruji content:", error);
    }

    return (
        <main className="flex min-h-screen flex-col bg-background overflow-x-hidden w-full">
            <GurujiDarshanContent data={gurujiData} />
            <Footer />
        </main>
    );
}
