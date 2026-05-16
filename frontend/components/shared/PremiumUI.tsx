"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2, AlertCircle, ChevronLeft, ChevronRight, X } from "lucide-react";

// ── BUTTONS ───────────────────────────────────────────────────────────

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "premium";
    size?: "sm" | "md" | "lg" | "xl";
    isLoading?: boolean;
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
    fullWidth?: boolean;
}

export function PremiumButton({
    variant = "primary",
    size = "md",
    isLoading = false,
    icon,
    iconPosition = "left",
    fullWidth = false,
    className,
    children,
    disabled,
    ...props
}: ButtonProps) {
    const baseStyles = "relative inline-flex items-center justify-center font-black tracking-tighter uppercase italic transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group";
    
    const variants = {
        primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-500/20",
        secondary: "bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-900/20",
        outline: "border-2 border-slate-200 text-slate-900 hover:border-indigo-600 hover:text-indigo-600 bg-transparent",
        ghost: "text-slate-600 hover:bg-slate-100 bg-transparent",
        premium: "bg-transparent text-slate-900 border-2 border-indigo-600 hover:text-white group"
    };

    const sizes = {
        sm: "px-4 py-2 text-xs",
        md: "px-8 py-4 text-sm",
        lg: "px-12 py-5 text-lg",
        xl: "px-16 py-6 text-xl",
    };

    return (
        <button
            className={cn(
                baseStyles,
                variants[variant],
                sizes[size],
                fullWidth && "w-full",
                className
            )}
            disabled={isLoading || disabled}
            {...props}
        >
            {/* Premium Hover Layer */}
            {variant === "premium" && (
                <div className="absolute inset-0 bg-indigo-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out -z-10" />
            )}
            
            <span className="relative z-10 flex items-center gap-2">
                {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                {!isLoading && icon && iconPosition === "left" && icon}
                {children}
                {!isLoading && icon && iconPosition === "right" && icon}
            </span>

            {/* Shimmer Effect */}
            <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer" />
        </button>
    );
}

// ── INPUTS ────────────────────────────────────────────────────────────

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
}

export function PremiumInput({ label, error, icon, className, ...props }: InputProps) {
    return (
        <div className="w-full mb-6">
            {label && (
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 italic">
                    {label}
                </label>
            )}
            <div className="relative group">
                {icon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                        {icon}
                    </div>
                )}
                <input
                    className={cn(
                        "w-full bg-slate-50 border-2 border-slate-100 px-6 py-4 rounded-none focus:outline-none focus:border-indigo-600 focus:bg-white transition-all text-slate-900 font-medium placeholder:text-slate-300",
                        icon && "pl-12",
                        error && "border-red-500 focus:border-red-500",
                        className
                    )}
                    {...props}
                />
            </div>
            {error && (
                <p className="mt-2 text-xs text-red-500 font-bold italic flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {error}
                </p>
            )}
        </div>
    );
}

// ── LOADERS & EMPTY STATES ───────────────────────────────────────────

export function PremiumLoader({ fullScreen = false }: { fullScreen?: boolean }) {
    return (
        <div className={cn(
            "flex flex-col items-center justify-center p-12",
            fullScreen && "fixed inset-0 bg-white/80 backdrop-blur-xl z-[999]"
        )}>
            <div className="relative">
                <div className="w-20 h-20 border-4 border-slate-100 rounded-full animate-pulse" />
                <div className="absolute inset-0 w-20 h-20 border-t-4 border-indigo-600 rounded-full animate-spin" />
            </div>
            <p className="mt-6 text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600 animate-pulse">
                Synthesizing Excellence...
            </p>
        </div>
    );
}

export function PremiumEmptyState({ title, description, action }: { title: string, description: string, action?: React.ReactNode }) {
    return (
        <div className="text-center py-24 px-8 border-2 border-dashed border-slate-100">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-10 h-10 text-slate-200" />
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tighter italic mb-2">{title}</h3>
            <p className="text-slate-500 font-light max-w-md mx-auto mb-8">{description}</p>
            {action}
        </div>
    );
}

// ── MODALS ────────────────────────────────────────────────────────────

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    size?: "sm" | "md" | "lg" | "xl" | "full";
}

export function PremiumModal({ isOpen, onClose, title, children, size = "md" }: ModalProps) {
    const sizes = {
        sm: "max-w-md",
        md: "max-w-2xl",
        lg: "max-w-4xl",
        xl: "max-w-6xl",
        full: "max-w-[95vw]"
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xl"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className={cn(
                            "relative w-full bg-white shadow-2xl overflow-hidden flex flex-col",
                            sizes[size]
                        )}
                    >
                        {/* Modal Header */}
                        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
                            <h2 className="text-2xl font-black uppercase tracking-tighter italic">{title}</h2>
                            <button onClick={onClose} className="p-2 hover:bg-slate-100 transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        
                        {/* Modal Content */}
                        <div className="flex-1 overflow-y-auto p-8">
                            {children}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

// ── PAGINATION ────────────────────────────────────────────────────────

export function PremiumPagination({ current, total, onChange }: { current: number, total: number, onChange: (page: number) => void }) {
    if (total <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-2 mt-12">
            <button
                disabled={current === 1}
                onClick={() => onChange(current - 1)}
                className="p-4 border border-slate-200 hover:border-indigo-600 disabled:opacity-30 disabled:hover:border-slate-200 transition-all"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-2">
                {[...Array(total)].map((_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => onChange(i + 1)}
                        className={cn(
                            "w-12 h-12 flex items-center justify-center font-black italic transition-all border",
                            current === i + 1 
                                ? "bg-indigo-600 border-indigo-600 text-white" 
                                : "border-slate-200 hover:border-indigo-600"
                        )}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>

            <button
                disabled={current === total}
                onClick={() => onChange(current + 1)}
                className="p-4 border border-slate-200 hover:border-indigo-600 disabled:opacity-30 disabled:hover:border-slate-200 transition-all"
            >
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
}

// ── TABLES ────────────────────────────────────────────────────────────

export function PremiumTable({ headers, children }: { headers: string[], children: React.ReactNode }) {
    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="border-b-2 border-slate-100">
                        {headers.map((header, i) => (
                            <th key={i} className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    {children}
                </tbody>
            </table>
        </div>
    );
}
