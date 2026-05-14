import { create } from 'zustand';
import { getApiUrl } from '@/lib/utils';

interface WeddingTask {
    id: number;
    title: string;
    description: string;
    status: string;
    category: string;
    priority: string;
    due_date?: string;
}

interface WeddingGuest {
    id: number;
    name: string;
    category: string;
    status: string;
}

interface WeddingVendor {
    id: number;
    name: string;
    category: string;
    total_quote: number;
    paid_amount: number;
    status: string;
}

interface WeddingBudget {
    id: number;
    category: string;
    allocated_amount: number;
    spent_amount: number;
}

interface WeddingPlan {
    partner_names: string;
    wedding_date: string;
    location: string;
    total_budget: number;
    guest_count: number;
}

interface WeddingStore {
    plan: WeddingPlan | null;
    stats: Record<string, number | string | any> | null;
    tasks: WeddingTask[];
    guests: WeddingGuest[];
    vendors: WeddingVendor[];
    budget: WeddingBudget[];
    loading: boolean;
    error: string | null;
    fetchDashboard: () => Promise<void>;
}

export const useWeddingStore = create<WeddingStore>((set) => ({
    plan: null,
    stats: null,
    tasks: [],
    guests: [],
    vendors: [],
    budget: [],
    loading: false,
    error: null,

    fetchDashboard: async () => {
        set({ loading: true, error: null });
        try {
            const response = await fetch(getApiUrl("/api/v1/wedding/dashboard"));
            if (!response.ok) throw new Error('Failed to fetch wedding dashboard');
            const data = await response.ok ? await response.json() : null;
            if (data) {
                set({
                    plan: data.plan,
                    stats: data.stats,
                    tasks: data.tasks,
                    guests: data.guests,
                    vendors: data.vendors,
                    budget: data.budget,
                    loading: false
                });
            }
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            set({ error: errorMessage, loading: false });
        }
    },
}));
