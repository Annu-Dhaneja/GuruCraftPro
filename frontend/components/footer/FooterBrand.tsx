"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Dribbble } from "lucide-react";
import { useSiteConfig } from "../layout/SiteConfigProvider";
import Image from "next/image";

export function FooterBrand() {
    const { config } = useSiteConfig();

    return (
        <div className="space-y-6">
            {/* Brand Identity */}
            <Link href="/" className="flex items-center gap-2 group">
                {config.brand.logo_url ? (
                    <div className="relative h-12 w-12 transition-transform group-hover:scale-105">
                        <Image
                            src={config.brand.logo_url}
                            alt={config.brand.name}
                            fill
                            className="object-contain invert brightness-0"
                        />
                    </div>
                ) : (
                    <div className="h-10 w-10 bg-white rounded-br-xl rounded-tl-xl flex items-center justify-center transition-transform group-hover:scale-105">
                        <span className="text-black font-bold text-xl">{config.brand.logo_text}</span>
                    </div>
                )}
                <span className="font-bold text-xl tracking-tight text-white">
                    {config.brand.name}
                </span>
            </Link>

            <p className="text-muted-foreground leading-relaxed max-w-xs">
                {config.brand.tagline}
            </p>

            {/* Social Icons */}
            <div className="flex gap-4">
                {config.social.instagram !== "#" && <SocialLink href={config.social.instagram} icon={Instagram} label="Instagram" />}
                {config.social.dribbble !== "#" && <SocialLink href={config.social.dribbble} icon={Dribbble} label="Dribbble" />}
                {config.social.linkedin !== "#" && <SocialLink href={config.social.linkedin} icon={Linkedin} label="LinkedIn" />}
                {config.social.twitter !== "#" && <SocialLink href={config.social.twitter} icon={Twitter} label="Twitter" />}
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
