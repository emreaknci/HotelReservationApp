import React, { createContext, useState, useEffect } from 'react';
import StorageService from '../services/storageService';

export const AuthContext = createContext({
  isAuthenticated: null,
  setIsAuthenticated: null,
  user: {
    id: null,
    email: null,
    fullName: null,
    userType: null,
  },
  setUser: null,
  logIn: null,
  logOut: null,
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);

  const logIn = async () => {
    const userId = await StorageService.getAsync('userId');
    const userEmail = await StorageService.getAsync('userEmail');
    const userFullName = await StorageService.getAsync('userFullName');
    const userType = await StorageService.getAsync('userType');
    setUser({
      id: userId,
      email: userEmail,
      fullName: userFullName,
      userType: userType,
    });
    setIsAuthenticated(true);
  }

  const logOut = async () => {
    setUser(null);
    setIsAuthenticated(false);
    await StorageService.clearUserInfoAndToken();
  }

  useEffect(() => {
    const checkAuthStatus = async () => {
      const tokenExpiration = await StorageService.getAsync('tokenExpiration');
      const token = await StorageService.getAsync('token');
      if (!tokenExpiration || !token) {
        await StorageService.clearUserInfoAndToken();
        setIsAuthenticated(false);
        return;
      }
      if (new Date(tokenExpiration) < new Date()) {
        await StorageService.clearUserInfoAndToken();
        setIsAuthenticated(false);
        return;
      }
      await logIn();
    };

    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};