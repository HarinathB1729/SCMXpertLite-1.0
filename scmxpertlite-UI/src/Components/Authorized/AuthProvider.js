import React, { createContext, useContext, useMemo, useState } from "react";

// Create a new context for authentication
export const AuthContext = createContext();

// AuthProvider component to manage authentication state
export const AuthProvider = ({ children }) => {
  // State to hold authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Memoize the context value object to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({ isAuthenticated, setIsAuthenticated }),
    [isAuthenticated]
  );
  // console.log("isAutenticated", isAuthenticated);

  return (
    // Provide the authentication state and functions to children components
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);
