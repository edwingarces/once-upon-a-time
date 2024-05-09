import React, { ReactNode, createContext, useState } from 'react';
import { getUser, saveUser } from '../../utils';

export type UserData = {
  name: string;
  age: number;
  email: string;
};

export type UserContextType = {
  user: UserData | null;
  updateUser: (newUser: UserData) => void;
};

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const userSaved = getUser();
  const [user, setUser] = useState<UserData | null>(userSaved);

  const updateUser = (newUser: Partial<UserData>) => {
    setUser({ ...user, ...(newUser as UserData) });
    saveUser({ ...user, ...(newUser as UserData) });
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
