"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Save, UploadCloud } from "lucide-react";
import { getApiUrl } from "@/lib/utils";

/**
 * A Reusable CMS Editor component that handles fetching, saving, and image uploading
 * for a specific content segment.
 */

const InputLabel = ({ children }: { children: React.ReactNode }) => (
  <label className="block text-sm font-semibold text-indigo-300 mb-2 tracking-wide uppercase">{children}</label>
);

const Input = ({ value, onChange, isTextarea = false, placeholder, isRich = false }: { value: string, onChange: (v: string) => void, isTextarea?: boolean, placeholder?: string, isRich?: boolean }) => {
  const className = "flex w-full rounded-lg border border-white/10 bg-black/40 px-4 py-2.5 text-sm ring-offset-indigo-500 placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 focus-visible:border-indigo-500/50 transition-all text-white shadow-inner";
  
  if (isRich || isTextarea) {
    return (
      <div className="relative w-full group">
        {isRich && (
          <div className="absolute -top-10 left-0 flex gap-1 opacity-0 group-focus-within:opacity-100 transition-opacity bg-slate-800 p-1 rounded-t-lg border border-white/10 border-b-0">
             <button type="button" className="px-2 py-1 text-[10px] hover:bg-white/10 rounded">Bold</button>
             <button type="button" className="px-2 py-1 text-[10px] hover:bg-white/10 rounded">Italic</button>
             <button type="button" className="px-2 py-1 text-[10px] hover:bg-white/10 rounded">List</button>
          </div>
        )}
        <textarea 
          value={value || ""} 
          onChange={e => onChange(e.target.value)} 
          className={`${className} min-h-[120px] resize-none ${isRich ? 'rounded-tl-none' : ''}`} 
          placeholder={placeholder} 
        />
      </div>
    );
  }
  return <input type="text" value={value || ""} onChange={e => onChange(e.target.value)} className={className} placeholder={placeholder} />;
};

