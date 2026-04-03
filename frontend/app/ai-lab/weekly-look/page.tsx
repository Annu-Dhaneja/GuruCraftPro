"use client";

import { useState } from "react";
import { Sparkles, Calendar, Loader2, Info, ChevronRight, User, Baby, GraduationCap, Briefcase, Camera, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { getApiUrl } from "@/lib/utils";
import { Footer } from "@/components/footer/Footer";

const STYLES = [
    { id: "Formal", label: "Formal", desc: "Suits & blazers" },
    { id: "Casual", label: "Casual", desc: "Everyday comfort" },
    { id: "Traditional", label: "Traditional", desc: "Ethnic & cultural" },
    { id: "Fusion", label: "Fusion", desc: "Modern & traditional mix" }
];

const AGES = [
    { id: "Kids", label: "Kids", icon: Baby },
    { id: "Teens", label: "Teens", icon: GraduationCap },
    { id: "Adult", label: "Adult", icon: Briefcase },
    { id: "Senior", label: "Senior", icon: User }
];

const GENDERS = ["Male", "Female", "Unisex"];

export default function WeeklyLookPage() {
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [style, setStyle] = useState("Casual");
    const [gender, setGender] = useState("Female");
    const [age, setAge] = useState("Adult");
    const [userPhotoUrl, setUserPhotoUrl] = useState("");
    
    const [plan, setPlan] = useState<any[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async () => {
        setIsGenerating(true);
        setError(null);
        
        const params = new URLSearchParams({
            gender,
            age_group: age,
            style
        });

        // Simulating the backend incorporating the User Photo URL into its analysis.
        // In a full integration, we'd pass userPhotoUrl to /api/v1/wardrobe/suggest to filter based on AI try-on.
        
        try {
            const res = await fetch(getApiUrl(`/api/v1/wardrobe/suggest?${params.toString()}`));
            if (res.ok) {
                const data = await res.json();
                if (data.items.length > 0) {
                    setPlan(data.items);
                } else {
                    setError("No matching items found for your selection. Try different filters!");
                }
            } else {
                setError("System is busy. Please try again in a moment.");
            }
        } catch (e) {
            setError("Connection failed. Check your internet.");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <main className="min-h-screen bg-slate-950 text-white flex flex-col font-sans overflow-hidden relative">
            {/* Cinematic Background Orbs */}
            <div className="fixed top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen animate-pulse duration-10000" />
            <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
            
            <div className="container mx-auto px-4 md:px-8 py-16 flex-grow max-w-7xl relative z-10 pt-28">
                <div className="space-y-16">
                    
                    {/* Header */}
                    <div className="text-center space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-indigo-300 text-[10px] font-black uppercase tracking-[0.3em] shadow-[0_0_20px_rgba(79,70,229,0.2)]">
                            <Sparkles className="w-3 h-3" />
                            Luxury Digital Stylist
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/30">
                            The 7-Day <br/><span className="text-indigo-400 italic font-serif">Try Dress</span> Experience
                        </h1>
                        <p className="text-zinc-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                            Curate a bespoke weekly wardrobe using AI. Provide your details and an optional photo URL for personalized virtual try-on synergy.
                        </p>
                    </div>

                    {/* Generator Box (Glassmorphism) */}
                    <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-[0_8px_32px_rgba(0,0,0,0.5)] ring-1 ring-white/5 relative group">
                        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 relative z-10">
                            
                            {/* Start Date */}
                            <div className="space-y-4">
                                <Label className="text-[10px] uppercase font-black tracking-[0.2em] text-indigo-200">Start Date</Label>
                                <div className="relative">
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400/70" />
                                    <input 
                                        type="date" 
                                        value={startDate} 
                                        onChange={e => setStartDate(e.target.value)}
                                        className="w-full bg-black/40 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold text-white focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all shadow-inner"
                                    />
                                </div>
                            </div>

                            {/* Gender */}
                            <div className="space-y-4">
                                <Label className="text-[10px] uppercase font-black tracking-[0.2em] text-indigo-200">Gender Identity</Label>
                                <div className="grid grid-cols-1 gap-2">
                                    <select 
                                        value={gender} 
                                        onChange={(e) => setGender(e.target.value)} 
                                        className="w-full bg-black/40 border border-white/10 rounded-2xl py-3.5 px-4 text-sm font-bold text-white focus:ring-2 focus:ring-indigo-500/50 outline-none appearance-none"
                                    >
                                        {GENDERS.map(g => <option key={g} value={g}>{g}</option>)}
                                    </select>
                                </div>
                            </div>

                            {/* Age Group */}
                            <div className="space-y-4">
                                <Label className="text-[10px] uppercase font-black tracking-[0.2em] text-indigo-200">Age Range</Label>
                                <div className="grid grid-cols-4 gap-2">
                                    {AGES.map(a => (
                                        <button 
                                            key={a.id}
                                            onClick={() => setAge(a.id)}
                                            title={a.label}
                                            className={`p-3 rounded-2xl border flex items-center justify-center transition-all duration-300 ease-out hover:-translate-y-1 ${age === a.id ? 'bg-indigo-600/30 border-indigo-400/50 shadow-[0_0_15px_rgba(99,102,241,0.4)] text-indigo-200' : 'bg-black/40 border-white/5 text-zinc-500 hover:bg-white/5 hover:border-white/20 hover:text-white'}`}
                                        >
                                            <a.icon className="w-4 h-4" />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Style */}
                            <div className="space-y-4 lg:col-span-2">
                                <Label className="text-[10px] uppercase font-black tracking-[0.2em] text-indigo-200">Aesthetic Vibe</Label>
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                                    {STYLES.map(s => (
                                        <button 
                                            key={s.id}
                                            onClick={() => setStyle(s.id)}
                                            className={`py-3 px-2 rounded-2xl border text-[10px] uppercase tracking-wider font-black transition-all duration-300 ease-out hover:-translate-y-1 ${style === s.id ? 'bg-indigo-600/30 border-indigo-400/50 shadow-[0_0_15px_rgba(99,102,241,0.4)] text-indigo-200' : 'bg-black/40 border-white/5 text-zinc-500 hover:bg-white/5 hover:border-white/20 hover:text-white'}`}
                                        >
                                            {s.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                        </div>
                        
                        {/* Virtual Try-On URL Connection */}
                        <div className="mt-8 pt-8 border-t border-white/5 relative z-10">
                            <Label className="text-[10px] uppercase font-black tracking-[0.2em] text-indigo-200 flex items-center gap-2 mb-4">
                                <Camera className="w-3 h-3" /> Virtual Try-On Profile (Optional)
                            </Label>
                            <div className="relative group">
                                <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400/70" />
                                <input 
                                    type="text" 
                                    value={userPhotoUrl} 
                                    onChange={e => setUserPhotoUrl(e.target.value)}
                                    placeholder="Paste an Imgur, Unsplash, or Web URL of yourself..."
                                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all placeholder:text-zinc-600 text-white"
                                />
                                {userPhotoUrl && (
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                        <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,1)] animate-pulse" />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Generate Button Area */}
                        <div className="mt-10 space-y-4 relative z-10 text-center">
                            <Button 
                                onClick={handleGenerate}
                                disabled={isGenerating}
                                className="w-full max-w-md mx-auto h-16 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-lg font-black tracking-wide transition-all active:scale-[0.98] shadow-[0_0_40px_rgba(79,70,229,0.4)] hover:shadow-[0_0_60px_rgba(79,70,229,0.6)]"
                            >
                                {isGenerating ? (
                                    <span className="flex items-center gap-3">
                                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                        Synthesizing Weekly Look...
                                    </span>
                                ) : (
                                    "Generate 7-Day Experience"
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* Result Plan / Magazine Editorial Presentation */}
                    {(plan.length > 0 || error) && (
                        <div className="relative animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-150">
                             {error ? (
                                <div className="p-16 border border-red-500/20 bg-red-500/5 backdrop-blur-xl rounded-[2.5rem] text-center space-y-6">
                                    <Info className="w-12 h-12 text-red-400 mx-auto opacity-50" />
                                    <h3 className="text-2xl font-black tracking-tight text-white">Refine Your Persona</h3>
                                    <p className="text-red-200/60 max-w-md mx-auto text-sm">{error}</p>
                                </div>
                             ) : (
                                <div className="space-y-12">
                                    <div className="flex flex-col md:flex-row items-center justify-between border-b border-white/10 pb-8 gap-6">
                                        <div>
                                            <h2 className="text-3xl md:text-4xl font-black font-serif italic text-white mb-2">Editorial Collection</h2>
                                            <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest">{plan.length} Pieces Curated</p>
                                        </div>
                                        <Button variant="ghost" onClick={() => setPlan([])} className="rounded-full text-indigo-400 hover:text-indigo-300 hover:bg-indigo-400/10 font-bold px-6">
                                            Reset Vision
                                        </Button>
                                    </div>

                                    {/* Responsive Magazine Grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-6">
                                        {plan.map((item, i) => (
                                            <div key={i} className="group flex flex-col gap-4 perspective-1000">
                                                <div className="text-[10px] font-black uppercase text-indigo-400 tracking-[0.3em] flex items-center justify-between">
                                                    <span>DAY 0{i+1}</span>
                                                    <div className="h-px bg-white/10 flex-grow ml-4 opacity-50 translate-y-px" />
                                                </div>
                                                <div className="relative aspect-[2/3] rounded-2xl overflow-hidden border border-white/5 bg-slate-900/50 shadow-2xl transition-all duration-700 ease-out preserve-3d group-hover:rotate-y-6 group-hover:-translate-y-4 group-hover:shadow-[0_20px_40px_rgba(79,70,229,0.3)] group-hover:border-indigo-500/30">
                                                    <img 
                                                        src={item.image_url.startsWith("http") ? item.image_url : getApiUrl(item.image_url)} 
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out brightness-90 group-hover:brightness-110 saturate-50 group-hover:saturate-100" 
                                                        alt={`Look ${i+1}`} 
                                                    />
                                                    {/* Editorial Overlay */}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
                                                    <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                                        <h4 className="text-white font-bold leading-tight line-clamp-2 drop-shadow-md mb-2">{item.name || `Look ${i+1}`}</h4>
                                                        <div className="inline-block bg-white/10 backdrop-blur-md px-2 py-1 rounded-md text-[8px] font-black uppercase tracking-widest border border-white/20 text-white/80">
                                                            {item.style}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex justify-center pt-16 pb-8">
                                        <Button className="h-14 px-8 rounded-full bg-white text-black hover:bg-zinc-200 font-bold text-sm tracking-widest uppercase gap-3 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all">
                                            Export to Wardrobe <ChevronRight className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                             )}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </main>
    );
}
