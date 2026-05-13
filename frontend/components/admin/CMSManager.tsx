"use client";

import React, { useState } from "react";
import { CMSEditor } from "./CMSEditor";
import { 
    Home, 
    Info, 
    Phone, 
    Settings, 
    Sparkles, 
    Heart, 
    Camera, 
    Paintbrush, 
    Gamepad2, 
    ShoppingBag,
    ChevronRight,
    Search
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const pages = [
    { id: 'home', label: 'Home Page', icon: Home, description: 'Hero, Features, and Call to Action' },
    { id: 'about', label: 'About Studio', icon: Info, description: 'Team, Philosophy, and Trust' },
    { id: 'contact', label: 'Contact Us', icon: Phone, description: 'Forms, Address, and Support' },
    { id: 'site_config', label: 'Site Branding', icon: Settings, description: 'Logos, Socials, and Footer' },
    { id: 'photo-editor', label: 'Photo Core', icon: Camera, description: 'AI Photo Editor Settings' },
    { id: 'wedding-plan', label: 'Wedding AI', icon: Heart, description: 'Luxury Planner Defaults' },
    { id: 'guru-ji-art', label: 'Guru Ji Art', icon: Paintbrush, description: 'Divine Artwork Gallery' },
    { id: 'game-design', label: 'Game Studio', icon: Gamepad2, description: 'Character & World Concepts' },
    { id: 'vantage-ecom', label: 'Vantage Ecom', icon: ShoppingBag, description: 'E-commerce Growth Solutions' },
];

export function CMSManager() {
    const [selectedPage, setSelectedPage] = useState<string | null>(null);

    if (selectedPage) {
        const page = pages.find(p => p.id === selectedPage);
        return (
            <div className="flex flex-col h-full">
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => setSelectedPage(null)}
                            className="hover:bg-white/5"
                        >
                            <ChevronRight className="w-5 h-5 rotate-180" />
                        </Button>
                        <div>
                            <h2 className="text-xl font-black uppercase italic tracking-tighter">{page?.label} <span className="text-primary">Architect</span></h2>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{page?.description}</p>
                        </div>
                    </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-2 scrollbar-hide">
                    {renderEditor(selectedPage)}
                </div>
            </div>
        );
    }

    return (
        <div className="p-10 space-y-12">
            <div>
                <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-2">Content <span className="text-primary">Engine</span></h2>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Select a neural segment to modify</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pages.map((page, i) => (
                    <button
                        key={page.id}
                        onClick={() => setSelectedPage(page.id)}
                        className="glass-card rounded-[2.5rem] p-8 border-white/5 text-left group hover:border-primary/40 transition-all flex flex-col justify-between h-[280px]"
                    >
                        <div>
                            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:scale-110 transition-all mb-8">
                                <page.icon className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-black uppercase italic tracking-tight mb-2">{page.label}</h3>
                            <p className="text-xs text-slate-500 leading-relaxed">{page.description}</p>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                            Launch Architect <ChevronRight className="w-3 h-3" />
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}

function renderEditor(segment: string) {
    const commonTitle = pages.find(p => p.id === segment)?.label || "Page";

    return (
        <CMSEditor 
            segment={segment} 
            title={commonTitle} 
            description="Neural Content Synchronizer"
        >
            {(data, handlers) => (
                <div className="space-y-12">
                    {/* General Content Editor */}
                    <div className="grid grid-cols-1 gap-12">
                        {Object.entries(data || {}).map(([key, section]: [string, any]) => {
                            if (key === 'meta' || key === '_ssot_meta' || key === 'title') return null;
                            
                            return (
                                <div key={key} className="space-y-6 bg-[#020617]/40 p-8 rounded-[2rem] border border-white/5 ring-1 ring-white/5">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="text-sm font-black uppercase tracking-[0.2em] text-primary italic">{key.replace(/_/g, ' ')}</h4>
                                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {Object.entries(section || {}).map(([field, value]: [string, any]) => {
                                            if (typeof value === 'object' && !Array.isArray(value)) {
                                                // Nested object editor
                                                return (
                                                    <div key={field} className="md:col-span-2 space-y-4 pt-4 border-t border-white/5">
                                                        <CMSEditor.Label>{field}</CMSEditor.Label>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-4 border-l border-primary/20">
                                                            {Object.entries(value).map(([subField, subValue]: [string, any]) => (
                                                                <div key={subField} className="space-y-2">
                                                                    <CMSEditor.Label>{subField}</CMSEditor.Label>
                                                                    {subField.includes('image') || subField.includes('url') ? (
                                                                        <CMSEditor.ImageUpload 
                                                                            value={subValue} 
                                                                            onChange={(v) => handlers.handleNestedChange(key, field, { ...value, [subField]: v })} 
                                                                        />
                                                                    ) : (
                                                                        <CMSEditor.Input 
                                                                            value={subValue} 
                                                                            isTextarea={subValue?.length > 50}
                                                                            onChange={(v) => handlers.handleNestedChange(key, field, { ...value, [subField]: v })} 
                                                                        />
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                );
                                            }

                                            if (Array.isArray(value)) {
                                                return (
                                                    <div key={field} className="md:col-span-2 space-y-6 mt-4">
                                                        <div className="flex items-center justify-between">
                                                            <CMSEditor.Label>{field}</CMSEditor.Label>
                                                            <Button 
                                                                variant="outline" 
                                                                size="sm" 
                                                                className="border-primary/20 text-[10px] font-black h-7"
                                                                onClick={() => handlers.addArrayItem(key, field, {})}
                                                            >
                                                                + ADD ITEM
                                                            </Button>
                                                        </div>
                                                        <div className="grid grid-cols-1 gap-4">
                                                            {value.map((item, idx) => (
                                                                <div key={idx} className="bg-white/5 p-6 rounded-2xl border border-white/10 relative group/item">
                                                                    <Button 
                                                                        variant="ghost" 
                                                                        size="icon" 
                                                                        className="absolute top-2 right-2 w-6 h-6 text-red-500 opacity-0 group-hover/item:opacity-100 transition-opacity"
                                                                        onClick={() => handlers.removeArrayItem(key, field, idx)}
                                                                    >
                                                                        ×
                                                                    </Button>
                                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                        {Object.entries(item || {}).map(([f, v]: [string, any]) => (
                                                                            <div key={f} className="space-y-1">
                                                                                <CMSEditor.Label>{f}</CMSEditor.Label>
                                                                                {f.includes('image') || f.includes('url') || f.includes('icon') ? (
                                                                                    <CMSEditor.ImageUpload 
                                                                                        value={v} 
                                                                                        onChange={(val) => handlers.handleArrayChange(key, field, idx, f, val)} 
                                                                                    />
                                                                                ) : (
                                                                                    <CMSEditor.Input 
                                                                                        value={v} 
                                                                                        isTextarea={v?.length > 40}
                                                                                        onChange={(val) => handlers.handleArrayChange(key, field, idx, f, val)} 
                                                                                    />
                                                                                )}
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                );
                                            }

                                            return (
                                                <div key={field} className="space-y-2">
                                                    <CMSEditor.Label>{field}</CMSEditor.Label>
                                                    {field.includes('image') || field.includes('url') || field.includes('logo') ? (
                                                        <CMSEditor.ImageUpload 
                                                            value={value} 
                                                            onChange={(v) => handlers.handleNestedChange(key, field, v)} 
                                                        />
                                                    ) : (
                                                        <CMSEditor.Input 
                                                            value={value} 
                                                            isTextarea={value?.length > 100}
                                                            onChange={(v) => handlers.handleNestedChange(key, field, v)} 
                                                        />
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </CMSEditor>
    );
}
