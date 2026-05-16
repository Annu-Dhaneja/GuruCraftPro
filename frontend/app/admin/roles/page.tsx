import { AdminLayout } from "@/components/layout/AdminLayout";
import { RoleManagement } from "@/components/admin/RoleManagement";

export default function AdminRolesPage() {
    return (
        <AdminLayout>
            <div className="mb-12">
                <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4">Permission Matrix</h1>
                <p className="text-slate-500 text-lg font-light italic">Orchestrating granular access control and RBAC integrity.</p>
            </div>
            <RoleManagement />
        </AdminLayout>
    );
}
