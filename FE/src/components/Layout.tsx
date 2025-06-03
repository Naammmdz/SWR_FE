import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Button,
  Avatar,
  Menu,
  MenuItem,
  Chip,
  Divider,
  ThemeProvider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home,
  Dashboard,
  PersonAdd,
  LocalHospital,
  EventNote,
  Vaccines,
  HealthAndSafety,
  People,
  AccountCircle,
  Security,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { Permission } from '../utils/permissions';
import { MEDICAL_COLORS } from '../constants/medicalTheme';
import { medicalTheme } from './shared/MedicalComponents';

const drawerWidth = 240;

const Layout: React.FC = () => {  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user, logout, isAuthenticated, hasPermission, canAccessRoute } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate('/login');
  };  const menuItems = [
    { 
      text: 'Trang chủ', 
      icon: <Home />, 
      path: '/',
      permissions: []
    },
    { 
      text: 'Dashboard', 
      icon: <Dashboard />,
      path: '/dashboard',
      permissions: [Permission.VIEW_DASHBOARD]
    },
    { 
      text: 'Hồ sơ học sinh', 
      icon: <PersonAdd />, 
      path: '/dashboard/student-health',
      permissions: [Permission.MANAGE_HEALTH_RECORDS, Permission.VIEW_OWN_CHILD_HEALTH]
    },
    { 
      text: 'Quản lý thuốc', 
      icon: <LocalHospital />, 
      path: '/dashboard/medicine',
      permissions: [Permission.SUBMIT_MEDICINE_REQUEST, Permission.APPROVE_MEDICINES]
    },
    { 
      text: 'Sự kiện y tế', 
      icon: <EventNote />, 
      path: '/dashboard/health-events',
      permissions: [Permission.HANDLE_MEDICAL_EVENTS, Permission.REPORT_HEALTH_INCIDENTS]
    },
    { 
      text: 'Tiêm chủng', 
      icon: <Vaccines />, 
      path: '/dashboard/vaccination',
      permissions: [Permission.MANAGE_VACCINATIONS, Permission.VIEW_VACCINATION_SCHEDULE]
    },
    { 
      text: 'Kiểm tra y tế', 
      icon: <HealthAndSafety />, 
      path: '/dashboard/health-check',
      permissions: [Permission.CONDUCT_HEALTH_CHECKS]
    },    { 
      text: 'Quản lý người dùng', 
      icon: <People />, 
      path: '/dashboard/users',
      permissions: [Permission.MANAGE_USERS]
    },
    { 
      text: 'Quyền hạn của tôi', 
      icon: <Security />, 
      path: '/dashboard/permissions',
      permissions: []
    },
  ];

  // Lọc menu items dựa trên quyền hạn
  const visibleMenuItems = menuItems.filter(item => 
    item.permissions.length === 0 || canAccessRoute(item.path)
  );  const drawer = (
    <Box sx={{
      background: 'linear-gradient(180deg, #2C5282 0%, #1A365D 100%)',
      height: '100%',
      color: 'white'
    }}>
      <Toolbar sx={{ 
        background: 'linear-gradient(135deg, #2C5282, #4299E1)',
        borderBottom: '2px solid rgba(255,255,255,0.1)'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LocalHospital sx={{ color: 'white', fontSize: '1.8rem' }} />
          <Typography variant="h6" noWrap component="div" sx={{ 
            fontWeight: 700,
            color: 'white'
          }}>
            Y tế Học đường
          </Typography>
        </Box>
      </Toolbar>
      
      <Box sx={{ p: 2.5, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1.5,
          mb: 2
        }}>
          <Avatar sx={{ 
            background: 'linear-gradient(135deg, #38A169, #68D391)',
            width: 40, 
            height: 40,
            fontSize: '1.2rem'
          }}>
            {user?.name?.charAt(0) || <AccountCircle />}
          </Avatar>
          <Box>
            <Typography variant="subtitle2" sx={{ 
              fontWeight: 600,
              color: 'white',
              lineHeight: 1.2
            }}>
              {user?.name || 'Người dùng'}
            </Typography>
            <Chip 
              label={user?.role === 'admin' ? 'Quản trị viên' :
                    user?.role === 'medical_staff' ? 'Nhân viên Y tế' :
                    user?.role === 'parent' ? 'Phụ huynh' : 'Giáo viên'}
              size="small"
              sx={{ 
                background: 'linear-gradient(90deg, #F56500, #DD6B20)',
                color: 'white',
                fontWeight: 500,
                fontSize: '0.7rem',
                height: '20px'
              }}
            />
          </Box>
        </Box>
      </Box>

      <List sx={{ pt: 1 }}>
        {visibleMenuItems.map((item, index) => {
          const isSelected = location.pathname === item.path;
          return (
            <ListItem
              button
              key={item.text}
              onClick={() => navigate(item.path)}
              selected={isSelected}
              sx={{
                mx: 1,
                mb: 0.5,
                borderRadius: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))',
                  transform: 'translateX(4px)',
                },
                '&.Mui-selected': {
                  background: 'linear-gradient(135deg, #38A169, #2F855A)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #38A169, #2F855A)',
                  }
                }
              }}
            >
              <ListItemIcon sx={{ 
                color: isSelected ? 'white' : 'rgba(255,255,255,0.8)',
                minWidth: '40px'
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: '0.9rem',
                  fontWeight: isSelected ? 600 : 500,
                  color: isSelected ? 'white' : 'rgba(255,255,255,0.9)'
                }}
              />
            </ListItem>
          );
        })}
      </List>
      
      <Box sx={{ 
        position: 'absolute', 
        bottom: 16, 
        left: 16, 
        right: 16,
        textAlign: 'center'
      }}>
        <Typography variant="caption" sx={{ 
          color: 'rgba(255,255,255,0.6)',
          fontSize: '0.7rem'
        }}>
          © 2025 Hệ thống Y tế Học đường
        </Typography>
      </Box>
    </Box>
  );

  if (!isAuthenticated) {
    return null;
  }
  return (
    <ThemeProvider theme={medicalTheme}>
      <Box sx={{ display: 'flex' }}>
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            background: 'linear-gradient(135deg, #2C5282, #4299E1)',
            boxShadow: '0 2px 10px rgba(44, 82, 130, 0.2)',
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ 
              flexGrow: 1,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <HealthAndSafety sx={{ fontSize: '1.5rem' }} />
              Phần mềm Quản lý Y tế Học đường
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ 
                mr: 2,
                display: { xs: 'none', md: 'block' }
              }}>
                {user?.name} 
              </Typography>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                sx={{
                  '&:hover': {
                    background: 'rgba(255,255,255,0.1)',
                  }
                }}
              >
                <Avatar sx={{ 
                  width: 32, 
                  height: 32,
                  background: 'linear-gradient(135deg, #38A169, #68D391)'
                }}>
                  {user?.name?.charAt(0) || <AccountCircle />}
                </Avatar>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                sx={{
                  '& .MuiPaper-root': {
                    background: 'linear-gradient(135deg, #ffffff, #f8f9fa)',
                    borderRadius: 2,
                    boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                    border: '1px solid #e2e8f0',
                  }
                }}
              >
                <MenuItem 
                  onClick={() => { navigate('/dashboard/permissions'); handleClose(); }}
                  sx={{
                    '&:hover': {
                      background: 'linear-gradient(135deg, rgba(44, 82, 130, 0.1), rgba(66, 153, 225, 0.05))',
                    }
                  }}
                >
                  <Security sx={{ mr: 1, color: MEDICAL_COLORS.primary.main }} /> 
                  Quyền hạn của tôi
                </MenuItem>
                <MenuItem 
                  onClick={handleLogout}
                  sx={{
                    '&:hover': {
                      background: 'linear-gradient(135deg, rgba(229, 62, 62, 0.1), rgba(197, 48, 48, 0.05))',
                    }
                  }}
                >
                  Đăng xuất
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { 
                boxSizing: 'border-box', 
                width: drawerWidth,
                border: 'none'
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { 
                boxSizing: 'border-box', 
                width: drawerWidth,
                border: 'none'
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            mt: 8,
            backgroundColor: MEDICAL_COLORS.background.default,
            minHeight: '100vh'
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
