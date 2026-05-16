"use client";

import { useEffect } from "react";
import { useSiteConfig } from "@/components/layout/SiteConfigProvider";

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    slug?: string;
}

export function CentralizedSEO({ title, description, image, slug }: SEOProps) {
    const { config } = useSiteConfig();

    useEffect(() => {
        const brandName = config?.brand?.name || "GurucraftPro";
        const metaTitle = title ? `${title} | ${brandName}` : brandName;
        const metaDescription = description || config?.brand?.tagline || "Premium AI-Powered Design Platform";

        document.title = metaTitle;
        
        const updateMeta = (name: string, content: string) => {
            let el = document.querySelector(`meta[name="${name}"]`);
            if (!el) {
                el = document.createElement("meta");
                el.setAttribute("name", name);
                document.head.appendChild(el);
            }
            el.setAttribute("content", content);
        };

        updateMeta("description", metaDescription);
        updateMeta("og:title", metaTitle);
        updateMeta("og:description", metaDescription);
        if (image) updateMeta("og:image", image);
        if (slug) updateMeta("og:url", `https://gurucraftpro.com/${slug}`);

    }, [title, description, image, slug, config]);

    return null;
}
