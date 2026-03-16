"use client";

import { useState } from "react";
import Link from "next/link";
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
        <section className="py-24 md:py-32 container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                <div className="max-w-xl">
                    <Badge variant="outline" className="mb-4 text-indigo-500 border-indigo-200 bg-indigo-50">{badgeText}</Badge>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-tight whitespace-pre-line">
                        {title}
                    </h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        {description}
                    </p>
                </div>
                <Button size="lg" variant="ghost" className="gap-2 group text-base" asChild>
                    <Link href={buttonLink}>
                        {buttonText} <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {projects.map((project: any) => (
                    <div
                        key={project.id}
                        onClick={(e) => handleProjectClick(e, project)}
                        className={`group relative rounded-2xl overflow-hidden border border-border/50 bg-muted block cursor-pointer ${project.size === "large" ? "md:col-span-2 aspect-[16/9] md:aspect-[2/1]" : "col-span-1 aspect-[4/3] md:aspect-square"
                            }`}
                    >
                        {/* Background Image with Zoom Effect */}
                        <div className="absolute inset-0">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                        </div>

                        {/* Gradient Overlay - Always visible but subtle, stronger on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-70" />

                        {/* Content Layer */}
                        <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end">
                            <div className="transform transition-transform duration-300 translate-y-4 group-hover:translate-y-0">
                                <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white/90 text-xs font-medium mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                    {project.category}
                                </span>
                                <div className="flex items-center justify-between gap-4">
                                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white break-words">{project.title}</h3>
                                    <div className="h-10 w-10 bg-white text-black rounded-full flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                                        <ArrowUpRight className="h-5 w-5" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <ProjectModal 
                project={selectedProject}
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
            />
        </section>
    );
}
