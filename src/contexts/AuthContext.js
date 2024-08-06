// src/contexts/AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(null);

  const login = (tokens) => {
    setAuthTokens(tokens);
  };

  const logout = () => {
    setAuthTokens(null);
  };

  return (
    <AuthContext.Provider value={{ authTokens, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
