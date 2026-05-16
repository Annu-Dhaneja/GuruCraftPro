import { AdminLayout } from "@/components/layout/AdminLayout";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export default function AdminPage() {
    return (
        <AdminLayout>
            <div className="mb-12">
                <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4">Command Center</h1>
                <p className="text-slate-500 text-lg font-light italic">Orchestrating platform intelligence and strategic growth.</p>
            </div>
            <AdminDashboard />
        </AdminLayout>
    );
}
