"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    ExternalLink, 
    Github, 
    Linkedin, 
    Twitter, 
    Instagram, 
    Mail, 
    Globe,
    Share2
} from "lucide-react";

interface MemberProps {
    name: string;
    role: string;
    description: string;
    image: string;
    skills: string[];
    portfolio?: string;
    social: {
        github?: string;
        linkedin?: string;
        twitter?: string;
        instagram?: string;
        website?: string;
        email?: string;
    };
}

export function MemberCard({ member }: { member: MemberProps }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ y: -8 }}
            className="neon-border-glow shimmer-sweep group relative bg-slate-950/40 backdrop-blur-3xl rounded-[2.5rem] p-10 border border-white/5 transition-all duration-500 shadow-2xl h-full flex flex-col"
        >
            {/* Portfolio Link Button (Top Right) */}
            <motion.a
                href={member.portfolio || "#"}
                target="_blank"
                rel="noopener noreferrer"
                animate={{ x: isHovered ? 5 : 0 }}
                className="absolute top-8 right-8 z-20 w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400 hover:bg-indigo-500 hover:text-white transition-all duration-300"
            >
                <ExternalLink className="w-5 h-5" />
            </motion.a>

            <div className="flex flex-col items-center text-center space-y-6 flex-1">
                {/* Profile Image with Pulsing Glow */}
                <div className="relative group/img">
                    <motion.div 
                        animate={{ 
                            scale: isHovered ? 1.05 : 1,
                            rotate: isHovered ? 3 : 0
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-[#6C63FF] to-[#00D4FF] shadow-[0_0_30px_rgba(108,99,255,0.3)]"
                    >
                        <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 border-2 border-slate-950">
                            <img 
                                src={member.image} 
                                alt={member.name} 
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </motion.div>
                </div>

                <div className="space-y-2">
                    <h3 className="text-3xl font-black text-white tracking-tight leading-none text-shimmer">
                        {member.name}
                    </h3>
                    <p className="text-[#00D4FF] text-[10px] font-black uppercase tracking-[0.3em]">
                        {member.role}
                    </p>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed max-w-xs line-clamp-2">
                    {member.description || "Creative specialist dedicated to excellence."}
                </p>

                {/* Skill Badges */}
                <div className="flex flex-wrap justify-center gap-2">
                    {(member.skills || []).map((skill) => (
                        <span 
                            key={skill}
                            className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[9px] font-bold text-slate-300 uppercase tracking-widest hover:border-[#6C63FF]/30 hover:text-[#6C63FF] transition-colors"
                        >
                            {skill}
                        </span>
                    ))}
                </div>

                {/* Social Media Tray (Fade & Lift Animation) */}
                <div className="pt-8 w-full border-t border-white/5 mt-auto">
                    <motion.div 
                        animate={{ 
                            y: isHovered ? 0 : 10,
                            opacity: isHovered ? 1 : 0.4
                        }}
                        className="flex items-center justify-center gap-4"
                    >
                        {member.social?.github && <SocialIcon href={member.social.github} icon={Github} />}
                        {member.social?.linkedin && <SocialIcon href={member.social.linkedin} icon={Linkedin} />}
                        {member.social?.twitter && <SocialIcon href={member.social.twitter} icon={Twitter} />}
                        {member.social?.instagram && <SocialIcon href={member.social.instagram} icon={Instagram} />}
                        {member.social?.website && <SocialIcon href={member.social.website} icon={Globe} />}
                        {member.social?.email && <SocialIcon href={`mailto:${member.social.email}`} icon={Mail} />}
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}

function SocialIcon({ href, icon: Icon }: { href: string; icon: any }) {
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, y: -5 }}
            className="text-slate-500 hover:text-[#00D4FF] transition-colors"
        >
            <Icon className="w-5 h-5" />
        </motion.a>
    );
}
