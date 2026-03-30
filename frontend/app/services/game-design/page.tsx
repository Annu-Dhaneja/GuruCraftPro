import type { Metadata } from "next";
import { GameDesignContent } from "@/components/services/GameDesignContent";
import { Footer } from "@/components/footer/Footer";

export const metadata: Metadata = {
    title: "Game Design & Assets | Annu Design Studio",
    description: "Next-gen game design services. High-fidelity 3D assets, Unreal Engine environments, and immersive gameplay mechanics.",
};

export default function GameDesignPage() {
    return (
        <main className="min-h-screen bg-[#050505]">
            <GameDesignContent />
            <Footer />
        </main>
    );
}
