"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getApiUrl } from "@/lib/utils";

// Define the shape of our site config Based on the backend seeder
interface NavItem {
    label: string;
    href: string;
    style: "default" | "special" | "guru";
}

interface FooterLink {
    label: string;
    href: string;
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
        dribbble: string;
        linkedin: string;
        twitter: string;
        accepting_projects: boolean;
    };
    footer_explore: FooterLink[];
    footer_support: FooterLink[];
    footer_bottom: {
        copyright: string;
    };
}

// Fallback default config if API fails
const defaultConfig: SiteConfig = {
    brand: {
        name: "GurucraftPro",
        logo_text: "G",
        logo_url: "/img/brand/logo-full-v2.png",
        tagline: "Crafting digital excellence through the perfect blend of AI technology and human artistic vision.",
    },
    nav: [
        { label: "Home", href: "/", style: "default" },
        { label: "Portfolio", href: "/portfolio", style: "default" },
        { label: "AI Design Lab", href: "/ai-lab", style: "special" },
        { label: "Virtual Try-On", href: "/ai-lab/virtual-try-on", style: "special" },
        { label: "Guru Ji Art Work", href: "/guruji-darshan", style: "guru" }
    ],
    social: {
        instagram: "https://instagram.com/gurucraftpro",
        dribbble: "#",
        linkedin: "#",
        twitter: "#",
        accepting_projects: true,
    },
    footer_explore: [
        {label: "Our Services", href: "/services"},
        {label: "Design Portfolio", href: "/portfolio"},
        {label: "AI Creative Lab", href: "/ai-lab"},
        {label: "The Studio", href: "/about"}
    ],
    footer_support: [
        {label: "Custom Request", href: "/request"},
        {label: "Privacy Policy", href: "/privacy"},
        {label: "Support Center", href: "/contact"}
    ],
    footer_bottom: { copyright: "© 2026 GurucraftPro. All rights reserved." },
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
                const res = await fetch(getApiUrl("/api/v1/cms/site_config"), {
                    // Next.js cache revalidation rule
                    next: { revalidate: 60 } 
                });
                if (res.ok) {
                    const data = await res.json();
                    
                    // Merge fetched data with defaults to ensure structure exists
                    setConfig({
                        brand: data.brand || defaultConfig.brand,
                        nav: data.nav || defaultConfig.nav,
                        social: data.social || defaultConfig.social,
                        footer_explore: data.footer_explore || defaultConfig.footer_explore,
                        footer_support: data.footer_support || defaultConfig.footer_support,
                        footer_bottom: data.footer_bottom || defaultConfig.footer_bottom,
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
