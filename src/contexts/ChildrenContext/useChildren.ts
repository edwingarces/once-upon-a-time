import { useContext } from 'react';
import { ChildrenContext } from './ChildrenProvider';

const useChilds = () => {
  const childsContext = useContext(ChildrenContext);

  if (!childsContext) {
    throw new Error('useChilds must be used within an ChildsContextProvider');
  }

  return childsContext;
};

export default useChilds;
