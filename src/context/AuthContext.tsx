"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'; 
import Cookies from 'js-cookie';
import axios from 'axios';
import { getDataFromToken } from '@/app/helpers/getDataFromTokens';

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  CurrentLoggedInUser: User | null; 
  id: string | null;
  login: () => void; 
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  CurrentLoggedInUser: null,
  id: null,
  login: () => {},
  logout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;  
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [CurrentLoggedInUser, setCurrentLoggedInUser] = useState<User | null>(null);
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      const userId = getDataFromToken(token) as { id: string }; 
      if (userId?.id) {
        setIsAuthenticated(true);
        setId(userId.id);
        fetchCurrentUser(userId.id, token);
      }
    }
  }, []);

  const fetchCurrentUser = async (id: string, token: string) => {
    try {
      const response = await axios.get(`/api/users/profile/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCurrentLoggedInUser(response.data.user);
    } catch (error) {
      console.error("Failed to fetch current user:", error);
      logout();
    }
  };

  const logout = () => {
    Cookies.remove('token');
    setIsAuthenticated(false);
    setCurrentLoggedInUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, CurrentLoggedInUser, id, login: () => {}, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
