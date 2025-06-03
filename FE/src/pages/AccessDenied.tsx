import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Block,
  ArrowBack,
  Security,
  Info,
  ContactSupport,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const AccessDenied: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const getRoleName = () => {
    switch (user?.role) {
      case 'admin':
        return 'Quản trị viên';
      case 'medical_staff':
        return 'Nhân viên Y tế';
      case 'parent':
        return 'Phụ huynh';
      case 'teacher':
        return 'Giáo viên';
      default:
        return 'Người dùng';
    }
  };

  const getAccessibleFeatures = () => {
    const features = [];
    
    if (user?.role === 'admin') {
      features.push(
        'Tất cả tính năng của hệ thống',
        'Quản lý người dùng',
        'Xem tất cả báo cáo',
        'Quản lý hệ thống'
      );
    } else if (user?.role === 'medical_staff') {
      features.push(
        'Quản lý hồ sơ sức khỏe học sinh',
        'Thực hiện khám sức khỏe',
        'Quản lý tiêm chủng',
        'Xử lý sự kiện y tế',
        'Duyệt thuốc từ phụ huynh'
      );
    } else if (user?.role === 'parent') {
      features.push(
        'Xem thông tin sức khỏe con em',
        'Gửi yêu cầu thuốc cho con',
        'Xem lịch tiêm chủng',
        'Nhận thông báo sức khỏe'
      );
    } else if (user?.role === 'teacher') {
      features.push(
        'Xem tình trạng sức khỏe lớp học',
        'Báo cáo sự cố sức khỏe',
        'Xem thông tin y tế cơ bản học sinh'
      );
    }
    
    return features;
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Block sx={{ fontSize: 48, color: 'error.main', mr: 2 }} />
          <Box>
            <Typography variant="h4" color="error.main" gutterBottom>
              Truy cập bị từ chối
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Bạn không có quyền truy cập vào trang này
            </Typography>
          </Box>
        </Box>

        <Alert severity="warning" sx={{ mb: 3 }}>
          <Typography variant="body1">
            <strong>{getRoleName()}</strong> {user?.name}, tài khoản của bạn không có quyền truy cập 
            vào trang <strong>{location.pathname}</strong>.
          </Typography>
        </Alert>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <Security sx={{ mr: 1 }} />
            Các tính năng bạn có thể sử dụng:
          </Typography>
          <List>
            {getAccessibleFeatures().map((feature, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <Info color="primary" />
                </ListItemIcon>
                <ListItemText primary={feature} />
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <ContactSupport sx={{ mr: 1 }} />
            Cần thêm quyền truy cập?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • Liên hệ với quản trị viên hệ thống để được cấp quyền phù hợp<br/>
            • Đảm bảo bạn đã đăng nhập đúng tài khoản<br/>
            • Kiểm tra vai trò được gán cho tài khoản của bạn<br/>
            • Email hỗ trợ: admin@school.edu.vn
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={handleGoBack}
          >
            Quay lại
          </Button>
          <Button
            variant="contained"
            onClick={handleGoHome}
          >
            Về trang chủ
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AccessDenied;
