"use client";

import { useEffect, useState } from "react";
import { 
  Users, 
  UserPlus, 
  Shield, 
  Mail, 
  Trash2, 
  Edit3, 
  Search,
  CheckCircle,
  XCircle,
  MoreVertical
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getApiUrl } from "@/lib/utils";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This endpoint would need to be created in the backend
    fetch(getApiUrl("/api/v1/auth/users"), {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
      .then(res => res.json())
      .then(data => {
        setUsers(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Users Fetch Error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-5xl font-black text-white tracking-tighter">Personnel Control</h1>
          <p className="text-muted-foreground font-medium mt-2">Manage administrative intelligence access and roles.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl py-6 px-8 font-bold shadow-xl shadow-indigo-600/20">
          <UserPlus className="w-5 h-5 mr-3" />
          Onboard Admin
        </Button>
      </div>

      <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-white/5 flex items-center justify-between">
            <div className="relative w-full max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input 
                    type="text" 
                    placeholder="Search personnel directory..." 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                />
            </div>
            <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                <span>Displaying {users.length} Active Profiles</span>
            </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400/80">
                <th className="px-8 py-5">Personnel</th>
                <th className="px-8 py-5">Role / Access</th>
                <th className="px-8 py-5">Identification</th>
                <th className="px-8 py-5 text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.length > 0 ? users.map((user) => (
                <tr key={user.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold">
                        {user.name?.charAt(0) || user.username.charAt(0)}
                      </div>
                      <div>
                        <div className="text-white font-bold tracking-tight">{user.name || "Access User"}</div>
                        <div className="text-xs text-muted-foreground font-medium">@{user.username}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                       <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase px-3 py-1 rounded-full border border-emerald-500/20">
                         {user.role || 'ADMIN'}
                       </span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-sm text-white/60 font-medium">
                      <Mail className="w-3 h-3" />
                      {user.email || 'N/A'}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white hover:bg-white/5 rounded-xl">
                        <Edit3 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive hover:bg-destructive/5 rounded-xl">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                    <td colSpan={4} className="px-8 py-20 text-center text-muted-foreground italic font-medium">
                        {loading ? "Synchronizing database records..." : "No administrative personnel found in secondary sectors."}
                    </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 bg-indigo-600/10 border border-indigo-500/20 rounded-[2.5rem] relative overflow-hidden group">
            <Shield className="absolute top-1/2 right-4 -translate-y-1/2 w-32 h-32 text-indigo-500/5 rotate-12 group-hover:scale-110 transition-transform duration-700" />
            <div className="relative z-10 space-y-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                    <Shield className="w-5 h-5 text-indigo-400" />
                    Security Protocol
                </h3>
                <p className="text-sm text-indigo-300/70 leading-relaxed font-medium">
                    Administrative access is controlled via encrypted JWT tokens. Ensure all personnel utilize strong, unique credentials.
                </p>
                <Link href="#" className="inline-flex text-xs font-black uppercase tracking-widest text-white hover:text-indigo-400 transition-colors">
                    Review Access Log
                </Link>
            </div>
        </div>
        <div className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] relative overflow-hidden group">
            <div className="relative z-10 space-y-4">
                <h3 className="text-xl font-bold text-white">Access Thresholds</h3>
                <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="p-4 bg-black/20 rounded-2xl border border-white/5">
                        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Total Admins</p>
                        <p className="text-2xl font-black text-white">{users.length}</p>
                    </div>
                    <div className="p-4 bg-black/20 rounded-2xl border border-white/5">
                        <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-1">Open Slots</p>
                        <p className="text-2xl font-black text-white">8</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
