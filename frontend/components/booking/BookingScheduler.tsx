"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, ChevronRight, ChevronLeft, Calendar as CalendarIcon, Clock, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Mock Services
const services = [
    { id: "discovery", title: "Discovery Call", duration: "15 min", price: "Free", description: "Initial chat to discuss your project needs and see if we're a good fit." },
    { id: "project-review", title: "Project Review", duration: "45 min", price: "₹12,000", description: "Deep dive into your existing project with actionable feedback." },
    { id: "consultation", title: "Strategic Consultation", duration: "60 min", price: "₹20,000", description: "Comprehensive strategy session for branding or product roadmap." },
];

export function BookingScheduler() {
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [selectedService, setSelectedService] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    const handleServiceSelect = (id: string) => {
        setSelectedService(id);
        setStep(2);
    };

    const handleTimeSelect = (time: string, date: string) => {
        setSelectedTime(time);
        setSelectedDate(date);
        setStep(3);
    };

    return (
        <section className="pb-24 container mx-auto px-4 md:px-6 max-w-5xl">
            {/* Progress Header */}
            <div className="mb-8 flex items-center justify-between border-b border-border pb-4">
                {step > 1 && (
                    <Button variant="ghost" className="gap-2 pl-0 hover:pl-2 transition-all" onClick={() => setStep(prev => prev - 1 as 1 | 2 | 3)}>
                        <ArrowLeft className="h-4 w-4" /> Back
                    </Button>
                )}
                <div className="flex gap-2 ml-auto">
                    {[1, 2, 3].map(s => (
                        <div key={s} className={cn("h-1.5 w-8 rounded-full transition-colors", step >= s ? "bg-indigo-500" : "bg-muted")} />
                    ))}
                </div>
            </div>

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <h2 className="text-2xl font-bold mb-6">Select a Service</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {services.map(service => (
                                <Card
                                    key={service.id}
                                    className="p-6 cursor-pointer hover:border-indigo-500 transition-all hover:shadow-lg group relative overflow-hidden"
                                    onClick={() => handleServiceSelect(service.id)}
                                >
                                    <div className="relative z-10">
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="bg-indigo-500/10 text-indigo-500 px-2 py-1 rounded text-xs font-semibold">{service.duration}</span>
                                            <span className="font-bold">{service.price}</span>
                                        </div>
                                        <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-500 transition-colors">{service.title}</h3>
                                        <p className="text-muted-foreground text-sm">{service.description}</p>
                                    </div>
                                    <div className="absolute inset-0 bg-indigo-50/50 dark:bg-indigo-950/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Card>
                            ))}
                        </div>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <h2 className="text-2xl font-bold mb-6">Choose a Date & Time</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Mock Calendar Grid (Visual Only) */}
                            <div className="col-span-2 border border-border rounded-xl p-6 bg-card">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="font-semibold">September 2024</h4>
                                    <div className="flex gap-1">
                                        <Button variant="ghost" size="icon"><ChevronLeft className="h-4 w-4" /></Button>
                                        <Button variant="ghost" size="icon"><ChevronRight className="h-4 w-4" /></Button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium text-muted-foreground mb-2">
                                    <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                                </div>
                                <div className="grid grid-cols-7 gap-1 md:gap-2">
                                    {Array.from({ length: 30 }).map((_, i) => (
                                        <button
                                            key={i}
                                            className={cn(
                                                "h-8 w-8 md:h-10 md:w-10 rounded-full flex items-center justify-center text-xs md:text-sm hover:bg-muted transition-colors disabled:opacity-20",
                                                i === 15 ? "bg-indigo-500 text-white hover:bg-indigo-600 shadow-md" : ""
                                            )}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Time Slots */}
                            <div className="border border-border rounded-xl p-6 bg-card h-fit">
                                <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Available Slots</h4>
                                <div className="space-y-2">
                                    {["09:00 AM", "10:30 AM", "02:00 PM", "04:00 PM"].map(time => (
                                        <Button
                                            key={time}
                                            variant="outline"
                                            className="w-full justify-start hover:border-indigo-500 hover:text-indigo-500"
                                            onClick={() => handleTimeSelect(time, "Sep 16, 2024")}
                                        >
                                            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                                            {time}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="max-w-xl mx-auto"
                    >
                        <div className="text-center mb-8">
                            <div className="h-16 w-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Check className="h-8 w-8 text-green-500" />
                            </div>
                            <h2 className="text-2xl font-bold">Almost Done!</h2>
                            <p className="text-muted-foreground">Enter your details to confirm your {selectedService} on {selectedDate} at {selectedTime}.</p>
                        </div>

                        <form className="space-y-6 border border-border rounded-xl p-8 bg-card" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>First Name</Label>
                                    <Input placeholder="John" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Last Name</Label>
                                    <Input placeholder="Doe" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Email Address</Label>
                                <Input type="email" placeholder="john@company.com" />
                            </div>
                            <div className="space-y-2">
                                <Label>Anything we should know?</Label>
                                <Textarea placeholder="Briefly describe what you'd like to discuss..." />
                            </div>
                            <Button className="w-full bg-indigo-600 hover:bg-indigo-700 h-11 text-lg">
                                Confirm Booking
                            </Button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
