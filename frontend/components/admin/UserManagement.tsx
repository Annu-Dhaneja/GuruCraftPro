"use client";

import React, { useEffect, useState } from "react";
import { 
    Search, 
    MoreHorizontal, 
    UserPlus, 
    Mail, 
    Shield, 
    Clock,
    CheckCircle2,
    XCircle
} from "lucide-react";
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { getApiUrl, safeFetch } from "@/lib/utils";

export function UserManagement() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await safeFetch(getApiUrl("/api/v1/auth/users"), {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            if (res.ok) setUsers(await res.json());
            setLoading(false);
        };
        fetchUsers();
    }, []);

    const getRoleBadge = (role: string) => {
        switch (role) {
            case "super-admin": return <Badge className="bg-rose-500/10 text-rose-400 border-rose-500/20 uppercase text-[10px] tracking-widest font-black px-3">Super Admin</Badge>;
            case "admin": return <Badge className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 uppercase text-[10px] tracking-widest font-black px-3">Admin</Badge>;
            case "editor": return <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 uppercase text-[10px] tracking-widest font-black px-3">Editor</Badge>;
            default: return <Badge variant="outline" className="text-[10px] tracking-widest font-black px-3 uppercase text-slate-500">User</Badge>;
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-6">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                    <Input 
                        placeholder="Audit identity by username or email..." 
                        className="pl-12 h-14 bg-white/5 border-white/10 rounded-2xl focus:ring-indigo-500/50 italic font-medium"
                    />
                </div>
                <Button className="h-14 px-8 rounded-2xl bg-indigo-600 hover:bg-white hover:text-black font-black transition-all gap-2">
                    <UserPlus size={18} /> INITIATE USER
                </Button>
            </div>

            <div className="glass-card rounded-[3rem] overflow-hidden border border-white/5">
                <Table>
                    <TableHeader className="bg-white/5">
                        <TableRow className="hover:bg-transparent border-white/5">
                            <TableHead className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Identity</TableHead>
                            <TableHead className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Privilege</TableHead>
                            <TableHead className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Status</TableHead>
                            <TableHead className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Enrolled At</TableHead>
                            <TableHead className="text-right px-8"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((u) => (
                            <TableRow key={u.id} className="hover:bg-white/[0.02] border-white/5 transition-colors">
                                <TableCell className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-2xl bg-slate-800 flex items-center justify-center font-black text-slate-500">
                                            {u.username.slice(0,2).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-bold tracking-tight text-white">{u.name || u.username}</p>
                                            <p className="text-xs text-slate-500">{u.email || "No email synchronized"}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>{getRoleBadge(u.role)}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-widest">
                                        <CheckCircle2 size={14} /> Active
                                    </div>
                                </TableCell>
                                <TableCell className="text-slate-500 text-xs font-medium italic">
                                    {new Date(u.created_at).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="text-right px-8">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="text-slate-500 hover:text-white rounded-xl">
                                                <MoreHorizontal size={20} />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="bg-slate-900 border-white/10 rounded-2xl p-2 min-w-[200px]">
                                            <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-slate-500 p-3">Actions</DropdownMenuLabel>
                                            <DropdownMenuItem className="rounded-xl p-3 cursor-pointer hover:bg-white/5 gap-3">
                                                <Shield size={16} className="text-indigo-400" /> <span>Elevate Privileges</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="rounded-xl p-3 cursor-pointer hover:bg-white/5 gap-3">
                                                <Mail size={16} className="text-slate-400" /> <span>Signal User</span>
                                            </DropdownMenuItem>
                                            <div className="h-[1px] bg-white/5 my-2" />
                                            <DropdownMenuItem className="rounded-xl p-3 cursor-pointer hover:bg-rose-500/10 text-rose-400 gap-3">
                                                <XCircle size={16} /> <span>Terminate Access</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
