"use client";

import { useEffect, useState } from "react";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  ExternalLink, 
  Eye, 
  Clock,
  User as UserIcon,
  Tag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getApiUrl } from "@/lib/utils";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(getApiUrl("/api/v1/cms/posts"))
      .then(res => res.json())
      .then(data => {
        setPosts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Posts Fetch Error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-5xl font-black text-white tracking-tighter">Editorial Matrix</h1>
          <p className="text-muted-foreground font-medium mt-2">Scale your influence through high-fidelity dynamic posts.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl py-6 px-8 font-bold shadow-xl shadow-indigo-600/20">
          <Plus className="w-5 h-5 mr-3" />
          Create New Article
        </Button>
      </div>

      <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="relative w-full max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input 
                    type="text" 
                    placeholder="Search editorial archives..." 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white text-sm focus:outline-none"
                />
            </div>
            <div className="flex items-center gap-6 px-4">
                <div className="text-center">
                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Published</p>
                    <p className="text-xl font-bold text-white">{posts.length}</p>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="text-center">
                    <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Drafts</p>
                    <p className="text-xl font-bold text-white">0</p>
                </div>
            </div>
        </div>

        <div className="divide-y divide-white/5">
          {posts.length > 0 ? posts.map((post) => (
            <div key={post.id} className="p-8 hover:bg-white/5 transition-all group flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
               <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase px-3 py-1 rounded-full border border-emerald-500/20">
                      {post.status || 'PUBLISHED'}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
                        <Clock className="w-3 h-3" />
                        {new Date(post.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors leading-tight">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground font-medium">
                     <span className="flex items-center gap-1.5"><UserIcon className="w-3.5 h-3.5" /> ID: {post.author_id}</span>
                     <span className="flex items-center gap-1.5"><Tag className="w-3.5 h-3.5" /> /blog/{post.slug}</span>
                  </div>
               </div>
               <div className="flex items-center gap-3 w-full md:w-auto">
                    <Button variant="ghost" size="icon" className="w-12 h-12 text-muted-foreground hover:text-white hover:bg-white/5 rounded-2xl border border-transparent hover:border-white/10 transition-all">
                        <Eye className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="w-12 h-12 text-muted-foreground hover:text-indigo-400 hover:bg-indigo-500/5 rounded-2xl border border-transparent hover:border-indigo-500/20 transition-all">
                        <Edit className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="w-12 h-12 text-muted-foreground hover:text-destructive hover:bg-destructive/5 rounded-2xl border border-transparent hover:border-destructive/20 transition-all">
                        <Trash2 className="w-5 h-5" />
                    </Button>
               </div>
            </div>
          )) : (
            <div className="p-24 text-center space-y-6">
                <div className="w-20 h-20 bg-indigo-500/10 rounded-[2rem] flex items-center justify-center mx-auto border border-indigo-500/20 text-indigo-400">
                    <BookOpen className="w-8 h-8" />
                </div>
                <div className="max-w-sm mx-auto space-y-2">
                    <h3 className="text-xl font-bold text-white">Archives Static</h3>
                    <p className="text-sm text-muted-foreground font-medium">No editorial content detected. Deploy your first article to begin indexing.</p>
                </div>
                {loading && <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { BookOpen } from "lucide-react";
