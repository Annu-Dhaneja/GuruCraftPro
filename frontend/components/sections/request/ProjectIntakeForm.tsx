"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload, Send, Loader2, ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { servicesService } from "@/services/api/services";

export function ProjectIntakeForm() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [completed, setCompleted] = useState(false);
    
    // Form State
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        category: "",
        brief: "",
        budget: "",
        timeline: ""
    });
    const [file, setFile] = useState<File | null>(null);

    const updateField = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = new FormData();
            data.append("name", formData.name);
            data.append("email", formData.email);
            data.append("phone", formData.phone);
            data.append("company", formData.company);
            data.append("inquiry_type", formData.category);
            data.append("message", formData.brief);
            data.append("budget", formData.budget);
            data.append("deadline", formData.timeline);
            data.append("page_source", typeof window !== "undefined" ? window.location.pathname : "/request");
            
            if (file) {
                data.append("attachment", file);
            }

            await servicesService.submitProjectIntake(data);
            setCompleted(true);
            toast.success("Request submitted successfully!");
        } catch (error: any) {
            console.error("Submission error:", error);
            const errMsg = error.data?.detail || "Failed to submit request.";
            toast.error(errMsg);
        } finally {
            setLoading(false);
        }
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
                                    <Input 
                                        id="name" 
                                        placeholder="Jane Doe" 
                                        required 
                                        value={formData.name}
                                        onChange={(e) => updateField("name", e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Work Email *</Label>
                                    <Input 
                                        id="email" 
                                        type="email" 
                                        placeholder="jane@company.com" 
                                        required 
                                        value={formData.email}
                                        onChange={(e) => updateField("email", e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input 
                                        id="phone" 
                                        type="tel"
                                        placeholder="+1 (555) 000-0000" 
                                        value={formData.phone}
                                        onChange={(e) => updateField("phone", e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="company">Company / Organization</Label>
                                    <Input 
                                        id="company" 
                                        placeholder="Acme Inc." 
                                        value={formData.company}
                                        onChange={(e) => updateField("company", e.target.value)}
                                    />
                                </div>
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
                                <Select 
                                    required 
                                    value={formData.category} 
                                    onValueChange={(val) => updateField("category", val)}
                                >
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
                                    value={formData.brief}
                                    onChange={(e) => updateField("brief", e.target.value)}
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
                                    <Select 
                                        value={formData.budget}
                                        onValueChange={(val) => updateField("budget", val)}
                                    >
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
                                    <Input 
                                        id="timeline" 
                                        placeholder="e.g. 4-6 weeks" 
                                        value={formData.timeline}
                                        onChange={(e) => updateField("timeline", e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Reference Files (Optional)</Label>
                                <div 
                                    className={cn(
                                        "border-2 border-dashed border-border rounded-xl p-8 text-center hover:bg-muted/50 transition-colors cursor-pointer relative",
                                        file && "border-indigo-500 bg-indigo-500/5"
                                    )}
                                >
                                    <input 
                                        type="file" 
                                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                        className="absolute inset-0 opacity-0 cursor-pointer" 
                                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                                    />
                                    <Upload className={cn("h-8 w-8 mx-auto mb-3", file ? "text-indigo-500" : "text-muted-foreground")} />
                                    <p className="text-sm font-medium">{file ? file.name : "Drop files here or click to upload"}</p>
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
