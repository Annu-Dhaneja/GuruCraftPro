"use client";

import React from "react";
import { Shield, Lock, Eye, Edit, Trash, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ROLES = [
    { name: "super-admin", desc: "Full system owner access. Bypass all checks.", permissions: { cms: ["*"], users: ["*"], forms: ["*"] } },
    { name: "admin", desc: "General administrative access.", permissions: { cms: ["read", "write"], users: ["read"], forms: ["read", "write"] } },
    { name: "editor", desc: "Content editing access only.", permissions: { cms: ["read", "write"], media: ["read", "write"] } },
];

export function RoleManagement() {
    return (
        <div className="space-y-12">
            <div className="flex justify-between items-center">
                <p className="text-slate-500 font-medium italic">Defining granular permission matrices for strategic operations.</p>
                <Button className="rounded-2xl bg-indigo-600 hover:bg-white hover:text-black font-black px-8 h-14 transition-all gap-2">
                    <Plus size={18} /> DEFINE ROLE
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {ROLES.map((role) => (
                    <div key={role.name} className="glass-card p-10 rounded-[3rem] border border-white/5 relative overflow-hidden group">
                        <div className="flex justify-between items-start mb-10 relative z-10">
                            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 group-hover:bg-indigo-600 transition-all duration-500">
                                <Shield className="w-7 h-7 text-indigo-400 group-hover:text-white" />
                            </div>
                            <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest border-indigo-500/30 text-indigo-400 px-3">System Role</Badge>
                        </div>

                        <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-4 group-hover:text-indigo-400 transition-colors">{role.name}</h3>
                        <p className="text-slate-500 text-sm font-medium italic mb-10 leading-relaxed">{role.desc}</p>

                        <div className="space-y-6 mb-12">
                            {Object.entries(role.permissions).map(([module, actions]) => (
                                <div key={module} className="flex items-center justify-between py-3 border-b border-white/5">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 italic">{module}</span>
                                    <div className="flex gap-2">
                                        {(actions as string[]).map(a => (
                                            <Badge key={a} variant="secondary" className="bg-white/5 text-[9px] font-bold uppercase text-slate-400 border-none">{a}</Badge>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-4">
                            <Button variant="outline" className="flex-1 rounded-2xl border-white/5 text-xs font-bold hover:bg-white hover:text-black">
                                <Edit size={14} className="mr-2" /> EDIT
                            </Button>
                            <Button variant="outline" size="icon" className="rounded-2xl border-white/5 hover:bg-rose-500/10 hover:text-rose-400">
                                <Lock size={14} />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
