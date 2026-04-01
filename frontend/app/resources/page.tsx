import type { Metadata } from "next";
import { LearnHero } from "@/components/resources/LearnHero";

export async function generateMetadata(): Promise<Metadata> {
    try {
        const res = await fetch(getApiUrl("/api/v1/cms/resources"), { cache: 'no-store' });
        if (res.ok) {
            const data = await res.json();
            if (data.meta) {
                return {
                    title: data.meta.title,
                    description: data.meta.description
                };
            }
        }
    } catch (e) {
        console.error("Metadata fetch error:", e);
    }

    return {
        title: "Resources & Learn | Annu Design Studio",
        description: "Educational tutorials, AI prompt libraries, and free design assets to help you create better.",
    };
}

import { CategoryTabs } from "@/components/resources/CategoryTabs";
import { FeaturedPosts } from "@/components/resources/FeaturedPosts";
import { TutorialList } from "@/components/resources/TutorialList";
import { PromptLibrary } from "@/components/resources/PromptLibrary";
import { FreeResources } from "@/components/resources/FreeResources";
import { NewsletterCTA } from "@/components/resources/NewsletterCTA";
import { Footer } from "@/components/footer/Footer";
import { getApiUrl } from "@/lib/utils";

export const dynamic = 'force-dynamic';

export default async function LearnPage() {
    let resourcesData: any = {};
    
    try {
        const res = await fetch(getApiUrl("/api/v1/cms/resources"), {
            cache: 'no-store'
        });
        if (res.ok) {
            resourcesData = await res.json();
        }
    } catch (error) {
        console.error("Failed to fetch resources content:", error);
    }

    return (
        <main className="min-h-screen bg-background flex flex-col">
            <LearnHero data={resourcesData.resources_hero} />
            <CategoryTabs data={resourcesData.resources_categories} />
            <FeaturedPosts data={resourcesData.resources_featured} />
            <TutorialList data={resourcesData.resources_tutorials} />
            <PromptLibrary data={resourcesData.resources_prompts} />
            <FreeResources data={resourcesData.resources_free_resources} />
            <NewsletterCTA data={resourcesData.resources_newsletter} />
            <Footer />
        </main>
    );
}
