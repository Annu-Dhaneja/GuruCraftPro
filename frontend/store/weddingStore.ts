import { create } from 'zustand';
import { servicesService } from '@/services/api/services';

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
    email?: string;
    phone?: string;
    category: string;
    status: string;
    plus_one: boolean;
    dietary_reqs?: string;
}

interface WeddingVendor {
    id: number;
    name: string;
    category: string;
    contact_person?: string;
    phone?: string;
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

// ── Showcase (public) types ──
interface ShowcaseData {
    hero: Record<string, any>;
    packages: any;
    services: any;
    testimonials: any;
    gallery: any;
}

// ── Admin types ──
interface AdminPlanSummary {
    id: number;
    user_id: number;
    user_name: string;
    user_email: string | null;
    partner_names: string;
    wedding_date: string | null;
    location: string;
    total_budget: number;
    guest_count: number;
    task_count: number;
    task_progress: string;
    vendor_count: number;
    total_spent: number;
    created_at: string | null;
}

interface AdminPlanDetail {
    plan: Record<string, any>;
    user: Record<string, any>;
    stats: Record<string, any>;
    tasks: Array<Record<string, any>>;
    guests: Array<Record<string, any>>;
    vendors: Array<Record<string, any>>;
    budget: Array<Record<string, any>>;
}

interface WeddingStore {
    // Dashboard state (authenticated)
    plan: WeddingPlan | null;
    stats: Record<string, number | string | any> | null;
    tasks: WeddingTask[];
    guests: WeddingGuest[];
    vendors: WeddingVendor[];
    budget: WeddingBudget[];
    loading: boolean;
    error: string | null;

    // Public showcase state
    showcase: ShowcaseData | null;
    showcaseLoading: boolean;

    // Admin state
    adminPlans: AdminPlanSummary[];
    adminPlanDetail: AdminPlanDetail | null;
    adminLoading: boolean;
    adminTotalPlans: number;

    // Actions
    fetchDashboard: () => Promise<void>;
    fetchShowcase: () => Promise<void>;
    updatePlan: (data: Partial<WeddingPlan>) => Promise<void>;
    
    addTask: (task: Omit<WeddingTask, 'id'>) => Promise<void>;
    updateTask: (id: number, task: Partial<WeddingTask>) => Promise<void>;
    deleteTask: (id: number) => Promise<void>;
    
    addGuest: (guest: Omit<WeddingGuest, 'id'>) => Promise<void>;
    updateGuest: (id: number, guest: Partial<WeddingGuest>) => Promise<void>;
    deleteGuest: (id: number) => Promise<void>;
    
    addVendor: (vendor: Omit<WeddingVendor, 'id'>) => Promise<void>;
    updateVendor: (id: number, vendor: Partial<WeddingVendor>) => Promise<void>;
    deleteVendor: (id: number) => Promise<void>;
    
    addBudgetItem: (item: Omit<WeddingBudget, 'id'>) => Promise<void>;
    deleteBudgetItem: (id: number) => Promise<void>;
    
