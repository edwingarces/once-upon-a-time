import { UserData } from '../../contexts';
import storage from './storage';

export const saveUser = (user: UserData) => {
  storage.setItem('user', JSON.stringify(user));
};

export const getUser = (): UserData | null => {
  const user = storage.getItem('user');
  return user ? (JSON.parse(user as string) as UserData) : null;
};

export const removeUser = () => {
  storage.removeItem('user');
};
