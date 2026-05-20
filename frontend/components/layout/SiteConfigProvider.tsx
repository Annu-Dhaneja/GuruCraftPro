"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { pagesService } from "@/services/api/pages";

// Define the shape of our site config Based on the backend seeder
interface NavItem {
    label: string;
    href: string;
    description?: string;
    style: "default" | "special" | "guru";
    items?: NavItem[];
}

interface FooterLink {
    label: string;
    href: string;
}

interface ThemeConfig {
    preset?: string;
    primary?: string;
    accent?: string;
    background?: string;
    foreground?: string;
    cardBg?: string;
    fontFamily?: string;
    fontSizeScale?: string;
    radius?: string;
    glassmorphism?: string;
    navbarStyle?: string;
    footerStyle?: string;
    defaultTheme?: string;
}

interface SiteConfig {
    brand: {
        name: string;
        logo_text: string;
        logo_url?: string;
        tagline: string;
    };
    nav: NavItem[];
    social: {
        instagram: string;
        facebook: string;
        github: string;
        threads: string;
        behance: string;
        youtube: string;
        dribbble: string;
        whatsapp: string;
        linkedin: string;
        twitter: string;
        accepting_projects: boolean;
    };
    footer_explore: FooterLink[];
    footer_support: FooterLink[];
    footer_bottom: {
        copyright: string;
    };
    theme?: ThemeConfig;
}

// Fallback default config if API fails
const defaultConfig: SiteConfig = {
    brand: {
        name: "GurucraftPro",
        logo_text: "G",
        logo_url: "/images/brand/logo-dark-v4.svg",
        tagline: "Crafting digital excellence through the perfect blend of AI technology and human artistic vision.",
    },
    nav: [
        { label: "Home", href: "/", style: "default" },
        { 
            label: "Expertise", 
            href: "/portfolio", 
            style: "default",
            items: [
                { label: "Logo Design", href: "/portfolio?category=Logo Design", style: "default", description: "Memorable logos that define your brand identity." },
                { label: "Wedding Planning", href: "/services/wedding-plan", style: "default", description: "Bespoke luxury wedding coordination and design." },
                { label: "Photo Editing", href: "/services/photo-editor", style: "default", description: "High-end retouching and professional image editing." },
                { label: "Guru Ji Art Work", href: "/services/guru-ji-art", style: "default", description: "Divine hand-painted and digital masterpieces." },
                { label: "Game Design", href: "/services/game-design", style: "default", description: "Immersive character and environment concepts." },
                { label: "Vantage Ecom", href: "/services/vantage-ecom", style: "default", description: "Growth-focused e-commerce design solutions." },
                { label: "Clothing Consultation", href: "/services/clothing-consultation", style: "default", description: "Neural stylist and weekly wardrobe architecture." },
                { label: "Pricing & Services", href: "/services", style: "default", description: "Transparent pricing for all our premium services." },
                { label: "View All Works", href: "/portfolio", style: "default", description: "View our complete portfolio catalog." }
            ]
        },
        { 
            label: "Creative Lab", 
            href: "/ai-lab", 
            style: "special",
            items: [
                { label: "AI Design Lab", href: "/ai-lab", style: "default", description: "Explore the future of creativity with our AI-powered design tools." },
                { label: "Virtual Try-On", href: "/ai-lab/virtual-try-on", style: "default", description: "Instantly see how garments look on you with AI technology." },
                { label: "Guru Ji Darshan", href: "/guruji-darshan", style: "default", description: "Divine spiritual experiences and celestial digital art." }
            ]
        },
        { label: "Learn", href: "/resources", style: "default" },
        { label: "About", href: "/about", style: "default" },
        { label: "Contact", href: "/contact", style: "default" }
    ],
    social: {
        instagram: "https://instagram.com/gurucraftpro",
        facebook: "#",
        github: "#",
        threads: "#",
        behance: "#",
        youtube: "#",
        dribbble: "#",
        whatsapp: "https://wa.me/918527837527",
        linkedin: "#",
        twitter: "#",
        accepting_projects: true,
    },
    footer_explore: [
        {label: "Our Services", href: "/services"},
        {label: "Design Portfolio", href: "/portfolio"},
        {label: "AI Creative Lab", href: "/ai-lab"},
        {label: "The Studio", href: "/about"},
        {label: "Privacy & Legal", href: "/privacy"}
    ],
    footer_support: [
        {label: "Custom Request", href: "/request"},
        {label: "Help Center", href: "/resources"},
        {label: "Contact Studio", href: "/contact"}
    ],
    footer_bottom: { copyright: "© 2026 GurucraftPro. All rights reserved." },
    theme: {
        preset: "Classic Indigo",
        primary: "#6366f1",
        accent: "#a5b4fc",
        background: "#020617",
        foreground: "#f8fafc",
        cardBg: "rgba(15, 23, 42, 0.4)",
        fontFamily: "Sora",
        fontSizeScale: "normal",
        radius: "16px",
        glassmorphism: "subtle",
        navbarStyle: "glass",
        footerStyle: "detailed",
        defaultTheme: "dark"
    }
};

