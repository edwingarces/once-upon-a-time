import React, { ReactNode, createContext, useState } from 'react';
import { getChildren } from '../../utils';

export type ChildData = {
  name: string;
  age: number;
};

export type ChildrenContextType = {
  children: ChildData[] | null;
  addChild: (newChild: ChildData) => void;
  updateChild: (id: number, newChild: Partial<ChildData>) => void;
  updateChildren: (newChildren: ChildData[]) => void;
};

export const ChildrenContext = createContext<ChildrenContextType | null>(null);

export const ChildrenProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const childrenSaved = getChildren();
  const [childrenData, setChildrenData] = useState<ChildData[] | null>(
    childrenSaved || [],
  );

  const addChild = (newChild: ChildData) => {
    const newChildrenData = [...(childrenData as ChildData[])];
    console.log(newChildrenData);
    newChildrenData.push(newChild);
    console.log(newChildrenData);
    setChildrenData(newChildrenData);
  };

  const updateChild = (id: number, newChild: Partial<ChildData>) => {
    const filteredChild = childrenData?.filter((_, index) => index !== id)[0];
    const updatedChild: ChildData = {
      ...(filteredChild as ChildData),
      ...newChild,
    };
    const newChildsData = [...(childrenData as ChildData[])];
    newChildsData[id] = updatedChild;
    setChildrenData(newChildsData);
  };

  const updateChildren = (newChildren: ChildData[]) => {
    setChildrenData(newChildren);
  };

  return (
    <ChildrenContext.Provider
      value={{ children: childrenData, addChild, updateChild, updateChildren }}>
      {children}
    </ChildrenContext.Provider>
  );
};

export default ChildrenProvider;
