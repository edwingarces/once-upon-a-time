import { ChildData } from '../../contexts';
import storage from './storage';

export const saveChildren = (children: ChildData[]) => {
  storage.setItem('children', JSON.stringify(children));
};

export const getChildren = (): ChildData[] | null => {
  const children = storage.getItem('children');
  return children ? (JSON.parse(children as string) as ChildData[]) : null;
};

export const removeChildren = () => {
  storage.removeItem('children');
};
