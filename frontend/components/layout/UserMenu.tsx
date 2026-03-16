"use client";

import Link from "next/link";
import { User, LogOut, Settings, LayoutDashboard, Heart, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UserMenu() {
    // TODO: Replace with actual auth state
    const isLoggedIn = false;

    if (!isLoggedIn) {
        return (
            <div className="flex items-center gap-2 md:gap-4">
                <Button variant="ghost" asChild className="hidden md:flex">
                    <Link href="/login">Log in</Link>
                </Button>
                <Button asChild className="hidden sm:flex bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-0">
                    <Link href="/signup">Try AI Free</Link>
                </Button>
            </div>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center border border-border">
                        <User className="h-5 w-5" />
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">Gurucraftpro User</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            user@example.com
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <FileText className="mr-2 h-4 w-4" />
                        <span>My Projects</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Heart className="mr-2 h-4 w-4" />
                        <span>Favorites</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
