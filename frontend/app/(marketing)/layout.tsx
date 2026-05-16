import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/footer/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { CentralizedSEO } from "@/components/layout/CentralizedSEO";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CentralizedSEO />
      <Navbar />
      <div className="pt-24">
        <Breadcrumbs />
      </div>
      <main className="min-h-[70vh] flex flex-col">
        {children}
      </main>
      <Footer />
      <MobileBottomNav />
      <WhatsAppButton />
    </>
  );
}
