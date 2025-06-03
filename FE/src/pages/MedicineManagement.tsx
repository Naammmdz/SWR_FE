import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  CardContent,
  TextField,
  Box,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Badge,
  LinearProgress,
  ThemeProvider,
} from '@mui/material';
import { MedicalButton, MedicalCard, medicalTheme } from '../components/shared/MedicalComponents';
import { MEDICAL_COLORS } from '../constants/medicalTheme';
import { useAuth } from '../contexts/AuthContext';
import { Permission } from '../utils/permissions';
import {
  Add,
  Edit,
  Delete,
  Visibility,
  LocalHospital,
  Inventory,
  Warning,
  CheckCircle,
  Schedule,
} from '@mui/icons-material';

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
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const MedicineManagement: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState<any>(null);
  const { user, hasPermission } = useAuth();

  // Sample data
  const medicines = [
    {
      id: 1,
      name: 'Paracetamol 500mg',
      type: 'Giảm đau, hạ sốt',
      quantity: 50,
      unit: 'viên',
      expiryDate: '15/12/2025',
      supplier: 'Dược phẩm ABC',
      location: 'Tủ thuốc A - Ngăn 1',
      status: 'available',
    },
    {
      id: 2,
      name: 'Betadine 10%',
      type: 'Sát khuẩn',
      quantity: 5,
      unit: 'chai',
      expiryDate: '20/08/2025',
      supplier: 'Dược phẩm XYZ',
      location: 'Tủ thuốc B - Ngăn 2',
      status: 'low_stock',
    },
    {
      id: 3,
      name: 'Aspirin 100mg',
      type: 'Giảm đau',
      quantity: 0,
      unit: 'viên',
      expiryDate: '10/03/2025',
      supplier: 'Dược phẩm DEF',
      location: 'Tủ thuốc A - Ngăn 3',
      status: 'expired',
    },  ];

  const allStudentMedicines = [
    {
      id: 1,
      studentName: 'Nguyễn Văn A',
      class: '6A1',
      parentId: '3', // ID của phụ huynh
      medicineName: 'Ventolin',
      dosage: '2 puff/lần',
      frequency: '3 lần/ngày',
      duration: '7 ngày',
      parentNote: 'Dùng khi khó thở',
      submittedDate: '25/05/2025',
      status: 'approved',
    },
    {
      id: 2,
      studentName: 'Trần Thị B',
      class: '7B2',
      parentId: '5', // ID phụ huynh khác
      medicineName: 'Insulin',
      dosage: '10 units',
      frequency: '2 lần/ngày',
      duration: 'Dài hạn',
      parentNote: 'Trước bữa ăn sáng và tối',
      submittedDate: '28/05/2025',
      status: 'pending',
    },
    {
      id: 3,
      studentName: 'Lê Văn C',
      class: '6A1',
      parentId: '3', // Cùng phụ huynh với Nguyễn Văn A
      medicineName: 'Cetirizine',
      dosage: '5mg',
      frequency: '1 lần/ngày',
      duration: '14 ngày',
      parentNote: 'Uống khi dị ứng',
      submittedDate: '30/05/2025',
      status: 'approved',
    },
  ];

  // Lọc yêu cầu thuốc dựa trên quyền hạn
  const getFilteredMedicineRequests = () => {
    if (!user) return [];
    
    if (hasPermission(Permission.APPROVE_MEDICINES)) {
      // Admin và medical_staff xem được tất cả yêu cầu
      return allStudentMedicines;
    } else if (hasPermission(Permission.SUBMIT_MEDICINE_REQUEST)) {
      // Phụ huynh chỉ xem được yêu cầu của con mình
      return allStudentMedicines.filter(request => request.parentId === user.id);
    } else {
      // Các role khác không có quyền xem
      return [];
    }
  };

  const studentMedicines = getFilteredMedicineRequests();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'success';
      case 'low_stock': return 'warning';
      case 'expired': return 'error';
      case 'approved': return 'success';
      case 'pending': return 'warning';
      case 'rejected': return 'error';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Còn hàng';
      case 'low_stock': return 'Sắp hết';
      case 'expired': return 'Hết hạn';
      case 'approved': return 'Đã duyệt';
      case 'pending': return 'Chờ duyệt';
      case 'rejected': return 'Từ chối';
      default: return status;
    }
  };
  const MedicineInventory = () => (
    <MedicalCard>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography 
            variant="h6"
            sx={{ 
              color: MEDICAL_COLORS.primary.main,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <Inventory sx={{ color: MEDICAL_COLORS.secondary.main }} />
            Kho thuốc và vật tư y tế
          </Typography>
          <MedicalButton startIcon={<Add />}>
            Thêm thuốc mới
          </MedicalButton>
        </Box>

        {/* Quick Stats */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={3}>
            <MedicalCard sx={{ 
              background: `linear-gradient(135deg, ${MEDICAL_COLORS.success.main}, ${MEDICAL_COLORS.success.dark})`,
              color: 'white' 
            }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <CheckCircle sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h6">Còn hàng</Typography>
                <Typography variant="h4">125</Typography>
              </CardContent>
            </MedicalCard>
          </Grid>
          <Grid item xs={12} md={3}>
            <MedicalCard sx={{ 
              background: `linear-gradient(135deg, ${MEDICAL_COLORS.warning.main}, ${MEDICAL_COLORS.warning.dark})`,
              color: 'white' 
            }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Warning sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h6">Sắp hết</Typography>
                <Typography variant="h4">8</Typography>
              </CardContent>
            </MedicalCard>
          </Grid>
          <Grid item xs={12} md={3}>
            <MedicalCard sx={{ 
              background: `linear-gradient(135deg, ${MEDICAL_COLORS.error.main}, ${MEDICAL_COLORS.error.dark})`,
              color: 'white' 
            }}>              <CardContent sx={{ textAlign: 'center' }}>
                <Schedule sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h6">Hết hạn</Typography>
                <Typography variant="h4">3</Typography>
              </CardContent>
            </MedicalCard>
          </Grid><Grid item xs={12} md={3}>
            <MedicalCard sx={{ 
              background: `linear-gradient(135deg, ${MEDICAL_COLORS.info.main}, ${MEDICAL_COLORS.info.dark})`,
              color: 'white' 
            }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Inventory sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h6">Tổng cộng</Typography>
                <Typography variant="h4">136</Typography>
              </CardContent>
            </MedicalCard>
          </Grid>
        </Grid>        <TableContainer component={Paper} sx={{ 
          borderRadius: 3,
          boxShadow: '0 4px 20px rgba(44, 82, 130, 0.1)',
          overflow: 'hidden'
        }}>
          <Table>
            <TableHead>
              <TableRow sx={{ 
                backgroundColor: MEDICAL_COLORS.primary.main,
                '& .MuiTableCell-head': {
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '1rem'
                }
              }}>
                <TableCell>Tên thuốc</TableCell>
                <TableCell>Loại</TableCell>
                <TableCell>Số lượng</TableCell>
                <TableCell>Hạn sử dụng</TableCell>
                <TableCell>Vị trí</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {medicines.map((medicine) => (
                <TableRow 
                  key={medicine.id}
                  sx={{
                    '&:nth-of-type(odd)': {
                      backgroundColor: MEDICAL_COLORS.background.default,
                    },
                    '&:hover': {
                      backgroundColor: `${MEDICAL_COLORS.primary.light}20`,
                    }
                  }}
                >
                  <TableCell>{medicine.name}</TableCell>
                  <TableCell>{medicine.type}</TableCell>
                  <TableCell>
                    {medicine.quantity} {medicine.unit}
                    {medicine.status === 'low_stock' && (
                      <LinearProgress
                        variant="determinate"
                        value={20}
                        color="warning"
                        sx={{ mt: 1 }}
                      />
                    )}
                  </TableCell>
                  <TableCell>{medicine.expiryDate}</TableCell>
                  <TableCell>{medicine.location}</TableCell>
                  <TableCell>
                    <Chip
                      label={getStatusText(medicine.status)}
                      color={getStatusColor(medicine.status) as any}
                      size="small"
                    />
                  </TableCell>                  <TableCell>
                    <IconButton 
                      size="small"
                      sx={{ 
                        color: MEDICAL_COLORS.secondary.main,
                        '&:hover': { 
                          backgroundColor: `${MEDICAL_COLORS.secondary.main}20`,
                          transform: 'scale(1.1)'
                        }
                      }}
                    >
                      <Visibility />
                    </IconButton>
                    <IconButton 
                      size="small"
                      sx={{ 
                        color: MEDICAL_COLORS.primary.main,
                        '&:hover': { 
                          backgroundColor: `${MEDICAL_COLORS.primary.main}20`,
                          transform: 'scale(1.1)'
                        }
                      }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton 
                      size="small"
                      sx={{ 
                        color: MEDICAL_COLORS.error.main,
                        '&:hover': { 
                          backgroundColor: `${MEDICAL_COLORS.error.main}20`,
                          transform: 'scale(1.1)'
                        }
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </MedicalCard>
  );
  const StudentMedicineRequests = () => (
    <MedicalCard>
      <CardContent>
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
          <LocalHospital sx={{ color: MEDICAL_COLORS.secondary.main }} />
          Yêu cầu thuốc từ phụ huynh
        </Typography>

        <Alert severity="info" sx={{ mb: 2 }}>
          Phụ huynh có thể gửi thuốc cho học sinh kèm theo hướng dẫn sử dụng. 
          Nhân viên y tế sẽ kiểm tra và phê duyệt trước khi cho học sinh sử dụng.
        </Alert>        <TableContainer component={Paper} sx={{ 
          borderRadius: 3,
          boxShadow: '0 4px 20px rgba(44, 82, 130, 0.1)',
          overflow: 'hidden'
        }}>
          <Table>
            <TableHead>
              <TableRow sx={{ 
                backgroundColor: MEDICAL_COLORS.primary.main,
                '& .MuiTableCell-head': {
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '1rem'
                }
              }}>
                <TableCell>Học sinh</TableCell>
                <TableCell>Lớp</TableCell>
                <TableCell>Thuốc</TableCell>
                <TableCell>Liều dùng</TableCell>
                <TableCell>Tần suất</TableCell>
                <TableCell>Ghi chú phụ huynh</TableCell>
                <TableCell>Ngày gửi</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {studentMedicines.map((request) => (
                <TableRow 
                  key={request.id}
                  sx={{
                    '&:nth-of-type(odd)': {
                      backgroundColor: MEDICAL_COLORS.background.default,
                    },
                    '&:hover': {
                      backgroundColor: `${MEDICAL_COLORS.primary.light}20`,
                    }
                  }}
                >
                  <TableCell>{request.studentName}</TableCell>
                  <TableCell>{request.class}</TableCell>
                  <TableCell>{request.medicineName}</TableCell>
                  <TableCell>{request.dosage}</TableCell>
                  <TableCell>{request.frequency}</TableCell>
                  <TableCell>{request.parentNote}</TableCell>
                  <TableCell>{request.submittedDate}</TableCell>
                  <TableCell>
                    <Chip
                      label={getStatusText(request.status)}
                      color={getStatusColor(request.status) as any}
                      size="small"
                    />
                  </TableCell>                  <TableCell>
                    {request.status === 'pending' && (
                      <>
                        <MedicalButton 
                          size="small" 
                          sx={{ 
                            mr: 1,
                            background: `linear-gradient(135deg, ${MEDICAL_COLORS.success.main}, ${MEDICAL_COLORS.success.dark})`,
                            minWidth: 'auto',
                            px: 2
                          }}
                        >
                          Duyệt
                        </MedicalButton>
                        <MedicalButton 
                          size="small"
                          sx={{
                            background: `linear-gradient(135deg, ${MEDICAL_COLORS.error.main}, ${MEDICAL_COLORS.error.dark})`,
                            minWidth: 'auto',
                            px: 2
                          }}
                        >
                          Từ chối
                        </MedicalButton>
                      </>
                    )}
                    {request.status === 'approved' && (
                      <MedicalButton 
                        size="small" 
                        variant="outlined"
                        sx={{
                          color: MEDICAL_COLORS.primary.main,
                          borderColor: MEDICAL_COLORS.primary.main,
                          background: 'transparent',
                          '&:hover': {
                            backgroundColor: MEDICAL_COLORS.primary.main,
                            color: 'white',
                          }
                        }}
                      >
                        Xem lịch sử
                      </MedicalButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>        </TableContainer>
      </CardContent>
    </MedicalCard>
  );

  const AddMedicineForm = () => (
    <MedicalCard>
      <CardContent>
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
          <Add sx={{ color: MEDICAL_COLORS.secondary.main }} />
          Thêm thuốc/vật tư y tế mới
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Tên thuốc/vật tư"
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Loại</InputLabel>
              <Select label="Loại">
                <MenuItem value="pain_relief">Giảm đau</MenuItem>
                <MenuItem value="fever_reducer">Hạ sốt</MenuItem>
                <MenuItem value="antiseptic">Sát khuẩn</MenuItem>
                <MenuItem value="bandage">Băng gạc</MenuItem>
                <MenuItem value="other">Khác</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Số lượng"
              type="number"
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Đơn vị"
              variant="outlined"
              margin="normal"
              placeholder="viên, chai, hộp..."
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Hạn sử dụng"
              type="date"
              variant="outlined"
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Nhà cung cấp"
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Vị trí lưu trữ"
              variant="outlined"
              margin="normal"
              placeholder="Tủ thuốc A - Ngăn 1"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Giá thành"
              type="number"
              variant="outlined"
              margin="normal"
              InputProps={{
                endAdornment: 'VNĐ'
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Ghi chú"
              variant="outlined"
              margin="normal"
              multiline
              rows={3}
            />
          </Grid>
        </Grid>        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <MedicalButton startIcon={<Add />}>
            Thêm vào kho
          </MedicalButton>
          <MedicalButton 
            variant="outlined"
            sx={{
              color: MEDICAL_COLORS.text.secondary,
              borderColor: MEDICAL_COLORS.text.secondary,
              background: 'transparent',
              '&:hover': {
                backgroundColor: MEDICAL_COLORS.background.default,
                borderColor: MEDICAL_COLORS.primary.main,
              }
            }}
          >
            Hủy
          </MedicalButton>
        </Box>
      </CardContent>
    </MedicalCard>
  );
  return (
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
          Quản lý Thuốc và Vật tư Y tế
        </Typography>

        <Box sx={{ 
          borderBottom: 1, 
          borderColor: MEDICAL_COLORS.primary.light, 
          mb: 3,
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: '0 2px 10px rgba(44, 82, 130, 0.1)'
        }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            sx={{
              '& .MuiTab-root': {
                fontWeight: 600,
                fontSize: '1rem',
                color: MEDICAL_COLORS.text.secondary,
                '&.Mui-selected': {
                  color: MEDICAL_COLORS.primary.main,
                }
              },
              '& .MuiTabs-indicator': {
                backgroundColor: MEDICAL_COLORS.secondary.main,
                height: 3,
                borderRadius: 2
              }
            }}
          >
            <Tab label="Kho thuốc" icon={<Inventory />} />
            <Tab 
              label={
                <Badge badgeContent={1} color="error">
                  Yêu cầu từ phụ huynh
                </Badge>
              } 
              icon={<LocalHospital />} 
            />
            <Tab label="Thêm thuốc mới" icon={<Add />} />
          </Tabs>
        </Box>

      <TabPanel value={tabValue} index={0}>
        <MedicineInventory />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <StudentMedicineRequests />
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <AddMedicineForm />
      </TabPanel>      </Container>
    </ThemeProvider>
  );
};

export default MedicineManagement;
