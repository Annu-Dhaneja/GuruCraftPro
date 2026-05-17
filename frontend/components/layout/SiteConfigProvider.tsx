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
