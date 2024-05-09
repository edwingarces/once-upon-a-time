import { useContext } from 'react';
import { UserContext } from './UserProvider';

const useUser = () => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('useUser must be used within an UserContextProvider');
  }

  return userContext;
};

export default useUser;
