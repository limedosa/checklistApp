import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export type User = {
  email: string;
  name?: string;
};

export type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
};

export type AuthActions = {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
};

// Function to handle HTTP errors
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.detail || `HTTP error ${response.status}`;
    throw new Error(errorMessage);
  }
  return response.json();
};

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      
      login: async (email, password) => {
        try {
          const response = await fetch(`${API_URL}/users/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });
          
          const data = await handleResponse(response);
          
          set({
            user: data.user,
            token: data.access_token,
            isAuthenticated: true,
          });
        } catch (error) {
          console.error('Login failed:', error);
          throw error;
        }
      },
      
      register: async (email, password, name) => {
        try {
          const response = await fetch(`${API_URL}/users/register`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, name }),
          });
          
          const data = await handleResponse(response);
          
          set({
            user: data.user,
            token: data.access_token,
            isAuthenticated: true,
          });
        } catch (error) {
          console.error('Registration failed:', error);
          throw error;
        }
      },
      
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

// Hook to get the auth token for API calls
export const useAuthToken = (): string | null => {
  const token = useAuthStore((state) => state.token);
  return token;
};

// Function to add auth header to fetch requests
export const fetchWithAuth = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const token = useAuthStore.getState().token;
  
  const headers = {
    ...options.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  return fetch(url, {
    ...options,
    headers,
  });
};