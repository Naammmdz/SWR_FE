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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import {
  Add,
  People,
  Edit,
  Delete,
  Visibility,
  AdminPanelSettings,
  LocalHospital,
  FamilyRestroom,
  School,
  PersonAdd,
  ManageAccounts,
} from '@mui/icons-material';
import { MedicalButton, MedicalCard } from '../components/shared/MedicalComponents';
import { MEDICAL_COLORS } from '../constants/medicalTheme';

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
      id={`users-tabpanel-${index}`}
      aria-labelledby={`users-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const UserManagement: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Mock data
  const users = [
    {
      id: 1,
      name: 'Nguyễn Văn Admin',
      email: 'admin@school.edu.vn',
      role: 'admin',
      phone: '0123456789',
      status: 'active',
      lastLogin: '2024-03-10 09:00',
      createdAt: '2024-01-01'
    },
    {
      id: 2,
      name: 'Trần Thị Y tế',
      email: 'medical@school.edu.vn',
      role: 'medical_staff',
      phone: '0987654321',
      status: 'active',
      lastLogin: '2024-03-10 08:30',
      createdAt: '2024-01-15'
    },
    {
      id: 3,
      name: 'Lê Văn Phụ huynh',
      email: 'parent@gmail.com',
      role: 'parent',
      phone: '0365789123',
      status: 'active',
      lastLogin: '2024-03-09 20:00',
      createdAt: '2024-02-01'
    },
    {
      id: 4,
      name: 'Phạm Thị Giáo viên',
      email: 'teacher@school.edu.vn',
      role: 'teacher',
      phone: '0789123456',
      status: 'active',
      lastLogin: '2024-03-08 15:30',
      createdAt: '2024-01-20'
    },
  ];

  const students = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      class: '6A1',
      studentId: 'HS001',
      dateOfBirth: '2012-05-15',
      parentName: 'Lê Văn Phụ huynh',
      parentPhone: '0365789123',
      parentEmail: 'parent@gmail.com',
      address: '123 Đường ABC, Quận 1, TP.HCM',
      healthHistory: [
        { date: '2024-01-15', event: 'Kiểm tra định kỳ', result: 'Bình thường' },
        { date: '2024-02-10', event: 'Tiêm vaccine Viêm gan B', result: 'Hoàn thành' }
      ]
    },
    {
      id: 2,
      name: 'Trần Thị B',
      class: '6A2',
      studentId: 'HS002',
      dateOfBirth: '2012-08-20',
      parentName: 'Nguyễn Thị Phụ huynh',
      parentPhone: '0123987654',
      parentEmail: 'parent2@gmail.com',
      address: '456 Đường XYZ, Quận 2, TP.HCM',
      healthHistory: [
        { date: '2024-01-15', event: 'Kiểm tra định kỳ', result: 'Thị lực yếu' },
        { date: '2024-03-05', event: 'Tư vấn thị lực', result: 'Đang theo dõi' }
      ]
    },
  ];

  const userStats = [
    { label: 'Tổng người dùng', value: users.length, color: 'primary', icon: <People /> },
    { label: 'Quản trị viên', value: users.filter(u => u.role === 'admin').length, color: 'error', icon: <AdminPanelSettings /> },
    { label: 'Nhân viên Y tế', value: users.filter(u => u.role === 'medical_staff').length, color: 'success', icon: <LocalHospital /> },
    { label: 'Phụ huynh', value: users.filter(u => u.role === 'parent').length, color: 'info', icon: <FamilyRestroom /> },
  ];

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Quản trị viên';
      case 'medical_staff': return 'Nhân viên Y tế';
      case 'parent': return 'Phụ huynh';
      case 'teacher': return 'Giáo viên';
      default: return role;
    }
  };

  const getRoleColor = (role: string): "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" => {
    switch (role) {
      case 'admin': return 'error';
      case 'medical_staff': return 'success';
      case 'parent': return 'info';
      case 'teacher': return 'warning';
      default: return 'default';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <AdminPanelSettings />;
      case 'medical_staff': return <LocalHospital />;
      case 'parent': return <FamilyRestroom />;
      case 'teacher': return <School />;
      default: return <People />;
    }
  };
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
          <ManageAccounts sx={{ mr: 2, verticalAlign: 'middle', fontSize: '2rem' }} />
          Quản lý Người dùng
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center' }}>
          Quản lý tài khoản người dùng và hồ sơ học sinh
        </Typography>
      </Box>      {/* Statistics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {userStats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <MedicalCard>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar
                    sx={{
                      bgcolor: `${stat.color}.main`,
                      mr: 2,
                      width: 56,
                      height: 56
                    }}
                  >
                    {stat.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="h4" color={`${stat.color}.main`}>
                      {stat.value}
                    </Typography>                    <Typography variant="body2" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </MedicalCard>
          </Grid>
        ))}
      </Grid>      <Paper sx={{ width: '100%', mb: 2 }}>
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
            <Tab label="Tài khoản người dùng" />
            <Tab label="Hồ sơ học sinh" />
            <Tab label="Lịch sử hoạt động" />
          </Tabs>
        </Box>        <TabPanel value={tabValue} index={0}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ color: MEDICAL_COLORS.primary.main, fontWeight: 600 }}>
              <People sx={{ mr: 1, verticalAlign: 'middle' }} />
              Danh sách tài khoản
            </Typography>
            <MedicalButton
              variant="contained"
              startIcon={<PersonAdd />}
              onClick={() => setOpenDialog(true)}
            >
              Thêm người dùng
            </MedicalButton>
          </Box>          <TableContainer component={Paper} sx={{ 
            '& .MuiTableHead-root': { 
              backgroundColor: MEDICAL_COLORS.info.light 
            },
            '& .MuiTableCell-head': { 
              color: MEDICAL_COLORS.primary.main,
              fontWeight: 600 
            }
          }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Họ tên</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Vai trò</TableCell>
                  <TableCell>Số điện thoại</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell>Đăng nhập cuối</TableCell>
                  <TableCell>Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ mr: 2, bgcolor: getRoleColor(user.role) + '.main' }}>
                          {getRoleIcon(user.role)}
                        </Avatar>
                        {user.name}
                      </Box>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Chip
                        label={getRoleLabel(user.role)}
                        color={getRoleColor(user.role)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>
                      <Chip
                        label={user.status === 'active' ? 'Hoạt động' : 'Tạm khóa'}
                        color={user.status === 'active' ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => {
                          setEditingUser(user);
                          setOpenDialog(true);
                        }}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton size="small" color="error">
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>        <TabPanel value={tabValue} index={1}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ color: MEDICAL_COLORS.primary.main, fontWeight: 600 }}>
              <School sx={{ mr: 1, verticalAlign: 'middle' }} />
              Hồ sơ học sinh
            </Typography>
            <MedicalButton
              variant="contained"
              startIcon={<Add />}
            >
              Thêm học sinh
            </MedicalButton>
          </Box>          <Grid container spacing={3}>
            {students.map((student) => (
              <Grid item xs={12} md={6} key={student.id}>
                <MedicalCard>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box>
                        <Typography variant="h6" component="h3">
                          {student.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Mã HS: {student.studentId} | Lớp: {student.class}
                        </Typography>
                      </Box>
                      <Chip
                        label="Hoạt động"
                        color="success"
                        size="small"
                      />
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Ngày sinh: {student.dateOfBirth}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Phụ huynh: {student.parentName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      SĐT: {student.parentPhone}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Địa chỉ: {student.address}
                    </Typography>

                    <Box sx={{ mt: 2 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Lịch sử y tế gần đây:
                      </Typography>
                      {student.healthHistory.slice(0, 2).map((history, index) => (
                        <Typography key={index} variant="caption" display="block" color="text.secondary">
                          • {history.date}: {history.event} - {history.result}
                        </Typography>
                      ))}
                    </Box>                    <Box sx={{ mt: 2 }}>
                      <MedicalButton
                        size="small"
                        startIcon={<Visibility />}
                      >
                        Xem chi tiết
                      </MedicalButton>
                      <MedicalButton
                        size="small"
                        startIcon={<Edit />}
                        sx={{ ml: 1 }}
                        variant="outlined"
                      >
                        Chỉnh sửa
                      </MedicalButton>                    </Box>
                  </CardContent>
                </MedicalCard>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" gutterBottom>
            Lịch sử hoạt động hệ thống
          </Typography>
          
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <AdminPanelSettings />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Nguyễn Văn Admin đăng nhập hệ thống"
                secondary="10/03/2024 09:00"
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: 'success.main' }}>
                  <LocalHospital />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Trần Thị Y tế cập nhật hồ sơ sức khỏe học sinh"
                secondary="10/03/2024 08:30"
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: 'info.main' }}>
                  <FamilyRestroom />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Lê Văn Phụ huynh xem báo cáo sức khỏe con"
                secondary="09/03/2024 20:00"
              />
            </ListItem>
          </List>
        </TabPanel>
      </Paper>

      {/* Dialog thêm/sửa người dùng */}
      <Dialog open={openDialog} onClose={() => { setOpenDialog(false); setEditingUser(null); }} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingUser ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Họ và tên"
              defaultValue={editingUser?.name || ''}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              defaultValue={editingUser?.email || ''}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Vai trò</InputLabel>
              <Select 
                label="Vai trò"
                defaultValue={editingUser?.role || ''}
              >
                <MenuItem value="admin">Quản trị viên</MenuItem>
                <MenuItem value="medical_staff">Nhân viên Y tế</MenuItem>
                <MenuItem value="parent">Phụ huynh</MenuItem>
                <MenuItem value="teacher">Giáo viên</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Số điện thoại"
              defaultValue={editingUser?.phone || ''}
              sx={{ mb: 2 }}
            />
            {!editingUser && (
              <TextField
                fullWidth
                label="Mật khẩu"
                type="password"
                sx={{ mb: 2 }}
              />
            )}
            <FormControl fullWidth>
              <InputLabel>Trạng thái</InputLabel>
              <Select 
                label="Trạng thái"
                defaultValue={editingUser?.status || 'active'}
              >
                <MenuItem value="active">Hoạt động</MenuItem>
                <MenuItem value="inactive">Tạm khóa</MenuItem>
              </Select>
            </FormControl>
          </Box>        </DialogContent>
        <DialogActions>
          <MedicalButton onClick={() => { setOpenDialog(false); setEditingUser(null); }}>
            Hủy
          </MedicalButton>
          <MedicalButton variant="contained" onClick={() => { setOpenDialog(false); setEditingUser(null); }}>
            {editingUser ? 'Cập nhật' : 'Thêm'}
          </MedicalButton>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserManagement;
