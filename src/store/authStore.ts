import { create } from 'zustand';
import { AuthState, User, UserRole } from '../types';

const mockUsers: Record<string, User> = {
  'student@test.com': { id: 'ST001', name: '김민준', role: 'student' },
  'parent@test.com': { id: 'P001', name: '김학부모', role: 'parent' },
  'teacher@test.com': { id: 'T001', name: '김선생', role: 'teacher' },
  'admin@test.com': { id: 'A001', name: '관리자', role: 'admin' }
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  
  login: async (email: string, password: string, role: UserRole) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const user = mockUsers[email];
    if (user && user.role === role) {
      set({ user, isAuthenticated: true });
      localStorage.setItem('user', JSON.stringify(user));
      
      // Handle post-login redirect
      const redirectRoute = sessionStorage.getItem('redirectAfterLogin');
      if (redirectRoute) {
        sessionStorage.removeItem('redirectAfterLogin');
        // Use setTimeout to ensure state is updated before navigation
        setTimeout(() => {
          window.location.href = redirectRoute;
        }, 100);
      }
    } else {
      throw new Error('Invalid credentials');
    }
  },
  
  logout: () => {
    set({ user: null, isAuthenticated: false });
    localStorage.removeItem('user');
  }
}));

const savedUser = localStorage.getItem('user');
if (savedUser) {
  const user = JSON.parse(savedUser);
  useAuthStore.setState({ user, isAuthenticated: true });
}