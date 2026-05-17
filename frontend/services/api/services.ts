import { apiClient } from "@/lib/api-client";

export const servicesService = {
  // 1. Clothing Consultation & Outfits
  async getClothingConsultation() {
    return apiClient("/api/v1/cms/7-day-clothing-consultation", { skipAuth: true });
  },

  async getOutfitSuggestions(params: { style: string; gender: string; age: string }) {
    const query = new URLSearchParams(params).toString();
    return apiClient(`/api/v1/outfits/suggest?${query}`);
  },

  // 2. Wardrobe Grid
  async getWardrobeItems(params: Record<string, string> = {}) {
    const query = new URLSearchParams(params).toString();
    return apiClient(`/api/v1/wardrobe/items?${query}`);
  },

  async addWardrobeItem(itemData: Record<string, any>) {
    return apiClient("/api/v1/wardrobe/items", {
      method: "POST",
      body: JSON.stringify(itemData),
    });
  },

  async updateWardrobeItem(id: string | number, itemData: Record<string, any>) {
    return apiClient(`/api/v1/wardrobe/items/${id}`, {
      method: "PUT",
      body: JSON.stringify(itemData),
    });
  },

  async deleteWardrobeItem(id: string | number) {
    return apiClient(`/api/v1/wardrobe/items/${id}`, {
      method: "DELETE",
    });
  },

  // 3. Wedding Planner AI
  async getWeddingDashboard() {
    return apiClient("/api/v1/wedding/dashboard");
  },

  async getWeddingShowcase() {
    return apiClient("/api/v1/wedding/showcase", { skipAuth: true });
  },

  async saveWeddingPlan(planData: Record<string, any>) {
    return apiClient("/api/v1/wedding/plan", {
      method: "POST",
      body: JSON.stringify(planData),
    });
  },

  async updateWeddingPlan(planData: Record<string, any>) {
    return apiClient("/api/v1/wedding/plan", {
      method: "PUT",
      body: JSON.stringify(planData),
    });
  },

  async saveWeddingTask(taskData: Record<string, any>) {
    return apiClient("/api/v1/wedding/tasks", {
      method: "POST",
      body: JSON.stringify(taskData),
    });
  },

  async updateWeddingTask(id: string | number, taskData: Record<string, any>) {
    return apiClient(`/api/v1/wedding/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify(taskData),
    });
  },

  async deleteWeddingTask(id: string | number) {
    return apiClient(`/api/v1/wedding/tasks/${id}`, {
      method: "DELETE",
    });
  },

  async saveWeddingGuest(guestData: Record<string, any>) {
    return apiClient("/api/v1/wedding/guests", {
      method: "POST",
      body: JSON.stringify(guestData),
    });
  },

  async updateWeddingGuest(id: string | number, guestData: Record<string, any>) {
    return apiClient(`/api/v1/wedding/guests/${id}`, {
      method: "PUT",
      body: JSON.stringify(guestData),
    });
  },

  async deleteWeddingGuest(id: string | number) {
    return apiClient(`/api/v1/wedding/guests/${id}`, {
      method: "DELETE",
    });
  },

  async saveWeddingVendor(vendorData: Record<string, any>) {
    return apiClient("/api/v1/wedding/vendors", {
      method: "POST",
      body: JSON.stringify(vendorData),
    });
  },

  async updateWeddingVendor(id: string | number, vendorData: Record<string, any>) {
    return apiClient(`/api/v1/wedding/vendors/${id}`, {
      method: "PUT",
      body: JSON.stringify(vendorData),
    });
  },

  async deleteWeddingVendor(id: string | number) {
    return apiClient(`/api/v1/wedding/vendors/${id}`, {
      method: "DELETE",
    });
  },

  async saveWeddingBudget(budgetItemData: Record<string, any>) {
    return apiClient("/api/v1/wedding/budget", {
      method: "POST",
      body: JSON.stringify(budgetItemData),
    });
  },

  async deleteWeddingBudget(id: string | number) {
    return apiClient(`/api/v1/wedding/budget/${id}`, {
      method: "DELETE",
    });
  },

  async getAdminWeddingPlans() {
    return apiClient("/api/v1/wedding/admin/all-plans");
  },

  async getAdminWeddingPlanDetails(planId: string | number) {
    return apiClient(`/api/v1/wedding/admin/plan/${planId}`);
  },

  // 4. Contact Forms
  async submitContact(contactData: Record<string, any>) {
    return apiClient("/api/v1/contact", {
      method: "POST",
      body: JSON.stringify(contactData),
      skipAuth: true,
    });
  },

  async submitProjectIntake(formData: FormData) {
    return apiClient("/api/v1/contact/", {
      method: "POST",
      body: formData,
      skipAuth: true,
    });
  },
};
