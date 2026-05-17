import { apiClient } from "@/lib/api-client";

export const pagesService = {
  async getPage(slug: string, options?: { skipAuth?: boolean }) {
    return apiClient(`/api/v1/cms/${slug}`, { skipAuth: options?.skipAuth ?? true });
  },

  async updatePage(slug: string, content: any) {
    return apiClient(`/api/v1/cms/${slug}`, {
      method: "PUT",
      body: JSON.stringify(content),
    });
  },

  async getPages() {
    return apiClient("/api/v1/cms/pages");
  },

  async createPage(pageData: Record<string, any>) {
    return apiClient("/api/v1/cms/pages", {
      method: "POST",
      body: JSON.stringify(pageData),
    });
  },

  async deletePage(slug: string) {
    return apiClient(`/api/v1/cms/pages/${slug}`, {
      method: "DELETE",
    });
  },

  async updatePageSeo(slug: string, seoData: Record<string, any>) {
    return apiClient(`/api/v1/cms/pages/${slug}/seo`, {
      method: "PUT",
      body: JSON.stringify(seoData),
    });
  },

  async getStats() {
    return apiClient("/api/v1/cms/stats");
  },

  async getSiteConfig() {
    return apiClient("/api/v1/cms/site_config", { skipAuth: true });
  },

  async updateSiteConfig(config: Record<string, any>) {
    return apiClient("/api/v1/cms/site_config", {
      method: "PUT",
      body: JSON.stringify(config),
    });
  },

  async uploadImage(formData: FormData) {
    return apiClient("/api/v1/cms/upload-image", {
      method: "POST",
      body: formData,
      // Note: Do not set Content-Type header so the browser sets it with correct boundary
    });
  },

  async getMedia() {
    return apiClient("/api/v1/cms/media");
  },

  async bulkImportUrls(payload: { urls: string[]; category?: string }) {
    return apiClient("/api/v1/cms/media/bulk-url-import", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
};
