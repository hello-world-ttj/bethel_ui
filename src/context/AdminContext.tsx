import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { getAdmin } from '../api/authApi';
import { updateExpiry } from '../api/subscriptionApi';

interface AdminContextType {
  admin: any;
  isLoading: boolean;
  error: string | null;
  refetchAdmin: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAdmin = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await getAdmin();
      setAdmin(response?.data || null);
      
      // Also update subscription expiry
      await updateExpiry();
    } catch (err) {
      setError('Failed to fetch admin profile');
      setAdmin(null);
    } finally {
      setIsLoading(false);
    }
  };

  const refetchAdmin = async () => {
    await fetchAdmin();
  };

  useEffect(() => {
    fetchAdmin();
  }, []);

  return (
    <AdminContext.Provider value={{ admin, isLoading, error, refetchAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};