"use client";

import { motion } from "framer-motion";
import { 
    Users, 
    Github, 
    Youtube, 
    Share2, 
    Globe, 
    Facebook, 
    Twitter, 
    Instagram, 
    Linkedin, 
    Dribbble, 
    ExternalLink,
    Mail,
    Palette,
    Code,
    Sparkles,
    Briefcase
} from "lucide-react";

// Robust mapping for icons since JSON can't store component functions
const ICON_MAP: Record<string, any> = {
    "Palette": Palette,
    "Code": Code,
    "Sparkles": Sparkles,
    "Briefcase": Briefcase,
    "Users": Users,
    "Globe": Globe
};

import { MemberCard } from "@/components/team/MemberCard";

const team = [
    {
        name: "Annu Dhanjeja",
        role: "Founder & Creative Lead",
        description: "Visionary designer with 8+ years experience in brand identity and visual storytelling. Annu leads global creative direction.",
        skills: ["Art Direction", "Video Editor", "Art Director"],
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Annu",
        portfolio: "/portfolio/all",
        social: {
            instagram: "https://instagram.com/",
            linkedin: "https://linkedin.com/",
            email: "office@annudesign.com"
        }
    },
    {
        name: "Om Prakash",
        role: "Chief Technology Officer",
        description: "Architect of robust AI solutions. Om specializes in full-stack development and complex system integration.",
        skills: ["Full Stack Dev", "Python Expert", "System Architect"],
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Om",
        portfolio: "/portfolio/all",
        social: {
            github: "https://github.com/om-prakash16",
            linkedin: "https://linkedin.com/",
            website: "https://gurucraftpro.in"
        }
    }
];

export function TeamSection({ data }: { data?: any }) {
    const teamData = data?.members || team;
    const sectionTitle = data?.title || "Team Behind the Craft";
    const sectionSubtitle = data?.subtitle || "A collective of visionary minds merging advanced AI technology with timeless creative mastery.";

    return (
        <section className="py-32 relative overflow-hidden bg-slate-950/80">
            {/* SaaS Glow Backgrounds */}
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#6C63FF]/5 blur-[140px] rounded-full animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#00D4FF]/5 blur-[140px] rounded-full animate-pulse delay-1000" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center mb-24 space-y-6">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[#6C63FF]/5 border border-[#6C63FF]/10 text-[#6C63FF] text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl"
                    >
                        <Users className="w-4 h-4" />
                        Executive Leadership
                    </motion.div>
                    <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-none text-shimmer">
                        {sectionTitle}
                    </h2>
                    <p className="text-slate-400 max-w-3xl mx-auto text-xl font-light leading-relaxed">
                        {sectionSubtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {teamData.map((member: any, index: number) => (
                        <MemberCard key={member.name || index} member={member} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function TeamSocialLink({ href, icon: Icon }: { href: string; icon: any }) {
    if (!href || href === "#") return null;
    return (
        <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-muted-foreground hover:bg-indigo-600/20 hover:text-indigo-400 hover:border-indigo-600/30 transition-all duration-300"
        >
            <Icon className="w-5 h-5" />
        </a>
    );
}
