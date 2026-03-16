"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload, Send, Loader2, ArrowRight, CheckCircle2 } from "lucide-react";

export function ProjectIntakeForm() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [completed, setCompleted] = useState(false);

    // Mock submission handler
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setCompleted(true);
        }, 2000);
    };

    if (completed) {
        return (
            <div className="max-w-xl mx-auto py-20 text-center container px-4">
                <div className="h-20 w-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle2 className="h-10 w-10" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Request Received!</h2>
                <p className="text-muted-foreground text-lg mb-8">
                    Thank you for sharing your project details. Our team will review your brief and get back to you with a proposal within 24-48 hours.
                </p>
                <Button onClick={() => window.location.href = '/'} variant="outline">Back to Home</Button>
            </div>
        );
    }

    return (
        <section className="pb-24 container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto bg-card border border-border rounded-2xl p-6 md:p-10 shadow-lg">

                {/* Progress Indicator */}
                <div className="flex items-center justify-between mb-8 text-sm font-medium text-muted-foreground">
                    <span className={step >= 1 ? "text-indigo-500" : ""}>1. Contact Details</span>
                    <span className={step >= 2 ? "text-indigo-500" : ""}>2. Project Info</span>
                    <span className={step >= 3 ? "text-indigo-500" : ""}>3. Budget & Timeline</span>
                </div>

                <div className="h-1 w-full bg-muted mb-10 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-indigo-500 transition-all duration-500"
                        style={{ width: `${(step / 3) * 100}%` }}
                    />
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-bottom-4">

                    {/* Step 1: Contact */}
                    {step === 1 && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name *</Label>
                                    <Input id="name" placeholder="Jane Doe" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Work Email *</Label>
                                    <Input id="email" type="email" placeholder="jane@company.com" required />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="company">Company / Organization</Label>
                                <Input id="company" placeholder="Acme Inc." />
                            </div>
                            <Button type="button" onClick={() => setStep(2)} className="w-full h-12">
                                Next Step <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    )}

                    {/* Step 2: Project Details */}
                    {step === 2 && (
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="category">Project Category *</Label>
                                <Select required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="branding">Brand Identity</SelectItem>
                                        <SelectItem value="web">Web Design / UI</SelectItem>
                                        <SelectItem value="social">Social Media Kit</SelectItem>
                                        <SelectItem value="print">Print / Packaging</SelectItem>
                                        <SelectItem value="full">Full Service</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="brief">Project Brief *</Label>
                                <Textarea
                                    id="brief"
                                    placeholder="Describe your project, goals, target audience, and any inspiration..."
                                    className="min-h-[200px]"
                                    required
                                />
                            </div>
                            <div className="flex gap-4">
                                <Button type="button" variant="outline" onClick={() => setStep(1)} className="w-1/3 h-12">
                                    Back
                                </Button>
                                <Button type="button" onClick={() => setStep(3)} className="w-2/3 h-12">
                                    Next Step <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Budget & Submit */}
                    {step === 3 && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="budget">Estimated Budget</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Range" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="small">₹80k - ₹2.5L</SelectItem>
                                            <SelectItem value="medium">₹2.5L - ₹6L</SelectItem>
                                            <SelectItem value="large">₹6L - ₹12L</SelectItem>
                                            <SelectItem value="enterprise">₹12L+</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="timeline">Ideal Timeline</Label>
                                    <Input id="timeline" placeholder="e.g. 4-6 weeks" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Reference Files (Optional)</Label>
                                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-3" />
                                    <p className="text-sm font-medium">Drop files here or click to upload</p>
                                    <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG (Max 20MB)</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                                <Checkbox id="terms" required className="mt-1" />
                                <Label htmlFor="terms" className="text-sm font-normal text-muted-foreground leading-snug">
                                    I understand that this is a request for a proposal and does not guarantee project acceptance. I agree to the privacy policy.
                                </Label>
                            </div>

                            <div className="flex gap-4">
                                <Button type="button" variant="outline" onClick={() => setStep(2)} className="w-1/3 h-12">
                                    Back
                                </Button>
                                <Button type="submit" className="w-2/3 h-12 bg-indigo-600 hover:bg-indigo-700 text-white" disabled={loading}>
                                    {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Submit Request"}
                                </Button>
                            </div>
                        </div>
                    )}

                </form>
            </div>
        </section>
    );
}
