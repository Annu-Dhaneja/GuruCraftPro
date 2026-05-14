import React from "react";
import { SpiritualSanctuaryContent } from "@/components/guruji-art/SpiritualSanctuaryContent";
import { getApiUrl, safeFetch } from "@/lib/utils";

export default async function SpiritualSanctuaryPage() {
    let cmsData = null;
    try {
        const url = getApiUrl("/api/v1/cms/guru-ji-art");
        const res = await safeFetch(url, { cache: 'no-store' }, 8000);
        if (res.ok) cmsData = await res.json();
    } catch (error) {
        console.error("Failed to fetch guru-ji-art data:", error);
    }

    return (
        <SpiritualSanctuaryContent data={cmsData} />
    );
}
