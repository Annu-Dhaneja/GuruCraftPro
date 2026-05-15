import type { Metadata } from "next";
import { GameDesignContent } from "@/components/services/GameDesignContent";
import { getApiUrl, safeFetch } from "@/lib/utils";

export const metadata: Metadata = {
    title: "Game Design & Assets | Annu Design Studio",
    description: "Next-gen game design services. High-fidelity 3D assets, Unreal Engine environments, and immersive gameplay mechanics.",
};

export default async function GameDesignPage() {
    let cmsData = null;
    try {
        const url = getApiUrl("/api/v1/cms/game-design");
        const res = await safeFetch(url, { cache: 'no-store' }, 8000);
        if (res.ok) cmsData = await res.json();
    } catch (error) {
        console.error("Failed to fetch game-design data:", error);
    }

    return (
        <main className="min-h-screen bg-[#050505]">
            <GameDesignContent data={cmsData} />
        </main>
    );
}

