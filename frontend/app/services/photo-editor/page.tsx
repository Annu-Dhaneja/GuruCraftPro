import type { Metadata } from "next";
import { PhotoEditorContent } from "@/components/services/PhotoEditorContent";

export const metadata: Metadata = {
    title: "AI Photo Editor | Annu Design Studio",
    description: "Professional AI-powered photo editing. Background removal, auto-enhancement, and creative style transfers in seconds.",
};

export default function PhotoEditorPage() {
    return (
        <main className="min-h-screen bg-[#0A0A0A]">
            <PhotoEditorContent />
                    </main>
    );
}

