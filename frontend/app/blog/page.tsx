"use client";

import { useEffect, useState } from "react";
import { 
  Plus, 
  ArrowRight, 
  Clock, 
  User as UserIcon,
  Tag,
  BookOpen,
  ChevronRight,
  Sparkles,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getApiUrl } from "@/lib/utils";
import Link from "next/link";

export default function BlogListingPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(getApiUrl("/api/v1/cms/posts"))
      .then(res => res.json())
      .then(data => {
        setPosts(Array.isArray(data) ? data.filter(p => p.status === 'published') : []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Posts Fetch Error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500/30">
      {/* Ambient backgrounds */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/5 blur-[120px] rounded-full animate-pulse [animation-delay:2s]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 pb-40">
        {/* Header */}
        <div className="max-w-3xl space-y-8 mb-24 animate-in fade-in slide-in-from-bottom-10 duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black tracking-[0.2em] uppercase">
                <BookOpen className="w-4 h-4" />
                The Editorial Matrix
            </div>
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.85] italic">
                CRAFTING <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-rose-400">
                    NARRATIVES.
                </span>
            </h1>
            <p className="text-xl text-muted-foreground font-medium max-w-xl font-serif italic border-l-2 border-indigo-500/30 pl-8 ml-2">
                Exploring the intersection of artificial intelligence, high-end design, and digital psychology.
            </p>
        </div>

        {/* Categories Bar */}
        <div className="flex gap-4 mb-20 overflow-x-auto pb-4 no-scrollbar animate-in fade-in slide-in-from-top-4 duration-700 [animation-delay:400ms]">
            {["All Insights", "AI Design", "Technology", "Fashion Matrix", "Studio News"].map((cat, i) => (
                <button 
                  key={cat}
                  className={`px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${i === 0 ? 'bg-white text-black shadow-xl shadow-white/10' : 'bg-white/5 text-muted-foreground border border-white/5 hover:bg-white/10 hover:text-white'}`}
                >
                    {cat}
                </button>
            ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {loading ? (
             Array.from({length: 6}).map((_, i) => (
                <div key={i} className="aspect-[4/3] bg-white/5 rounded-[3rem] animate-pulse border border-white/5" />
             ))
          ) : posts.length > 0 ? (
            posts.map((post, i) => (
              <Link 
                href={`/blog/${post.slug}`} 
                key={post.id} 
                className="group relative bg-slate-900/40 rounded-[3.5rem] border border-white/5 overflow-hidden hover:border-indigo-500/40 transition-all duration-700 shadow-2xl hover:translate-y-[-12px] animate-in fade-in zoom-in-95 duration-700"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                 <div className="p-10 space-y-8 h-full flex flex-col justify-between">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <span className="bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase px-4 py-1.5 rounded-full border border-indigo-500/20 tracking-tighter">
                                INSIGHT
                            </span>
                            <span className="text-[10px] text-muted-foreground flex items-center gap-2 font-black uppercase tracking-wider">
                                <Calendar className="w-3.5 h-3.5" />
                                {new Date(post.created_at).toLocaleDateString()}
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-white group-hover:text-indigo-400 transition-colors leading-[1.1] italic">
                            {post.title}
                        </h2>
                        <p className="text-muted-foreground text-sm font-medium line-clamp-3 leading-relaxed">
                            {post.content.substring(0, 150)}...
                        </p>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-white/5">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center font-black text-xs text-white shadow-xl shadow-indigo-600/20">
                                G
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Studio Editorial</span>
                        </div>
                        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 transition-all duration-500 group-hover:scale-110 shadow-xl group-hover:shadow-indigo-600/30">
                            <ArrowRight className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
                        </div>
                    </div>
                 </div>
              </Link>
            ))
          ) : (
             <div className="col-span-full py-40 text-center space-y-8 animate-in fade-in zoom-in-95 duration-1000">
                <div className="w-24 h-24 bg-indigo-500/10 rounded-[2.5rem] border border-indigo-500/20 flex items-center justify-center mx-auto text-indigo-400 shadow-2xl shadow-indigo-600/10">
                    <Sparkles className="w-10 h-10" />
                </div>
                <div className="max-w-sm mx-auto space-y-4">
                    <h3 className="text-3xl font-black italic tracking-tighter">THE ARCHIVE IS STATIC.</h3>
                    <p className="text-muted-foreground text-sm font-medium leading-relaxed italic border-l-2 border-indigo-500/30 pl-4">No editorial content has been successfully indexed in the matrix yet. Return soon for the first deployment.</p>
                </div>
             </div>
          )}
        </div>
      </div>
    </main>
  );
}
