import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { CaseStudyHero } from "@/components/portfolio/CaseStudyHero";
import { ProjectOverview } from "@/components/portfolio/ProjectOverview";
import { ProjectGallery } from "@/components/portfolio/ProjectGallery";
import { ProjectNavigation } from "@/components/portfolio/ProjectNavigation";
import { PortfolioHero } from "@/components/portfolio/PortfolioHero";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { PortfolioFilters } from "@/components/portfolio/PortfolioFilters";
import { PortfolioCTA } from "@/components/portfolio/PortfolioCTA";
import { Footer } from "@/components/footer/Footer";

// --- Data Simulation ---
// In a real app, this would come from a CMS or Database

const categories = [
    "logo-design",
    "branding",
    "ui-ux",
    "social-media",
    "print"
];

const projects = {
    "neon-drift": {
        title: "Neon Drift Racing",
        category: "Branding",
        description: "A cyberpunk-inspired brand identity for a next-gen racing league.",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop",
        tags: ["Identity", "Logo", "Motion"],
        client: "Velocity Games",
        timeline: "4 Weeks",
        role: "Lead Designer",
        challenge: "Create a visual identity that captures the speed and chaotic energy of futuristic street racing while remaining legible across varied media.",
        solution: "We developed a dynamic logo system with high-contrast neon palettes and glitch-art inspired typography.",
        gallery: [
            "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1614728853970-3638d011666e?q=80&w=2671&auto=format&fit=crop"
        ]
    },
    "eco-haven": {
        title: "Eco Haven Marketplace",
        category: "UI / UX",
        description: "Sustainable living marketplace app design.",
        image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2670&auto=format&fit=crop",
        tags: ["Mobile App", "UI Design", "Prototyping"],
        client: "EcoLife Co.",
        timeline: "6 Weeks",
        role: "UI/UX Designer",
        challenge: "Design a marketplace that feels trustworthy and organic without relying on clichéd green textures.",
        solution: "Used a clean, minimalist interface with a carefully curated earth-tone palette and high-quality photography.",
        gallery: [
            "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2670&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2670&auto=format&fit=crop"
        ]
    },
    "lumina-smart-home": {
        title: "Lumina Smart Home",
        category: "Product Design",
        description: "Interface design for a next-gen smart home controller.",
        image: "https://images.unsplash.com/photo-1558002038-1091a1661116?q=80&w=2671&auto=format&fit=crop",
        tags: ["IoT", "Product Design", "Interface"],
        client: "Lumina Inc.",
        timeline: "8 Weeks",
        role: "Product Designer",
        challenge: "Simplify complex home automation controls into an intuitive, touch-friendly interface for non-technical users.",
        solution: "Created a card-based dashboard with context-aware controls that adapt to the time of day and user habits.",
        gallery: [
            "https://images.unsplash.com/photo-1558002038-1091a1661116?q=80&w=2671&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1513506003013-d5347e0f9c6c?q=80&w=2670&auto=format&fit=crop"
        ]
    },
    "velvet-vine": {
        title: "Velvet & Vine",
        category: "Packaging",
        description: "Luxury wine label and packaging design.",
        image: "https://images.unsplash.com/photo-1632515904536-4d5162f4e3c6?q=80&w=2670&auto=format&fit=crop",
        tags: ["Packaging", "Print", "Luxury"],
        client: "V&V Winery",
        timeline: "3 Weeks",
        role: "Brand Designer",
        challenge: "Stand out on a crowded shelf while conveying heritage and premium price point.",
        solution: "Utilized textured paper stocks, gold foil stamping, and a custom serif typeface to evoke elegance.",
        gallery: [
            "https://images.unsplash.com/photo-1632515904536-4d5162f4e3c6?q=80&w=2670&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=2670&auto=format&fit=crop"
        ]
    },
    // Fallback
    "default": {
        title: "Project Alpha",
        category: "Design",
        description: "A transformative design project.",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2574&auto=format&fit=crop",
        tags: ["Design", "Creative"],
        client: "Happy Client",
        timeline: "2 Weeks",
        role: "Designer",
        challenge: "To create something unique.",
        solution: "We used our process to deliver excellence.",
        gallery: ["https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2574&auto=format&fit=crop"]
    },
    "quantum-deck": {
        title: "Quantum Financial Deck",
        category: "Presentation",
        description: "Investor pitch deck design that secured Series A funding.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
        tags: ["Pitch Deck", "Finance", "Data Viz"],
        client: "Quantum FinTech",
        timeline: "1 Week",
        role: "Visual Designer",
        challenge: "Translate complex financial data into a compelling visual narrative.",
        solution: "Used clean charts and bold typography to highlight key metrics.",
        gallery: ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"]
    },
    "abstract-3d-series": {
        title: "Abstract 3D Series",
        category: "3D Art",
        description: "Exploration of form and light in a digital space.",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
        tags: ["3D", "Blender", "Art"],
        client: "Personal Project",
        timeline: "Ongoing",
        role: "3D Artist",
        challenge: "Pushing the boundaries of procedural texture generation.",
        solution: "Created a series of 10 distinct abstract compositions.",
        gallery: ["https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"]
    },
    "nordic-furniture": {
        title: "Nordic Furniture Co.",
        category: "Web Design",
        description: "E-commerce experience for high-end furniture.",
        image: "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=2574&auto=format&fit=crop",
        tags: ["Web", "E-commerce", "Minimalism"],
        client: "Nordic Home",
        timeline: "8 Weeks",
        role: "Web Designer",
        challenge: "Showcase the texture and quality of materials online.",
        solution: "High-resolution full-width imagery and immersive product configurators.",
        gallery: ["https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=2574&auto=format&fit=crop"]
    },
    "solaris-energy": {
        title: "Solaris Energy",
        category: "Logo Design",
        description: "Rebranding a renewable energy giant.",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2669&auto=format&fit=crop",
        tags: ["Logo", "Branding", "Eco"],
        client: "Solaris",
        timeline: "4 Weeks",
        role: "Brand Identity",
        challenge: "Move away from generic 'leaf and sun' clichés.",
        solution: "A geometric, abstract sun symbol representing power and precision.",
        gallery: ["https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2669&auto=format&fit=crop"]
    },
    "vogue-editorial": {
        title: "Vogue Editorial",
        category: "Print Media",
        description: "Layout design for a special fashion edition.",
        image: "https://images.unsplash.com/photo-1548866380-60b1e4f483c6?q=80&w=2538&auto=format&fit=crop",
        tags: ["Print", "Editorial", "Fashion"],
        client: "Fashion Mag",
        timeline: "2 Weeks",
        role: "Editorial Designer",
        challenge: "Balancing avant-garde photography with legible text.",
        solution: "Asymmetrical grid layouts and negative space.",
        gallery: ["https://images.unsplash.com/photo-1548866380-60b1e4f483c6?q=80&w=2538&auto=format&fit=crop"]
    }
};