const SiteConfigContext = createContext<{ config: SiteConfig; loading: boolean }>({
    config: defaultConfig,
    loading: true,
});

export function SiteConfigProvider({ children }: { children: React.ReactNode }) {
    const [config, setConfig] = useState<SiteConfig>(defaultConfig);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchConfig() {
            try {
                const data = await pagesService.getSiteConfig();
                if (data) {
                    // Merge fetched data with defaults to ensure structure exists
                    setConfig({
                        brand: {
                            ...(data.brand || defaultConfig.brand),
                            logo_url: data.brand?.logo_url || defaultConfig.brand.logo_url
                        },
                        nav: data.nav || defaultConfig.nav,
                        social: data.social || defaultConfig.social,
                        footer_explore: data.footer_explore || defaultConfig.footer_explore,
                        footer_support: data.footer_support || defaultConfig.footer_support,
                        footer_bottom: data.footer_bottom || defaultConfig.footer_bottom,
                        theme: {
                            ...defaultConfig.theme,
                            ...(data.theme || {})
                        }
                    });
                }
            } catch (err) {
                console.error("Failed to fetch site_config:", err);
            } finally {
                setLoading(false);
            }
        }
        
        fetchConfig();
    }, []);

    // Dynamic Google Fonts and style variables injection
    useEffect(() => {
        if (!config.theme || !config.theme.fontFamily) return;
        const fontName = config.theme.fontFamily;
        
        // Remove existing dynamic font link if present
        const existingLink = document.getElementById("dynamic-google-font");
        if (existingLink) {
            existingLink.remove();
        }

        // Font URL map
        const fontUrlMap: Record<string, string> = {
            "Sora": "https://fonts.googleapis.com/css2?family=Sora:wght@100..800&display=swap",
            "Inter": "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap",
            "Outfit": "https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap",
            "Playfair Display": "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap",
            "Cinzel": "https://fonts.googleapis.com/css2?family=Cinzel:wght@400..900&display=swap",
            "Syne": "https://fonts.googleapis.com/css2?family=Syne:wght@400..800&display=swap"
        };

        const fontUrl = fontUrlMap[fontName];
        if (fontUrl) {
            const link = document.createElement("link");
            link.id = "dynamic-google-font";
            link.rel = "stylesheet";
            link.href = fontUrl;
            document.head.appendChild(link);
        }

        // Dynamically inject variables
        let existingStyle = document.getElementById("dynamic-theme-vars");
        if (!existingStyle) {
            existingStyle = document.createElement("style");
            existingStyle.id = "dynamic-theme-vars";
            document.head.appendChild(existingStyle);
        }

        const primary = config.theme.primary || "#6366f1";
        const accent = config.theme.accent || "#a5b4fc";
        const background = config.theme.background || "#020617";
        const foreground = config.theme.foreground || "#f8fafc";
        const cardBg = config.theme.cardBg || "rgba(15, 23, 42, 0.4)";
        const radius = config.theme.radius || "16px";
        const glassmorphism = config.theme.glassmorphism || "subtle";
        
        let blurVal = "8px";
        if (glassmorphism === "none") blurVal = "0px";
        else if (glassmorphism === "heavy") blurVal = "20px";

        let fontStack = "Sora, sans-serif";
        if (fontName === "Playfair Display" || fontName === "Cinzel") {
            fontStack = `'${fontName}', Georgia, serif`;
        } else {
            fontStack = `'${fontName}', sans-serif`;
        }

        let baseFontSize = "16px";
        if (config.theme.fontSizeScale === "small") baseFontSize = "14px";
        else if (config.theme.fontSizeScale === "large") baseFontSize = "18px";

        existingStyle.innerHTML = `
            :root {
                --primary: ${primary};
                --accent: ${accent};
                --background: ${background};
                --foreground: ${foreground};
                --card-bg: ${cardBg};
                --radius: ${radius};
                --glass-blur: ${blurVal};
                --font-primary: ${fontStack};
                --base-font-size: ${baseFontSize};
            }
            body {
                font-family: var(--font-primary) !important;
                background-color: var(--background) !important;
                color: var(--foreground) !important;
            }
            /* Global card elements styling override */
            .glass-card, [class*="glass-card"] {
                border-radius: var(--radius) !important;
                background: var(--card-bg) !important;
                backdrop-filter: blur(var(--glass-blur)) !important;
                -webkit-backdrop-filter: blur(var(--glass-blur)) !important;
            }
        `;
    }, [config.theme]);

    return (
        <SiteConfigContext.Provider value={{ config, loading }}>
            {children}
        </SiteConfigContext.Provider>
    );
}

// Helper hook
export function useSiteConfig() {
    return useContext(SiteConfigContext);
}
