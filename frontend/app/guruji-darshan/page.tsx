import type { Metadata } from "next";
import { GurujiDarshanContent } from "@/components/home/GurujiDarshanContent";
import { Footer } from "@/components/footer/Footer";

export const metadata: Metadata = {
    title: "Guruji Ke Sakshat Darshan | Annu Design Studio",
    description: "Experience the divine presence with Guruji Ke Sakshat Darshan (AR 3D View) and Premium Guruji Satsang Box.",
};

export default function GurujiDarshanPage() {
    return (
        <main className="flex min-h-screen flex-col bg-background overflow-x-hidden w-full">
            <GurujiDarshanContent />
            <Footer />
        </main>
    );
}
