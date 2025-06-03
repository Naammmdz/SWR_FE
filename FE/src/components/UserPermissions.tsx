import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  CheckCircle,
  Cancel,
  AdminPanelSettings,
  LocalHospital,
  FamilyRestroom,
  School,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { Permission, rolePermissions, permissionDescriptions, UserRole } from '../utils/permissions';

const UserPermissions: React.FC = () => {
  const { user, hasPermission } = useAuth();

  if (!user) {
    return null;
  }

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return <AdminPanelSettings color="error" />;
      case 'medical_staff':
        return <LocalHospital color="primary" />;
      case 'parent':
        return <FamilyRestroom color="secondary" />;
      case 'teacher':
        return <School color="success" />;
      default:
        return <CheckCircle />;
    }
  };

  const getRoleName = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return 'Quản trị viên';
      case 'medical_staff':
        return 'Nhân viên Y tế';
      case 'parent':
        return 'Phụ huynh';
      case 'teacher':
        return 'Giáo viên';
      default:
        return role;
    }
  };

  const userPermissions = rolePermissions[user.role] || [];
  const allPermissions = Object.values(Permission);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Thông tin quyền hạn
      </Typography>
      
      <Grid container spacing={3}>
        {/* Thông tin vai trò */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                {getRoleIcon(user.role)}
                <Box sx={{ ml: 2 }}>
                  <Typography variant="h6">
                    {getRoleName(user.role)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.email}
                  </Typography>
                </Box>
              </Box>
              
              <Chip 
                label={`${userPermissions.length} quyền được cấp`}
                color="primary"
                variant="outlined"
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Danh sách quyền */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Chi tiết quyền hạn
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <List dense>
                {allPermissions.map((permission) => {
                  const hasThisPermission = hasPermission(permission);
                  return (
                    <ListItem key={permission}>
                      <ListItemIcon>
                        {hasThisPermission ? (
                          <CheckCircle color="success" />
                        ) : (
                          <Cancel color="disabled" />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={permissionDescriptions[permission]}
                        secondary={permission}
                        sx={{
                          opacity: hasThisPermission ? 1 : 0.5,
                        }}
                      />
                    </ListItem>
                  );
                })}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Thông tin bổ sung về vai trò */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Mô tả vai trò
          </Typography>
          <Typography variant="body2" paragraph>
            {user.role === 'admin' && 
              'Quản trị viên có toàn quyền truy cập và quản lý hệ thống. Có thể quản lý người dùng, xem tất cả báo cáo và thực hiện các tác vụ quản trị hệ thống.'}
            {user.role === 'medical_staff' && 
              'Nhân viên Y tế có quyền quản lý hồ sơ sức khỏe học sinh, thực hiện khám sức khỏe, quản lý tiêm chủng và xử lý các sự kiện y tế.'}
            {user.role === 'parent' && 
              'Phụ huynh có quyền xem thông tin sức khỏe con em, gửi yêu cầu thuốc, xem lịch tiêm chủng và nhận thông báo về tình trạng sức khỏe của con.'}
            {user.role === 'teacher' && 
              'Giáo viên có quyền xem tình trạng sức khỏe cơ bản của học sinh trong lớp, báo cáo các sự cố sức khỏe và xem thông tin y tế cần thiết cho việc giảng dạy.'}
          </Typography>
          
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Lưu ý bảo mật:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Không chia sẻ thông tin đăng nhập với người khác<br/>
              • Đăng xuất khi không sử dụng<br/>
              • Báo cáo ngay nếu phát hiện truy cập trái phép<br/>
              • Chỉ truy cập thông tin cần thiết cho công việc
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserPermissions;