// --- Page Component ---

interface PageProps {
    params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = params;

    // SEO for Categories
    if (categories.includes(slug)) {
        return {
            title: `${slug.replace('-', ' ').toUpperCase()} | Annu Design Studio`,
            description: `Browse our ${slug.replace('-', ' ')} portfolio.`,
        };
    }

    // SEO for Projects
    const project = projects[slug as keyof typeof projects] || projects["default"];
    return {
        title: `${project.title} | Portfolio`,
        description: project.description,
    };
}

// --- Category Configuration ---
const categoryConfig: Record<string, any> = {
    "logo-design": {
        title: "Logo designs built for clarity, recall, and brand identity",
        description: "Logos designed to work across digital, print, and brand systems — combining AI exploration with thoughtful human refinement.",
        intro: "We create marks that are simple enough to be memorable, but distinct enough to own their market.",
        tags: ["Minimal", "Modern", "Luxury", "Bold"],
        ctaTitle: "Want a logo like this for your brand?",
        ctaPrimary: "Try AI Logo",
        ctaPrimaryLink: "/ai-lab",
        ctaSecondary: "Request Custom Logo",
        ctaSecondaryLink: "/request"
    },
    "branding": {
        title: "Visual identities that bring brands to life",
        description: "Complete branding systems designed for consistency, scalability, and long-term brand recognition.",
        intro: "From color palettes to typography systems, we build the visual DNA that makes your brand speak without words.",
        tags: ["Brand System", "AI + Manual", "Full Custom"],
        ctaTitle: "Build a brand that looks consistent everywhere",
        ctaPrimary: "Request Branding Design",
        ctaPrimaryLink: "/request"
    },
    "ui-ux": {
        title: "UI/UX designs focused on usability and clarity",
        description: "User interfaces crafted for real users — clean layouts, intuitive flows, and modern visual systems.",
        intro: "We design digital experiences that are frictionless, accessible, and delight users at every touchpoint.",
        tags: ["Web App", "Mobile UI", "SaaS", "Dashboards"],
        ctaTitle: "Need a clean interface for your product?",
        ctaPrimary: "Request UI Design",
        ctaPrimaryLink: "/request"
    },
    "social-media": {
        title: "Scroll-stopping social media designs",
        description: "High-impact creatives designed for engagement, consistency, and brand recognition across platforms.",
        intro: "In a crowded feed, your brand needs to stand out. We create templates and assets that stop the scroll.",
        tags: ["Instagram", "LinkedIn", "Facebook", "Campaigns"],
        ctaTitle: "Want social designs like these every month?",
        ctaPrimary: "Try AI Social Design",
        ctaPrimaryLink: "/ai-lab",
        ctaSecondary: "Subscribe",
        ctaSecondaryLink: "/contact"
    },
    "print": {
        title: "Print designs that translate ideas into impact",
        description: "Print-ready designs optimized for clarity, layout balance, and real-world production.",
        intro: "Tangible design has a unique power. We ensure your business cards, posters, and brochures feel as good as they look.",
        tags: ["Posters", "Flyers", "Brochures", "CMYK-Ready"],
        ctaTitle: "Need professional print-ready designs?",
        ctaPrimary: "Request Print Design",
        ctaPrimaryLink: "/request"
    },
    // --- New Categories ---
    "instagram": {
        title: "Instagram content that builds community",
        description: "Static posts, carousels, and stories designed to maximize engagement and follower growth.",
        intro: "Your feed is your portfolio. We create consistent, high-value visual content that turns scrollers into followers.",
        tags: ["Social Media", "Carousels", "Stories", "Reels Covers"],
        ctaTitle: "Ready to upgrade your Instagram feed?",
        ctaPrimary: "Get Social Pack",
        ctaPrimaryLink: "/request"
    },
    "presentation": {
        title: "Decks that win investors and clients",
        description: "Pitch decks, sales presentations, and keynote slides that communicate value clearly and persuasively.",
        intro: "Don't let bad design kill good ideas. We structure your narrative and visualize your data for maximum impact.",
        tags: ["Pitch Decks", "Keynote", "PowerPoint", "Data Viz"],
        ctaTitle: "Need a winning pitch deck?",
        ctaPrimary: "Request Presentation Design",
        ctaPrimaryLink: "/request"
    },
    "poster": {
        title: "Posters that command attention",
        description: "Large-format designs for events, promotions, and advertising that stand out in any environment.",
        intro: "A great poster captures the essence of a message in a single glance. We design for clarity, hierarchy, and bold visual impact.",
        tags: ["Event Posters", "Advertising", "Large Format"],
        ctaTitle: "Planning an event or campaign?",
        ctaPrimary: "Request Poster Design",
        ctaPrimaryLink: "/request"
    },
    "resume": {
        title: "Resumes that get you hired",
        description: "Professional, ATS-friendly resume and CV designs that highlight your skills and experience.",
        intro: "Your resume is your personal brand document. We create clean, professional layouts that help you stand out to recruiters.",
        tags: ["CV Design", "Personal Branding", "Professional"],
        ctaTitle: "Want to land your dream job?",
        ctaPrimary: "Get Custom Resume",
        ctaPrimaryLink: "/request"
    },
    "email": {
        title: "Emails that get opened and clicked",
        description: "Newsletter templates and promotional email designs that look great on every device.",
        intro: "Email marketing has the highest ROI. We design responsive, beautiful emails that drive conversions and engagement.",
        tags: ["Newsletters", "Marketing", "Responsive"],
        ctaTitle: "Need better performing emails?",
        ctaPrimary: "Request Email Design",
        ctaPrimaryLink: "/request"
    },
    "logo": {
        title: "Logos that define your brand",
        description: "Distinctive, memorable logos that serve as the cornerstone of your visual identity.",
        intro: "A logo is more than a mark; it's a trust signal. We craft timeless identities that scale from business cards to billboards.",
        tags: ["Identity", "Symbol", "Wordmark", "Branding"],
        ctaTitle: "Starting a new brand?",
        ctaPrimary: "Request Logo Design",
        ctaPrimaryLink: "/request"
    },
    "flyer": {
        title: "Flyers that drive local action",
        description: "Effective promotional flyers for events, sales, and local marketing campaigns.",
        intro: "Get the word out effectively. We design flyers that communicate your offer clearly and motivate people to act.",
        tags: ["Marketing", "Print", "Events"],
        ctaTitle: "Need to promote an event?",
        ctaPrimary: "Request Flyer Design",
        ctaPrimaryLink: "/request"
    },
    "brochure": {
        title: "Brochures that tell your full story",
        description: "Multi-page booklets and tri-folds that educate customers and showcase your offerings in detail.",
        intro: "When you need to go deeper, a brochure is the perfect medium. We organize complex information into beautiful, readable layouts.",
        tags: ["Marketing", "Print", "Catalog"],
        ctaTitle: "Need a company brochure?",
        ctaPrimary: "Request Brochure Design",
        ctaPrimaryLink: "/request"
    }
};

