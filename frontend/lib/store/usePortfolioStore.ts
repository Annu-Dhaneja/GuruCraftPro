import { create } from 'zustand';

interface PortfolioState {
    activeCategory: string;
    setActiveCategory: (category: string) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
    activeCategory: 'All',
    setActiveCategory: (category) => set({ activeCategory: category }),
    searchQuery: '',
    setSearchQuery: (query) => set({ searchQuery: query }),
}));
