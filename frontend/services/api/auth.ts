import { apiClient } from "@/lib/api-client";

export const authService = {
  async login(credentials: Record<string, any> | URLSearchParams) {
    let body: any = credentials;
    if (!(credentials instanceof URLSearchParams)) {
      body = new URLSearchParams();
      Object.entries(credentials).forEach(([k, v]) => body.append(k, String(v)));
    }
    const data = await apiClient("/api/v1/auth/login", {
      method: "POST",
      body: body,
      skipAuth: true,
    });
    if (data && data.access_token) {
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("role", data.role || "user");
      localStorage.setItem("username", data.username || "");
    }
    return data;
  },

  async signup(userData: Record<string, any>) {
    return apiClient("/api/v1/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      skipAuth: true,
    });
  },

  async getCurrentUser() {
    return apiClient("/api/v1/auth/me");
  },

  async updateCurrentUser(profileData: { name?: string; email?: string }) {
    return apiClient("/api/v1/auth/me", {
      method: "PUT",
      body: JSON.stringify(profileData),
    });
  },

  async getUsers() {
    return apiClient("/api/v1/admin/users");
  },

  async updateUserRole(userId: string | number, roleData: { role: string }) {
    return apiClient(`/api/v1/admin/users/${userId}/role`, {
      method: "PUT",
      body: JSON.stringify(roleData),
    });
  },

  async getRoles() {
    return apiClient("/api/v1/admin/roles");
  },

  logout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("username");
    }
  },
};
