import React, { createContext, useState, useContext, useEffect } from "react";
import { storageService } from "../shared/services/storageService";
import { userService } from "../features/auth/services/UserService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      const savedUser = await storageService.get('user_session');
      if (savedUser) setUser(savedUser);
      setIsLoading(false);
    };
    loadSession();
  }, []);

  const login = async (userData) => {
    setUser(userData);
    await storageService.save('user_session', userData);
  };

  const logout = async () => {
    setUser(null);
    await storageService.remove('user_session');
  };

  const updateUser = async (updatedData) => {
    await userService.updateUserInList(updatedData);
    setUser(updatedData);
    await storageService.save('user_session', updatedData);
  };

  const deleteAccount = async () => {
    if (user?.email) {
      await userService.deleteUserFromList(user.email);
      await storageService.remove(`@cart_${user.email}`);
      await storageService.remove(`@orders_${user.email}`);
    }
    await storageService.remove('user_session');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, updateUser, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);