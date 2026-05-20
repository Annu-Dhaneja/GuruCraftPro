"use client";

import { useState, useEffect } from "react";
import { fetchWithAuth } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, Save, Trash2, LayoutList, Settings, Mail, Phone, Calendar, 
  Building2, MessageSquare, Clock, Filter, Search, Download, ExternalLink, 
  Check, Archive, ShieldAlert, Sparkles, Send, ArrowRight, CornerDownLeft
} from "lucide-react";
import { toast } from "sonner";

interface Submission {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  inquiry_type: string;
  message: string;
  budget: string | null;
  deadline: string | null;
  attachment_url: string | null;
  page_source: string | null;
  status: string;
  ip_address: string | null;
  device_metadata: string | null;
  created_at: string;
}

export default function FormsAndLeadsDashboard() {
  const [activeTab, setActiveTab] = useState<"leads" | "builder">("leads");

  // LEADS STATE
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selectedLead, setSelectedLead] = useState<Submission | null>(null);
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "new" | "contacted" | "closed" | "spam">("all");
  const [replyText, setReplyText] = useState("");
  const [replying, setReplying] = useState(false);

  // BUILDER STATE (Restored unchanged)
  const [forms, setForms] = useState<any[]>([]);
  const [builderLoading, setBuilderLoading] = useState(false);
  const [activeForm, setActiveForm] = useState<any>(null);

  useEffect(() => {
    if (activeTab === "leads") {
      loadLeads();
    } else {
      loadForms();
    }
  }, [activeTab]);

  // ==========================================
  // LEADS & SUBMISSIONS METHODS
  // ==========================================
  const loadLeads = async () => {
    setLeadsLoading(true);
    try {
      const res = await fetchWithAuth("/api/v1/admin/submissions");
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data);
      } else {
        toast.error("Failed to load submissions.");
      }
    } catch (e) {
      toast.error("Error connecting to the backend.");
    }
    setLeadsLoading(false);
  };

  const handleUpdateStatus = async (leadId: number, newStatus: string) => {
    try {
      const res = await fetchWithAuth(`/api/v1/admin/submissions/${leadId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        const updated = await res.json();
        setSubmissions(prev => prev.map(s => s.id === leadId ? updated : s));
        if (selectedLead && selectedLead.id === leadId) {
          setSelectedLead(updated);
        }
        toast.success(`Lead marked as ${newStatus}`);
      } else {
        toast.error("Failed to update status.");
      }
    } catch (e) {
      toast.error("Error updating lead status.");
    }
  };

  const handleDeleteLead = async (leadId: number) => {
    if (!confirm("Are you sure you want to permanently delete this lead submission?")) return;
    try {
      const res = await fetchWithAuth(`/api/v1/admin/submissions/${leadId}`, {
        method: "DELETE"
      });
      if (res.ok) {
        setSubmissions(prev => prev.filter(s => s.id !== leadId));
        if (selectedLead && selectedLead.id === leadId) {
          setSelectedLead(null);
        }
        toast.success("Lead submission deleted.");
      } else {
        toast.error("Failed to delete submission.");
      }
    } catch (e) {
      toast.error("Error deleting lead.");
    }
  };

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead || !replyText.trim()) return;
    setReplying(true);
    try {
      const res = await fetchWithAuth(`/api/v1/admin/submissions/${selectedLead.id}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: replyText })
      });
      if (res.ok) {
        toast.success("Reply email sent successfully!");
        setReplyText("");
        // Refresh leads list to show "contacted" status
        loadLeads();
        // Update local panel state status
        setSelectedLead({ ...selectedLead, status: "contacted" });
      } else {
        toast.error("Failed to send reply email.");
      }
    } catch (e) {
      toast.error("Error sending reply.");
    }
    setReplying(false);
  };

  const exportToCSV = () => {
    if (submissions.length === 0) {
      toast.error("No submissions available to export.");
      return;
    }
    
    // Construct CSV header
    const headers = ["ID", "Name", "Email", "Phone", "Company", "Inquiry Type", "Message", "Budget", "Deadline", "Page Source", "Status", "IP Address", "Device Meta", "Created At"];
    const rows = submissions.map(s => [
      s.id,
      `"${s.name.replace(/"/g, '""')}"`,
      `"${s.email.replace(/"/g, '""')}"`,
      `"${(s.phone || '').replace(/"/g, '""')}"`,
      `"${(s.company || '').replace(/"/g, '""')}"`,
      `"${s.inquiry_type.replace(/"/g, '""')}"`,
      `"${s.message.replace(/"/g, '""').replace(/\n/g, ' ')}"`,
      `"${(s.budget || '').replace(/"/g, '""')}"`,
      `"${(s.deadline || '').replace(/"/g, '""')}"`,
      `"${(s.page_source || '').replace(/"/g, '""')}"`,
      s.status,
      `"${(s.ip_address || '').replace(/"/g, '""')}"`,
      `"${(s.device_metadata || '').replace(/"/g, '""')}"`,
      s.created_at
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `gurucraftpro_leads_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV export downloaded successfully!");
  };

  // ==========================================
  // FORM BUILDER METHODS
  // ==========================================
  const loadForms = async () => {
    setBuilderLoading(true);
    try {
      const res = await fetchWithAuth("/api/v1/forms");
      if (res.ok) setForms(await res.json());
    } catch (e) { console.error(e); }
    setBuilderLoading(false);
  };

  const createNewForm = () => {
    setActiveForm({
      name: "New Form",
      slug: "new-form",
      is_active: true,
      config: {},
      fields: []
    });
  };

  const addField = () => {
    setActiveForm({
      ...activeForm,
      fields: [...activeForm.fields, { label: "New Field", type: "text", required: false, options: [] }]
    });
  };

  const updateField = (index: number, key: string, val: any) => {
    const updated = [...activeForm.fields];
    updated[index][key] = val;
    setActiveForm({ ...activeForm, fields: updated });
  };

  const removeField = (index: number) => {
    const updated = [...activeForm.fields];
    updated.splice(index, 1);
    setActiveForm({ ...activeForm, fields: updated });
  };

  const saveForm = async () => {
    try {
      const res = await fetchWithAuth("/api/v1/forms", {
        method: "POST",
        body: JSON.stringify(activeForm)
      });
      if (res.ok) {
        toast.success("Form Template Saved!");
        loadForms();
        setActiveForm(null);
      }
    } catch (e) { toast.error("Failed to save form template."); }
  };

  // Filters logic
  const filteredSubmissions = submissions.filter(s => {
    const matchesSearch = 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.inquiry_type.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (statusFilter === "all") return matchesSearch;
    return s.status === statusFilter && matchesSearch;
  });

  // Calculate statistics
  const totalLeads = submissions.length;
  const newLeads = submissions.filter(s => s.status === "new").length;
  const contactedLeads = submissions.filter(s => s.status === "contacted").length;
  const spamLeads = submissions.filter(s => s.status === "spam").length;

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto h-full flex flex-col gap-6 text-white">
      {/* Upper Navigation & Tabs */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-6 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight italic uppercase">Forms & Leads</h1>
          <p className="text-slate-400 text-sm mt-1">Manage user submissions, client intake workflows, and dynamic forms.</p>
        </div>
        
        {/* Toggle tabs */}
        <div className="flex bg-slate-900 border border-white/10 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab("leads")}
            className={`px-4 py-2 text-xs md:text-sm font-bold uppercase tracking-wider rounded-lg transition-all ${activeTab === "leads" ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
          >
            Leads & Inbox
          </button>
          <button
            onClick={() => setActiveTab("builder")}
            className={`px-4 py-2 text-xs md:text-sm font-bold uppercase tracking-wider rounded-lg transition-all ${activeTab === "builder" ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
          >
            Dynamic Form Builder
          </button>
        </div>
      </div>

      {/* ================================================================ */}
      {/* LEADS & INBOX VIEW */}
      {/* ================================================================ */}
      {activeTab === "leads" && (
        <div className="space-y-6 flex-1 flex flex-col">
          {/* Dashboard KPI cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Total Leads", val: totalLeads, color: "from-blue-500/20 to-blue-600/5", text: "text-blue-400" },
              { label: "New / Unread", val: newLeads, color: "from-emerald-500/20 to-emerald-600/5", text: "text-emerald-400", highlight: newLeads > 0 },
              { label: "Contacted", val: contactedLeads, color: "from-indigo-500/20 to-indigo-600/5", text: "text-indigo-400" },
              { label: "Spam Blocked", val: spamLeads, color: "from-red-500/20 to-red-600/5", text: "text-red-400" }
            ].map((kpi, idx) => (
              <div 
                key={idx} 
                className={`bg-gradient-to-br ${kpi.color} border border-white/5 p-5 rounded-2xl relative overflow-hidden group shadow-lg`}
              >
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">{kpi.label}</p>
                <h3 className={`text-3xl font-black ${kpi.text} tracking-tighter leading-none`}>
                  {kpi.val}
                </h3>
                {kpi.highlight && (
                  <span className="absolute top-4 right-4 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Filtering & Actions bar */}
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-center bg-slate-900/40 border border-white/5 p-4 rounded-2xl backdrop-blur-xl">
            {/* Left filters */}
            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
              {[
                { filter: "all", label: "All Leads" },
                { filter: "new", label: "New" },
                { filter: "contacted", label: "Contacted" },
                { filter: "closed", label: "Closed" },
                { filter: "spam", label: "Spam" }
              ].map(f => (
                <button
                  key={f.filter}
                  onClick={() => setStatusFilter(f.filter as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${statusFilter === f.filter ? 'bg-indigo-600 text-white' : 'bg-white/5 text-slate-400 hover:text-white'}`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Right search & Export */}
            <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
              <div className="relative flex-1 lg:w-64">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                <Input
                  placeholder="Search leads..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-9 bg-black/40 border-white/10 rounded-xl text-sm"
                />
              </div>
              <Button 
                onClick={exportToCSV} 
                variant="outline" 
                size="sm" 
                className="h-10 border-white/10 hover:bg-white/5 rounded-xl gap-2 font-bold uppercase tracking-wider text-xs"
              >
                <Download className="w-3.5 h-3.5" /> Export CSV
              </Button>
            </div>
          </div>

          {/* Main Content Pane */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 items-start">
            {/* Leads Table/List */}
            <div className="lg:col-span-2 space-y-4">
              {leadsLoading ? (
                <div className="p-20 text-center text-slate-400">Loading submissions...</div>
              ) : filteredSubmissions.length === 0 ? (
                <div className="p-20 text-center bg-white/5 border border-dashed border-white/10 rounded-2xl text-slate-500">
                  <Mail className="w-12 h-12 mx-auto mb-3 opacity-25" />
                  No submissions found matching your filters.
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredSubmissions.map(lead => {
                    const isSelected = selectedLead?.id === lead.id;
                    return (
                      <div
                        key={lead.id}
                        onClick={() => setSelectedLead(lead)}
                        className={`p-5 rounded-2xl border transition-all cursor-pointer shadow-md flex justify-between items-start gap-4 ${isSelected ? 'bg-indigo-600/10 border-indigo-500 shadow-indigo-500/5' : 'bg-slate-900/40 border-white/5 hover:border-white/15'}`}
                      >
                        <div className="space-y-1.5 flex-1 min-w-0">
                          <div className="flex items-center gap-2.5">
                            <h4 className="font-bold text-white text-base truncate">{lead.name}</h4>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${
                              lead.status === "new" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                              lead.status === "contacted" ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" :
                              lead.status === "closed" ? "bg-slate-500/10 text-slate-400 border-white/10" :
                              "bg-red-500/10 text-red-400 border-red-500/20"
                            }`}>
                              {lead.status}
                            </span>
                          </div>
                          
                          <p className="text-xs text-slate-400 truncate flex items-center gap-1.5">
                            <Mail className="w-3 h-3 text-indigo-400 shrink-0" />
                            {lead.email}
                          </p>

                          <p className="text-slate-300 text-xs italic line-clamp-1 mt-2">
                            "{lead.message}"
                          </p>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="bg-white/5 border border-white/10 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded tracking-wide">
                            {lead.inquiry_type.replace("Booking: ", "")}
                          </span>
                          <p className="text-[10px] text-slate-500 mt-3 flex items-center gap-1 justify-end">
                            <Clock className="w-3 h-3" />
                            {new Date(lead.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Details Panel Sidecard */}
            <div className="lg:col-span-1">
              {selectedLead ? (
                <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 space-y-6 shadow-xl sticky top-6">
                  {/* Lead Header */}
                  <div className="flex justify-between items-start border-b border-white/5 pb-4">
                    <div>
                      <h3 className="text-xl font-extrabold text-white leading-tight">{selectedLead.name}</h3>
                      <p className="text-xs text-indigo-400 font-medium mt-1 select-all">{selectedLead.email}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      onClick={() => handleDeleteLead(selectedLead.id)} 
                      className="text-red-400 hover:text-red-300 p-2 h-auto"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Metadata Fields */}
                  <div className="space-y-3.5 text-xs">
                    {selectedLead.phone && (
                      <div className="flex items-center gap-2.5 text-slate-300">
                        <Phone className="w-4 h-4 text-slate-500" />
                        <span>Phone: <a href={`tel:${selectedLead.phone}`} className="hover:text-indigo-400">{selectedLead.phone}</a></span>
                      </div>
                    )}
                    {selectedLead.company && (
                      <div className="flex items-center gap-2.5 text-slate-300">
                        <Building2 className="w-4 h-4 text-slate-500" />
                        <span>Company: {selectedLead.company}</span>
                      </div>
                    )}
                    {selectedLead.budget && (
                      <div className="flex items-center gap-2.5 text-slate-300">
                        <div className="w-4 h-4 flex items-center justify-center font-bold text-slate-500 text-sm">$</div>
                        <span>Budget: {selectedLead.budget}</span>
                      </div>
                    )}
                    {selectedLead.deadline && (
                      <div className="flex items-center gap-2.5 text-slate-300">
                        <Calendar className="w-4 h-4 text-slate-500" />
                        <span>Timeline: {selectedLead.deadline}</span>
                      </div>
                    )}
                    {selectedLead.page_source && (
                      <div className="flex items-center gap-2.5 text-slate-300">
                        <ExternalLink className="w-4 h-4 text-slate-500" />
                        <span className="truncate">Source Page: <span className="text-slate-400 select-all">{selectedLead.page_source}</span></span>
                      </div>
                    )}
                    {selectedLead.attachment_url && (
                      <div className="flex items-center gap-2.5 text-slate-300">
                        <Download className="w-4 h-4 text-slate-500" />
                        <span>
                          Attachment: <a href={selectedLead.attachment_url} target="_blank" rel="noreferrer" className="text-indigo-400 underline hover:text-indigo-300">View File</a>
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Submission Text Brief */}
                  <div className="bg-black/30 border border-white/5 p-4 rounded-2xl">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5" /> Project Brief / Message
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed font-light whitespace-pre-wrap">
                      {selectedLead.message}
                    </p>
                  </div>

                  {/* Workflow Transitions */}
                  <div className="border-t border-white/5 pt-4 space-y-3">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Update Lead Workflow</p>
                    <div className="flex gap-2 flex-wrap">
                      {selectedLead.status !== "contacted" && (
                        <Button 
                          onClick={() => handleUpdateStatus(selectedLead.id, "contacted")} 
                          size="sm" 
                          className="bg-indigo-600 text-white text-[10px] uppercase font-bold"
                        >
                          Mark Contacted
                        </Button>
                      )}
                      {selectedLead.status !== "closed" && (
                        <Button 
                          onClick={() => handleUpdateStatus(selectedLead.id, "closed")} 
                          size="sm" 
                          variant="outline" 
                          className="border-white/10 hover:bg-white/5 text-[10px] uppercase font-bold"
                        >
                          Close Lead
                        </Button>
                      )}
                      {selectedLead.status !== "spam" && (
                        <Button 
                          onClick={() => handleUpdateStatus(selectedLead.id, "spam")} 
                          size="sm" 
                          variant="ghost" 
                          className="text-red-400 hover:text-red-300 text-[10px] uppercase font-bold"
                        >
                          Flag Spam
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Reply Composer Client */}
                  <div className="border-t border-white/5 pt-4 space-y-3">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Send Response Email</p>
                    <form onSubmit={handleSendReply} className="space-y-3">
                      <Textarea
                        placeholder="Write reply email to client..."
                        value={replyText}
                        onChange={e => setReplyText(e.target.value)}
                        className="min-h-[100px] bg-black/40 border-white/10 text-xs rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none"
                        required
                      />
                      <Button 
                        type="submit" 
                        disabled={replying} 
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold uppercase tracking-wider h-9"
                      >
                        {replying ? "Sending Email..." : <>Transmit Email <Send className="w-3 h-3 ml-2" /></>}
                      </Button>
                    </form>
                  </div>

                  {/* Technical Meta Footer */}
                  <div className="border-t border-white/5 pt-4 text-[9px] text-slate-500 space-y-1">
                    <p>IP Address: {selectedLead.ip_address || "N/A"}</p>
                    <p className="truncate">Browser Agent: {selectedLead.device_metadata || "N/A"}</p>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-900/40 border border-dashed border-white/10 rounded-3xl p-12 text-center text-slate-500 h-96 flex flex-col items-center justify-center">
                  <CornerDownLeft className="w-8 h-8 opacity-20 mb-3" />
                  <p className="text-sm font-medium">Select a submission from the list to view project briefs, update workflow statuses, or write direct replies.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* FORM BUILDER VIEW (Restored Original Logic) */}
      {/* ================================================================ */}
      {activeTab === "builder" && (
        <div className="flex gap-10 flex-1 overflow-hidden min-h-[500px]">
          {/* Sidebar List */}
          <div className="w-64 border-r border-white/10 pr-6 space-y-4 shrink-0">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-extrabold text-lg uppercase tracking-wider italic">Templates</h2>
              <Button size="sm" onClick={createNewForm} className="bg-indigo-600"><Plus className="w-4 h-4" /></Button>
            </div>
            {builderLoading ? (
              <div className="text-xs text-slate-500">Loading forms...</div>
            ) : forms.map(f => (
              <div 
                key={f.id} 
                className={`p-3.5 rounded-xl cursor-pointer transition-colors border ${activeForm?.id === f.id ? 'bg-indigo-600/10 border-indigo-500 text-indigo-400' : 'bg-slate-900/40 border-white/5 hover:bg-white/5'}`}
                onClick={() => setActiveForm(f)}
              >
                <div className="font-bold text-sm text-white">{f.name}</div>
                <div className="text-[10px] text-slate-500 mt-1 select-all">/{f.slug}</div>
              </div>
            ))}
          </div>

          {/* Editor Panel */}
          <div className="flex-1 overflow-y-auto pr-2">
            {activeForm ? (
              <div className="space-y-8 pb-20">
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-black uppercase italic tracking-tight">Edit Form Template</h1>
                  <Button onClick={saveForm} className="bg-indigo-600 hover:bg-indigo-700"><Save className="w-4 h-4 mr-2"/> Save Form</Button>
                </div>

                <div className="bg-slate-900/40 border border-white/5 p-6 rounded-2xl space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2"><Settings className="w-4 h-4 text-indigo-400"/> Settings</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-slate-400 font-bold uppercase">Form Name</label>
                      <Input className="bg-black/40 border-white/10 mt-1" value={activeForm.name} onChange={e => setActiveForm({...activeForm, name: e.target.value})} />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 font-bold uppercase">URL Slug</label>
                      <Input className="bg-black/40 border-white/10 mt-1" value={activeForm.slug} onChange={e => setActiveForm({...activeForm, slug: e.target.value})} />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2"><LayoutList className="w-4 h-4 text-indigo-400"/> Custom Fields</h3>
                    <Button variant="outline" size="sm" onClick={addField} className="border-white/10 hover:bg-white/5"><Plus className="w-4 h-4 mr-2"/> Add Field</Button>
                  </div>

                  {activeForm.fields?.map((field: any, idx: number) => (
                    <div key={idx} className="bg-slate-900/30 border border-white/5 p-6 rounded-2xl flex gap-4 items-start shadow-md hover:border-white/10 transition-colors">
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase">Field Label</label>
                          <Input className="bg-black/40 border-white/10 mt-1" value={field.label} onChange={e => updateField(idx, 'label', e.target.value)} />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase">Field Type</label>
                          <select 
                            className="w-full h-10 px-3 mt-1 rounded-md bg-black/40 border border-white/10 text-sm text-slate-300 focus:outline-none focus:border-indigo-500"
                            value={field.type}
                            onChange={e => updateField(idx, 'type', e.target.value)}
                          >
                            <option value="text">Short Text</option>
                            <option value="textarea">Long Text</option>
                            <option value="email">Email</option>
                            <option value="select">Dropdown</option>
                            <option value="checkbox">Checkbox</option>
                          </select>
                        </div>
                        <div className="flex items-center gap-2.5 mt-7">
                          <input 
                            type="checkbox" 
                            checked={field.required} 
                            onChange={e => updateField(idx, 'required', e.target.checked)} 
                            className="w-4 h-4 rounded bg-black/50 border-white/10 text-indigo-600 focus:ring-0 focus:ring-offset-0"
                          />
                          <label className="text-xs uppercase font-bold text-slate-400">Required Field</label>
                        </div>
                      </div>
                      <Button variant="ghost" className="text-red-400 hover:text-red-300 mt-5 p-2 h-auto" onClick={() => removeField(idx)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  
                  {(!activeForm.fields || activeForm.fields.length === 0) && (
                    <div className="text-center p-12 border border-dashed border-white/10 rounded-2xl text-slate-500">
                      No custom fields added yet. Click 'Add Field' to start building.
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4">
                <LayoutList className="w-16 h-16 opacity-20" />
                <p className="text-sm">Select a form template from the sidebar or click '+' to build a new template.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
