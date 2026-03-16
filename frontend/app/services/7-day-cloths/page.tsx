"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Sparkles, Download, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ConsultationForm } from "@/components/consultation/ConsultationForm";
import { ConsultationDashboard } from "@/components/consultation/ConsultationDashboard";
import { Footer } from "@/components/footer/Footer";
import { getApiUrl } from "@/lib/utils";

export default function ClothingConsultationPage() {
    const [plan, setPlan] = useState<any[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerate = async (formData: { start_date: string; style_preference: string }) => {
        setIsLoading(true);
        try {
            const response = await fetch(getApiUrl("/api/v1/consultation/generate"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (data.status === "success") {
                setPlan(data.plan);
            }
        } catch (error) {
            console.error("Error generating plan:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-background flex flex-col">
            {/* Header / Nav */}
            <div className="container mx-auto px-4 py-6 border-b border-border/40">
                <Link href="/services" className="inline-flex items-center text-sm text-muted-foreground hover:text-white transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Services
                </Link>
            </div>

            <section className="py-12 md:py-20 relative overflow-hidden">
                {/* Background Glows */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] -z-10" />

                <div className="container mx-auto px-4 md:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-3xl mx-auto mb-16"
                    >
                        <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1.5 mb-6 text-purple-400">
                            <Calendar className="h-4 w-4" />
                            <span className="text-sm font-medium">Interactive Stylist Tool</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-white/60">
                            7-Day Clothing Consultation
                        </h1>
                        <p className="text-muted-foreground text-lg md:text-xl">
                            Our AI-powered algorithm curates a perfect weekly wardrobe based on your schedule and style preferences. From foundation days to weekend luxury.
                        </p>
                    </motion.div>

                    <div className="max-w-5xl mx-auto">
                        <AnimatePresence mode="wait">
                            {!plan ? (
                                <motion.div
                                    key="form"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-3xl p-8 md:p-12 shadow-2xl"
                                >
                                    <ConsultationForm onSubmit={handleGenerate} isLoading={isLoading} />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="dashboard"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-8"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <h2 className="text-2xl font-semibold flex items-center gap-2">
                                            <Sparkles className="h-5 w-5 text-purple-400" />
                                            Your Curated Weekly Plan
                                        </h2>
                                        <div className="flex gap-3">
                                            <Button variant="outline" onClick={() => setPlan(null)} className="rounded-full border-white/10">
                                                Redesign Plan
                                            </Button>
                                            <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full gap-2">
                                                <Download className="h-4 w-4" /> Download PDF
                                            </Button>
                                        </div>
                                    </div>
                                    <ConsultationDashboard plan={plan} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
