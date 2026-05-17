"use client";

import React, { useEffect, useState } from "react";
import { 
  Heart, Plus, Trash2, Edit, Save, ShieldCheck, Clock, 
  MessageSquare, User, Briefcase, ChevronUp, ChevronDown, CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { fetchWithAuth, getApiUrl, safeFetch } from "@/lib/utils";

export default function AdminTestimonialsPanel() {
  const [homePage, setHomePage] = useState<any>(null);
  const [testimonialsIdx, setTestimonialsIdx] = useState<number | null>(null);
  const [testimonialsList, setTestimonialsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    setLoading(true);
    try {
      const res = await safeFetch(getApiUrl("/api/v1/cms/home"), {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (res.ok) {
        const data = await res.json();
        setHomePage(data);
        
        // Find testimonials component block
        const compIdx = data.components?.findIndex((c: any) => c.type === "testimonials");
        if (compIdx !== -1) {
          setTestimonialsIdx(compIdx);
          const quotes = data.components[compIdx].props?.quotes || [];
          setTestimonialsList(quotes);
        } else {
          // If testimonials block doesn't exist, we can initialize it
          setTestimonialsIdx(null);
          setTestimonialsList([]);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!homePage || testimonialsIdx === null) return;
    setSaving(true);
    setStatus("Synchronizing database...");
    
    try {
      // Update page components
      const updatedComponents = [...homePage.components];
      updatedComponents[testimonialsIdx].props.quotes = testimonialsList;
      const updatedPage = { ...homePage, components: updatedComponents };

      const res = await fetchWithAuth("/api/v1/cms/home", {
        method: "PUT",
        body: JSON.stringify(updatedPage)
      });

      if (res.ok) {
        setStatus("Verified - Frontend synced!");
        setTimeout(() => setStatus(""), 3000);
      } else {
        setStatus("Sync failed.");
      }
    } catch (e) {
      console.error(e);
      setStatus("Connection error.");
    } finally {
      setSaving(false);
    }
  };

  const handleAdd = () => {
    setTestimonialsList([
      ...testimonialsList,
      { author: "New Client", role: "Co-Founder", quote: "Outstanding digital design execution." }
    ]);
  };

  const handleUpdate = (idx: number, field: string, value: string) => {
    const updated = [...testimonialsList];
    updated[idx] = { ...updated[idx], [field]: value };
    setTestimonialsList(updated);
  };

  const handleDelete = (idx: number) => {
    if (!confirm("Are you sure you want to remove this client testimonial?")) return;
    const updated = [...testimonialsList];
    updated.splice(idx, 1);
    setTestimonialsList(updated);
  };

  const handleMove = (idx: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= testimonialsList.length) return;
    
    const updated = [...testimonialsList];
    const temp = updated[idx];
    updated[idx] = updated[targetIdx];
    updated[targetIdx] = temp;
    
    setTestimonialsList(updated);
  };

  if (loading) {
    return (
      <div className="p-20 flex flex-col items-center justify-center text-white min-h-[400px]">
        <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mb-4" />
        <div className="text-sm font-black uppercase tracking-widest text-slate-500 animate-pulse">Synchronizing Testimonials Matrix...</div>
      </div>
    );
  }

  return (
    <div className="space-y-12 max-w-5xl mx-auto text-left">
      {/* Header Info */}
      <div className="relative p-10 rounded-[2rem] bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-950 border border-white/5 overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.05),transparent_50%)]" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-indigo-400 font-bold uppercase text-[9px] tracking-widest bg-indigo-500/10 px-3.5 py-1.5 rounded-full w-fit">
              <ShieldCheck size={12} /> Narrative Integrity
            </div>
            <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white uppercase">Client Endorsements</h1>
            <p className="text-slate-400 text-base max-w-xl font-light italic">
              Manage client verification quotes displayed across the Home landing system.
            </p>
          </div>
          <div className="flex flex-col items-end gap-3 shrink-0">
            <span className="text-[10px] text-slate-500 font-bold tracking-wider uppercase flex items-center gap-1.5">
              {status ? <CheckCircle size={12} className="text-emerald-400" /> : <Clock size={12} />} {status || "Standby Status"}
            </span>
            <div className="flex gap-3">
              <Button 
                onClick={handleAdd}
                className="h-12 px-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 font-bold text-xs uppercase tracking-wider text-white transition-all gap-1.5"
              >
                <Plus size={14} /> Add Testimonial
              </Button>
              <Button 
                onClick={handleSave}
                disabled={saving || testimonialsIdx === null}
                className="h-12 px-8 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-black text-xs uppercase tracking-wider text-white transition-all shadow-lg shadow-indigo-500/10 gap-1.5"
              >
                <Save size={14} /> Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main List */}
      {testimonialsIdx === null ? (
        <div className="p-16 text-center border-2 border-dashed border-white/5 rounded-[2rem] bg-slate-900/10">
          <MessageSquare className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-extrabold text-white mb-2">Testimonials block not found</h3>
          <p className="text-slate-500 text-sm max-w-sm mx-auto italic font-medium">
            Please add a "testimonials" component section to the landing page first inside the Page Builder.
          </p>
        </div>
      ) : testimonialsList.length === 0 ? (
        <div className="p-16 text-center border-2 border-dashed border-white/5 rounded-[2rem]">
          <Plus className="w-12 h-12 text-indigo-500 cursor-pointer mx-auto mb-4 hover:scale-110 transition-transform" onClick={handleAdd} />
          <h3 className="text-xl font-extrabold text-white mb-2">Empty Testimonial Registry</h3>
          <p className="text-slate-500 text-sm max-w-sm mx-auto italic font-medium">
            Create your first strategic endorsement and deploy live instantly.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {testimonialsList.map((item, idx) => (
            <div 
              key={idx} 
              className="glass-card p-8 rounded-[2rem] border border-white/5 hover:border-indigo-500/20 transition-all flex flex-col md:flex-row gap-8 relative group"
            >
              {/* Order index label */}
              <div className="shrink-0 flex md:flex-col items-center justify-between md:justify-start gap-4">
                <span className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-black text-sm">
                  {idx + 1}
                </span>
                
                <div className="flex md:flex-col gap-1.5">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    disabled={idx === 0}
                    onClick={() => handleMove(idx, "up")}
                    className="h-8 w-8 rounded-lg text-slate-500 hover:text-white"
                  >
                    <ChevronUp size={16} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    disabled={idx === testimonialsList.length - 1}
                    onClick={() => handleMove(idx, "down")}
                    className="h-8 w-8 rounded-lg text-slate-500 hover:text-white"
                  >
                    <ChevronDown size={16} />
                  </Button>
                </div>
              </div>

              {/* Form details */}
              <div className="flex-1 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
                      <User size={12} /> Client Identity (Author)
                    </label>
                    <Input 
                      value={item.author} 
                      onChange={e => handleUpdate(idx, "author", e.target.value)}
                      className="bg-black/50 border-white/10 text-white font-semibold rounded-xl h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
                      <Briefcase size={12} /> Corporate Role / Position
                    </label>
                    <Input 
                      value={item.role} 
                      onChange={e => handleUpdate(idx, "role", e.target.value)}
                      className="bg-black/50 border-white/10 text-white font-semibold rounded-xl h-11"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
                    <MessageSquare size={12} /> Endorsement Quote Narrative
                  </label>
                  <Textarea 
                    value={item.quote} 
                    onChange={e => handleUpdate(idx, "quote", e.target.value)}
                    className="bg-black/50 border-white/10 text-white text-sm font-semibold rounded-xl min-h-[90px] resize-none"
                  />
                </div>
              </div>

              {/* Delete action */}
              <div className="shrink-0 flex items-end">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleDelete(idx)}
                  className="h-10 w-10 text-rose-500 hover:bg-rose-500/10 hover:text-rose-400 rounded-xl"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
