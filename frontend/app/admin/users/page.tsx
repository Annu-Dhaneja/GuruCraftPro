import { AdminLayout } from "@/components/layout/AdminLayout";
import { UserManagement } from "@/components/admin/UserManagement";

export default function AdminUsersPage() {
    return (
        <AdminLayout>
            <div className="mb-12">
                <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4">Identity Audit</h1>
                <p className="text-slate-500 text-lg font-light italic">Managing platform access, role escalation, and security protocols.</p>
            </div>
            <UserManagement />
        </AdminLayout>
    );
}
