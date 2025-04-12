import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [usersDB, setUsersDB] = useState([]); // Simulated database

  // Load initial data
  useEffect(() => {
    const storedUser = localStorage.getItem("redCrescentUser");
    const storedUsers = localStorage.getItem("redCrescentUsersDB") || "[]";
    if (storedUser) setUser(JSON.parse(storedUser));
    setUsersDB(JSON.parse(storedUsers));
  }, []);

  // Register new user
  const register = (userData) => {
    const newUser = {
      ...userData,
      id: Date.now(),
      isPaid: false,
      createdAt: new Date().toISOString(),
    };

    const updatedUsers = [...usersDB, newUser];
    setUsersDB(updatedUsers);
    localStorage.setItem("redCrescentUsersDB", JSON.stringify(updatedUsers));
    return newUser;
  };

  // Login existing user
  const login = (email, password) => {
    const foundUser = usersDB.find(
      (u) => u.email === email && u.password === password
    );
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("redCrescentUser", JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("redCrescentUser");
  };

  // Update user (e.g., after payment)
  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates };
    const updatedUsers = usersDB.map((u) =>
      u.id === user.id ? updatedUser : u
    );

    setUser(updatedUser);
    setUsersDB(updatedUsers);
    localStorage.setItem("redCrescentUser", JSON.stringify(updatedUser));
    localStorage.setItem("redCrescentUsersDB", JSON.stringify(updatedUsers));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logout,
        updateUser,
        isAuthenticated: !!user,
        isPaidUser: user?.isPaid || false,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
