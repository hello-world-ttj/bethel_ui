
import React, { createContext, useState, useContext } from 'react';
import { useAdmin } from './AdminContext';

interface RefetchContextType {
  refetchTrigger: number;
  triggerRefetch: () => void;
}

const RefetchContext = createContext<RefetchContextType | undefined>(undefined);

export const RefetchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [refetchTrigger, setRefetchTrigger] = useState<number>(0);
  const { refetchAdmin } = useAdmin();

  const triggerRefetch = () => {
    setRefetchTrigger(prev => prev + 1);
    // Also refetch admin data when general refetch is triggered
    refetchAdmin();
  };

  return (
    <RefetchContext.Provider value={{ refetchTrigger, triggerRefetch }}>
      {children}
    </RefetchContext.Provider>
  );
};

export const useRefetch = (): RefetchContextType => {
  const context = useContext(RefetchContext);
  if (context === undefined) {
    throw new Error('useRefetch must be used within a RefetchProvider');
  }
  return context;
};