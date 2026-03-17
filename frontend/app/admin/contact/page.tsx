"use client";

import { CMSEditor } from "@/components/admin/CMSEditor";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

export default function ContactAdminPage() {
    return (
        <CMSEditor
            segment="contact"
            title="Contact CMS"
            description="Manage the details of the Contact page including hero, alternatives, process, and FAQs."
        >
            {(data, { handleNestedChange, handleArrayChange, addArrayItem, removeArrayItem }) => (
                <div className="space-y-12 animate-in fade-in max-w-6xl mx-auto">
                    <section className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                        <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-indigo-300">
                            <span className="w-2 h-8 bg-indigo-500 rounded-full" />
                            Contact Hero
                        </h2>
                        <div className="space-y-6 max-w-2xl">
                            <div>
                                <CMSEditor.Label>Title</CMSEditor.Label>
                                <CMSEditor.Input value={data.hero?.title} onChange={(v) => handleNestedChange("hero", "title", v)} />
                            </div>
                            <div>
                                <CMSEditor.Label>Description</CMSEditor.Label>
                                <CMSEditor.Input isTextarea value={data.hero?.description} onChange={(v) => handleNestedChange("hero", "description", v)} />
                            </div>
                        </div>
                    </section>
                    
                    <section className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                        <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-indigo-300">
                            <span className="w-2 h-8 bg-indigo-500 rounded-full" />
                            Alternative Contacts
                        </h2>
                        <div className="space-y-6 max-w-2xl">
                            <div>
                                <CMSEditor.Label>Section Title</CMSEditor.Label>
                                <CMSEditor.Input value={data.alternatives?.title} onChange={(v) => handleNestedChange("alternatives", "title", v)} />
                            </div>
                            <div>
                                <CMSEditor.Label>Email</CMSEditor.Label>
                                <CMSEditor.Input value={data.alternatives?.email} onChange={(v) => handleNestedChange("alternatives", "email", v)} />
                            </div>
                            <div>
                                <CMSEditor.Label>Booking Link</CMSEditor.Label>
                                <CMSEditor.Input value={data.alternatives?.booking_link} onChange={(v) => handleNestedChange("alternatives", "booking_link", v)} />
                            </div>
                            <div>
                                <CMSEditor.Label>Booking Text</CMSEditor.Label>
                                <CMSEditor.Input value={data.alternatives?.booking_text} onChange={(v) => handleNestedChange("alternatives", "booking_text", v)} />
                            </div>
                        </div>
                    </section>
                    
                    <section>
                        <div className="flex justify-between items-center mb-10">
                            <h2 className="text-2xl font-bold flex items-center gap-3 text-indigo-300">
                                <span className="w-2 h-8 bg-indigo-500 rounded-full" />
                                Contact Process
                            </h2>
                            <Button 
                                onClick={() => addArrayItem("process", "steps", { title: "New Step", desc: "Step description", icon: "MessageSquare" })}
                                className="bg-indigo-600 hover:bg-indigo-700"
                            >
                                <Plus className="w-4 h-4 mr-2" /> Add Process Step
                            </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {data.process?.steps?.map((item: any, i: number) => (
                                <div key={i} className="bg-slate-900/40 p-6 rounded-2xl border border-white/5 shadow-xl relative group">
                                    <div className="space-y-4">
                                        <div>
                                            <CMSEditor.Label>Title</CMSEditor.Label>
                                            <CMSEditor.Input value={item.title} onChange={(v) => handleArrayChange("process", "steps", i, "title", v)} />
                                        </div>
                                        <div>
                                            <CMSEditor.Label>Description</CMSEditor.Label>
                                            <CMSEditor.Input value={item.desc} onChange={(v) => handleArrayChange("process", "steps", i, "desc", v)} />
                                        </div>
                                        <div>
                                            <CMSEditor.Label>Icon Name</CMSEditor.Label>
                                            <CMSEditor.Input value={item.icon} onChange={(v) => handleArrayChange("process", "steps", i, "icon", v)} />
                                        </div>
                                    </div>
                                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400 hover:bg-red-500/10 hover:text-red-500" onClick={() => removeArrayItem("process", "steps", i)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <div className="flex justify-between items-center mb-10">
                            <h2 className="text-2xl font-bold flex items-center gap-3 text-indigo-300">
                                <span className="w-2 h-8 bg-indigo-500 rounded-full" />
                                Contact FAQs (Overrides Global FAQs based on logic)
                            </h2>
                            <Button 
                                onClick={() => addArrayItem("", "faqs", { q: "New Question...", a: "Detailed answer..." })}
                                className="bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/20"
                            >
                                <Plus className="w-4 h-4 mr-2" /> Add FAQ
                            </Button>
                        </div>
                        
                        <div className="space-y-4">
                            {data.faqs?.map((faq: any, i: number) => (
                                <div key={i} className="group bg-slate-900/40 p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-300 shadow-xl relative pr-16 flex flex-col gap-4">
                                    <div>
                                        <CMSEditor.Label>Question</CMSEditor.Label>
                                        <CMSEditor.Input value={faq.q} onChange={(v) => handleArrayChange("", "faqs", i, "q", v)} placeholder="Question" />
                                    </div>
                                    <div>
                                        <CMSEditor.Label>Answer</CMSEditor.Label>
                                        <CMSEditor.Input value={faq.a} isRich onChange={(v) => handleArrayChange("", "faqs", i, "a", v)} placeholder="Detailed Answer..." />
                                    </div>
                                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button variant="ghost" size="icon" className="h-10 w-10 text-red-400 hover:bg-red-500/10 hover:text-red-500" onClick={() => removeArrayItem("", "faqs", i)}>
                                            <Trash2 className="h-5 w-5" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            )}
        </CMSEditor>
    );
}
