import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Box, Alert, Typography } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { Permission } from '../utils/permissions';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermissions?: Permission[];
  fallbackPath?: string;
  showUnauthorizedMessage?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredPermissions = [],
  fallbackPath = '/login',
  showUnauthorizedMessage = true,
}) => {
  const { isAuthenticated, hasAnyPermission, user } = useAuth();
  const location = useLocation();

  // Nếu chưa đăng nhập, chuyển hướng đến login
  if (!isAuthenticated) {
    return <Navigate to={fallbackPath} state={{ from: location }} replace />;
  }

  // Nếu không có quyền yêu cầu, cho phép truy cập
  if (requiredPermissions.length === 0) {
    return <>{children}</>;
  }

  // Kiểm tra quyền hạn
  const hasRequiredPermission = hasAnyPermission(requiredPermissions);

  if (!hasRequiredPermission) {
    if (showUnauthorizedMessage) {
      return (
        <Box sx={{ p: 3 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Không có quyền truy cập
            </Typography>
            <Typography variant="body2">
              Tài khoản của bạn ({user?.role === 'admin' ? 'Quản trị viên' : 
                user?.role === 'medical_staff' ? 'Nhân viên Y tế' :
                user?.role === 'parent' ? 'Phụ huynh' : 'Giáo viên'}) 
              không có quyền truy cập vào trang này.
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Vui lòng liên hệ quản trị viên để được cấp quyền phù hợp.
            </Typography>
          </Alert>
        </Box>
      );
    }
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
