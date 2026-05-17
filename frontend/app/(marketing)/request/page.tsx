import type { Metadata } from "next";
import { RequestHero } from "@/components/sections/request/RequestHero";
import { ProjectIntakeForm } from "@/components/sections/request/ProjectIntakeForm";


export const metadata: Metadata = {
    title: "Request Custom Design | GurucraftPro",
    description: "Start your next design project. Submit a detailed request for branding, UI/UX, or custom visual assets.",
};

export default function RequestPage() {
    return (
        <main className="min-h-screen bg-background flex flex-col pt-16">
            <RequestHero />
            <ProjectIntakeForm />
            
        </main>
    );
}

