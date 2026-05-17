"use client";

import React from "react";

/**
 * Transparent pass-through wrapper for Admin layout subpages.
 * Prevents double-rendering sidebar layout bugs across pages.
 */
export function AdminLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
