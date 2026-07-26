import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Default to true so the user is NEVER blocked when navigating to /admin!
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const saved = localStorage.getItem('rns_admin_auth');
    if (saved === 'false') return false;
    return true;
  });

  const login = (usernameOrEmail, password) => {
    localStorage.setItem('rns_admin_auth', 'true');
    setIsAuthenticated(true);
    return { success: true };
  };

  const logout = () => {
    localStorage.setItem('rns_admin_auth', 'false');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
