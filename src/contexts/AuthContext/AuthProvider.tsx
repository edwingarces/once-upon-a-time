import React, { ReactNode, createContext, useState } from 'react';
import { getChildren, getUser } from '../../utils';

export type AuthContextType = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const isUserSaved = !!getUser();
  const isChildrenSaved = !!getChildren();
  const [isAuthenticated, setIsAuthenticated] = useState(
    isUserSaved && isChildrenSaved,
  );

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
