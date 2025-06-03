import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Permission } from '../utils/permissions';

interface PermissionWrapperProps {
  requiredPermissions: Permission[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
  showFallback?: boolean;
}

const PermissionWrapper: React.FC<PermissionWrapperProps> = ({
  requiredPermissions,
  children,
  fallback = null,
  showFallback = false,
}) => {
  const { hasAnyPermission } = useAuth();

  const hasPermission = hasAnyPermission(requiredPermissions);

  if (!hasPermission) {
    return showFallback ? <>{fallback}</> : null;
  }

  return <>{children}</>;
};

export default PermissionWrapper;
