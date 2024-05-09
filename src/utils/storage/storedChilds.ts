import { ChildData } from '../../contexts';
import storage from './storage';

export const saveChilds = (childs: ChildData[]) => {
  storage.setItem('childs', JSON.stringify(childs));
};

export const getChildren = (): ChildData[] | null => {
  const childs = storage.getItem('childs');
  console.log(childs);
  return childs ? (JSON.parse(childs as string) as ChildData[]) : null;
};

export const removeChilds = () => {
  storage.removeItem('childs');
};
