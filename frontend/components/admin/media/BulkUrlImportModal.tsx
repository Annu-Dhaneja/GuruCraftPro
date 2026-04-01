"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Link as LinkIcon, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { getApiUrl } from "@/lib/utils";

interface BulkUrlImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function BulkUrlImportModal({ isOpen, onClose, onSuccess }: BulkUrlImportModalProps) {
  const [urls, setUrls] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[] | null>(null);

  const handleImport = async () => {
    const urlList = urls.split("\n").map(u => u.trim()).filter(u => u.length > 0);
    if (urlList.length === 0) return;

    setLoading(true);
    setResults(null);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(getApiUrl("/api/v1/cms/media/bulk-url-import"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ urls: urlList })
      });

      if (res.ok) {
        const data = await res.json();
        setResults(data.results || []);
        onSuccess();
      } else {
        const err = await res.json().catch(() => ({}));
        alert(err.detail || "Bulk import failed");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to connect to backend");
    } finally {
      setLoading(false);
    }
  };

  const closeAndReset = () => {
    setUrls("");
    setResults(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeAndReset}>
      <DialogContent className="sm:max-w-[600px] bg-slate-900 border-white/10 text-white rounded-[2rem]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black tracking-tight flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
               <LinkIcon className="w-5 h-5 text-indigo-400" />
            </div>
            Bulk URL Ingestion
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            Paste image URLs (one per line) to ingest them directly into the platform's central media orchestration layer.
          </DialogDescription>
        </DialogHeader>

        {results ? (
          <div className="space-y-4 py-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {results.map((res: any, idx: number) => (
              <div key={idx} className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${
                res.status === 'success' ? 'bg-indigo-500/5 border-indigo-500/20' : 'bg-red-500/5 border-red-500/20'
              }`}>
                <div className="flex-1 min-w-0">
                   <p className="text-xs font-mono text-zinc-300 truncate">{res.url}</p>
                   <p className={`text-[10px] mt-1 font-bold uppercase tracking-widest ${
                     res.status === 'success' ? 'text-indigo-400' : 'text-red-400'
                   }`}>
                     {res.status === 'success' ? 'Successfully Ingested' : `Failed: ${res.error || 'Unknown Error'}`}
                   </p>
                </div>
                {res.status === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6 py-4">
            <textarea
              className="w-full min-h-[250px] bg-black/40 border border-white/10 rounded-2xl p-6 text-sm font-mono text-indigo-200 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all resize-none"
              placeholder="https://example.com/image-1.jpg&#10;https://example.com/image-2.png"
              value={urls}
              onChange={(e) => setUrls(e.target.value)}
              disabled={loading}
            />
            <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-4">
               <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                  <LinkIcon className="w-5 h-5 text-indigo-400" />
               </div>
               <p className="text-xs text-zinc-400 font-medium">
                  Backend will download these files and serve them locally to bypass high-latency external fetch requests.
               </p>
            </div>
          </div>
        )}

        <DialogFooter className="mt-4 gap-3">
          {results ? (
            <Button onClick={closeAndReset} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-6 rounded-xl">
              Close & View Matrix
            </Button>
          ) : (
            <>
              <Button 
                variant="ghost" 
                onClick={closeAndReset} 
                disabled={loading}
                className="text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl py-6"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleImport} 
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-6 rounded-xl shadow-lg shadow-indigo-600/20"
                disabled={loading || !urls.trim()}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Ingesting Assets...
                  </>
                ) : (
                  "Start Ingestion"
                )}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
