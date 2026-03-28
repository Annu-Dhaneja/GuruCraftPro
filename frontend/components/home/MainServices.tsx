"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
        <section ref={containerRef} className="py-24 md:py-32 bg-zinc-950 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
                >
                    <div className="max-w-3xl">
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-6">
                            {title_prefix} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                                {title_target}
                            </span>
                        </h2>
                        <p className="text-xl text-zinc-400 leading-relaxed font-light">
                            {subtitle}
                        </p>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className={`group relative h-[400px] overflow-hidden rounded-3xl ${service.colSpan === 2 ? 'md:col-span-2' : ''}`}
                        >
                            <Link href={service.link} className="block w-full h-full">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="absolute inset-0 p-8 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                                    <p className="text-zinc-300 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-2">
                                        {service.description}
                                    </p>

                                    <div className="flex items-center text-indigo-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                                        Explore <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform duration-300" />
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
