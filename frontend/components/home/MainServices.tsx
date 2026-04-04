"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";

interface Service {
    title: string;
    description: string;
    image: string;
    link: string;
    colSpan?: number;
}

interface MainServicesProps {
    data: {
        title_prefix: string;
        title_target: string;
        subtitle: string;
        services: Service[];
    };
}

export function MainServices({ data }: MainServicesProps) {
    const services = data?.services || [];
    const title_prefix = data?.title_prefix || "Comprehensive";
    const title_target = data?.title_target || "Design Services";
    const subtitle = data?.subtitle || "From brand identity to digital products, we deliver excellence.";

    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

    return (
        <section ref={containerRef} className="py-48 md:py-64 bg-zinc-950 relative overflow-hidden border-b border-white/5">
            <div className="absolute inset-0 neural-mesh opacity-10 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="flex flex-col md:flex-row justify-between items-end mb-32 gap-10"
                >
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/10 bg-white/5 mb-10 backdrop-blur-xl">
                            <Layers className="h-4 w-4 text-indigo-400" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400">Core Ecosystem</span>
                        </div>
                        <h2 className="text-6xl md:text-[10rem] font-black tracking-tighter text-white mb-10 leading-[0.8] uppercase italic">
                            {title_prefix} <br />
                            <span className="text-shimmer drop-shadow-[0_0_60px_rgba(139,92,246,0.3)]">
                                {title_target}
                            </span>
                        </h2>
                        <p className="text-2xl text-zinc-500 font-light italic leading-relaxed max-w-2xl border-x border-white/5 px-10 py-4">
                            {subtitle}
                        </p>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className={`group relative h-[500px] overflow-hidden rounded-[2.5rem] border border-white/5 hover:border-white/20 transition-all duration-700 shadow-2xl ${service.colSpan === 2 ? 'md:col-span-2' : ''}`}
                        >
                            <Link href={service.link} className="block w-full h-full">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-700" />

                                <div className="absolute inset-0 p-12 flex flex-col justify-end transform translate-y-6 group-hover:translate-y-0 transition-transform duration-700 ease-out">
                                    <h3 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tighter">{service.title}</h3>
                                    <p className="text-zinc-400 text-lg mb-8 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 line-clamp-2 font-light leading-relaxed">
                                        {service.description}
                                    </p>

                                    <div className="flex items-center gap-4 text-white text-xl font-black opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200">
                                        <span className="relative overflow-hidden group/btn">
                                            VIEW PROJECT
                                            <span className="absolute bottom-0 left-0 w-full h-1 bg-indigo-500 transform translate-x-[-101%] group-hover/btn:translate-x-0 transition-transform duration-500" />
                                        </span>
                                        <ArrowRight className="h-6 w-6 group-hover:translate-x-3 transition-transform duration-500" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
