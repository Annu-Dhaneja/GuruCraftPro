"use client";

import { Mail, Calendar, Linkedin, Instagram, Dribbble, Twitter } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function AlternateContacts({ data }: { data?: any }) {
    return (
        <section className="py-12 container mx-auto px-4 md:px-6 text-center">
            <h3 className="text-lg font-semibold mb-8">{data?.title || "Or connect with us directly"}</h3>

            <div className="flex flex-wrap justify-center gap-6">
                <Button variant="outline" className="h-12 px-6 gap-2 hover:border-indigo-500/50 hover:bg-indigo-500/5" asChild>
                    <Link href={`mailto:${data?.email || "hello@gurucraftpro.com"}`}>
                        <Mail className="h-4 w-4" />
                        {data?.email || "hello@gurucraftpro.com"}
                    </Link>
                </Button>
                <Button variant="outline" className="h-12 px-6 gap-2 hover:border-indigo-500/50 hover:bg-indigo-500/5" asChild>
                    <Link href={data?.booking_link || "/book"}>
                        <Calendar className="h-4 w-4" />
                        {data?.booking_text || "Book a Free Consultation"}
                    </Link>
                </Button>
            </div>

            <div className="flex justify-center gap-4 mt-8">
                {(data?.socials || [
                    { icon: Instagram, href: "#", color: "hover:text-pink-500" },
                    { icon: Linkedin, href: "#", color: "hover:text-blue-600" },
                    { icon: Dribbble, href: "#", color: "hover:text-pink-400" },
                    { icon: Twitter, href: "#", color: "hover:text-blue-400" },
                ]).map((social: any, i: number) => {
                    const IconComp = typeof social.icon === 'string' ? Linkedin : social.icon; // fallback
                    return (
                        <Link
                            key={i}
                            href={social.href || social.url || "#"}
                            className={`p-3 rounded-full bg-muted/50 text-muted-foreground hover:bg-muted transition-colors ${social.color || "hover:text-indigo-500"}`}
                        >
                            <IconComp className="h-5 w-5" />
                        </Link>
                    )
                })}
            </div>
        </section>
    );
}
