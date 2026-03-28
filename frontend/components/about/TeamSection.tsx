"use client";

import { motion } from "framer-motion";
import { User, ShieldCheck, Sparkles, Code, Palette, Video } from "lucide-react";

const team = [
    {
        name: "Annu Dhanjeja",
        role: "Head / Lead Designer",
        skills: ["Graphic Designer", "Video Editor"],
        icon: Palette,
        color: "text-pink-500",
        bg: "bg-pink-500/10",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Annu"
    },
    {
        name: "Om Prakash",
        role: "Lead Developer",
        skills: ["Web Developer", "Python Developer"],
        icon: Code,
        color: "text-indigo-500",
        bg: "bg-indigo-500/10",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Om"
    }
];

export function TeamSection({ data }: { data?: any }) {
    const teamData = data?.members || team;
    const sectionTitle = data?.title || "Meet Our Expert Team";
    const sectionSubtitle = data?.subtitle || "The creative minds and technical experts building the future of digital identity.";

    
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500/5 blur-3xl rounded-full -ml-48 -mt-48" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 blur-3xl rounded-full -mr-48 -mb-48" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest"
                    >
                        <Users className="w-3 h-3" />
                        The Visionaries
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white">
                        {sectionTitle}
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        {sectionSubtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
                    {teamData.map((member: any, index: number) => {
                        return (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.2 }}
                                className="group bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 hover:border-indigo-500/30 transition-all duration-500 shadow-2xl relative overflow-hidden"
                            >
                                <div className="flex flex-col items-center text-center space-y-6">
                                    <div className="relative">
                                        <div className="w-32 h-32 rounded-3xl overflow-hidden border-2 border-white/10 group-hover:border-indigo-500/50 transition-colors duration-500 p-1 bg-gradient-to-br from-indigo-500/20 to-purple-500/20">
                                            <img 
                                                src={member.image} 
                                                alt={member.name} 
                                                className="w-full h-full object-cover rounded-2xl"
                                            />
                                        </div>
                                        <div className={`absolute -bottom-2 -right-2 w-10 h-10 rounded-xl ${member.bg || 'bg-indigo-500/10'} border border-white/10 flex items-center justify-center`}>
                                            {index === 0 ? <Palette className="w-5 h-5 text-pink-500" /> : <Code className="w-5 h-5 text-indigo-500" />}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <h3 className="text-2xl font-black text-white tracking-tight">{member.name}</h3>
                                        <p className="text-indigo-400 font-bold text-sm uppercase tracking-widest">{member.role}</p>
                                    </div>

                                    <div className="flex flex-wrap justify-center gap-2">
                                        {member.skills?.map((skill: string) => (
                                            <span 
                                                key={skill}
                                                className="px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-[10px] font-bold text-muted-foreground uppercase tracking-wider group-hover:border-indigo-500/20 group-hover:text-indigo-300 transition-colors"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Social Tray */}
                                    {member.social && (
                                        <div className="flex flex-wrap justify-center gap-3 pt-4 border-t border-white/5 w-full">
                                            {member.social.instagram && <TeamSocialLink href={member.social.instagram} icon={Instagram} />}
                                            {member.social.facebook && <TeamSocialLink href={member.social.facebook} icon={Facebook} />}
                                            {member.social.github && <TeamSocialLink href={member.social.github} icon={Github} />}
                                            {member.social.linkedin && <TeamSocialLink href={member.social.linkedin} icon={Linkedin} />}
                                            {member.social.twitter && <TeamSocialLink href={member.social.twitter} icon={Twitter} />}
                                            {member.social.threads && <TeamSocialLink href={member.social.threads} icon={Share2} />}
                                            {member.social.behance && <TeamSocialLink href={member.social.behance} icon={Dribbble} />}
                                            {member.social.youtube && <TeamSocialLink href={member.social.youtube} icon={Youtube} />}
                                            {member.social.website && <TeamSocialLink href={member.social.website} icon={Globe} />}
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
            className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:bg-indigo-500/20 hover:text-indigo-400 hover:border-indigo-500/30 transition-all duration-300"
        >
            <Icon className="w-4 h-4" />
        </a>
    );
}

import { Users, Github, Youtube, Share2, Globe, Facebook, Twitter, Instagram, Linkedin, Dribbble } from "lucide-react";
