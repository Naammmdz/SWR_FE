import React from 'react';
import {
  Container,
  Typography,
  Grid,
  CardContent,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
  Chip,
  Alert,
  ThemeProvider,
} from '@mui/material';
import { MedicalCard, medicalTheme } from '../components/shared/MedicalComponents';
import { MEDICAL_COLORS } from '../constants/medicalTheme';
import {
  TrendingUp,
  TrendingDown,
  People,
  LocalHospital,
  Warning,
  CheckCircle,
} from '@mui/icons-material';
import StatCard from '../components/StatCard';
import ChartComponent from '../components/ChartComponent';
import PermissionWrapper from '../components/PermissionWrapper';
import { useAuth } from '../contexts/AuthContext';
import { Permission } from '../utils/permissions';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer,
} from 'recharts';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  // Sample data for charts
  const monthlyData = [
    { month: 'T1', events: 12, vaccinations: 45, checkups: 230 },
    { month: 'T2', events: 8, vaccinations: 52, checkups: 180 },
    { month: 'T3', events: 15, vaccinations: 38, checkups: 210 },
    { month: 'T4', events: 6, vaccinations: 67, checkups: 190 },
    { month: 'T5', events: 10, vaccinations: 43, checkups: 250 },
  ];

  const healthEventTypes = [
    { name: 'Tai nạn', value: 35, color: '#ff6b6b' },
    { name: 'Sốt', value: 25, color: '#4ecdc4' },
    { name: 'Đau đầu', value: 20, color: '#45b7d1' },
    { name: 'Khác', value: 20, color: '#96ceb4' },
  ];

  const vaccinationProgress = [
    { vaccine: 'Sởi - Rubella', completed: 95, total: 100 },
    { vaccine: 'DPT', completed: 88, total: 100 },
    { vaccine: 'Viêm gan B', completed: 92, total: 100 },
    { vaccine: 'BCG', completed: 98, total: 100 },
  ];

  const recentEvents = [
    {
      id: 1,
      student: 'Nguyễn Văn A',
      class: '6A1',
      event: 'Té ngã sân trường',
      status: 'completed',
      time: '09:30 - 30/05/2025',
    },
    {
      id: 2,
      student: 'Trần Thị B',
      class: '7B2',
      event: 'Sốt cao',
      status: 'in_progress',
      time: '14:15 - 30/05/2025',
    },
    {
      id: 3,
      student: 'Lê Văn C',
      class: '8A3',
      event: 'Đau bụng',
      status: 'pending',
      time: '15:45 - 30/05/2025',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in_progress': return 'warning';
      case 'pending': return 'error';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Đã xử lý';
      case 'in_progress': return 'Đang xử lý';
      case 'pending': return 'Chờ xử lý';
      default: return status;
    }
  };  return (
    <ThemeProvider theme={medicalTheme}>
      <Container 
        maxWidth="lg"
        sx={{
          backgroundColor: MEDICAL_COLORS.background.default,
          minHeight: '100vh',
          py: 4
        }}
      >
        <Typography 
          variant="h4" 
          gutterBottom
          sx={{
            color: MEDICAL_COLORS.primary.main,
            fontWeight: 700,
            textAlign: 'center',
            mb: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2
          }}
        >
          <LocalHospital sx={{ fontSize: '2.5rem', color: MEDICAL_COLORS.secondary.main }} />
          Dashboard Tổng quan
        </Typography>
        
        {/* Thông báo chào mừng dựa trên vai trò */}
        <Alert 
          severity="info" 
          sx={{ 
            mb: 3,
            borderRadius: 3,
            border: `2px solid ${MEDICAL_COLORS.info.light}`,
            backgroundColor: `${MEDICAL_COLORS.info.light}20`,
            '& .MuiAlert-icon': {
              color: MEDICAL_COLORS.info.main
            }
          }}
        >
          Chào mừng {user?.role === 'admin' ? 'Quản trị viên' :
                     user?.role === 'medical_staff' ? 'Nhân viên Y tế' :
                     user?.role === 'parent' ? 'Phụ huynh' : 'Giáo viên'} {user?.name}! 
          {user?.role === 'admin' && ' Bạn có quyền truy cập tất cả các tính năng của hệ thống.'}
          {user?.role === 'medical_staff' && ' Bạn có thể quản lý sức khỏe học sinh và xử lý các sự kiện y tế.'}
          {user?.role === 'parent' && ' Bạn có thể xem thông tin sức khỏe con em và gửi yêu cầu thuốc.'}
          {user?.role === 'teacher' && ' Bạn có thể xem tình trạng sức khỏe lớp học và báo cáo sự cố.'}
        </Alert>        {/* Summary Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <PermissionWrapper requiredPermissions={[Permission.VIEW_ALL_REPORTS, Permission.MANAGE_HEALTH_RECORDS]}>
            <Grid item xs={12} sm={6} md={3}>
              <MedicalCard sx={{ 
                background: 'linear-gradient(135deg, #2C5282, #4299E1)',
                color: 'white',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(44, 82, 130, 0.3)',
                }
              }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <People sx={{ fontSize: 40, mr: 2 }} />
                    <Box>
                      <Typography gutterBottom sx={{ opacity: 0.9 }}>
                        Tổng học sinh
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        1,245
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <TrendingUp sx={{ fontSize: 16, mr: 0.5 }} />
                        <Typography variant="body2">
                          +2.5%
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </MedicalCard>
            </Grid>
          </PermissionWrapper>        <PermissionWrapper requiredPermissions={[Permission.HANDLE_MEDICAL_EVENTS, Permission.VIEW_MEDICAL_REPORTS]}>
          <Grid item xs={12} sm={6} md={3}>
            <MedicalCard sx={{ 
              background: 'linear-gradient(135deg, #E53E3E, #C53030)',
              color: 'white',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 25px rgba(229, 62, 62, 0.3)',
              }
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocalHospital sx={{ fontSize: 40, mr: 2 }} />
                  <Box>
                    <Typography gutterBottom sx={{ opacity: 0.9 }}>
                      Sự kiện Y tế tháng này
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      10
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <TrendingDown sx={{ fontSize: 16, mr: 0.5 }} />
                      <Typography variant="body2">
                        -15%
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </MedicalCard>
          </Grid>
        </PermissionWrapper>        <Grid item xs={12} sm={6} md={3}>
          <MedicalCard sx={{ 
            background: 'linear-gradient(135deg, #38A169, #2F855A)',
            color: 'white',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 8px 25px rgba(56, 161, 105, 0.3)',
            }
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CheckCircle sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography gutterBottom sx={{ opacity: 0.9 }}>
                    Tỷ lệ tiêm chủng
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    93.2%
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TrendingUp sx={{ fontSize: 16, mr: 0.5 }} />
                    <Typography variant="body2">
                      +1.8%
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </MedicalCard>
        </Grid>        <Grid item xs={12} sm={6} md={3}>
          <MedicalCard sx={{ 
            background: 'linear-gradient(135deg, #F56500, #DD6B20)',
            color: 'white',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 8px 25px rgba(245, 101, 0, 0.3)',
            }
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Warning sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography gutterBottom sx={{ opacity: 0.9 }}>
                    Cần theo dõi
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    7
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TrendingUp sx={{ fontSize: 16, mr: 0.5 }} />
                    <Typography variant="body2">
                      +3
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </MedicalCard>
        </Grid>
      </Grid>

      <Grid container spacing={3}>        {/* Monthly Statistics Chart */}
        <Grid item xs={12} md={8}>
          <MedicalCard sx={{ 
            p: 3,
            background: 'linear-gradient(135deg, #ffffff, #f8f9fa)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            '&:hover': {
              boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
            }
          }}>
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{ 
                color: MEDICAL_COLORS.primary.main,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              📊 Thống kê theo tháng
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#4a5568" />
                <YAxis stroke="#4a5568" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                />
                <Legend />
                <Bar dataKey="events" fill="#E53E3E" name="Sự kiện Y tế" radius={[4, 4, 0, 0]} />
                <Bar dataKey="vaccinations" fill="#38A169" name="Tiêm chủng" radius={[4, 4, 0, 0]} />
                <Bar dataKey="checkups" fill="#2C5282" name="Kiểm tra Y tế" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </MedicalCard>
        </Grid>        {/* Health Event Types */}
        <Grid item xs={12} md={4}>
          <MedicalCard sx={{ 
            p: 3,
            background: 'linear-gradient(135deg, #ffffff, #f8f9fa)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            '&:hover': {
              boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
            }
          }}>
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{ 
                color: MEDICAL_COLORS.primary.main,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              🏥 Loại sự kiện Y tế
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={healthEventTypes}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {healthEventTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </MedicalCard>
        </Grid>        {/* Vaccination Progress */}
        <Grid item xs={12} md={6}>
          <MedicalCard sx={{ 
            p: 3,
            background: 'linear-gradient(135deg, #ffffff, #f8f9fa)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            '&:hover': {
              boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
            }
          }}>
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{ 
                color: MEDICAL_COLORS.primary.main,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              💉 Tiến độ tiêm chủng
            </Typography>
            {vaccinationProgress.map((vaccine, index) => (
              <Box key={index} sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {vaccine.vaccine}
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    fontWeight: 600, 
                    color: MEDICAL_COLORS.success.main 
                  }}>
                    {vaccine.completed}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={vaccine.completed}
                  sx={{ 
                    height: 10, 
                    borderRadius: 5,
                    backgroundColor: '#e2e8f0',
                    '& .MuiLinearProgress-bar': {
                      background: 'linear-gradient(90deg, #38A169, #68D391)',
                      borderRadius: 5,
                    }
                  }}
                />
              </Box>
            ))}
          </MedicalCard>
        </Grid>        {/* Recent Events */}
        <Grid item xs={12} md={6}>
          <MedicalCard sx={{ 
            p: 3,
            background: 'linear-gradient(135deg, #ffffff, #f8f9fa)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            '&:hover': {
              boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
            }
          }}>
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{ 
                color: MEDICAL_COLORS.primary.main,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              📝 Sự kiện Y tế gần đây
            </Typography>
            <List sx={{ '& .MuiListItem-root': { px: 0 } }}>
              {recentEvents.map((event) => (
                <ListItem 
                  key={event.id} 
                  sx={{ 
                    px: 0,
                    py: 1.5,
                    borderBottom: '1px solid #e2e8f0',
                    '&:last-child': { borderBottom: 'none' }
                  }}
                >
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {event.student} - {event.class}
                        </Typography>
                        <Chip
                          label={getStatusText(event.status)}
                          size="small"
                          color={getStatusColor(event.status) as any}
                          sx={{ 
                            fontWeight: 500,
                            '&.MuiChip-colorSuccess': {
                              backgroundColor: '#38A169',
                              color: 'white'
                            },
                            '&.MuiChip-colorWarning': {
                              backgroundColor: '#F56500',
                              color: 'white'
                            },
                            '&.MuiChip-colorError': {
                              backgroundColor: '#E53E3E',
                              color: 'white'
                            }
                          }}
                        />
                      </Box>
                    }
                    secondary={
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="body2" color="text.primary" sx={{ fontWeight: 500 }}>
                          {event.event}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {event.time}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </MedicalCard>
        </Grid>
      </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default Dashboard;
