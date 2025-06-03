import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Tabs,
  Tab,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  Button,
} from '@mui/material';
import {
  Add,
  HealthAndSafety,
  Send,
  Visibility,
  Person,
  Assignment,
  DateRange,
  TrendingUp,
  MedicalServices,
  MonitorHeart,
  Notifications,
} from '@mui/icons-material';
import { MedicalButton, MedicalCard } from '../components/shared/MedicalComponents';
import { MEDICAL_COLORS } from '../constants/medicalTheme';
import { useAuth } from '../contexts/AuthContext';
import { Permission } from '../utils/permissions';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`healthcheck-tabpanel-${index}`}
      aria-labelledby={`healthcheck-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const HealthCheck: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [openResultDialog, setOpenResultDialog] = useState(false);
  const [selectedCheckup, setSelectedCheckup] = useState<any>(null);
  const { user, hasPermission } = useAuth();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Mock data
  const healthCheckups = [
    {
      id: 1,
      name: 'Kiểm tra sức khỏe định kỳ học kỳ 1',
      type: 'Tổng quát',
      startDate: '2024-03-01',
      endDate: '2024-03-15',
      status: 'active',
      totalStudents: 200,
      completed: 150,
      notifications: 180,
      checkItems: ['Chiều cao', 'Cân nặng', 'Thị lực', 'Thính lực', 'Tim mạch', 'Răng miệng']
    },
    {
      id: 2,
      name: 'Kiểm tra thị lực chuyên sâu',
      type: 'Chuyên khoa',
      startDate: '2024-04-01',
      endDate: '2024-04-10',
      status: 'planned',
      totalStudents: 50,
      completed: 0,
      notifications: 0,
      checkItems: ['Thị lực xa', 'Thị lực gần', 'Màu sắc', 'Áp lực mắt']
    },
  ];

  const healthCheckSteps = [
    'Gửi thông báo kiểm tra y tế cho phụ huynh',
    'Chuẩn bị danh sách học sinh kiểm tra',
    'Thực hiện kiểm tra và ghi nhận kết quả',
    'Gửi kết quả cho phụ huynh và lập lịch tư vấn'
  ];
  const allStudentResults = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      class: '6A1',
      parentId: '3', // ID của phụ huynh
      checkDate: '2024-03-05',
      height: '145cm',
      weight: '38kg',
      vision: '10/10',
      hearing: 'Bình thường',
      heartRate: '80 bpm',
      teeth: 'Tốt',
      status: 'normal',
      consultation: false
    },
    {
      id: 2,
      name: 'Trần Thị B',
      class: '6A2',
      parentId: '5', // ID phụ huynh khác
      checkDate: '2024-03-06',
      height: '142cm',
      weight: '35kg',
      vision: '8/10',
      hearing: 'Bình thường',
      heartRate: '85 bpm',
      teeth: 'Có sâu răng',
      status: 'abnormal',
      consultation: true
    },
    {
      id: 3,
      name: 'Lê Văn C',
      class: '6A1',
      parentId: '3', // Cùng phụ huynh với Nguyễn Văn A
      checkDate: '2024-03-07',
      height: '148cm',
      weight: '40kg',
      vision: '9/10',
      hearing: 'Bình thường',
      heartRate: '78 bpm',
      teeth: 'Tốt',
      status: 'normal',
      consultation: false
    },
  ];

  // Lọc kết quả kiểm tra dựa trên quyền hạn
  const getFilteredStudentResults = () => {
    if (!user) return [];
    
    if (hasPermission(Permission.CONDUCT_HEALTH_CHECKS)) {
      // Admin và medical_staff xem được tất cả kết quả kiểm tra
      return allStudentResults;
    } else if (user.role === 'parent') {
      // Phụ huynh chỉ xem được kết quả kiểm tra của con mình
      return allStudentResults.filter(result => result.parentId === user.id);
    } else {
      // Các role khác không có quyền xem
      return [];
    }
  };

  const studentResults = getFilteredStudentResults();
  // Tính toán thống kê dựa trên dữ liệu đã lọc
  const getFilteredStatistics = () => {
    const filteredResults = getFilteredStudentResults();
    const totalStudents = filteredResults.length;
    const normalResults = filteredResults.filter(r => r.status === 'normal').length;
    const needConsultation = filteredResults.filter(r => r.consultation).length;
    
    return [
      { label: 'Tổng số học sinh', value: totalStudents, color: 'primary' },
      { label: 'Đã kiểm tra', value: filteredResults.length, color: 'success' },
      { label: 'Bình thường', value: normalResults, color: 'info' },
      { label: 'Cần tư vấn', value: needConsultation, color: 'warning' },
    ];
  };

  const statistics = getFilteredStatistics();

  // Filter health checkups by user's permission
  const filteredHealthCheckups = healthCheckups.filter(checkup => {
    if (user?.role === 'admin') return true;
    if (user?.role === 'teacher') return checkup.status !== 'planned';
    return false;
  });

  return (
    <Container maxWidth="lg" sx={{ 
      background: `linear-gradient(135deg, ${MEDICAL_COLORS.info.light} 0%, #ffffff 50%, ${MEDICAL_COLORS.success.light} 100%)`,
      minHeight: '100vh',
      py: 3
    }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ 
          color: MEDICAL_COLORS.primary.main, 
          fontWeight: 700,
          textAlign: 'center'
        }}>
          <MedicalServices sx={{ mr: 2, verticalAlign: 'middle', fontSize: '2rem' }} />
          Kiểm tra Y tế Định kỳ
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center' }}>
          Quản lý quá trình kiểm tra y tế định kỳ tại trường học
        </Typography>
      </Box>      <Paper sx={{ 
        width: '100%', 
        mb: 2, 
        borderRadius: 3,
        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
        overflow: 'hidden'
      }}>
        <Box sx={{ 
          borderBottom: 1, 
          borderColor: 'divider',
          '& .MuiTab-root': {
            color: MEDICAL_COLORS.primary.main,
            fontWeight: 600
          },
          '& .Mui-selected': {
            color: `${MEDICAL_COLORS.primary.main} !important`
          }
        }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: MEDICAL_COLORS.primary.main
              }
            }}
          >
            <Tab label="Đợt kiểm tra" />
            <Tab label="Quy trình kiểm tra" />
            <Tab label="Kết quả kiểm tra" />
            <Tab label="Thống kê & Báo cáo" />
          </Tabs>
        </Box>        <TabPanel value={tabValue} index={0}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ color: MEDICAL_COLORS.primary.main, fontWeight: 600 }}>
              <MonitorHeart sx={{ mr: 1, verticalAlign: 'middle' }} />
              Các đợt kiểm tra y tế
            </Typography>
            <MedicalButton
              variant="contained"
              startIcon={<Add />}
              onClick={() => setOpenDialog(true)}
            >
              Tạo đợt kiểm tra mới
            </MedicalButton>
          </Box>

          <Grid container spacing={3}>
            {filteredHealthCheckups.map((checkup) => (
              <Grid item xs={12} key={checkup.id}>
                <MedicalCard>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box>
                        <Typography variant="h6" component="h3">
                          {checkup.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Loại: {checkup.type}
                        </Typography>
                      </Box>
                      <Chip
                        label={checkup.status === 'active' ? 'Đang thực hiện' : 'Đã lên kế hoạch'}
                        color={checkup.status === 'active' ? 'success' : 'info'}
                        size="small"
                      />
                    </Box>
                    
                    <Grid container spacing={2} sx={{ mb: 2 }}>
                      <Grid item xs={12} md={6}>
                        <Typography variant="body2" color="text.secondary">
                          Thời gian: {checkup.startDate} - {checkup.endDate}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Tiến độ: {checkup.completed}/{checkup.totalStudents} học sinh
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="body2" color="text.secondary">
                          Thông báo đã gửi: {checkup.notifications}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Nội dung kiểm tra: {checkup.checkItems.join(', ')}
                        </Typography>
                      </Grid>
                    </Grid>                    <Box sx={{ mt: 2 }}>
                      <MedicalButton
                        size="small"
                        startIcon={<Visibility />}
                        onClick={() => setSelectedCheckup(checkup)}
                      >
                        Chi tiết
                      </MedicalButton>
                      <MedicalButton
                        size="small"
                        startIcon={<Send />}
                        sx={{ ml: 1 }}
                        variant="outlined"
                      >
                        Gửi thông báo
                      </MedicalButton>
                      <MedicalButton
                        size="small"
                        startIcon={<Assignment />}
                        sx={{ ml: 1 }}
                        variant="outlined"
                      >
                        Xem kết quả
                      </MedicalButton>
                    </Box>
                  </CardContent>
                </MedicalCard>
              </Grid>
            ))}
          </Grid>
        </TabPanel>        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom sx={{ 
            color: MEDICAL_COLORS.primary.main, 
            fontWeight: 600,
            mb: 3
          }}>
            <HealthAndSafety sx={{ mr: 1, verticalAlign: 'middle' }} />
            Quy trình kiểm tra y tế định kỳ
          </Typography>
          
          <Stepper orientation="vertical" sx={{
            '& .MuiStepLabel-root': {
              '& .MuiStepLabel-iconContainer': {
                color: MEDICAL_COLORS.primary.main
              }
            },
            '& .MuiStepConnector-line': {
              borderColor: MEDICAL_COLORS.info.light
            }
          }}>
            {healthCheckSteps.map((step, index) => (
              <Step key={step} active={true}>
                <StepLabel>
                  <Typography variant="h6" sx={{ color: MEDICAL_COLORS.primary.main, fontWeight: 600 }}>
                    {step}
                  </Typography>
                </StepLabel>
                <StepContent>
                  <Paper sx={{ 
                    p: 2, 
                    backgroundColor: MEDICAL_COLORS.info.light + '20',
                    border: `1px solid ${MEDICAL_COLORS.info.light}`,
                    borderRadius: 2
                  }}>
                    {index === 0 && (
                      <Typography sx={{ color: MEDICAL_COLORS.text.primary }}>
                        Gửi phiếu thông báo kiểm tra y tế và các nội dung kiểm tra cho phụ huynh xác nhận
                      </Typography>
                    )}
                    {index === 1 && (
                      <Typography sx={{ color: MEDICAL_COLORS.text.primary }}>
                        Chuẩn bị danh sách học sinh kiểm tra theo lớp và thời gian
                      </Typography>
                    )}
                    {index === 2 && (
                      <Typography sx={{ color: MEDICAL_COLORS.text.primary }}>
                        Thực hiện kiểm tra các chỉ số sức khỏe và ghi nhận kết quả vào hệ thống
                      </Typography>
                    )}
                    {index === 3 && (
                      <Typography sx={{ color: MEDICAL_COLORS.text.primary }}>
                        Gửi kết quả cho phụ huynh và lập lịch hẹn tư vấn riêng nếu có dấu hiệu bất thường
                      </Typography>
                    )}
                  </Paper>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </TabPanel><TabPanel value={tabValue} index={2}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ color: MEDICAL_COLORS.primary.main, fontWeight: 600 }}>
              <Assignment sx={{ mr: 1, verticalAlign: 'middle' }} />
              Kết quả kiểm tra y tế
            </Typography>
            <MedicalButton
              variant="contained"
              startIcon={<Person />}
              onClick={() => setOpenResultDialog(true)}
            >
              Nhập kết quả
            </MedicalButton>
          </Box>

          <TableContainer component={Paper} sx={{ 
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            borderRadius: 2,
            '& .MuiTableHead-root': {
              '& .MuiTableCell-root': {
                backgroundColor: MEDICAL_COLORS.primary.main,
                color: 'white',
                fontWeight: 600
              }
            },
            '& .MuiTableBody-root': {
              '& .MuiTableRow-root:hover': {
                backgroundColor: MEDICAL_COLORS.info.light + '20'
              }
            }
          }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Họ tên</TableCell>
                  <TableCell>Lớp</TableCell>
                  <TableCell>Ngày kiểm tra</TableCell>
                  <TableCell>Chiều cao/Cân nặng</TableCell>
                  <TableCell>Thị lực</TableCell>
                  <TableCell>Tim mạch</TableCell>
                  <TableCell>Tình trạng</TableCell>
                  <TableCell>Tư vấn</TableCell>
                  <TableCell>Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {studentResults.map((result) => (
                  <TableRow key={result.id}>
                    <TableCell sx={{ fontWeight: 500 }}>{result.name}</TableCell>
                    <TableCell>{result.class}</TableCell>
                    <TableCell>{result.checkDate}</TableCell>
                    <TableCell>{result.height}/{result.weight}</TableCell>
                    <TableCell>{result.vision}</TableCell>
                    <TableCell>{result.heartRate}</TableCell>
                    <TableCell>
                      <Chip
                        label={result.status === 'normal' ? 'Bình thường' : 'Cần theo dõi'}
                        color={result.status === 'normal' ? 'success' : 'warning'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={result.consultation ? 'Cần tư vấn' : 'Không cần'}
                        color={result.consultation ? 'error' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <MedicalButton size="small" variant="outlined">
                        Chi tiết
                      </MedicalButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>        <TabPanel value={tabValue} index={3}>
          <Typography variant="h6" gutterBottom sx={{ 
            color: MEDICAL_COLORS.primary.main, 
            fontWeight: 600,
            mb: 3
          }}>
            <TrendingUp sx={{ mr: 1, verticalAlign: 'middle' }} />
            Thống kê kết quả kiểm tra
          </Typography>
          
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {statistics.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <MedicalCard sx={{
                  background: `linear-gradient(135deg, ${
                    stat.color === 'primary' ? MEDICAL_COLORS.primary.main : 
                    stat.color === 'success' ? MEDICAL_COLORS.success.main :
                    stat.color === 'info' ? MEDICAL_COLORS.info.main :
                    MEDICAL_COLORS.warning.main
                  } 0%, ${
                    stat.color === 'primary' ? MEDICAL_COLORS.primary.light : 
                    stat.color === 'success' ? MEDICAL_COLORS.success.light :
                    stat.color === 'info' ? MEDICAL_COLORS.info.light :
                    MEDICAL_COLORS.warning.light
                  } 100%)`,
                  color: 'white'
                }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <TrendingUp sx={{ mr: 2, fontSize: '2rem' }} />
                      <Box>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: 'white' }}>
                          {stat.value}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>
                          {stat.label}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </MedicalCard>
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <MedicalCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ 
                    color: MEDICAL_COLORS.primary.main, 
                    fontWeight: 600
                  }}>
                    <Notifications sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Học sinh cần tư vấn đặc biệt
                  </Typography>
                  <List>
                    <ListItem sx={{
                      borderBottom: `1px solid ${MEDICAL_COLORS.info.light}`,
                      '&:hover': {
                        backgroundColor: MEDICAL_COLORS.info.light + '20'
                      }
                    }}>
                      <ListItemText
                        primary={<Typography sx={{ fontWeight: 600, color: MEDICAL_COLORS.primary.main }}>Trần Thị B</Typography>}
                        secondary={<Typography sx={{ color: MEDICAL_COLORS.text.secondary }}>Lớp 6A2 - Thị lực giảm, có sâu răng</Typography>}
                      />
                      <ListItemSecondaryAction>
                        <MedicalButton size="small" variant="outlined">
                          Lập lịch
                        </MedicalButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </CardContent>
              </MedicalCard>
            </Grid>
            <Grid item xs={12} md={6}>
              <MedicalCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ 
                    color: MEDICAL_COLORS.primary.main, 
                    fontWeight: 600
                  }}>
                    <DateRange sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Lịch tư vấn sắp tới
                  </Typography>
                  <List>
                    <ListItem sx={{
                      borderBottom: `1px solid ${MEDICAL_COLORS.info.light}`,
                      '&:hover': {
                        backgroundColor: MEDICAL_COLORS.info.light + '20'
                      }
                    }}>
                      <ListItemText
                        primary={<Typography sx={{ fontWeight: 600, color: MEDICAL_COLORS.primary.main }}>Tư vấn thị lực</Typography>}
                        secondary={<Typography sx={{ color: MEDICAL_COLORS.text.secondary }}>15/03/2024 - 3 học sinh</Typography>}
                      />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" sx={{ color: MEDICAL_COLORS.primary.main }}>
                          <DateRange />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </CardContent>
              </MedicalCard>
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>      {/* Dialog tạo đợt kiểm tra mới */}
      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
          }
        }}
      >
        <DialogTitle sx={{ 
          backgroundColor: MEDICAL_COLORS.primary.main, 
          color: 'white',
          fontWeight: 600
        }}>
          <Add sx={{ mr: 1, verticalAlign: 'middle' }} />
          Tạo đợt kiểm tra y tế mới
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Tên đợt kiểm tra"
              sx={{ 
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: MEDICAL_COLORS.primary.main
                  }
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: MEDICAL_COLORS.primary.main
                }
              }}
            />
            <FormControl fullWidth sx={{ 
              mb: 2,
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: MEDICAL_COLORS.primary.main
                }
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: MEDICAL_COLORS.primary.main
              }
            }}>
              <InputLabel>Loại kiểm tra</InputLabel>
              <Select label="Loại kiểm tra">
                <MenuItem value="general">Tổng quát</MenuItem>
                <MenuItem value="specialized">Chuyên khoa</MenuItem>
                <MenuItem value="periodic">Định kỳ</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Ngày bắt đầu"
              type="date"
              InputLabelProps={{ shrink: true }}
              sx={{ 
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: MEDICAL_COLORS.primary.main
                  }
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: MEDICAL_COLORS.primary.main
                }
              }}
            />
            <TextField
              fullWidth
              label="Ngày kết thúc"
              type="date"
              InputLabelProps={{ shrink: true }}
              sx={{ 
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: MEDICAL_COLORS.primary.main
                  }
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: MEDICAL_COLORS.primary.main
                }
              }}
            />
            <TextField
              fullWidth
              label="Nội dung kiểm tra"
              placeholder="VD: Chiều cao, cân nặng, thị lực..."
              sx={{ 
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: MEDICAL_COLORS.primary.main
                  }
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: MEDICAL_COLORS.primary.main
                }
              }}
            />
            <TextField
              fullWidth
              label="Ghi chú"
              multiline
              rows={3}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: MEDICAL_COLORS.primary.main
                  }
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: MEDICAL_COLORS.primary.main
                }
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, backgroundColor: MEDICAL_COLORS.info.light + '20' }}>
          <MedicalButton variant="outlined" onClick={() => setOpenDialog(false)}>
            Hủy
          </MedicalButton>
          <MedicalButton variant="contained" onClick={() => setOpenDialog(false)}>
            Tạo đợt kiểm tra
          </MedicalButton>
        </DialogActions>
      </Dialog>      {/* Dialog nhập kết quả */}
      <Dialog 
        open={openResultDialog} 
        onClose={() => setOpenResultDialog(false)} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
          }
        }}
      >
        <DialogTitle sx={{ 
          backgroundColor: MEDICAL_COLORS.success.main, 
          color: 'white',
          fontWeight: 600
        }}>
          <Person sx={{ mr: 1, verticalAlign: 'middle' }} />
          Nhập kết quả kiểm tra
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Tên học sinh"
              sx={{ 
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: MEDICAL_COLORS.success.main
                  }
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: MEDICAL_COLORS.success.main
                }
              }}
            />
            <TextField
              fullWidth
              label="Lớp"
              sx={{ 
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: MEDICAL_COLORS.success.main
                  }
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: MEDICAL_COLORS.success.main
                }
              }}
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Chiều cao (cm)"
                  sx={{ 
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': {
                        borderColor: MEDICAL_COLORS.success.main
                      }
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: MEDICAL_COLORS.success.main
                    }
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Cân nặng (kg)"
                  sx={{ 
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': {
                        borderColor: MEDICAL_COLORS.success.main
                      }
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: MEDICAL_COLORS.success.main
                    }
                  }}
                />
              </Grid>
            </Grid>
            <TextField
              fullWidth
              label="Thị lực"
              sx={{ 
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: MEDICAL_COLORS.success.main
                  }
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: MEDICAL_COLORS.success.main
                }
              }}
            />
            <TextField
              fullWidth
              label="Thính lực"
              sx={{ 
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: MEDICAL_COLORS.success.main
                  }
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: MEDICAL_COLORS.success.main
                }
              }}
            />
            <TextField
              fullWidth
              label="Nhịp tim (bpm)"
              sx={{ 
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: MEDICAL_COLORS.success.main
                  }
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: MEDICAL_COLORS.success.main
                }
              }}
            />
            <TextField
              fullWidth
              label="Ghi chú khác"
              multiline
              rows={3}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: MEDICAL_COLORS.success.main
                  }
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: MEDICAL_COLORS.success.main
                }
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, backgroundColor: MEDICAL_COLORS.success.light + '20' }}>
          <MedicalButton variant="outlined" onClick={() => setOpenResultDialog(false)}>
            Hủy
          </MedicalButton>
          <MedicalButton variant="contained" onClick={() => setOpenResultDialog(false)}>
            Lưu kết quả
          </MedicalButton>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default HealthCheck;
