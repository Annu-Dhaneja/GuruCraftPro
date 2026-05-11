import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

interface CartStore {
    items: CartItem[];
    isOpen: boolean;
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    toggleCart: () => void;
    getTotal: () => number;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,
            addItem: (newItem) => {
                const currentItems = get().items;
                const existingItem = currentItems.find((i) => i.id === newItem.id);

                if (existingItem) {
                    set({
                        items: currentItems.map((i) =>
                            i.id === newItem.id ? { ...i, quantity: i.quantity + 1 } : i
                        ),
                        isOpen: true
                    });
                } else {
                    set({ items: [...currentItems, newItem], isOpen: true });
                }
            },
            removeItem: (id) => {
                set({ items: get().items.filter((i) => i.id !== id) });
            },
            updateQuantity: (id, quantity) => {
                if (quantity < 1) return;
                set({
                    items: get().items.map((i) =>
                        i.id === id ? { ...i, quantity } : i
                    ),
                });
            },
            clearCart: () => set({ items: [] }),
            toggleCart: () => set({ isOpen: !get().isOpen }),
            getTotal: () => {
                return get().items.reduce((acc, i) => acc + i.price * i.quantity, 0);
            },
        }),
        {
            name: 'cart-storage',
        }
    )
);
