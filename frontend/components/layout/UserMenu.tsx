"use client";

import Link from "next/link";
import { User, LogOut, Settings, LayoutDashboard, Heart, FileText } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PremiumButton } from "../shared/UI";

export function UserMenu() {
    // TODO: Replace with actual auth state
    const isLoggedIn = false;

    if (!isLoggedIn) {
        return (
            <div className="flex items-center gap-4">
                <Link href="/login" className="hidden md:block text-xs font-black italic uppercase tracking-widest text-slate-500 hover:text-indigo-600 transition-colors">
                    LOG IN
                </Link>
                <Link href="/signup" className="hidden sm:block">
                    <PremiumButton 
                        size="sm"
                        className="bg-slate-900 text-white hover:bg-indigo-600 rounded-2xl font-black italic uppercase tracking-widest text-[10px]"
                    >
                        START PROJECT
                    </PremiumButton>
                </Link>
            </div>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="relative h-12 w-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center group hover:bg-indigo-600 transition-all duration-500 overflow-hidden shadow-xl">
                    <User className="h-6 w-6 text-slate-400 group-hover:text-white transition-colors" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 p-4 rounded-[2rem] bg-white/80 backdrop-blur-3xl border-slate-100 shadow-2xl" align="end" forceMount>
                <DropdownMenuLabel className="font-normal p-4">
                    <div className="flex flex-col space-y-2">
                        <p className="text-sm font-black italic uppercase tracking-tighter leading-none">Gurucraftpro User</p>
                        <p className="text-xs leading-none text-slate-400 font-light italic">
                            user@example.com
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-slate-100" />
                <DropdownMenuGroup className="p-2">
                    <DropdownMenuItem className="rounded-xl p-3 focus:bg-indigo-50 group">
                        <LayoutDashboard className="mr-3 h-4 w-4 text-slate-400 group-focus:text-indigo-600" />
                        <span className="text-sm font-black italic uppercase tracking-tight text-slate-600 group-focus:text-slate-900">Dashboard</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rounded-xl p-3 focus:bg-indigo-50 group">
                        <FileText className="mr-3 h-4 w-4 text-slate-400 group-focus:text-indigo-600" />
                        <span className="text-sm font-black italic uppercase tracking-tight text-slate-600 group-focus:text-slate-900">My Projects</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rounded-xl p-3 focus:bg-indigo-50 group">
                        <Heart className="mr-3 h-4 w-4 text-slate-400 group-focus:text-indigo-600" />
                        <span className="text-sm font-black italic uppercase tracking-tight text-slate-600 group-focus:text-slate-900">Favorites</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rounded-xl p-3 focus:bg-indigo-50 group">
                        <Settings className="mr-3 h-4 w-4 text-slate-400 group-focus:text-indigo-600" />
                        <span className="text-sm font-black italic uppercase tracking-tight text-slate-600 group-focus:text-slate-900">Settings</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="bg-slate-100" />
                <DropdownMenuItem className="rounded-xl p-3 focus:bg-red-50 group m-2">
                    <LogOut className="mr-3 h-4 w-4 text-red-400" />
                    <span className="text-sm font-black italic uppercase tracking-tight text-red-600">Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
