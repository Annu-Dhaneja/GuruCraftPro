import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";

// export const runtime = 'edge';
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";

import { ThemeProvider } from "@/components/layout/ThemeProvider";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const { getApiUrl } = await import("@/lib/utils");
  
  try {
    const res = await fetch(getApiUrl("/api/v1/cms/site_config"), { 
      next: { revalidate: 60 } 
    });
    
    if (res.ok) {
      const data = await res.json();
      const meta = data.meta || {};
      const brand = data.brand || {};
      
      return {
        title: {
          default: meta.title || brand.name || "GurucraftPro",
          template: `%s | ${brand.name || "GurucraftPro"}`
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
    title: "GurucraftPro | AI Design Studio",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
      <body
        className={`${outfit.variable} ${inter.variable} antialiased bg-background text-foreground overflow-x-hidden w-full`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SiteConfigProvider>
            <Navbar />
            {children}
            <WhatsAppButton />
          </SiteConfigProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
