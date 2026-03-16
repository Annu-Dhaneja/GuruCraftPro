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
    },
    {
        title: "Banner Design",
        description: "Eye-catching banners for web and social media",
        price: "₹499+",
        image: "/images/user_provided/generated-image-2026-02-23_14-29-25 (3).jpg",
        color: "from-emerald-500/80 to-teal-500/80",
    },
    {
        title: "Thumbnail",
        description: "Attractive thumbnails for YouTube and social media",
        price: "₹299+",
        image: "/images/user_provided/generated-image-2026-02-24_08-35-13.jpg",
        color: "from-red-500/80 to-orange-500/80",
    },
    {
        title: "T-Shirt Design",
        description: "Custom apparel designs for your brand or event",
        price: "₹599+",
        image: "/images/user_provided/generated-image-2026-02-23_14-29-24.jpg",
        color: "from-purple-500/80 to-pink-500/80",
    },
    {
        title: "Mug Design",
        description: "Creative mug designs for personal or business use",
        price: "₹399+",
        image: "/images/user_provided/generated-image-2026-02-23_14-29-25 (5).jpg",
        color: "from-amber-500/80 to-yellow-500/80",
    },
    {
        title: "Wedding Card",
        description: "Elegant digital wedding invitations",
        price: "₹799+",
        image: "/images/user_provided/generated-image-2026-02-24_08-35-13 (1).jpg",
        color: "from-rose-500/80 to-pink-500/80",
    },
    {
        title: "Book Design",
        description: "Professional book covers and layouts",
        price: "₹1499+",
        image: "/images/user_provided/generated-image-2026-02-24_10-45-46 (1).jpg",
        color: "from-indigo-500/80 to-purple-500/80",
    },
    {
        title: "Resume Design",
        description: "Professional resume templates and designs",
        price: "₹349+",
        image: "/images/user_provided/generated-image-2026-02-23_14-29-24 (3).jpg",
        color: "from-cyan-500/80 to-blue-500/80",
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
    const badgeText = data?.badge_text || "🎨 Premium Deliverables";
    const title = data?.title || "Graphic Design Services";
    const description = data?.description || "Professional design solutions for all your branding needs. We combine creative vision with strategic intent.";
    const designServices = data?.services || defaultDesignServices;

    return (
        <section className="py-24 md:py-32 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-4 py-1.5 text-sm md:text-base font-medium text-zinc-800 shadow-sm mb-6 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
                    >
                        {badgeText}
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6"
                    >
                        {title}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed"
                    >
                        {description}
                    </motion.p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {designServices.map((service: any, index: number) => (
                        <motion.div key={index} variants={itemVariants} className="h-full">
                            <Link href="/contact" className="block h-[380px] w-full group relative rounded-3xl overflow-hidden shadow-lg border border-zinc-200/50 dark:border-zinc-800/50 transition-all hover:-translate-y-2 hover:shadow-2xl">
                                {/* Background Image */}
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Overlay solid dark to light gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                                {/* Colorful hover tint layer */}
                                <div className={`absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500 bg-gradient-to-t ${service.color} mix-blend-overlay`} />

                                <div className="absolute inset-0 p-6 flex flex-col">
                                    {/* Price tag top right */}
                                    <div className="self-end bg-white/10 backdrop-blur-md text-white font-bold px-3 py-1.5 rounded-full border border-white/20 text-sm shadow-xl transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                                        Starting at {service.price}
                                    </div>

                                    {/* Content bottom */}
                                    <div className="mt-auto transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <h3 className="text-2xl font-bold text-white mb-2">
                                            {service.title}
                                        </h3>
                                        <p className="text-zinc-300 text-sm leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 line-clamp-2">
                                            {service.description}
                                        </p>

                                        <div className="flex items-center text-white font-semibold text-sm uppercase tracking-wider">
                                            Order Now
                                            <div className="ml-3 h-8 w-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-300">
                                                <ArrowRight className="h-4 w-4" />
                                            </div>
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
