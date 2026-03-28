"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Trophy, Zap, Gem, Users, Briefcase, Layers, Headset } from "lucide-react";

const strengths = [
    {
        icon: <Trophy className="h-6 w-6 text-yellow-500" />,
        title: "Expert Team",
        desc: "Skilled professionals with years of industry experience."
    },
    {
        icon: <Zap className="h-6 w-6 text-indigo-500" />,
        title: "Fast Delivery",
        desc: "Quick turnaround without compromising quality."
    },
    {
        icon: <Gem className="h-6 w-6 text-pink-500" />,
        title: "Premium Quality",
        desc: "Industry-leading standards in every project."
    }
];

const stats = [
    { value: "500+", label: "Projects Done", icon: <Briefcase className="h-5 w-5 text-indigo-400 mb-2" /> },
    { value: "200+", label: "Happy Clients", icon: <Users className="h-5 w-5 text-indigo-400 mb-2" /> },
    { value: "7", label: "Distinct Services", icon: <Layers className="h-5 w-5 text-indigo-400 mb-2" /> },
    { value: "24/7", label: "Customer Support", icon: <Headset className="h-5 w-5 text-indigo-400 mb-2" /> },
];

export function TrustSection({ data }: { data?: any }) {
    const sectionTitle = data?.title || "Why clients choose Gurucraftpro";
    const sectionDesc = data?.description || "Design is a partnership. We prioritize transparency, quality, and speed.";
    const trustStrengths = data?.strengths || strengths;
    const trustStats = data?.stats || stats;

    return (
        <section className="py-24 bg-muted/40 border-y border-border relative overflow-hidden">
            {/* Soft Background Accents */}
            <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">

                    {/* Core Features */}
                    <div>
                        <h3 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-2">Core Features & Strengths</h3>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6" dangerouslySetInnerHTML={{ __html: sectionTitle }} />
                        <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                            {sectionDesc}
                        </p>

                        <div className="space-y-6">
                            {trustStrengths.map((item: any, i: number) => {
                                const Icon = strengths.find(s => s.title === item.title)?.icon || <Trophy className="h-6 w-6 text-yellow-500" />;
                                return (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    key={item.title}
                                    className="flex items-start gap-4 p-4 rounded-2xl hover:bg-background border border-transparent hover:border-border/50 hover:shadow-sm transition-all"
                                >
                                    <div className="p-3 bg-background rounded-xl shadow-sm border border-border/50 shrink-0">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold mb-1">{item.title}</h4>
                                        <p className="text-muted-foreground">{item.desc}</p>
                                    </div>
                                </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Statistics Box */}
                    <div className="bg-background rounded-3xl p-8 md:p-12 shadow-2xl border border-indigo-500/10 relative">
                        <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-2xl -z-10" />

                        <h3 className="text-2xl font-bold mb-8 text-center">Company Milestones</h3>

                        <div className="grid grid-cols-2 gap-x-8 gap-y-12">
                            {trustStats.map((stat: any, i: number) => {
                                const Icon = stats.find(s => s.label === stat.label)?.icon || <Briefcase className="h-5 w-5 text-indigo-400 mb-2" />;
                                return (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    key={stat.label}
                                    className="flex flex-col items-center text-center"
                                >
                                    <div className="flex flex-col items-center justify-center p-4 bg-indigo-50/50 dark:bg-indigo-500/5 rounded-2xl border border-indigo-100 dark:border-indigo-500/10 w-full mb-3 aspect-video">
                                        {Icon}
                                        <span className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/70">
                                            {stat.value}
                                        </span>
                                    </div>
                                    <span className="font-medium text-muted-foreground">{stat.label}</span>
                                </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
