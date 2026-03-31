"use client";

import { useEffect, useState } from "react";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Clock,
  User as UserIcon,
  Tag,
  BookOpen,
  X,
  Check,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getApiUrl } from "@/lib/utils";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  
  // Form State
  const [form, setForm] = useState({
    title: "",
    slug: "",
    content: "",
    status: "published"
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch(getApiUrl("/api/v1/cms/posts"));
      const data = await res.json();
      setPosts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Posts Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingPost(null);
    setForm({ title: "", slug: "", content: "", status: "published" });
    setIsFormOpen(true);
  };

  const handleEdit = (post: any) => {
    setEditingPost(post);
    setForm({
      title: post.title,
      slug: post.slug,
      content: post.content,
      status: post.status
    });
    setIsFormOpen(true);
  };

  const submitForm = async () => {
    if (!form.title || !form.content) return alert("Title and Content are required");
    
    const token = localStorage.getItem("token");
    const method = editingPost ? "PUT" : "POST";
    const url = editingPost 
      ? getApiUrl(`/api/v1/cms/posts/${editingPost.id}`)
      : getApiUrl("/api/v1/cms/posts");

    try {
      const res = await fetch(url, {
        method,
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        setIsFormOpen(false);
        fetchPosts();
      }
    } catch (err) {
      console.error("Submit Error:", err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this article forever?")) return;
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(getApiUrl(`/api/v1/cms/posts/${id}`), {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) fetchPosts();
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  const generateSlug = (title: string) => {
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    setForm(p => ({ ...p, title, slug }));
  };

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto space-y-10 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white/5 p-8 rounded-[2.5rem] border border-white/10 backdrop-blur-md">
        <div>
          <h1 className="text-5xl font-black text-white tracking-tighter italic">Editorial Matrix</h1>
          <p className="text-muted-foreground font-medium mt-2">Scale your influence through high-fidelity dynamic posts.</p>
        </div>
        <Button 
          onClick={handleCreate}
          className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl py-7 px-10 font-black tracking-widest uppercase shadow-2xl shadow-indigo-600/30"
        >
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
                    <p className="text-xl font-bold text-white">{posts.filter(p=>p.status === 'published').length}</p>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="text-center">
                    <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Drafts</p>
                    <p className="text-xl font-bold text-white">{posts.filter(p=>p.status === 'draft').length}</p>
                </div>
            </div>
        </div>

        <div className="divide-y divide-white/5">
          {posts.length > 0 ? posts.map((post) => (
            <div key={post.id} className="p-8 hover:bg-white/5 transition-all group flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
               <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border ${post.status === 'published' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                      {post.status}
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
                     <span className="flex items-center gap-1.5"><UserIcon className="w-3.5 h-3.5" /> Author ID: {post.author_id}</span>
                     <span className="flex items-center gap-1.5"><Tag className="w-3.5 h-3.5" /> /blog/{post.slug}</span>
                  </div>
               </div>
               <div className="flex items-center gap-3 w-full md:w-auto">
                    <Button 
                        onClick={() => handleEdit(post)}
                        variant="ghost" size="icon" className="w-12 h-12 text-muted-foreground hover:text-indigo-400 hover:bg-indigo-500/5 rounded-2xl border border-transparent hover:border-indigo-500/20 transition-all"
                    >
                        <Edit className="w-5 h-5" />
                    </Button>
                    <Button 
                        onClick={() => handleDelete(post.id)}
                        variant="ghost" size="icon" className="w-12 h-12 text-muted-foreground hover:text-destructive hover:bg-destructive/5 rounded-2xl border border-transparent hover:border-destructive/20 transition-all">
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
                    <h3 className="text-xl font-bold text-white">Editorial Archives Static</h3>
                    <p className="text-sm text-muted-foreground font-medium">No articles detected. Secure your first story in the matrix to begin indexing.</p>
                </div>
                {loading && <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />}
            </div>
          )}
        </div>
      </div>

      {/* Form Modal */}
      {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
              <div className="bg-slate-950 border border-white/10 rounded-[3rem] w-full max-w-5xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] ring-1 ring-white/10">
                  {/* Left Column: Editor */}
                  <div className="md:w-2/3 p-12 space-y-8 overflow-y-auto">
                      <div className="flex items-center justify-between">
                         <div className="space-y-1">
                            <h3 className="text-3xl font-black text-white italic tracking-tighter">
                                {editingPost ? 'EDIT STORY' : 'NEW STORY'}
                            </h3>
                            <p className="text-xs text-muted-foreground font-black uppercase tracking-widest bg-white/5 py-1 px-3 rounded-full border border-white/5 w-fit">Article Configuration</p>
                         </div>
                         <Button variant="ghost" onClick={() => setIsFormOpen(false)} className="rounded-2xl hover:bg-white/5">
                            <X className="w-6 h-6" />
                         </Button>
                      </div>

                      <div className="space-y-6">
                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest px-1">Headline</label>
                            <input 
                                type="text"
                                value={form.title}
                                onChange={(e) => generateSlug(e.target.value)}
                                placeholder="Enter captivating headline..."
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white font-bold text-xl placeholder:text-muted-foreground/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                            />
                         </div>
                         
                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest px-1">URL Path</label>
                            <input 
                                type="text"
                                value={form.slug}
                                onChange={(e) => setForm(p=>({...p, slug: e.target.value}))}
                                placeholder="url-friendly-slug"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-6 text-indigo-300/70 font-mono text-sm focus:outline-none"
                            />
                         </div>

                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest px-1">Narrative Content</label>
                            <textarea 
                                value={form.content}
                                onChange={(e) => setForm(p=>({...p, content: e.target.value}))}
                                placeholder="Begin your story here..."
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white text-base min-h-[350px] resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                            />
                         </div>
                      </div>
                  </div>

                  {/* Right Column: Settings */}
                  <div className="md:w-1/3 bg-black/40 border-l border-white/10 p-12 flex flex-col justify-between">
                     <div className="space-y-10">
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest block">Publication Status</label>
                            <div className="grid grid-cols-1 gap-3">
                                {[
                                    { id: 'published', label: 'Published', icon: Check, color: 'text-emerald-400' },
                                    { id: 'draft', label: 'Draft Mode', icon: Clock, color: 'text-amber-500' }
                                ].map(opt => (
                                    <button 
                                        key={opt.id}
                                        onClick={() => setForm(p=>({...p, status: opt.id}))}
                                        className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${form.status === opt.id ? 'bg-indigo-500/10 border-indigo-500/50 text-white' : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <opt.icon className={`w-4 h-4 ${opt.color}`} />
                                            <span className="text-sm font-bold">{opt.label}</span>
                                        </div>
                                        {form.status === opt.id && <div className="w-2 h-2 bg-indigo-500 rounded-full shadow-[0_0_10px_rgb(99,102,241)]" />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="p-6 bg-white/5 rounded-3xl border border-white/10 space-y-4 shadow-inner">
                            <div className="flex items-center gap-3 text-white">
                                <FileText className="w-5 h-5 text-indigo-400" />
                                <span className="font-bold text-sm tracking-tight uppercase tracking-widest text-[10px]">Matrix Guide</span>
                            </div>
                            <p className="text-xs text-muted-foreground font-medium italic">Your story will be indexed instantly upon commitment. Ensure SEO slugs are concise and keywords are embedded in the narrative.</p>
                        </div>
                     </div>

                     <Button 
                        onClick={submitForm}
                        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl py-8 font-black tracking-[0.3em] uppercase shadow-2xl shadow-indigo-600/30"
                     >
                        Confirm Edit
                     </Button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
}