    // Admin actions
    fetchAllPlans: () => Promise<void>;
    fetchPlanDetail: (planId: number) => Promise<void>;
}

export const useWeddingStore = create<WeddingStore>((set, get) => ({
    plan: null,
    stats: null,
    tasks: [],
    guests: [],
    vendors: [],
    budget: [],
    loading: false,
    error: null,

    showcase: null,
    showcaseLoading: false,

    adminPlans: [],
    adminPlanDetail: null,
    adminLoading: false,
    adminTotalPlans: 0,

    // ── Public Showcase ──
    fetchShowcase: async () => {
        set({ showcaseLoading: true });
        try {
            const data = await servicesService.getWeddingShowcase();
            if (data) {
                set({ showcase: data, showcaseLoading: false });
            } else {
                set({ showcaseLoading: false });
            }
        } catch {
            set({ showcaseLoading: false });
        }
    },

    // ── Authenticated Dashboard ──
    fetchDashboard: async () => {
        set({ loading: true, error: null });
        try {
            const data = await servicesService.getWeddingDashboard();
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
        } catch (error: any) {
            const errorMessage = error.data?.detail || error.message || 'An unknown error occurred';
            set({ error: errorMessage, loading: false });
        }
    },

    // ── Plan Update ──
    updatePlan: async (data) => {
        try {
            await servicesService.updateWeddingPlan(data);
            set((state) => ({
                plan: state.plan ? { ...state.plan, ...data } : null
            }));
        } catch (e) {
            console.error("Failed to update plan:", e);
        }
    },

    // ── Task CRUD ──
    addTask: async (task) => {
        try {
            const newTask = await servicesService.saveWeddingTask(task);
            if (newTask) {
                set((state) => ({ tasks: [...state.tasks, newTask] }));
            }
        } catch (e) {
            console.error("Failed to add task:", e);
        }
    },

    updateTask: async (id, task) => {
        try {
            await servicesService.updateWeddingTask(id, task);
            set((state) => ({
                tasks: state.tasks.map((t) => t.id === id ? { ...t, ...task } : t)
            }));
        } catch (e) {
            console.error("Failed to update task:", e);
        }
    },

    deleteTask: async (id) => {
        try {
            await servicesService.deleteWeddingTask(id);
            set((state) => ({
                tasks: state.tasks.filter((t) => t.id !== id)
            }));
        } catch (e) {
            console.error("Failed to delete task:", e);
        }
    },

    // ── Guest CRUD ──
    addGuest: async (guest) => {
        try {
            const newGuest = await servicesService.saveWeddingGuest(guest);
            if (newGuest) {
                set((state) => ({ guests: [...state.guests, newGuest] }));
            }
        } catch (e) {
            console.error("Failed to add guest:", e);
        }
    },

    updateGuest: async (id, guest) => {
        try {
            await servicesService.updateWeddingGuest(id, guest);
            set((state) => ({
                guests: state.guests.map((g) => g.id === id ? { ...g, ...guest } : g)
            }));
        } catch (e) {
            console.error("Failed to update guest:", e);
        }
    },

    deleteGuest: async (id) => {
        try {
            await servicesService.deleteWeddingGuest(id);
            set((state) => ({
                guests: state.guests.filter((g) => g.id !== id)
            }));
        } catch (e) {
            console.error("Failed to delete guest:", e);
        }
    },

    // ── Vendor CRUD ──
    addVendor: async (vendor) => {
        try {
            const newVendor = await servicesService.saveWeddingVendor(vendor);
            if (newVendor) {
                set((state) => ({ vendors: [...state.vendors, newVendor] }));
            }
        } catch (e) {
            console.error("Failed to add vendor:", e);
        }
    },

    updateVendor: async (id, vendor) => {
        try {
            await servicesService.updateWeddingVendor(id, vendor);
            set((state) => ({
                vendors: state.vendors.map((v) => v.id === id ? { ...v, ...vendor } : v)
            }));
        } catch (e) {
            console.error("Failed to update vendor:", e);
        }
    },

    deleteVendor: async (id) => {
        try {
            await servicesService.deleteWeddingVendor(id);
            set((state) => ({
                vendors: state.vendors.filter((v) => v.id !== id)
            }));
        } catch (e) {
            console.error("Failed to delete vendor:", e);
        }
    },

    // ── Budget CRUD ──
    addBudgetItem: async (item) => {
        try {
            const newItem = await servicesService.saveWeddingBudget(item);
            if (newItem) {
                set((state) => ({ budget: [...state.budget, newItem] }));
            }
        } catch (e) {
            console.error("Failed to add budget item:", e);
        }
    },

    deleteBudgetItem: async (id) => {
        try {
            await servicesService.deleteWeddingBudget(id);
            set((state) => ({
                budget: state.budget.filter((b) => b.id !== id)
            }));
        } catch (e) {
            console.error("Failed to delete budget item:", e);
        }
    },

    // ── Admin ──
    fetchAllPlans: async () => {
        set({ adminLoading: true });
        try {
            const data = await servicesService.getAdminWeddingPlans();
            if (data) {
                set({
                    adminPlans: data.plans,
                    adminTotalPlans: data.total_plans,
                    adminLoading: false,
                });
            } else {
                set({ adminLoading: false });
            }
        } catch {
            set({ adminLoading: false });
        }
    },

    fetchPlanDetail: async (planId) => {
        set({ adminLoading: true });
        try {
            const data = await servicesService.getAdminWeddingPlanDetails(planId);
            if (data) {
                set({ adminPlanDetail: data, adminLoading: false });
            } else {
                set({ adminLoading: false });
            }
        } catch {
            set({ adminLoading: false });
        }
    },
}));
