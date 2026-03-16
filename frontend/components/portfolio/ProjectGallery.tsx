"use client";

import { motion } from "framer-motion";

export function ProjectGallery({ images }: { images: string[] }) {
    return (
        <section className="py-20 bg-muted/10">
            <div className="container mx-auto px-4 md:px-6">
                <div className="space-y-12">
                    {images.map((img, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="rounded-xl overflow-hidden shadow-lg"
                        >
                            <img src={img} alt={`Gallery ${i}`} className="w-full h-auto" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
