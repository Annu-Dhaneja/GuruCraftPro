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
        <section className="py-32 md:py-48 bg-white dark:bg-black relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
                    <div className="max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 mb-8"
                        >
                            <div className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
                            <span className="text-xs font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400">{badgeText}</span>
                        </motion.div>
                        <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-10 leading-[0.85] whitespace-pre-line text-zinc-950 dark:text-white">
                            {title}
                        </h2>
                        <p className="text-zinc-500 dark:text-zinc-400 text-xl md:text-2xl font-light leading-relaxed max-w-2xl">
                            {description}
                        </p>
                    </div>
                    <Button size="lg" variant="outline" className="h-20 px-12 text-xl rounded-[2rem] border-zinc-200 dark:border-zinc-800 font-black group hover:bg-zinc-950 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all" asChild>
                        <Link href={buttonLink}>
                            {buttonText} <ArrowUpRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
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
