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

const team = [
    {
        name: "Annu Dhanjeja",
        role: "Founder & Creative Lead",
        description: "A visionary designer with over 8 years of experience in visual storytelling and brand identity. Annu leads the creative direction of every project, ensuring that aesthetic excellence meets functional purpose.",
        skills: ["Graphic Designer", "Video Editor", "Art Director"],
        icon: "Palette",
        color: "text-pink-500",
        bg: "bg-pink-500/10",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Annu",
        portfolio: "/portfolio/all",
        social: {
            instagram: "https://instagram.com/",
            facebook: "https://facebook.com/",
            linkedin: "https://linkedin.com/",
            behance: "https://behance.net/",
            youtube: "https://youtube.com/"
        }
    },
    {
        name: "Om Prakash",
        role: "Chief Technology Officer",
        description: "Architect of robust digital solutions. Om specializes in full-stack development and AI integration, turning complex technical challenges into seamless user experiences across various platforms.",
        skills: ["Full Stack Dev", "Python Expert", "System Architect"],
        icon: "Code",
        color: "text-indigo-500",
        bg: "bg-indigo-500/10",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Om",
        portfolio: "/portfolio/all",
        social: {
            github: "https://github.com/om-prakash16",
            linkedin: "https://linkedin.com/",
            twitter: "https://twitter.com/",
            website: "https://gurucraftpro.in"
        }
    }
];

export function TeamSection({ data }: { data?: any }) {
    const teamData = data?.members || team;
    const sectionTitle = data?.title || "Meet Our Expert Team";
    const sectionSubtitle = data?.subtitle || "The creative minds and technical experts building the future of digital identity.";

    return (
        <section className="py-24 relative overflow-hidden bg-slate-950">
            {/* Background Accents */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full -ml-48 -mt-48 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full -mr-48 -mb-48 pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center mb-20 space-y-4">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest"
                    >
                        <Users className="w-4 h-4" />
                        The Visionaries
                    </motion.div>
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white">
                        {sectionTitle}
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-xl font-light">
                        {sectionSubtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {teamData.map((member: any, index: number) => {
                        // Dynamically resolve icon component
                        const IconComponent = ICON_MAP[member.icon] || (index % 2 === 0 ? Palette : Code);
                        const memberColor = member.color || (index % 2 === 0 ? "text-pink-500" : "text-indigo-500");
                        const memberBg = member.bg || (index % 2 === 0 ? "bg-pink-500/10" : "bg-indigo-500/10");

                        return (
                            <motion.div
                                key={member.name || index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2 }}
                                className="group relative bg-[#0D0D12] border border-white/5 rounded-[48px] p-12 hover:border-indigo-500/30 transition-all duration-500 overflow-hidden glass-card"
                            >
                                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-100 transition-opacity">
                                    <IconComponent className={`w-24 h-24 ${memberColor}`} />
                                </div>

                                <div className="flex flex-col h-full relative z-10">
                                    <div className="flex items-start justify-between mb-8">
                                        <div className="relative">
                                            <div className="w-24 h-24 rounded-3xl overflow-hidden border-2 border-white/10 group-hover:border-indigo-500/50 transition-colors duration-500 p-1 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 shadow-2xl">
                                                <img 
                                                    src={member.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`} 
                                                    alt={member.name} 
                                                    className="w-full h-full object-cover rounded-2xl"
                                                />
                                            </div>
                                            <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-xl ${memberBg} border border-white/10 flex items-center justify-center`}>
                                                <IconComponent className={`w-4 h-4 ${memberColor}`} />
                                            </div>
                                        </div>

                                        <a 
                                            href={member.portfolio || "#"} 
                                            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/5 text-xs font-bold uppercase tracking-widest text-indigo-400 hover:bg-white/10 transition-all"
                                        >
                                            Portfolio <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </div>

                                    <div className="space-y-4 mb-8">
                                        <div>
                                            <h3 className="text-3xl font-black text-white tracking-tight leading-none mb-2">{member.name || "Team Member"}</h3>
                                            <p className="text-indigo-400 font-bold text-sm uppercase tracking-widest">{member.role || "Specialist"}</p>
                                        </div>
                                        <p className="text-slate-400 leading-relaxed text-sm font-medium">
                                            {member.description || "Dedicated to delivering exceptional quality and creative excellence."}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                                        {(member.skills || ["Creative", "Strategy"]).map((skill: string) => (
                                            <span 
                                                key={skill}
                                                className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest transition-colors group-hover:text-indigo-300"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Social Tray */}
                                    {member.social && (
                                        <div className="flex items-center gap-3 pt-8 border-t border-white/5">
                                            {member.social.instagram && <TeamSocialLink href={member.social.instagram} icon={Instagram} />}
                                            {member.social.facebook && <TeamSocialLink href={member.social.facebook} icon={Facebook} />}
                                            {member.social.github && <TeamSocialLink href={member.social.github} icon={Github} />}
                                            {member.social.linkedin && <TeamSocialLink href={member.social.linkedin} icon={Linkedin} />}
                                            {member.social.twitter && <TeamSocialLink href={member.social.twitter} icon={Twitter} />}
                                            {member.social.threads && <TeamSocialLink href={member.social.threads} icon={Share2} />}
                                            {member.social.behance && <TeamSocialLink href={member.social.behance} icon={Dribbble} />}
                                            {member.social.youtube && <TeamSocialLink href={member.social.youtube} icon={Youtube} />}
                                            {member.social.website && <TeamSocialLink href={member.social.website} icon={Globe} />}
                                            <TeamSocialLink href={`mailto:office@annudesign.com`} icon={Mail} />
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
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
