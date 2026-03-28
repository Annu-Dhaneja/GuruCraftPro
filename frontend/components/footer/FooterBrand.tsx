"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Dribbble, MessageCircle, Github, Youtube, Share2 } from "lucide-react";
import { useSiteConfig } from "../layout/SiteConfigProvider";
import Image from "next/image";

export function FooterBrand() {
    const { config } = useSiteConfig();

    return (
        <div className="space-y-6">
            {/* Brand Identity */}
            <Link href="/" className="flex items-center gap-2 group">
                {config.brand.logo_url && (
                    <div className="relative h-16 w-56 md:h-20 md:w-64 transition-transform group-hover:scale-105">
                        <Image
                            src={config.brand.logo_url}
                            alt={config.brand.name}
                            fill
                            className="object-contain object-left"
                        />
                    </div>
                )}
            </Link>

            <p className="text-muted-foreground leading-relaxed max-w-xs">
                {config.brand.tagline}
            </p>

            {/* Social Icons */}
            <div className="flex flex-wrap gap-4">
                {config.social.instagram && config.social.instagram !== "#" && <SocialLink href={config.social.instagram} icon={Instagram} label="Instagram" />}
                {config.social.facebook && config.social.facebook !== "#" && <SocialLink href={config.social.facebook} icon={Facebook} label="Facebook" />}
                {config.social.whatsapp && config.social.whatsapp !== "#" && <SocialLink href={config.social.whatsapp} icon={MessageCircle} label="WhatsApp" />}
                {config.social.github && config.social.github !== "#" && <SocialLink href={config.social.github} icon={Github} label="GitHub" />}
                {config.social.linkedin && config.social.linkedin !== "#" && <SocialLink href={config.social.linkedin} icon={Linkedin} label="LinkedIn" />}
                {config.social.twitter && config.social.twitter !== "#" && <SocialLink href={config.social.twitter} icon={Twitter} label="Twitter/X" />}
                {config.social.threads && config.social.threads !== "#" && <SocialLink href={config.social.threads} icon={Share2} label="Threads" />}
                {config.social.behance && config.social.behance !== "#" && <SocialLink href={config.social.behance} icon={Dribbble} label="Behance" />}
                {config.social.youtube && config.social.youtube !== "#" && <SocialLink href={config.social.youtube} icon={Youtube} label="YouTube" />}
                {config.social.dribbble && config.social.dribbble !== "#" && <SocialLink href={config.social.dribbble} icon={Dribbble} label="Dribbble" />}
            </div>

            {config.social.accepting_projects && (
                <div className="pt-4">
                    <div className="inline-flex items-center px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-white/70">
                        <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                        Accepting New Projects
                    </div>
                </div>
            )}
        </div>
    );
}

function SocialLink({ href, icon: Icon, label }: { href: string; icon: any; label: string }) {
    return (
        <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300"
            aria-label={label}
        >
            <Icon className="h-5 w-5" />
        </Link>
    );
}
