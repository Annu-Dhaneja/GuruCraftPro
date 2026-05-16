import { AdminLayout } from "@/components/layout/AdminLayout";
import { SEOManager } from "@/components/admin/SEOManager";

export default function AdminSEOPage() {
    return (
        <AdminLayout>
            <div className="mb-12">
                <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4">Neural Visibility</h1>
                <p className="text-slate-500 text-lg font-light italic">Orchestrating search engine dominance and narrative positioning.</p>
            </div>
            <SEOManager />
        </AdminLayout>
    );
}
