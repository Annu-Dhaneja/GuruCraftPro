import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";

export const runtime = 'edge';
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

export const metadata: Metadata = {
  title: "Annu Design Studio",
  description: "Premium AI-Powered Design Platform",
};

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
