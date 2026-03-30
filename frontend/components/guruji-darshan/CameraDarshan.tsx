"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Camera, 
  SwitchCamera, 
  Download, 
  Sparkles, 
  X,
  CameraOff,
  Sun,
  Flame,
  Flower
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function CameraDarshan({ onClose }: { onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState("golden");

  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
                facingMode: "user",
                width: { ideal: 1280 },
                height: { ideal: 720 }
            } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsReady(true);
        }
      } catch (err) {
        console.error("Camera access error:", err);
        setError("Camera access denied. Please enable permissions.");
      }
    }
    startCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const capturePhoto = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        
        // Draw Video Frame
        context.drawImage(videoRef.current, 0, 0);
        
        // Apply Filter (Mock)
        if (activeFilter === "golden") {
            context.fillStyle = "rgba(251, 191, 36, 0.1)";
            context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }

        // Draw Blessing Text Overlay
        context.fillStyle = "white";
        context.font = "bold 40px serif";
        context.textAlign = "center";
        context.fillText("Guruji Ke Sakshat Darshan", canvasRef.current.width / 2, canvasRef.current.height - 100);
        context.font = "italic 24px serif";
        context.fillText("Blessed Presence", canvasRef.current.width / 2, canvasRef.current.height - 60);

        // Download Image
        const link = document.createElement("a");
        link.download = `Guruji-Blessing-${Date.now()}.png`;
        link.href = canvasRef.current.toDataURL("image/png");
        link.click();
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-4 lg:p-10"
    >
      <div className="absolute top-8 right-8 z-[110]">
        <Button variant="ghost" onClick={onClose} className="text-white hover:bg-white/10 rounded-full w-14 h-14 p-0">
          <X className="w-8 h-8" />
        </Button>
      </div>

      <div className="relative w-full max-w-5xl aspect-video rounded-[40px] overflow-hidden border-4 border-amber-600/50 shadow-[0_0_100px_rgba(217,119,6,0.3)] bg-zinc-900 group">
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted 
          className={`w-full h-full object-cover transition-all duration-1000 ${
              activeFilter === "golden" ? "sepia-[0.3] contrast-[1.1] brightness-[1.1] hue-rotate-[10deg]" : ""
          }`}
        />
        
        {/* AR Overlays */}
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-amber-600/20 via-transparent to-transparent opacity-60" />
            
            {/* Floating Particles/Petals (Animated) */}
            <AnimatePresence>
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 100, x: Math.random() * 1000 }}
                        animate={{ 
                            opacity: [0, 1, 0], 
                            y: -200, 
                            x: (Math.random() * 1000) - 200,
                            rotate: 360
                        }}
                        transition={{ 
                            duration: 4 + Math.random() * 4, 
                            repeat: Infinity,
                            delay: i * 0.5 
                        }}
                        className="absolute bottom-0 text-amber-300 opacity-40"
                    >
                        <Flower className="w-8 h-8" />
                    </motion.div>
                ))}
            </AnimatePresence>
            
            {/* Center Aura */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.15)_0%,transparent_70%)] opacity-60" />
            
            {/* Saffron Border Detail */}
            <div className="absolute inset-0 border-[20px] border-amber-600/5 pointer-events-none" />
        </div>

        {/* Status Indicators */}
        <div className="absolute top-8 left-8 flex items-center gap-4 px-4 py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-white text-xs font-bold font-serif tracking-widest z-10">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            LIVE_DAKSHAN_STREAM.V1
        </div>

        {/* Controls Overlay */}
        <div className="absolute bottom-0 left-0 w-full p-10 flex items-center justify-center gap-8 bg-gradient-to-t from-black via-transparent to-transparent z-20">
            <Button 
                onClick={() => setActiveFilter(activeFilter === "golden" ? "none" : "golden")}
                className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-xl"
            >
                <Sparkles className={`w-7 h-7 ${activeFilter === "golden" ? "text-amber-400" : "text-white"}`} />
            </Button>

            <Button 
                onClick={capturePhoto}
                disabled={!isReady}
                className="w-24 h-24 rounded-full bg-amber-600 hover:bg-amber-500 text-white shadow-2xl shadow-amber-600/50 scale-110 active:scale-95 transition-transform"
            >
                <Camera className="w-10 h-10" />
            </Button>

            <Button className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-xl">
                <Download className="w-7 h-7 text-white" />
            </Button>
        </div>

        {error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950/90 text-center p-12 z-[120]">
                <CameraOff className="w-20 h-20 text-rose-500 mb-6" />
                <h3 className="text-3xl font-bold text-white mb-4">Connection Failed</h3>
                <p className="text-zinc-400 text-lg mb-8">{error}</p>
                <Button variant="outline" className="text-white border-white/20 rounded-full h-14 px-10" onClick={() => window.location.reload()}>
                    Retry Connection
                </Button>
            </div>
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />
      
      <div className="mt-12 text-center text-zinc-500 max-w-xl font-serif italic">
        "Receive the blessings of Guruji through this live interface. 
        Capture the moment and keep the divine grace close to your heart."
      </div>
    </motion.div>
  );
}
