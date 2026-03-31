"use client";

import { useEffect, useState } from "react";
import { 
  ArrowLeft, 
  Clock, 
  User as UserIcon,
  Tag,
  Share2,
  Calendar,
  Sparkles,
  ChevronLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getApiUrl } from "@/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function BlogPostReaderPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) return;
    
    fetch(getApiUrl(`/api/v1/cms/posts/slug/${slug}`))
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(data => {
        setPost(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Post Detail Error:", err);
        setError(true);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return (
     <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center space-y-8">
        <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin shadow-2xl shadow-indigo-600/20" />
        <p className="text-white font-black tracking-widest text-[10px] uppercase italic animate-pulse">Syncing Article Matrix...</p>
     </div>
  );

  if (error || !post) return (
     <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center space-y-12 p-8 text-center">
        <div className="w-24 h-24 bg-red-500/10 rounded-[3rem] border border-red-500/20 flex items-center justify-center text-red-400">
            <X className="w-10 h-10" />
        </div>
        <div className="max-w-sm space-y-4">
            <h1 className="text-4xl font-black text-white italic tracking-tighter">INDEX NOT FOUND.</h1>
            <p className="text-muted-foreground text-sm font-medium italic border-l-2 border-red-500/30 pl-4">The article segment you are attempting to access has been de-indexed or moved into a higher security sector.</p>
        </div>
        <Link href="/blog">
            <Button className="bg-white text-black hover:bg-slate-200 rounded-2xl py-6 px-10 font-bold tracking-widest uppercase">
                Return to Matrix
            </Button>
        </Link>
     </div>
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500/30">
      {/* Ambient backgrounds */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-600/5 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-rose-600/5 blur-[150px] rounded-full animate-pulse [animation-delay:3s]" />
      </div>

      <div className="relative z-10">
        {/* Progress Bar */}
        <div className="fixed top-0 left-0 right-0 h-1 bg-white/5 z-50 overflow-hidden">
            <div className="w-1/3 h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-400 shadow-[0_0_15px_rgb(99,102,241)] animate-progress" />
        </div>

        {/* Article Layout */}
        <div className="max-w-5xl mx-auto px-6 py-20 pb-40">
            <Link href="/blog" className="inline-flex items-center gap-3 text-muted-foreground hover:text-white transition-all group mb-20">
                <div className="w-10 h-10 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5 group-hover:border-indigo-500/50 group-hover:bg-indigo-500/10 group-hover:scale-110 transition-all">
                    <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest italic group-hover:italic-none">Back to Journal</span>
            </Link>

            <header className="space-y-12 mb-20 animate-in fade-in slide-in-from-bottom-10 duration-1000">
                <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-indigo-400">
                    <span className="bg-indigo-500/10 px-4 py-1.5 rounded-full border border-indigo-500/20">EDITION 2026</span>
                    <div className="w-1 h-1 bg-white/20 rounded-full" />
                    <span className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(post.created_at).toLocaleDateString()}
                    </span>
                </div>

                <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] italic">
                    {post.title}
                </h1>

                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pt-10 border-t border-white/5">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-3xl flex items-center justify-center font-black text-xl text-white shadow-2xl shadow-indigo-600/30 ring-1 ring-white/10">
                            G
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Authored By</p>
                            <p className="text-lg font-bold text-white italic">Gurucraft Editorial Team</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="icon" className="w-12 h-12 bg-white/5 hover:bg-indigo-500 rounded-2xl transition-all border border-transparent hover:border-white/10">
                            <Share2 className="w-5 h-5" />
                        </Button>
                        <Button className="bg-white text-black hover:bg-slate-200 rounded-2xl py-6 px-10 font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                            Subscribe
                        </Button>
                    </div>
                </div>
            </header>

            {/* Content Container */}
            <article className="relative">
                <div className="absolute -left-12 -top-12 text-[180px] font-black text-white/5 select-none pointer-events-none italic opacity-20">
                    "{post.title[0]}"
                </div>
                
                <div className="bg-slate-900/40 backdrop-blur-3xl p-10 md:p-20 rounded-[4rem] border border-white/10 shadow-3xl text-lg md:text-xl text-white/90 leading-relaxed font-medium font-serif italic-none whitespace-pre-wrap selection:bg-indigo-500/20 ring-1 ring-white/5">
                    {post.content}
                </div>
                
                {/* Meta Box */}
                <div className="mt-20 flex flex-wrap gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
                    {["Artificial-Intelligence", "Digital-Experience", "Future-Insights"].map(tag => (
                        <div key={tag} className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-white hover:border-indigo-500/30 transition-all cursor-default">
                             <Tag className="w-3.5 h-3.5" />
                             {tag}
                        </div>
                    ))}
                </div>
            </article>

            {/* Newsletter section */}
            <div className="mt-40 bg-indigo-600/10 border border-indigo-500/20 rounded-[3rem] p-12 md:p-20 text-center space-y-8 animate-in fade-in duration-1000">
                <div className="w-16 h-16 bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 rounded-3xl flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(99,102,241,0.1)]">
                    <Sparkles className="w-8 h-8" />
                </div>
                <div className="max-w-2xl mx-auto space-y-4">
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter italic">NEVER MISS A NARRATIVE.</h2>
                    <p className="text-muted-foreground font-medium italic border-l-2 border-indigo-500/30 pl-4 max-w-sm mx-auto">Join our elite collective for ultra-high-fidelity insights delivered directly to your matrix.</p>
                </div>
                <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto pt-4">
                    <input type="text" placeholder="matrix-id@gurucraftpro.com" className="flex-1 bg-black/40 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all" />
                    <Button className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl py-7 px-8 font-black tracking-widest uppercase">Deploy</Button>
                </div>
            </div>
        </div>
      </div>
    </main>
  );
}

import { X } from "lucide-react";