import { CategoryHero } from "@/components/portfolio-category/CategoryHero";
import { CategoryIntro } from "@/components/portfolio-category/CategoryIntro";
import { CategoryGrid } from "@/components/portfolio-category/CategoryGrid";
import { CategoryCTA } from "@/components/portfolio-category/CategoryCTA";

export default async function PortfolioItemPage({ params }: PageProps) {
    const { slug } = await params;

    // 1. Check if it's a Category Page
    if (Object.keys(categoryConfig).includes(slug)) {
        const config = categoryConfig[slug];

        // Filter projects for this category
        const categoryItems = Object.values(projects).filter((p: any) => {
            // Flexible matching
            return p.category.toLowerCase().replace(" ", "-") === slug ||
                p.category.toLowerCase().includes(slug.replace("-", " "));
        });

        return (
            <main className="min-h-screen bg-background flex flex-col">
                <CategoryHero
                    title={config.title}
                    description={config.description}
                    tags={config.tags}
                />
                <CategoryIntro text={config.intro} />
                <CategoryGrid items={categoryItems} />
                <CategoryCTA
                    title={config.ctaTitle}
                    primaryBtnText={config.ctaPrimary}
                    primaryBtnLink={config.ctaPrimaryLink}
                    secondaryBtnText={config.ctaSecondary}
                    secondaryBtnLink={config.ctaSecondaryLink}
                />
                <Footer />
            </main>
        );
    }

    // 2. Check if it's a Project Page
    const project = projects[slug as keyof typeof projects];

    if (!project) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-background flex flex-col">
            <CaseStudyHero
                title={project.title}
                category={project.category}
                description={project.description}
                image={project.image}
                tags={project.tags}
            />
            <ProjectOverview
                client={project.client}
                timeline={project.timeline}
                role={project.role}
                challenge={project.challenge}
                solution={project.solution}
            />
            <ProjectGallery images={project.gallery} />
            <ProjectNavigation />
            <Footer />
        </main>
    );
}
