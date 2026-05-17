"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, Tag } from "lucide-react";
import { format, parseISO } from "date-fns";

export function ConsultationDashboard({ plan }: { plan: any[] }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-6">
            {plan.map((day, index) => (
                <motion.div
                    key={day.day}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col h-full bg-card/40 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden group hover:border-purple-500/30 transition-all duration-300 shadow-lg"
                >
                    {/* Date Badge */}
                    <div className="p-4 border-b border-white/5 bg-white/5 flex flex-col items-center">
                        <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">
                            Day {day.day}
                        </span>
                        <span className="text-sm font-semibold text-white">
                            {format(parseISO(day.date), "EEE, MMM d")}
                        </span>
                    </div>

                    {/* Image Area */}
                    <div className="relative aspect-[4/5] w-full overflow-hidden">
                        <Image
                            src={day.image}
                            alt={day.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                        
                        {/* Phase Badge */}
                        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
                            <div className="px-2 py-1 rounded-md bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-medium text-white/90">
                                {day.phase}
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex-grow flex flex-col">
                        <h3 className="text-sm font-semibold mb-2 line-clamp-2 text-white group-hover:text-purple-300 transition-colors">
                            {day.title}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed mb-4">
                            {day.description}
                        </p>
                        
                        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-medium">
                                <Clock className="h-3 w-3" /> Ready
                            </div>
                            <div className="flex items-center gap-1 text-[10px] text-purple-400 font-bold uppercase tracking-tighter">
                                <Tag className="h-3 w-3" /> Wardrobe
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
