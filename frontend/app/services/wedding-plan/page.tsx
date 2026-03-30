import type { Metadata } from "next";
import { WeddingPlanContent } from "@/components/services/WeddingPlanContent";
import { Footer } from "@/components/footer/Footer";

export const metadata: Metadata = {
    title: "Luxury Wedding Planning | Annu Design Studio",
    description: "Experience the epitome of elegance with our bespoke wedding planning services. From royal grand galas to intimate heritage celebrations.",
};

export default function WeddingPlanPage() {
    return (
        <main className="min-h-screen bg-[#FCFBF7]">
            <WeddingPlanContent />
            <Footer />
        </main>
    );
}
