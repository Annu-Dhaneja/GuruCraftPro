"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/footer/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh]">
        {children}
      </main>
      <Footer />
      <MobileBottomNav />
      <WhatsAppButton />
    </>
  );
}
