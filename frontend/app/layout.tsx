import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";

// export const runtime = 'edge';
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";

import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const { getApiUrl, safeFetch } = await import("@/lib/utils");
  
  try {
    const res = await safeFetch(getApiUrl("/api/v1/cms/site_config"), { 
      next: { revalidate: 60 } 
    }, 5000); // 5 second timeout for metadata
    
    if (res.ok) {
      const data = await res.json();
      const meta = data.meta || {};
      const brand = data.brand || {};
      
      return {
        title: {
          default: meta.title || brand.name || "GuruCraft Pro",
          template: `%s | ${brand.name || "GuruCraft Pro"}`
        },
        description: meta.description || brand.tagline || "Premium AI-Powered Design Platform",
        icons: {
          icon: brand.logo_url || "/favicon.ico",
        }
      };
    }
  } catch (e) {
    console.error("Layout Metadata Fetch Error:", e);
  }

  return {
    title: "GuruCraft Pro | AI Design Studio",
    description: "Premium AI-Powered Design Platform",
  };
}


export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

import { SiteConfigProvider } from "@/components/layout/SiteConfigProvider";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { CartSidebar } from "@/components/layout/CartSidebar";
import { Toaster } from "sonner";
import { Footer } from "@/components/footer/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
      <body
        className={`${sora.variable} ${inter.variable} antialiased bg-background text-foreground overflow-x-hidden w-full`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SiteConfigProvider>
            <Navbar />
            <main className="min-h-[70vh]">
              {children}
            </main>
            <Footer />
            <Toaster position="top-right" richColors closeButton />
            <CartSidebar />
            <MobileBottomNav />
            <WhatsAppButton />
          </SiteConfigProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

