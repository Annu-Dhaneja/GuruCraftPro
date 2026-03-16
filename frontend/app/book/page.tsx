import type { Metadata } from "next";
import { BookingHero } from "@/components/booking/BookingHero";
import { BookingScheduler } from "@/components/booking/BookingScheduler";
import { Footer } from "@/components/footer/Footer";

export const metadata: Metadata = {
    title: "Book a Consultation | Annu Design Studio",
    description: "Schedule a strategy call or project review with our expert design team.",
};

export default function BookingPage() {
    return (
        <main className="min-h-screen bg-background flex flex-col">
            <BookingHero />
            <BookingScheduler />
            <Footer />
        </main>
    );
}
