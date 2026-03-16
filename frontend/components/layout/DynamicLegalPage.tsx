"use client";

import { useEffect, useState } from "react";
import { LegalLayout } from "@/components/layout/LegalLayout";
import { getApiUrl } from "@/lib/utils";

interface DynamicLegalPageProps {
    section: string;
    defaultTitle: string;
}

export function DynamicLegalPage({ section, defaultTitle }: DynamicLegalPageProps) {
    const [pageData, setPageData] = useState<any>(null);

    useEffect(() => {
        fetch(getApiUrl(`/api/v1/cms/${section}`))
            .then(res => res.json())
            .then(data => setPageData(data))
            .catch(err => console.error(`Legal Fetch Error (${section}):`, err));
    }, [section]);

    if (!pageData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <LegalLayout title={pageData.title || defaultTitle} lastUpdated={pageData.last_updated || "January 2026"}>
            <div dangerouslySetInnerHTML={{ __html: pageData.content }} />
        </LegalLayout>
    );
}
