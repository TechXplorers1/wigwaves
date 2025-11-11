'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define the user type
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

// Hardcoded user data for mock implementation
const MOCK_USERS = [
  { id: '1', name: 'Admin', email: 'admin@gmail.com', password: 'Password', role: 'admin' as const },
  { id: '2', name: 'User', email: 'user@gmail.com', password: 'Password', role: 'user' as const },
];

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // On component mount, check if user data exists in localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);
    if (foundUser) {
      const { password: _, ...userToStore } = foundUser;
      setUser(userToStore);
      localStorage.setItem('user', JSON.stringify(userToStore));
    } else {
      throw new Error('Invalid email or password');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const register = async (name: string, email: string, password: string) => {
    // This is a mock registration. In a real app, you'd save this to a database.
    if (MOCK_USERS.some(u => u.email === email)) {
        throw new Error('User with this email already exists.');
    }
    
    const newUser = {
        id: String(MOCK_USERS.length + 1),
        name,
        email,
        password, // In a real app, hash this password!
        role: 'user' as const
    };
    
    MOCK_USERS.push(newUser);
    // For this mock, we don't automatically log in the user after registration.
    console.log("Registered new user:", newUser);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
