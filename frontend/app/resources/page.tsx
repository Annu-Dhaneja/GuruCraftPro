import type { Metadata } from "next";
import { LearnHero } from "@/components/resources/LearnHero";

export const metadata: Metadata = {
    title: "Resources & Learn | Annu Design Studio",
    description: "Educational tutorials, AI prompt libraries, and free design assets to help you create better.",
};
import { CategoryTabs } from "@/components/resources/CategoryTabs";
import { FeaturedPosts } from "@/components/resources/FeaturedPosts";
import { TutorialList } from "@/components/resources/TutorialList";
import { PromptLibrary } from "@/components/resources/PromptLibrary";
import { FreeResources } from "@/components/resources/FreeResources";
import { NewsletterCTA } from "@/components/resources/NewsletterCTA";
import { Footer } from "@/components/footer/Footer";

export default function LearnPage() {
    return (
        <main className="min-h-screen bg-background flex flex-col">
            <LearnHero />
            <CategoryTabs />
            <FeaturedPosts />
            <TutorialList />
            <PromptLibrary />
            <FreeResources />
            <NewsletterCTA />
            <Footer />
        </main>
    );
}
