"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProjectModal } from "@/components/portfolio/ProjectModal";

const defaultProjects = [
    {
        id: "logo-modern tech",
        title: "Fintech Rebrand",
        category: "Branding",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop",
        size: "large",
    },
    {
        id: "wedding-card-elegant",
        title: "Eco Store UI",
        category: "UI/UX",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
        size: "small",
    }
];

export function PortfolioPreview({ data }: { data?: any }) {
    const title = data?.title || "Crafted with passion,\nengineered for impact.";
    const description = data?.description || "A curated selection of our recent projects, ranging from brand identities to complex digital interfaces.";
    const badgeText = data?.badge_text || "Selected Works";
    const buttonText = data?.button_text || "View All Projects";
    const buttonLink = data?.button_link || "/portfolio";
    const projects = data?.projects || defaultProjects;

    const [selectedProject, setSelectedProject] = useState<any | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleProjectClick = (e: React.MouseEvent, project: any) => {
        e.preventDefault();
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    return (
        <section className="py-48 md:py-64 bg-zinc-950 relative overflow-hidden border-b border-white/5">
            {/* Cinematic Background */}
            <div className="absolute inset-0 neural-mesh opacity-10 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-32 gap-10">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/10 bg-white/5 mb-10 backdrop-blur-xl"
                        >
                            <div className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400">{badgeText}</span>
                        </motion.div>
                        <h2 className="text-6xl md:text-[8rem] font-black tracking-tighter mb-10 leading-[0.8] whitespace-pre-line text-white uppercase italic text-shimmer">
                            {title}
                        </h2>
                        <p className="text-2xl text-zinc-500 font-light italic leading-relaxed max-w-2xl border-x border-white/5 px-10 py-4">
                            {description}
                        </p>
                    </div>
                    <Button size="lg" className="h-24 px-16 text-2xl rounded-[2.5rem] bg-white text-black hover:bg-indigo-600 hover:text-white font-black group shadow-2xl transition-all uppercase italic" asChild>
                        <Link href={buttonLink}>
                            {buttonText} <ArrowUpRight className="ml-4 h-8 w-8 transition-transform group-hover:translate-x-2 group-hover:-translate-y-2" />
                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
                    {projects.map((project: any, index: number) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            onClick={(e) => handleProjectClick(e, project)}
                            className={`group relative rounded-[2.5rem] overflow-hidden border border-zinc-100 dark:border-zinc-900 block cursor-pointer bg-zinc-50 dark:bg-zinc-950 ${project.size === "large" ? "md:col-span-2 aspect-[16/9] md:aspect-[2/1]" : "col-span-1 aspect-[4/3] md:aspect-square"
                                }`}
                        >
                            {/* Background Image with Zoom Effect */}
                            <div className="absolute inset-0">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-110"
                                />
                            </div>

                            {/* Shimmer Sweep Overlay */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1500ms] pointer-events-none" />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 transition-opacity duration-700 group-hover:opacity-90" />

                            {/* Content Layer */}
                            <div className="absolute inset-0 p-10 flex flex-col justify-end transform translate-y-6 group-hover:translate-y-0 transition-transform duration-700 ease-out">
                                <div className="z-10">
                                    <span className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl text-white text-xs font-black uppercase tracking-widest mb-6 border border-white/10">
                                        {project.category}
                                    </span>
                                    <div className="flex items-center justify-between gap-6">
                                        <h3 className="text-3xl md:text-5xl font-black tracking-tighter text-white break-words leading-none">{project.title}</h3>
                                        <div className="h-16 w-16 bg-white text-black rounded-full flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700 shadow-2xl">
                                            <ArrowUpRight className="h-8 w-8" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <ProjectModal 
                project={selectedProject}
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
            />
        </section>
    );
}
