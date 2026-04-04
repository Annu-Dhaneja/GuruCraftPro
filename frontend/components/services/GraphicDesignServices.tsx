"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import Image from "next/image";

const defaultDesignServices = [
    {
        title: "Logo Design",
        description: "Custom logo designs that represent your brand identity",
        price: "₹999+",
        image: "/images/user_provided/generated-image-2026-02-24_10-45-45 (1).jpg",
        color: "from-blue-500/80 to-indigo-500/80",
        link: "/portfolio?category=Logo Design"
    },
    {
        title: "Wedding Plan",
        description: "Bespoke wedding design and coordination services",
        price: "₹4999+",
        image: "/images/user_provided/generated-image-2026-02-24_08-35-13 (1).jpg",
        color: "from-rose-500/80 to-pink-500/80",
        link: "/services/wedding-plan"
    },
    {
        title: "Photo Editor",
        description: "Professional high-end photo retouching and editing",
        price: "₹199+",
        image: "/images/user_provided/generated-image-2026-02-24_10-45-46 (1).jpg",
        color: "from-cyan-500/80 to-blue-500/80",
        link: "/services/photo-editor"
    },
    {
        title: "Guru Ji Art",
        description: "Divine hand-painted and digital Guru Ji masterpieces",
        price: "₹1499+",
        image: "/images/user_provided/generated-image-2026-02-24_08-35-13.jpg",
        color: "from-amber-500/80 to-orange-500/80",
        link: "/services/guru-ji-art"
    },
    {
        title: "Game Design",
        description: "Character concepts and immersive environment art",
        price: "₹2499+",
        image: "/images/user_provided/generated-image-2026-02-23_14-29-24.jpg",
        color: "from-purple-500/80 to-pink-500/80",
        link: "/services/game-design"
    },
    {
        title: "Vantage Ecom",
        description: "Growth-focused e-commerce designs and branding",
        price: "₹3499+",
        image: "/images/user_provided/generated-image-2026-02-23_14-29-25 (3).jpg",
        color: "from-emerald-500/80 to-teal-500/80",
        link: "/services/vantage-ecom"
    },
    {
        title: "Banner Design",
        description: "Eye-catching banners for web and social media",
        price: "₹499+",
        image: "/images/user_provided/generated-image-2026-02-23_14-29-25 (3).jpg",
        color: "from-teal-500/80 to-cyan-500/80",
        link: "/portfolio?category=Banner Design"
    },
    {
        title: "Resume Design",
        description: "Professional resume templates and designs",
        price: "₹349+",
        image: "/images/user_provided/generated-image-2026-02-23_14-29-24 (3).jpg",
        color: "from-blue-600/80 to-indigo-600/80",
        link: "/portfolio?category=Resume Design"
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
};

export function GraphicDesignServices({ data }: { data?: any }) {
    const badgeText = data?.badge_text || "🎨 Elite Deliverables";
    const title = data?.title || "Signature Masterpieces";
    const description = data?.description || "Professional design solutions for all your branding needs. We combine creative vision with strategic intent.";
    const designServices = data?.services || defaultDesignServices;

    return (
        <section className="py-48 bg-zinc-950 relative overflow-hidden border-y border-white/5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(79,70,229,0.05)_0%,transparent_50%)]" />
            
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center max-w-4xl mx-auto mb-32">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-6 py-2 text-xs font-black uppercase tracking-[0.4em] text-indigo-400 backdrop-blur-xl mb-10"
                    >
                        {badgeText}
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="text-6xl md:text-9xl font-black tracking-tighter mb-10 uppercase italic text-shimmer"
                    >
                        {title}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="text-2xl text-zinc-500 max-w-2xl mx-auto font-light italic leading-relaxed border-x border-white/5 px-10 py-4"
                    >
                        {description}
                    </motion.p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
                >
                    {designServices.map((service: any, index: number) => (
                        <motion.div key={index} variants={itemVariants} className="h-full">
                            <Link href={service.link || "/contact"} className="block h-[500px] w-full group relative rounded-[3rem] overflow-hidden border border-white/5 transition-all duration-700 hover:border-white/20 glass-card">
                                {/* Background Image */}
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                                <div className="shimmer-sweep absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none z-20" />

                                <div className="absolute inset-0 p-10 flex flex-col z-30">
                                    {/* Price tag top right */}
                                    <div className="self-end bg-white/10 backdrop-blur-md text-white font-black px-4 py-2 rounded-full border border-white/10 text-[10px] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                                        {service.price}
                                    </div>

                                    {/* Content bottom */}
                                    <div className="mt-auto transform translate-y-6 group-hover:translate-y-0 transition-all duration-700">
                                        <h3 className="text-3xl font-black text-white italic tracking-tight uppercase mb-4">
                                            {service.title}
                                        </h3>
                                        <p className="text-zinc-400 text-sm font-light leading-relaxed mb-8 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 line-clamp-2 italic">
                                            {service.description}
                                        </p>

                                        <div className="flex items-center text-white text-[10px] font-black uppercase tracking-[0.4em] italic">
                                            COMMISSION <ArrowRight className="ml-3 h-4 w-4 group-hover:translate-x-2 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
