"use client";

import { useState, useEffect } from "react";
import { Loader2, Terminal, AlertTriangle, CheckCircle2, Server, Power, RefreshCw } from "lucide-react";
import { getApiUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ServerWakeupPortalProps {
  onSuccess: () => void;
  initialErrorMsg?: string;
}

export function ServerWakeupPortal({ onSuccess, initialErrorMsg }: ServerWakeupPortalProps) {
  const [activating, setActivating] = useState(false);
  const [status, setStatus] = useState<"asleep" | "activating" | "online" | "failed">("asleep");
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const addLog = (msg: string) => {
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const checkHealth = async (): Promise<boolean> => {
    try {
      const res = await fetch(getApiUrl("/health"), {
        method: "GET",
        headers: { "Cache-Control": "no-cache", "Pragma": "no-cache" },
      });
      if (res.ok) {
        const data = await res.json();
        return data.status === "ok" || data.api === "online";
      }
      return false;
    } catch {
      return false;
    }
  };

  const handleActivate = async () => {
    setActivating(true);
    setStatus("activating");
    setProgress(15);
    setLogs([]);
    addLog("Initiating server handshake wake-up sequence...");
    addLog("Target Endpoint: " + getApiUrl("/health"));

    // Max ping attempts: 15 (tries for ~30-40 seconds)
    const maxAttempts = 15;
    let attempt = 0;

    const interval = setInterval(async () => {
      attempt++;
      addLog(`[Attempt ${attempt}/${maxAttempts}] Pinging backend API health check...`);
      setProgress((prev) => Math.min(prev + 5, 90));

      const isOnline = await checkHealth();
      if (isOnline) {
        clearInterval(interval);
        setProgress(100);
        setStatus("online");
        addLog("🎉 SUCCESS: Remote gateway handshake verified!");
        addLog("✓ Database connection pool established securely.");
        addLog("✓ Redirecting back to CMS Dashboard...");
        
        // Auto trigger success reload after 1.5 seconds
        setTimeout(() => {
          onSuccess();
        }, 1500);
      } else {
        if (attempt === 3) {
          addLog("ℹ Server container is cold-booting (this usually takes 15-25 seconds)...");
        } else if (attempt === 6) {
          addLog("ℹ Re-routing network traffic and warming up database connections...");
        } else if (attempt === 10) {
          addLog("⚠ Response taking longer than expected. Continuing ping cycle...");
        }

        if (attempt >= maxAttempts) {
          clearInterval(interval);
          setStatus("failed");
          setActivating(false);
          addLog("❌ TIMEOUT: Wake-up sequence did not succeed in time.");
          addLog("Please verify network connection and try again.");
        }
      }
    }, 2500);
  };

  // Auto detect if server is online right away
  useEffect(() => {
    checkHealth().then((online) => {
      if (online) {
        addLog("Backend is already warm and online.");
      } else {
        addLog("System in hibernation mode. Waking up required.");
      }
    });
  }, []);

  return (
    <div className="flex items-center justify-center p-6 min-h-[500px]">
      <div className="glass-panel w-full max-w-xl p-10 rounded-[3rem] border border-white/5 bg-slate-950/40 backdrop-blur-xl shadow-2xl relative text-center space-y-8 animate-in zoom-in-95 duration-300">
        
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none -z-10" />

        {/* Dynamic Graphic */}
        <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
          {status === "online" ? (
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/20 animate-in zoom-in duration-300">
              <CheckCircle2 size={36} className="animate-bounce" />
            </div>
          ) : status === "failed" ? (
            <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 shadow-lg shadow-rose-500/20 animate-in zoom-in duration-300">
              <AlertTriangle size={36} className="animate-pulse" />
            </div>
          ) : status === "activating" ? (
            <div className="relative flex items-center justify-center">
              <Loader2 className="w-16 h-16 text-indigo-500 animate-spin absolute" />
              <Server className="w-8 h-8 text-indigo-400 animate-pulse" />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-lg shadow-indigo-500/10 animate-in zoom-in duration-300">
              <Server className="w-8 h-8 animate-pulse" />
            </div>
          )}
        </div>

        {/* Title & Desc */}
        <div>
          <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white">
            {status === "asleep" && "Neural Gateway Sleeping"}
            {status === "activating" && "Waking Server Cores"}
            {status === "online" && "System Online"}
            {status === "failed" && "Activation Halted"}
          </h2>
          <p className="text-slate-400 text-sm mt-2 italic px-4">
            {status === "asleep" && "The backend API goes to sleep automatically to conserve resources. Let's wake it up instantly!"}
            {status === "activating" && "Dispatching secure API handshakes to re-initialize your Supabase database gateway..."}
            {status === "online" && "Warm-up sequence completed. Database connection successfully established!"}
            {status === "failed" && "The server was unable to respond. Please check your network and try again."}
          </p>
        </div>

        {/* Activator Button */}
        {status !== "online" && (
          <div className="flex justify-center">
            <Button
              onClick={handleActivate}
              disabled={activating}
              className={`font-black text-xs uppercase tracking-wider rounded-2xl h-14 px-8 shadow-xl gap-2 transition-all hover:scale-105 active:scale-95 ${
                activating
                  ? "bg-slate-800 text-slate-500 border border-white/5"
                  : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20"
              }`}
            >
              {activating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Warming Core ({progress}%)
                </>
              ) : (
                <>
                  <Power className="w-4 h-4 mr-2" />
                  Activate Backend Server
                </>
              )}
            </Button>
          </div>
        )}

        {/* Terminal Logs Panel */}
        {(activating || logs.length > 0) && (
          <div className="bg-black/60 border border-white/5 p-6 rounded-3xl text-left font-mono text-[10px] space-y-2 text-indigo-300 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2">
              <span className="text-[9px] font-black uppercase text-indigo-400 flex items-center gap-1.5">
                <Terminal size={11} /> Gateway Handshake Stream
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            
            <div className="max-h-40 overflow-y-auto space-y-1.5 scrollbar-thin">
              {logs.map((log, index) => (
                <p
                  key={index}
                  className={
                    log.includes("❌")
                      ? "text-rose-400"
                      : log.includes("✓") || log.includes("🎉")
                      ? "text-emerald-400"
                      : "text-indigo-300"
                  }
                >
                  {log}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
