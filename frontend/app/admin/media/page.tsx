import { AdminLayout } from "@/components/layout/AdminLayout";
import { MediaManager } from "@/components/admin/MediaManager";

export default function AdminMediaPage() {
    return (
        <AdminLayout>
            <div className="mb-12">
                <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4">Neural Assets</h1>
                <p className="text-slate-500 text-lg font-light italic">Orchestrating high-fidelity visual intelligence across the platform.</p>
            </div>
            <MediaManager />
        </AdminLayout>
    );
}
