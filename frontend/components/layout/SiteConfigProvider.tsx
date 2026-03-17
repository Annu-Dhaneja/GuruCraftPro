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
        name: "Gurucraftpro",
        logo_text: "A",
        tagline: "AI-powered design blended with human creativity. We craft digital experiences that stand out.",
    },
    nav: [
        { label: "Home", href: "/", style: "default" },
        { label: "AI Design Lab", href: "/ai-lab", style: "special" },
        { label: "Guru Ji Art Work", href: "/guruji-darshan", style: "guru" }
    ],
    social: {
        instagram: "#",
        dribbble: "#",
        linkedin: "#",
        twitter: "#",
        accepting_projects: true,
    },
    footer_explore: [],
    footer_support: [],
    footer_bottom: { copyright: "© 2026 Gurucraftpro. All rights reserved." },
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
