import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  credentials?: { email: string; password: string }; // Temporary storage for secure functions
}

interface AdminContextType {
  admin: AdminUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if admin is logged in from localStorage
    const savedAdmin = localStorage.getItem('admin_user');
    if (savedAdmin) {
      setAdmin(JSON.parse(savedAdmin));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.rpc('verify_admin_credentials', {
        input_email: email,
        input_password: password
      });

      if (error) {
        console.error('Login error:', error);
        setIsLoading(false);
        return { success: false, error: 'Error de conexión' };
      }

      if (data && data.length > 0) {
        const adminData = data[0];
        const adminUser: AdminUser = {
          id: adminData.admin_id,
          name: adminData.admin_name,
          email: adminData.admin_email,
          credentials: { email, password }, // Store temporarily for secure functions
        };
        
        setAdmin(adminUser);
        localStorage.setItem('admin_user', JSON.stringify(adminUser));
        
        // Update last login
        await supabase.rpc('update_admin_last_login', {
          admin_id: adminData.admin_id
        });
        
        setIsLoading(false);
        return { success: true };
      } else {
        setIsLoading(false);
        return { success: false, error: 'Credenciales incorrectas' };
      }
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      return { success: false, error: 'Error inesperado' };
    }
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('admin_user');
  };

  const isAuthenticated = admin !== null;

  return (
    <AdminContext.Provider
      value={{
        admin,
        isLoading,
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};