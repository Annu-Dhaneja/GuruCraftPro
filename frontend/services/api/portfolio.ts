import { apiClient } from "@/lib/api-client";

export const portfolioService = {
  async getPortfolio(slug: string = "portfolio") {
    return apiClient(`/api/v1/cms/${slug}`, { skipAuth: true });
  },

  async getProjectDetails(projectSlug: string) {
    return apiClient(`/api/v1/cms/portfolio/${projectSlug}`, { skipAuth: true });
  },

  async getProducts(category?: string) {
    const path = category && category !== "All Creations"
      ? `/api/v1/products?category=${encodeURIComponent(category)}`
      : "/api/v1/products";
    return apiClient(path, { skipAuth: true });
  },
};
