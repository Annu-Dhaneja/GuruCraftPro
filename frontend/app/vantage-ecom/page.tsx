import type { Metadata } from "next";
import { VantageEcomContent } from "@/components/vantage-ecom/VantageEcomContent";
import { Footer } from "@/components/footer/Footer";

export const metadata: Metadata = {
    title: "Vantage Ecom Platform | Annu Design Studio",
    description: "The future of high-performance e-commerce. AI-driven automation, lightning-fast interfaces, and data-backed conversion science.",
};

export default function VantageEcomPage() {
    return (
        <main className="min-h-screen bg-white">
            <VantageEcomContent />
            <Footer />
        </main>
    );
}
