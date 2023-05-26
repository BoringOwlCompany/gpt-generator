import React from 'react';
import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { ECollection } from '../../../shared';
import { useContextValue } from '../hooks';

interface IProps {
  collection: ECollection;
}

const CollectionContext = createContext<IProps | null>(null);

export const CollectionProvider = ({ children, collection }: IProps & { children: ReactNode }) => {
  const value = useContextValue({ collection });
  return <CollectionContext.Provider value={value}>{children}</CollectionContext.Provider>;
};

export const useCollectionContext = () => {
  const context = useContext(CollectionContext);

  if (!context) {
    throw new Error('CollectionContext must be used within its Provider');
  }
  return context;
};
