"use client";

import { useEffect, useState } from "react";
import { getApiUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Loader2, Mail, Building2, Calendar, MessageSquare, Clock } from "lucide-react";

interface Submission {
  id: number;
  name: string;
  email: string;
  company: string | null;
  inquiry_type: string;
  message: string;
  budget: string | null;
  deadline: string | null;
  created_at: string;
}

export default function ContactsAdminPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/login";
        return;
      }

      try {
        const res = await fetch(getApiUrl("/api/v1/admin/submissions"), {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (res.ok) {
          const data = await res.json();
          setSubmissions(data);
        } else {
          if (res.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }
          setError("Failed to load submissions.");
        }
      } catch (err) {
        setError("Could not connect to the backend.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  if (loading) return (
    <div className="p-20 flex flex-col items-center justify-center text-white">
      <Loader2 className="w-12 h-12 animate-spin text-indigo-500 mb-4" />
      <p className="text-lg font-medium">Loading submissions...</p>
    </div>
  );

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="mb-12 border-b border-white/10 pb-8">
        <h1 className="text-4xl font-black text-white">Contact Submissions</h1>
        <p className="text-muted-foreground mt-2">Manage all incoming requests and inquiries</p>
      </div>

      {error ? (
        <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-center">
          {error}
          <Button onClick={() => window.location.reload()} variant="outline" className="mt-4 block mx-auto border-white/10 hover:bg-white/5">
            Retry
          </Button>
        </div>
      ) : submissions.length === 0 ? (
        <div className="p-20 text-center bg-white/5 border border-dashed border-white/10 rounded-2xl">
          <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
          <p className="text-muted-foreground">No submissions found yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {submissions.map((sub) => (
            <div key={sub.id} className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl hover:border-indigo-500/30 transition-all group">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="space-y-4 flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">{sub.name}</h3>
                      <div className="flex items-center gap-2 text-indigo-400 text-sm mt-1">
                        <Mail className="w-3 h-3" />
                        {sub.email}
                      </div>
                    </div>
                    <div className="text-right">
                       <div className="bg-indigo-500/10 text-indigo-400 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded border border-indigo-500/20">
                         {sub.inquiry_type}
                       </div>
                       <div className="flex items-center gap-1 text-[10px] text-muted-foreground mt-2 justify-end">
                         <Clock className="w-3 h-3" />
                         {new Date(sub.created_at).toLocaleDateString()}
                       </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 border-y border-white/5 text-sm">
                    {sub.company && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Building2 className="w-4 h-4 text-white/40" />
                        <span><span className="text-white/20 mr-1">Company:</span> {sub.company}</span>
                      </div>
                    )}
                    {sub.budget && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-4 h-4 flex items-center justify-center text-white/40 font-bold">$</div>
                        <span><span className="text-white/20 mr-1">Budget:</span> {sub.budget}</span>
                      </div>
                    )}
                    {sub.deadline && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4 text-white/40" />
                        <span><span className="text-white/20 mr-1">Deadline:</span> {sub.deadline}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-2">
                    <div className="flex items-start gap-3">
                      <MessageSquare className="w-4 h-4 text-indigo-500 mt-1 shrink-0" />
                      <p className="text-white/80 leading-relaxed italic">"{sub.message}"</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
