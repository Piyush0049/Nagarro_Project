import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Check if user is already logged in (from localStorage in this example)
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);
  
  // Login function
  const login = (userData) => {
    // In a real app, you would validate credentials with your backend
    // For now, we'll just store the user data in localStorage
    localStorage.setItem('user', JSON.stringify(userData));
    setCurrentUser(userData);
    return true;
  };
  
  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
  };
  
  // Register function
  const register = (userData) => {
    // In a real app, you would send this data to your backend
    // For now, we'll just store the user data in localStorage
    localStorage.setItem('user', JSON.stringify(userData));
    setCurrentUser(userData);
    return true;
  };
  
  const value = {
    currentUser,
    login,
    logout,
    register,
    loading
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};