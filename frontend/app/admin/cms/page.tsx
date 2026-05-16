import { AdminLayout } from "@/components/layout/AdminLayout";
import { CMSManager } from "@/components/admin/CMSManager";

export default function AdminCMSPage() {
    return (
        <AdminLayout>
            <div className="mb-12">
                <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4">Content Architecture</h1>
                <p className="text-slate-500 text-lg font-light italic">Managing the dynamic neural engine of GurucraftPro's interfaces.</p>
            </div>
            <CMSManager />
        </AdminLayout>
    );
}
