import type { Metadata } from "next";
import { AIHero } from "@/components/ai/AIHero";

export const metadata: Metadata = {
    title: "AI Design Lab | Annu Design Studio",
    description: "Experience the future of design. Generate concepts instantly with our AI tools and refine them with professional expertise.",
};
import Link from "next/link";
import { ArrowRight, Shirt, Sparkles, PenTool, Sticker } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer/Footer";
import { getApiUrl } from "@/lib/utils";

export const dynamic = 'force-dynamic';

const DEFAULT_TOOLS = [
    {
        title: "Virtual Dress Change Room",
        description: "Upload your photo and a dress to see how it fits instantly.",
        href: "/ai-lab/virtual-try-on",
        icon: Shirt,
        color: "text-rose-500",
        bg: "bg-rose-500/10",
        gradient: "from-rose-500/80 to-pink-500/80",
        image: "/images/uploads/generated-image-2026-02-24_10-15-32.jpg"
    },
    {
        title: "Outfit Generator",
        description: "Generate complete outfit ideas from simple text prompts.",
        href: "/ai-lab/outfit-generator",
        icon: Sparkles,
        color: "text-amber-500",
        bg: "bg-amber-500/10",
        gradient: "from-amber-500/80 to-orange-500/80",
        image: "/images/uploads/generated-image-2026-02-24_10-09-43.jpg"
    },
    {
        title: "Logo & Design Generator",
        description: "Create professional logos and brand assets in seconds.",
        href: "/ai-lab/logo-generator",
        icon: PenTool,
        color: "text-indigo-500",
        bg: "bg-indigo-500/10",
        gradient: "from-indigo-600/80 to-blue-600/80",
        image: "/images/uploads/generated-image-2026-02-23_14-29-18 (1).jpg"
    },
    {
        title: "Sticker Generator",
        description: "Design fun, custom stickers for social media and messaging.",
        href: "/ai-lab/sticker-generator",
        icon: Sticker,
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
        gradient: "from-emerald-500/80 to-green-500/80",
        image: "/images/uploads/generated-image-2026-02-23_14-31-53.jpg"
    }
];

export default async function AILabPage() {
    let aiLabData: any = {};
    let fetchError = false;
    
    try {
        const url = getApiUrl("/api/v1/cms/ai_lab");
        console.log(`[CMS] Fetching AI Lab content from: ${url}`);
        
        const res = await fetch(url, {
            cache: 'no-store',
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (res.ok) {
            const contentType = res.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                aiLabData = await res.json();
                console.log(`[CMS] Successfully fetched AI Lab content`);
            } else {
                console.warn(`[CMS] Expected JSON but got ${contentType}`);
                fetchError = true;
            }
        } else {
            console.error(`[CMS] Failed to fetch AI Lab content: ${res.status} ${res.statusText}`);
            fetchError = true;
        }
    } catch (error) {
        console.error("Failed to fetch AI Lab content:", error);
        fetchError = true;
    }

    // Default structure for sub-components to prevent crashes
    const safeData = aiLabData || {};
    const hero = safeData.hero;
    const dynamicTools = safeData.tools;
    const activeTools = dynamicTools?.length > 0 ? dynamicTools : DEFAULT_TOOLS;
    
    // Helper to dynamically render imported lucide icons based on string names returned from CMS
    const getIcon = (iconName: string) => {
        switch (iconName) {
            case 'Shirt': return Shirt;
            case 'PenTool': return PenTool;
            case 'Sticker': return Sticker;
            case 'Sparkles':
            default: return Sparkles;
        }
    };

    return (
        <main className="min-h-screen bg-background flex flex-col pt-16">
            {fetchError && (
                <div className="bg-yellow-500/10 border-b border-yellow-500/20 py-2 text-center text-sm text-yellow-600 dark:text-yellow-400">
                    Running in offline/fallback mode. Some sections may show default content.
                </div>
            )}
            {/* Hero Section */}
            <section className="relative py-24 px-4 md:px-6 overflow-hidden">
                <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/10 blur-3xl -z-20" />

                <div className="container mx-auto max-w-4xl text-center space-y-6">
                    <div className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-sm text-indigo-800 backdrop-blur-sm">
                        <Sparkles className="mr-2 h-3 w-3" />
                        <span>{hero?.badge || "AI Design Lab"}</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                        {hero?.title || "Unleash Your Creativity with AI"}
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        {hero?.description || "Explore our suite of AI-powered modeling and design tools. From virtual try-ons to instant branding, create professional assets in seconds."}
                    </p>
                </div>
            </section>

            {/* Tools Grid */}
            <section className="container mx-auto px-4 md:px-6 pb-24">
                <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {activeTools.map((tool: any, idx: number) => {
                        const IconComponent = typeof tool.icon === 'string' ? getIcon(tool.icon) : tool.icon;
                        
                        return (
                        <Link key={idx} href={tool.href || "#"} className="group">
                            <div className="min-h-[300px] h-full relative overflow-hidden rounded-3xl border bg-card p-8 transition-all hover:shadow-xl hover:-translate-y-1 group-hover:border-indigo-500/50">
                                {/* Background Image */}
                                {tool.image && (
                                    <img src={tool.image} alt={tool.title} className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-105 transition-transform duration-700" />
                                )}
                                <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px] transition-colors group-hover:bg-background/60" />

                                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br ${tool.gradient || 'from-indigo-500 to-purple-500'}`} />

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className={`h-12 w-12 rounded-2xl ${tool.bg || 'bg-indigo-500/10'} flex items-center justify-center mb-6 shadow-sm`}>
                                        <IconComponent className={`h-6 w-6 ${tool.color || 'text-indigo-500'}`} />
                                    </div>

                                    <h3 className="text-2xl font-bold mb-3">{tool.title}</h3>
                                    <p className="text-muted-foreground mb-8 flex-grow pr-4 leading-relaxed font-medium">{tool.description}</p>

                                    <div className="flex items-center font-bold text-sm text-foreground mt-auto bg-background/50 w-fit px-4 py-2 rounded-full backdrop-blur-md border border-border group-hover:border-indigo-500/30">
                                        Try it now <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )})}
                </div>
            </section>

            <Footer />
        </main>
    );
}
