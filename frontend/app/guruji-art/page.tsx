import type { Metadata } from "next";
import { GurujiArtContent } from "@/components/guruji-art/GurujiArtContent";
import { Footer } from "@/components/footer/Footer";

export const metadata: Metadata = {
    title: "Guruji Art & Creation | Annu Design Studio",
    description: "Discover the divine artistry of Guruji. Sacred masterpieces, traditional oil paintings, and digital spiritual art collections.",
};

export default function GurujiArtPage() {
    return (
        <main className="min-h-screen bg-zinc-950">
            <GurujiArtContent />
            <Footer />
        </main>
    );
}
