import type { Metadata } from "next";
import { BookingHero } from "@/components/booking/BookingHero";
import { BookingScheduler } from "@/components/booking/BookingScheduler";


export const metadata: Metadata = {
    title: "Book a Consultation | Annu Design Studio",
    description: "Schedule a strategy call or project review with our expert design team.",
};

export default function BookingPage() {
    return (
        <main className="min-h-screen bg-background flex flex-col">
            <BookingHero />
            <BookingScheduler />
            
        </main>
    );
}

