import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserRole, Permission, hasPermission, hasAnyPermission, routePermissions } from '../utils/permissions';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  permissions?: Permission[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  hasPermission: (permission: Permission) => boolean;
  hasAnyPermission: (permissions: Permission[]) => boolean;
  canAccessRoute: (route: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulation of login API call
    if (email === 'admin@school.edu.vn' && password === 'admin123') {
      setUser({
        id: '1',
        name: 'Nguyễn Văn Admin',
        email: 'admin@school.edu.vn',
        role: 'admin'
      });
      return true;
    } else if (email === 'medical@school.edu.vn' && password === 'medical123') {
      setUser({
        id: '2',
        name: 'Bs. Trần Thị Y',
        email: 'medical@school.edu.vn',
        role: 'medical_staff'
      });
      return true;
    } else if (email === 'parent@gmail.com' && password === 'parent123') {
      setUser({
        id: '3',
                name: 'Lê Văn Phụ Huynh',
        email: 'parent@gmail.com',
        role: 'parent'
      });
      return true;
    } else if (email === 'teacher@school.edu.vn' && password === 'teacher123') {
      setUser({
        id: '4',
        name: 'Cô Phạm Thị Giáo Viên',
        email: 'teacher@school.edu.vn',
        role: 'teacher'
      });
      return true;
    }
    return false;
  };
  const logout = () => {
    setUser(null);
  };

  // Hàm kiểm tra quyền hạn của user hiện tại
  const checkPermission = (permission: Permission): boolean => {
    if (!user) return false;
    return hasPermission(user.role, permission);
  };

  // Hàm kiểm tra user có ít nhất một trong các quyền
  const checkAnyPermission = (permissions: Permission[]): boolean => {
    if (!user) return false;
    return hasAnyPermission(user.role, permissions);
  };

  // Hàm kiểm tra user có thể truy cập route
  const canAccessRoute = (route: string): boolean => {
    if (!user) return false;
    const requiredPermissions = routePermissions[route];
    if (!requiredPermissions) return true; // Route không yêu cầu quyền đặc biệt
    return checkAnyPermission(requiredPermissions);
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    hasPermission: checkPermission,
    hasAnyPermission: checkAnyPermission,
    canAccessRoute,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
