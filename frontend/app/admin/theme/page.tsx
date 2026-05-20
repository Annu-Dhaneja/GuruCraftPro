"use client";

import React, { useEffect, useState } from "react";
import { 
  Palette, PaletteIcon, Sliders, Layout, CheckCircle, 
  HelpCircle, Eye, Loader2, Save, Sparkles, RefreshCw,
  Type, Grid, Maximize2, Moon, Sun, Layers, ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { fetchWithAuth, getApiUrl, safeFetch } from "@/lib/utils";
import Link from "next/link";

// Pre-curated, harmonious premium color presets
const COLOR_PRESETS = [
  {
    name: "Classic Indigo",
    primary: "#6366f1",
    accent: "#a5b4fc",
    background: "#020617",
    foreground: "#f8fafc",
    cardBg: "rgba(15, 23, 42, 0.4)",
    radius: "16px",
    glassmorphism: "subtle"
  },
  {
    name: "Royal Lavender",
    primary: "#8b5cf6",
    accent: "#c084fc",
    background: "#0c0a0f",
    foreground: "#faf5ff",
    cardBg: "rgba(24, 18, 30, 0.4)",
    radius: "20px",
    glassmorphism: "heavy"
  },
  {
    name: "Sacred Saffron",
    primary: "#f97316",
    accent: "#fdba74",
    background: "#0c0500",
    foreground: "#fff7ed",
    cardBg: "rgba(26, 12, 0, 0.5)",
    radius: "12px",
    glassmorphism: "subtle"
  },
  {
    name: "Emerald Zen",
    primary: "#10b981",
    accent: "#6ee7b7",
    background: "#022c22",
    foreground: "#ecfdf5",
    cardBg: "rgba(6, 78, 59, 0.3)",
    radius: "24px",
    glassmorphism: "heavy"
  },
  {
    name: "Slate Tech & Neon",
    primary: "#06b6d4",
    accent: "#67e8f9",
    background: "#0f172a",
    foreground: "#f1f5f9",
    cardBg: "rgba(30, 41, 59, 0.5)",
    radius: "8px",
    glassmorphism: "none"
  }
];

const GOOGLE_FONTS = [
  { label: "Sora (Clean & Round)", value: "Sora" },
  { label: "Inter (Technical & Swiss)", value: "Inter" },
  { label: "Outfit (Modern Geometric)", value: "Outfit" },
  { label: "Playfair Display (Sacred & Serif)", value: "Playfair Display" },
  { label: "Cinzel (Spiritual & Classic)", value: "Cinzel" },
  { label: "Syne (Avant-Garde & Creative)", value: "Syne" }
];

export default function AdminThemeDashboard() {
  const [theme, setTheme] = useState({
    preset: "Classic Indigo",
    primary: "#6366f1",
    accent: "#a5b4fc",
    background: "#020617",
    foreground: "#f8fafc",
    cardBg: "rgba(15, 23, 42, 0.4)",
    fontFamily: "Sora",
    fontSizeScale: "normal", // small, normal, large
    radius: "16px",
    glassmorphism: "subtle", // none, subtle, heavy
    navbarStyle: "glass", // glass, solid, transparent
    footerStyle: "detailed", // clean, detailed
    defaultTheme: "dark" // dark, light
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    loadThemeConfig();
  }, []);

  const loadThemeConfig = async () => {
    setLoading(true);
    try {
      const res = await safeFetch(getApiUrl("/api/v1/cms/site_config"), {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.theme && Object.keys(data.theme).length > 0) {
          setTheme(prev => ({ ...prev, ...data.theme }));
        }
      }
    } catch (e) {
      console.error("Failed to load CMS theme layout config:", e);
    } finally {
      setLoading(false);
    }
  };

  const applyPreset = (preset: typeof COLOR_PRESETS[0]) => {
    setTheme(prev => ({
      ...prev,
      preset: preset.name,
      primary: preset.primary,
      accent: preset.accent,
      background: preset.background,
      foreground: preset.foreground,
      cardBg: preset.cardBg,
      radius: preset.radius,
      glassmorphism: preset.glassmorphism
    }));
  };

  const handleSaveTheme = async () => {
    setSaving(true);
    setSuccess(false);
    try {
      // First fetch current site_config to merge
      const getRes = await fetch(getApiUrl("/api/v1/cms/site_config"));
      let currentConfig: any = {};
      if (getRes.ok) {
        currentConfig = await getRes.json();
      }

      const res = await fetchWithAuth("/api/v1/cms/site_config", {
        method: "PUT",
        body: JSON.stringify({
          ...currentConfig,
          theme: theme
        })
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        alert("Failed to save theme settings.");
      }
    } catch (e) {
      console.error(e);
      alert("Error saving theme layout config.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-20 flex flex-col items-center justify-center text-white min-h-[400px]">
        <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mb-4" />
        <div className="text-sm font-black uppercase tracking-widest text-slate-500 animate-pulse">Syncing Visual Design Workspace...</div>
      </div>
    );
  }

  return (
    <div className="space-y-10 max-w-7xl mx-auto text-left pb-16">
      {/* Visual Header */}
      <div className="flex justify-between items-center bg-slate-900/40 p-6 rounded-3xl border border-white/5 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <Link href="/admin">
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white rounded-xl bg-white/5 hover:bg-white/10 h-10 w-10">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-black italic uppercase tracking-tighter text-white flex items-center gap-2">
              <Palette className="text-indigo-500 w-6 h-6 animate-pulse" /> Theme & Layout Designer
            </h1>
            <p className="text-slate-500 text-xs font-mono">Control CSS Custom Variables & Dynamic Presets Global Index</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {success && (
            <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 px-3 py-1 font-bold text-[9px] uppercase tracking-wider animate-bounce">
              ✓ Synchronized successfully
            </Badge>
          )}
          <Button 
            onClick={handleSaveTheme} 
            disabled={saving}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-wider rounded-xl h-11 px-6 shadow-lg shadow-indigo-500/10 gap-2 transition-all"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Save Theme Configuration
          </Button>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT PANEL: Styling Controls (65%) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Preset templates */}
          <div className="glass-card p-8 rounded-3xl border border-white/5 space-y-6">
            <h3 className="text-lg font-black uppercase tracking-widest text-indigo-300 flex items-center gap-2">
              <Sparkles size={16} /> Reusable Design Presets
            </h3>
            <p className="text-slate-400 text-xs italic">Choose an expertly crafted theme configuration to instantly update your website aesthetic.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {COLOR_PRESETS.map((preset) => {
                const isActive = theme.preset === preset.name;
                return (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => applyPreset(preset)}
                    className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between h-32 ${
                      isActive 
                        ? "border-indigo-500 bg-indigo-500/10" 
                        : "border-white/5 bg-slate-900/40 hover:border-white/10"
                    }`}
                  >
                    <div>
                      <span className="text-xs uppercase tracking-widest font-black text-white">{preset.name}</span>
                      <div className="flex gap-1.5 mt-2">
                        <span className="w-3.5 h-3.5 rounded-full border border-white/10" style={{ backgroundColor: preset.primary }} title="Primary" />
                        <span className="w-3.5 h-3.5 rounded-full border border-white/10" style={{ backgroundColor: preset.accent }} title="Accent" />
                        <span className="w-3.5 h-3.5 rounded-full border border-white/10" style={{ backgroundColor: preset.background }} title="Background" />
                      </div>
                    </div>
                    <span className="text-[9px] text-slate-500 italic block mt-2 font-mono">
                      Radius: {preset.radius} • {preset.glassmorphism} glass
                    </span>
                    {isActive && (
                      <div className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Hex Custom Palette */}
          <div className="glass-card p-8 rounded-3xl border border-white/5 space-y-6">
            <h3 className="text-lg font-black uppercase tracking-widest text-indigo-300 flex items-center gap-2">
              <PaletteIcon size={16} /> Hex Color Core Vectors
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Primary Brand Color</label>
                <div className="flex gap-3">
                  <input 
                    type="color" 
                    value={theme.primary} 
                    onChange={e => setTheme({ ...theme, primary: e.target.value, preset: "Custom" })}
                    className="w-12 h-12 rounded-xl bg-slate-900 border border-white/15 cursor-pointer p-1"
                  />
                  <Input 
                    value={theme.primary} 
                    onChange={e => setTheme({ ...theme, primary: e.target.value, preset: "Custom" })}
                    className="bg-black/50 border-white/10 text-white font-medium rounded-xl h-12 uppercase"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Accent / Secondary Color</label>
                <div className="flex gap-3">
                  <input 
                    type="color" 
                    value={theme.accent} 
                    onChange={e => setTheme({ ...theme, accent: e.target.value, preset: "Custom" })}
                    className="w-12 h-12 rounded-xl bg-slate-900 border border-white/15 cursor-pointer p-1"
                  />
                  <Input 
                    value={theme.accent} 
                    onChange={e => setTheme({ ...theme, accent: e.target.value, preset: "Custom" })}
                    className="bg-black/50 border-white/10 text-white font-medium rounded-xl h-12 uppercase"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Main Background Hex</label>
                <div className="flex gap-3">
                  <input 
                    type="color" 
                    value={theme.background} 
                    onChange={e => setTheme({ ...theme, background: e.target.value, preset: "Custom" })}
                    className="w-12 h-12 rounded-xl bg-slate-900 border border-white/15 cursor-pointer p-1"
                  />
                  <Input 
                    value={theme.background} 
                    onChange={e => setTheme({ ...theme, background: e.target.value, preset: "Custom" })}
                    className="bg-black/50 border-white/10 text-white font-medium rounded-xl h-12 uppercase"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Foreground Font Color</label>
                <div className="flex gap-3">
                  <input 
                    type="color" 
                    value={theme.foreground} 
                    onChange={e => setTheme({ ...theme, foreground: e.target.value, preset: "Custom" })}
                    className="w-12 h-12 rounded-xl bg-slate-900 border border-white/15 cursor-pointer p-1"
                  />
                  <Input 
                    value={theme.foreground} 
                    onChange={e => setTheme({ ...theme, foreground: e.target.value, preset: "Custom" })}
                    className="bg-black/50 border-white/10 text-white font-medium rounded-xl h-12 uppercase"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 space-y-2">
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Card Glassmorphism Background</label>
                <Input 
                  value={theme.cardBg} 
                  onChange={e => setTheme({ ...theme, cardBg: e.target.value, preset: "Custom" })}
                  placeholder="rgba(15, 23, 42, 0.4)"
                  className="bg-black/50 border-white/10 text-white font-medium rounded-xl h-12 font-mono"
                />
                <span className="text-[9px] text-slate-500 italic">Supports RGB/RGBA styles for rich translucent card backgrounds.</span>
              </div>
            </div>
          </div>

          {/* Typography & Spacing Options */}
          <div className="glass-card p-8 rounded-3xl border border-white/5 space-y-6">
            <h3 className="text-lg font-black uppercase tracking-widest text-indigo-300 flex items-center gap-2">
              <Type size={16} /> Typography & Global Spacing Scale
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Select Font Family</label>
                <select
                  value={theme.fontFamily}
                  onChange={e => setTheme({ ...theme, fontFamily: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 text-white text-xs rounded-xl h-12 px-4 focus:outline-none focus:border-indigo-500/50 font-bold uppercase tracking-wider"
                >
                  {GOOGLE_FONTS.map(f => (
                    <option key={f.value} value={f.value} className="bg-slate-900 text-white font-semibold">{f.label}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Base Font Size Scaling</label>
                <div className="grid grid-cols-3 gap-2">
                  {["small", "normal", "large"].map(scale => (
                    <button
                      key={scale}
                      type="button"
                      onClick={() => setTheme({ ...theme, fontSizeScale: scale })}
                      className={`h-12 rounded-xl border font-black text-[10px] uppercase tracking-wider transition-all ${
                        theme.fontSizeScale === scale 
                          ? "border-indigo-500 bg-indigo-500/10 text-white" 
                          : "border-white/5 bg-black/30 hover:border-white/10 text-slate-400"
                      }`}
                    >
                      {scale}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Border Radius Scaling</label>
                <div className="grid grid-cols-4 gap-2">
                  {["4px", "8px", "12px", "16px", "20px", "24px", "32px"].slice(0, 4).map(rad => (
                    <button
                      key={rad}
                      type="button"
                      onClick={() => setTheme({ ...theme, radius: rad })}
                      className={`h-12 rounded-xl border font-bold text-xs transition-all ${
                        theme.radius === rad 
                          ? "border-indigo-500 bg-indigo-500/10 text-white" 
                          : "border-white/5 bg-black/30 hover:border-white/10 text-slate-400"
                      }`}
                    >
                      {rad}
                    </button>
                  ))}
                  {["16px", "20px", "24px", "32px"].map(rad => (
                    <button
                      key={RadCustomKey(rad)}
                      type="button"
                      onClick={() => setTheme({ ...theme, radius: rad })}
                      className={`h-12 rounded-xl border font-bold text-xs transition-all ${
                        theme.radius === rad 
                          ? "border-indigo-500 bg-indigo-500/10 text-white" 
                          : "border-white/5 bg-black/30 hover:border-white/10 text-slate-400"
                      }`}
                    >
                      {rad}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Glassmorphism Intensity</label>
                <div className="grid grid-cols-3 gap-2">
                  {["none", "subtle", "heavy"].map(glass => (
                    <button
                      key={glass}
                      type="button"
                      onClick={() => setTheme({ ...theme, glassmorphism: glass })}
                      className={`h-12 rounded-xl border font-black text-[10px] uppercase tracking-wider transition-all ${
                        theme.glassmorphism === glass 
                          ? "border-indigo-500 bg-indigo-500/10 text-white" 
                          : "border-white/5 bg-black/30 hover:border-white/10 text-slate-400"
                      }`}
                    >
                      {glass}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Navigation & Layout Components */}
          <div className="glass-card p-8 rounded-3xl border border-white/5 space-y-6">
            <h3 className="text-lg font-black uppercase tracking-widest text-indigo-300 flex items-center gap-2">
              <Layout size={16} /> Component Style Overrides
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Navbar Style</label>
                <select
                  value={theme.navbarStyle}
                  onChange={e => setTheme({ ...theme, navbarStyle: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 text-white text-xs rounded-xl h-12 px-4 focus:outline-none focus:border-indigo-500/50 font-bold uppercase tracking-wider"
                >
                  <option value="glass">Glass Transparent</option>
                  <option value="solid">Solid Solid Color</option>
                  <option value="transparent">Completely Transparent</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Footer Template</label>
                <select
                  value={theme.footerStyle}
                  onChange={e => setTheme({ ...theme, footerStyle: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 text-white text-xs rounded-xl h-12 px-4 focus:outline-none focus:border-indigo-500/50 font-bold uppercase tracking-wider"
                >
                  <option value="detailed">Detailed Grid Map</option>
                  <option value="clean">Minimalist Signature</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Dark / Light Default</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setTheme({ ...theme, defaultTheme: "dark" })}
                    className={`h-12 rounded-xl border flex items-center justify-center gap-2 font-black text-[10px] uppercase tracking-wider transition-all ${
                      theme.defaultTheme === "dark" 
                        ? "border-indigo-500 bg-indigo-500/10 text-white" 
                        : "border-white/5 bg-black/30 hover:border-white/10 text-slate-400"
                    }`}
                  >
                    <Moon size={12} /> Dark
                  </button>
                  <button
                    type="button"
                    onClick={() => setTheme({ ...theme, defaultTheme: "light" })}
                    className={`h-12 rounded-xl border flex items-center justify-center gap-2 font-black text-[10px] uppercase tracking-wider transition-all ${
                      theme.defaultTheme === "light" 
                        ? "border-indigo-500 bg-indigo-500/10 text-white" 
                        : "border-white/5 bg-black/30 hover:border-white/10 text-slate-400"
                    }`}
                  >
                    <Sun size={12} /> Light
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* RIGHT PANEL: Live Visual Theme Preview Mockup (35%) */}
        <div className="lg:col-span-5 glass-card rounded-[2.5rem] border border-white/5 bg-slate-900/20 flex flex-col overflow-hidden h-fit sticky top-28">
          
          <div className="p-4 bg-slate-900/60 border-b border-white/5 flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 flex items-center gap-1.5">
              <Eye size={12} /> Live Aesthetic Preview Mockup
            </span>
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
            </div>
          </div>

          {/* Dynamic Mockup Body */}
          <div 
            className="p-8 space-y-8 transition-colors duration-500 text-left" 
            style={{ 
              backgroundColor: theme.background, 
              color: theme.foreground,
              fontFamily: theme.fontFamily === "Playfair Display" || theme.fontFamily === "Cinzel" ? "serif" : "sans-serif"
            }}
          >
            {/* Header navbar preview */}
            <div 
              className={`flex justify-between items-center p-3 transition-all`}
              style={{
                borderRadius: theme.radius,
                backgroundColor: theme.navbarStyle === "glass" ? "rgba(255,255,255,0.03)" : theme.navbarStyle === "solid" ? "rgba(0,0,0,0.4)" : "transparent",
                border: theme.navbarStyle === "glass" ? "1px solid rgba(255,255,255,0.05)" : "none"
              }}
            >
              <span className="font-black tracking-tighter uppercase italic text-xs">GURU PRO</span>
              <div className="flex gap-3 text-[8px] uppercase tracking-widest font-black opacity-60">
                <span>Ecosystem</span>
                <span>Creative Lab</span>
              </div>
            </div>

            {/* Core Hero Section Mock */}
            <div className="space-y-4 py-4 text-center">
              <Badge 
                className="text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full border"
                style={{ 
                  borderColor: `${theme.primary}30`, 
                  color: theme.primary, 
                  backgroundColor: `${theme.primary}10` 
                }}
              >
                Neural Styling Core
              </Badge>
              <h2 className="text-2xl font-black italic uppercase tracking-tighter leading-tight">
                Crafting Divine Aesthetics
              </h2>
              <p className="text-[10px] leading-relaxed max-w-xs mx-auto opacity-75 italic" style={{ fontSize: theme.fontSizeScale === "small" ? "9px" : theme.fontSizeScale === "large" ? "11px" : "10px" }}>
                High-fidelity rendering matrices styled dynamically with standard CSS variables.
              </p>
              <div className="flex justify-center gap-3">
                <button 
                  className="h-9 px-5 font-black text-[9px] uppercase tracking-wider transition-all"
                  style={{ 
                    backgroundColor: theme.primary, 
                    color: "#ffffff", 
                    borderRadius: theme.radius,
                    boxShadow: `0 4px 12px ${theme.primary}20` 
                  }}
                >
                  Action Button
                </button>
                <button 
                  className="h-9 px-5 font-black text-[9px] uppercase tracking-wider transition-all border bg-transparent"
                  style={{ 
                    borderColor: `${theme.primary}40`, 
                    color: theme.accent, 
                    borderRadius: theme.radius 
                  }}
                >
                  Outline Action
                </button>
              </div>
            </div>

            {/* Cards Mock Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: "Glass Cards", val: theme.glassmorphism === "none" ? "Solid Panel" : `${theme.glassmorphism} Glass` },
                { title: "Border Radius", val: theme.radius }
              ].map((card, i) => (
                <div 
                  key={i} 
                  className="p-4 border transition-all"
                  style={{
                    borderRadius: theme.radius,
                    backgroundColor: theme.cardBg,
                    borderColor: theme.glassmorphism === "none" ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)",
                    backdropFilter: theme.glassmorphism === "heavy" ? "blur(20px)" : theme.glassmorphism === "subtle" ? "blur(8px)" : "none"
                  }}
                >
                  <h4 className="text-[10px] font-black uppercase tracking-wider mb-1" style={{ color: theme.accent }}>{card.title}</h4>
                  <p className="text-[9px] opacity-60 font-mono">{card.val}</p>
                </div>
              ))}
            </div>

            {/* Footer mockup */}
            <div className="pt-6 border-t border-white/5 opacity-40 text-center text-[7px] tracking-wider uppercase font-black">
              {theme.footerStyle === "detailed" ? "Explore • Services • Support • Copyright © 2026" : "© 2026 GurucraftPro"}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}

// Simple unique layout key helper
function RadCustomKey( rad: string ) {
  return `custom-${rad}`;
}
