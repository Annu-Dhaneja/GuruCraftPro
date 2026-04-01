"use client";

import { useState, useEffect } from "react";

export interface BudgetItem {
  id: string;
  category: string;
  item: string;
  estimated: number;
  actual: number;
  paid: number;
}

export const CATEGORIES = [
  "Venue & Catering",
  "Decor & Floral",
  "Photography & Video",
  "Attire & Jewelry",
  "Entertainment",
  "Guests & Invitations",
  "Logistics & Transport",
  "Other"
];

export function useBudget() {
  const [items, setItems] = useState<BudgetItem[]>([]);
  const [totalBudget, setTotalBudget] = useState<number>(1000000); // Default 10L
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from LocalStorage
  useEffect(() => {
    const savedItems = localStorage.getItem("wedding_budget_items");
    const savedTotal = localStorage.getItem("wedding_total_budget");
    
    if (savedItems) {
      try {
        setItems(JSON.parse(savedItems));
      } catch (e) {
        setItems([]);
      }
    } else {
      // Default initial items
      setItems([
        { id: "1", category: "Venue & Catering" , item: "Wedding Venue", estimated: 300000, actual: 0, paid: 0 },
        { id: "2", category: "Decor & Floral" , item: "Floral Arrangements", estimated: 150000, actual: 0, paid: 0 }
      ]);
    }

    if (savedTotal) {
      setTotalBudget(Number(savedTotal));
    }
    
    setIsLoaded(true);
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("wedding_budget_items", JSON.stringify(items));
      localStorage.setItem("wedding_total_budget", totalBudget.toString());
    }
  }, [items, totalBudget, isLoaded]);

  const addItem = (category: string = CATEGORIES[0]) => {
    const newItem: BudgetItem = {
      id: Date.now().toString(),
      category: category,
      item: "New Item",
      estimated: 0,
      actual: 0,
      paid: 0
    };
    setItems([...items, newItem]);
  };

  const updateItem = (id: string, field: keyof BudgetItem, value: any) => {
    setItems(items.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

  const removeItem = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  const stats = {
    totalEstimated: items.reduce((sum, item) => sum + item.estimated, 0),
    totalActual: items.reduce((sum, item) => sum + item.actual, 0),
    totalPaid: items.reduce((sum, item) => sum + item.paid, 0),
    remainingBudget: totalBudget - items.reduce((sum, item) => sum + item.actual, 0)
  };

  return {
    items,
    totalBudget,
    setTotalBudget,
    addItem,
    updateItem,
    removeItem,
    stats,
    isLoaded
  };
}
