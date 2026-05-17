import { create } from 'zustand';

interface User {
  id: number;
  username: string;
  email?: string;
  name?: string;
  role: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  
  login: (user, token) => {
    const uppercaseRole = (user.role || "USER").toUpperCase();
    const updatedUser = { ...user, role: uppercaseRole };
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
      localStorage.setItem('username', user.username);
      localStorage.setItem('role', uppercaseRole);
    }
    set({ user: updatedUser, isAuthenticated: true });
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('role');
    }
    set({ user: null, isAuthenticated: false });
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  },

  checkAuth: () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('username');
      const role = localStorage.getItem('role');

      if (token && username && role) {
        const uppercaseRole = role.toUpperCase();
        set({
          user: { id: 0, username, role: uppercaseRole, name: username, email: "" },
          isAuthenticated: true
        });
      } else {
        set({ user: null, isAuthenticated: false });
      }
    }
  }
}));