const ImageUploadField = ({ value, onChange }: { value: string, onChange: (v: string) => void }) => {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(getApiUrl("/api/v1/cms/upload-image"), {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        onChange(data.url);
      } else {
        alert("Image upload failed");
      }
    } catch (err) {
      console.error(err);
      alert("Upload error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Input value={value} onChange={onChange} />
        <div className="relative flex-shrink-0">
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
            onChange={handleUpload}
            disabled={uploading}
            title="Upload new image"
          />
          <Button type="button" variant="secondary" className="pointer-events-none" disabled={uploading}>
            <UploadCloud className="w-4 h-4 mr-2" />
            {uploading ? "Uploading..." : "Upload"}
          </Button>
        </div>
      </div>
      {value && (
        <div className="mt-4 p-3 bg-black/40 border border-white/10 rounded-xl overflow-hidden shadow-2xl group relative max-w-sm">
          <img
            src={value.startsWith('http') || value.startsWith('/') ? value : getApiUrl(value)}
            className="h-auto w-full max-h-[220px] object-cover rounded-lg border border-white/5 transition-transform group-hover:scale-[1.02]"
            alt="preview"
          />
          <div className="mt-2 flex items-center justify-between">
            <span className="text-[10px] text-muted-foreground truncate max-w-[80%]">{value}</span>
            <button onClick={() => onChange("")} className="text-[10px] text-destructive hover:underline">Remove</button>
          </div>
        </div>
      )}
    </div>
  );
};

export function CMSEditor({ 
    segment, 
    title, 
    description,
    children 
}: { 
    segment: string; 
    title: string; 
    description: string;
    children: (data: any, handlers: { 
        handleNestedChange: (section: string, field: string, value: any) => void;
        handleArrayChange: (section: string, arrayName: string, index: number, field: string, value: any) => void;
        addArrayItem: (section: string, arrayName: string, emptyItem: any) => void;
        removeArrayItem: (section: string, arrayName: string, index: number) => void;
        handleChange: (field: string, value: any) => void;
    }) => React.ReactNode;
}) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(getApiUrl(`/api/v1/cms/${segment}`), {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error(`Server returned ${res.status}`);
        return res.json();
      })
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(err => {
        console.error("CMS Fetch Error:", err);
        setError(err.message || "Failed to connect to backend");
        setLoading(false);
      });
  }, [segment]);

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(getApiUrl(`/api/v1/cms/${segment}`), {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        setStatus("Saved successfully!");
        setTimeout(() => setStatus(""), 3000);
      } else {
        setStatus("Error saving.");
      }
    } catch (e) {
      setStatus("Error saving data.");
    }
  };

  const handleNestedChange = (section: string, field: string, value: any) => {
    setData((prev: any) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  const handleArrayChange = (section: string, arrayName: string, index: number, field: string, value: any) => {
    setData((prev: any) => {
      if (!section) {
        // Top-level array
        const newArray = [...(prev[arrayName] || [])];
        newArray[index] = { ...newArray[index], [field]: value };
        return { ...prev, [arrayName]: newArray };
      }
      const newArray = [...(prev[section]?.[arrayName] || [])];
      newArray[index] = { ...newArray[index], [field]: value };
      return {
        ...prev,
        [section]: { ...prev[section], [arrayName]: newArray }
      };
    });
  };

  const addArrayItem = (section: string, arrayName: string, emptyItem: any) => {
    setData((prev: any) => {
      if (!section) {
        return { ...prev, [arrayName]: [...(prev[arrayName] || []), emptyItem] };
      }
      return {
        ...prev,
        [section]: { ...prev[section], [arrayName]: [...(prev[section]?.[arrayName] || []), emptyItem] }
      };
    });
  };

  const removeArrayItem = (section: string, arrayName: string, index: number) => {
    setData((prev: any) => {
      if (!section) {
        const newArray = (prev[arrayName] || []).filter((_: any, i: number) => i !== index);
        return { ...prev, [arrayName]: newArray };
      }
      const newArray = (prev[section]?.[arrayName] || []).filter((_: any, i: number) => i !== index);
      return {
        ...prev,
        [section]: { ...prev[section], [arrayName]: newArray }
      };
    });
  };

  const handleChange = (field: string, value: any) => {
    if (!field) {
        setData(value);
    } else {
        setData((prev: any) => ({ ...prev, [field]: value }));
    }
  };

  if (loading) return (
    <div className="p-20 flex flex-col items-center justify-center text-white min-h-[400px]">
      <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mb-4" />
      <div className="text-lg font-medium animate-pulse">Synchronizing {title}...</div>
    </div>
  );

  if (error || !data) return (
    <div className="p-10 text-white flex flex-col items-center justify-center min-h-[400px] text-center">
      <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-3xl max-w-md">
        <div className="text-red-400 text-5xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold mb-2">Connection Failed</h2>
        <p className="text-muted-foreground text-sm mb-6">
          We couldn't connect to the backend at <code className="text-indigo-300 font-mono bg-indigo-500/10 px-1 rounded">{getApiUrl()}</code>. 
          Make sure your Render backend is running and `NEXT_PUBLIC_API_URL` is set correctly on Vercel.
        </p>
        <Button onClick={() => window.location.reload()} variant="outline" className="border-white/10 hover:bg-white/5">
          Retry Connection
        </Button>
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-8 min-h-screen text-white bg-slate-950/20">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-muted-foreground text-sm mt-1">{description}</p>
        </div>
        <div className="flex items-center gap-4">
          <span className={status.includes("success") ? "text-green-500 text-sm" : "text-amber-500 text-sm"}>
            {status}
          </span>
          <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2">
            <Save className="w-4 h-4" /> Save Changes
          </Button>
        </div>
      </div>

      <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl ring-1 ring-white/5">
        {children(data, { handleNestedChange, handleArrayChange, addArrayItem, removeArrayItem, handleChange })}
      </div>
    </div>
  );
}

// Export sub-components for use in children
CMSEditor.Input = Input;
CMSEditor.Label = InputLabel;
CMSEditor.ImageUpload = ImageUploadField;
