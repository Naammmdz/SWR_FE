import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Avatar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  createTheme,
  ThemeProvider,
  CssBaseline,
  styled,
  alpha,
  IconButton,
  Link,
} from '@mui/material';
import { LocalHospital, ArrowBack, Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

// Medical Theme - Same as Homepage
const medicalTheme = createTheme({
  palette: {
    primary: {
      main: '#2C5282', // Deep Medical Blue
      light: '#4299E1',
      dark: '#1A365D',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#319795', // Medical Teal
      light: '#4FD1C7',
      dark: '#234E52',
      contrastText: '#ffffff',
    },
    success: {
      main: '#38A169', // Medical Green
      light: '#68D391',
      dark: '#2F855A',
      contrastText: '#ffffff',
    },
    background: {
      default: '#F7FAFC', // Very Light Blue-Gray
      paper: '#ffffff',
    },
    text: {
      primary: '#2D3748', // Dark Blue-Gray
      secondary: '#4A5568', // Medium Blue-Gray
    },
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.025em',
      color: '#1A202C',
    },
    h4: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
      color: '#2D3748',
    },
    body1: {
      color: '#4A5568',
      lineHeight: 1.6,
    },
    body2: {
      color: '#718096',
      lineHeight: 1.5,
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 32px rgba(44, 82, 130, 0.08)',
          border: '1px solid rgba(226, 232, 240, 0.8)',
          borderRadius: '16px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: '12px',
          letterSpacing: '0.025em',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#4299E1',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#2C5282',
            },
          },
        },
      },
    },
  },
});

// Styled Components
const LoginContainer = styled(Box)(() => ({
  minHeight: '100vh',
  background: `linear-gradient(135deg, ${alpha(medicalTheme.palette.primary.main, 0.05)}, ${alpha(medicalTheme.palette.secondary.main, 0.03)})`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '16px',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `radial-gradient(circle at 30% 40%, ${alpha(medicalTheme.palette.primary.main, 0.08)} 0%, transparent 50%), radial-gradient(circle at 70% 80%, ${alpha(medicalTheme.palette.secondary.main, 0.06)} 0%, transparent 50%)`,
    pointerEvents: 'none',
  },
}));

const LoginPaper = styled(Paper)(() => ({
  padding: '48px 40px',
  borderRadius: '24px',
  boxShadow: '0 8px 64px rgba(44, 82, 130, 0.12)',
  border: `1px solid ${alpha(medicalTheme.palette.primary.main, 0.1)}`,
  background: 'rgba(255, 255, 255, 0.98)',
  backdropFilter: 'blur(10px)',
  width: '100%',
  maxWidth: '480px',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: `linear-gradient(90deg, ${medicalTheme.palette.primary.main}, ${medicalTheme.palette.secondary.main}, ${medicalTheme.palette.success.main})`,
  },
}));

const MedicalAvatar = styled(Avatar)(() => ({
  width: 80,
  height: 80,
  background: `linear-gradient(135deg, ${medicalTheme.palette.primary.main}, ${medicalTheme.palette.primary.dark})`,
  boxShadow: `0 8px 24px ${alpha(medicalTheme.palette.primary.main, 0.3)}`,
  marginBottom: '24px',
}));

const MedicalButton = styled(Button)(() => ({
  borderRadius: '16px',
  textTransform: 'none',
  fontWeight: 600,
  padding: '16px 32px',
  fontSize: '1.1rem',
  background: `linear-gradient(135deg, ${medicalTheme.palette.primary.main}, ${medicalTheme.palette.primary.dark})`,
  boxShadow: `0 4px 16px ${alpha(medicalTheme.palette.primary.main, 0.3)}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 8px 24px ${alpha(medicalTheme.palette.primary.main, 0.4)}`,
    background: `linear-gradient(135deg, ${medicalTheme.palette.primary.dark}, ${medicalTheme.palette.primary.main})`,
  },
  '&:disabled': {
    background: alpha(medicalTheme.palette.primary.main, 0.5),
    transform: 'none',
  },
}));

