import type { Metadata } from "next";
import { BookingHero } from "@/components/sections/booking/BookingHero";
import { BookingScheduler } from "@/components/sections/booking/BookingScheduler";

export const metadata: Metadata = {
    title: "Book a Consultation | GurucraftPro",
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