const BackButton = styled(IconButton)(() => ({
  position: 'absolute',
  top: '24px',
  left: '24px',
  background: alpha(medicalTheme.palette.primary.main, 0.1),
  color: medicalTheme.palette.primary.main,
  '&:hover': {
    background: alpha(medicalTheme.palette.primary.main, 0.2),
    transform: 'scale(1.1)',
  },
}));

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('admin');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const success = await login(email, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Email hoặc mật khẩu không đúng');
      }
    } catch (err) {
      setError('Đã xảy ra lỗi khi đăng nhập');
    } finally {
      setLoading(false);
    }
  };
  const handleUserTypeChange = (type: string) => {
    setUserType(type);
    switch (type) {
      case 'admin':
        setEmail('admin@school.edu.vn');
        setPassword('admin123');
        break;
      case 'medical':
        setEmail('medical@school.edu.vn');
        setPassword('medical123');
        break;
      case 'parent':
        setEmail('parent@gmail.com');
        setPassword('parent123');
        break;
      case 'teacher':
        setEmail('teacher@school.edu.vn');
        setPassword('teacher123');
        break;
      default:
        setEmail('');
        setPassword('');
    }
  };
  return (
    <ThemeProvider theme={medicalTheme}>
      <CssBaseline />
      <LoginContainer>
        <BackButton onClick={() => navigate('/')}>
          <ArrowBack />
        </BackButton>
        
        <LoginPaper elevation={0}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <MedicalAvatar>
              <LocalHospital sx={{ fontSize: 40 }} />
            </MedicalAvatar>
            
            <Typography component="h1" variant="h4" gutterBottom sx={{ fontWeight: 700, color: medicalTheme.palette.primary.dark }}>
              Y tế Học đường
            </Typography>
            
            <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4, maxWidth: 300 }}>
              Đăng nhập để truy cập hệ thống quản lý y tế học đường chuyên nghiệp
            </Typography>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel sx={{ color: medicalTheme.palette.text.secondary }}>Loại tài khoản demo</InputLabel>
              <Select
                value={userType}
                label="Loại tài khoản demo"
                onChange={(e) => handleUserTypeChange(e.target.value)}
                sx={{
                  borderRadius: '12px',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: alpha(medicalTheme.palette.primary.main, 0.3),
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: medicalTheme.palette.primary.light,
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: medicalTheme.palette.primary.main,
                  },
                }}
              >
                <MenuItem value="admin">👨‍💼 Quản trị viên</MenuItem>
                <MenuItem value="medical">👩‍⚕️ Nhân viên Y tế</MenuItem>
                <MenuItem value="parent">👨‍👩‍👧‍👦 Phụ huynh</MenuItem>
                <MenuItem value="teacher">👨‍🏫 Giáo viên</MenuItem>
              </Select>
            </FormControl>

            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
              {error && (
                <Alert 
                  severity="error" 
                  sx={{ 
                    mb: 3, 
                    borderRadius: '12px',
                    '& .MuiAlert-icon': {
                      color: medicalTheme.palette.error.main,
                    },
                  }}
                >
                  {error}
                </Alert>
              )}
              
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 2 }}
              />
              
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mật khẩu"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 3 }}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: medicalTheme.palette.text.secondary }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
              />
              
              <MedicalButton
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{ mb: 3 }}
              >
                {loading ? 'Đang đăng nhập...' : 'Đăng nhập hệ thống'}
              </MedicalButton>
            </Box>

            <Box sx={{ width: '100%', p: 3, borderRadius: '16px', background: alpha(medicalTheme.palette.primary.main, 0.03) }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: medicalTheme.palette.primary.dark, mb: 2 }}>
                🔑 Tài khoản demo có sẵn:
              </Typography>
              <Box sx={{ display: 'grid', gap: 1 }}>
                <Typography variant="caption" sx={{ color: medicalTheme.palette.text.secondary }}>
                  <strong>👨‍💼 Quản trị:</strong> admin@school.edu.vn / admin123
                </Typography>
                <Typography variant="caption" sx={{ color: medicalTheme.palette.text.secondary }}>
                  <strong>👩‍⚕️ Y tế:</strong> medical@school.edu.vn / medical123
                </Typography>
                <Typography variant="caption" sx={{ color: medicalTheme.palette.text.secondary }}>
                  <strong>👨‍👩‍👧‍👦 Phụ huynh:</strong> parent@gmail.com / parent123
                </Typography>
                <Typography variant="caption" sx={{ color: medicalTheme.palette.text.secondary }}>
                  <strong>👨‍🏫 Giáo viên:</strong> teacher@school.edu.vn / teacher123
                </Typography>
              </Box>
            </Box>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Chưa có tài khoản?{' '}
                <Link 
                  component="button" 
                  onClick={() => navigate('/')}
                  sx={{ 
                    color: medicalTheme.palette.primary.main, 
                    textDecoration: 'none',
                    fontWeight: 600,
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Quay về trang chủ
                </Link>
              </Typography>
            </Box>
          </Box>
        </LoginPaper>
      </LoginContainer>
    </ThemeProvider>
  );
};

export default Login;
