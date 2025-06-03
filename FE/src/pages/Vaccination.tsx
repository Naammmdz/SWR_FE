import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Tabs,
  Tab,
  Card,
  CardContent,
  Button,
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
} from '@mui/material';
import {
  Add,
  Vaccines,
  Send,
  CheckCircle,
  Schedule,
  Person,
  Visibility,
} from '@mui/icons-material';
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
      id={`vaccination-tabpanel-${index}`}
      aria-labelledby={`vaccination-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Vaccination: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const [openStudentDialog, setOpenStudentDialog] = useState(false);
  const { user, hasPermission } = useAuth();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Mock data
  const vaccinationCampaigns = [
    {
      id: 1,
      name: 'Tiêm chủng Viêm gan B',
      vaccine: 'Viêm gan B',
      startDate: '2024-01-15',
      endDate: '2024-01-30',
      status: 'active',
      totalStudents: 150,
      completed: 85,
      notifications: 120,
    },
    {
      id: 2,
      name: 'Tiêm chủng HPV',
      vaccine: 'HPV',
      startDate: '2024-02-01',
      endDate: '2024-02-15',
      status: 'planned',
      totalStudents: 80,
      completed: 0,
      notifications: 0,
    },
  ];

  const vaccinationSteps = [
    'Gửi thông báo đồng ý tiêm chủng',
    'Chuẩn bị danh sách học sinh',
    'Tiêm chủng và ghi nhận kết quả',
    'Theo dõi sau tiêm'  ];

  const allStudents = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      class: '6A1',
      parentId: '3', // ID của phụ huynh
      parentConsent: true,
      vaccinated: true,
      vaccinationDate: '2024-01-20',
      afterEffects: 'Không',
      followUp: 'Bình thường'
    },
    {
      id: 2,
      name: 'Trần Thị B',
      class: '6A2',
      parentId: '5', // ID phụ huynh khác
      parentConsent: true,
      vaccinated: false,
      vaccinationDate: null,
      afterEffects: null,
      followUp: null
    },
    {
      id: 3,
      name: 'Lê Văn C',
      class: '6A1',
      parentId: '3', // Cùng phụ huynh với Nguyễn Văn A
      parentConsent: false,
      vaccinated: false,
      vaccinationDate: null,
      afterEffects: null,
      followUp: null
    },
  ];

  // Lọc học sinh tiêm chủng dựa trên quyền hạn
  const getFilteredStudents = () => {
    if (!user) return [];
    
    if (hasPermission(Permission.MANAGE_VACCINATIONS)) {
      // Admin và medical_staff xem được tất cả học sinh
      return allStudents;
    } else if (hasPermission(Permission.VIEW_VACCINATION_SCHEDULE)) {
      // Phụ huynh chỉ xem được lịch tiêm của con mình
      return allStudents.filter(student => student.parentId === user.id);
    } else {
      // Các role khác không có quyền xem
      return [];
    }
  };

  const students = getFilteredStudents();

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          <Vaccines sx={{ mr: 2, verticalAlign: 'middle' }} />
          Quản lý Tiêm chủng
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Quản lý quá trình tiêm chủng tại trường học
        </Typography>
      </Box>

      <Paper sx={{ width: '100%', mb: 2 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Chiến dịch tiêm chủng" />
            <Tab label="Quy trình tiêm chủng" />
            <Tab label="Danh sách học sinh" />
            <Tab label="Theo dõi sau tiêm" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">Các chiến dịch tiêm chủng</Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setOpenDialog(true)}
            >
              Tạo chiến dịch mới
            </Button>
          </Box>

          <Grid container spacing={3}>
            {vaccinationCampaigns.map((campaign) => (
              <Grid item xs={12} md={6} key={campaign.id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Typography variant="h6" component="h3">
                        {campaign.name}
                      </Typography>
                      <Chip
                        label={campaign.status === 'active' ? 'Đang thực hiện' : 'Đã lên kế hoạch'}
                        color={campaign.status === 'active' ? 'success' : 'info'}
                        size="small"
                      />
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Vaccine: {campaign.vaccine}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Thời gian: {campaign.startDate} - {campaign.endDate}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Tiến độ: {campaign.completed}/{campaign.totalStudents} học sinh
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Thông báo đã gửi: {campaign.notifications}
                    </Typography>

                    <Box sx={{ mt: 2 }}>
                      <Button
                        size="small"
                        startIcon={<Visibility />}
                        onClick={() => setSelectedCampaign(campaign)}
                      >
                        Chi tiết
                      </Button>
                      <Button
                        size="small"
                        startIcon={<Send />}
                        sx={{ ml: 1 }}
                      >
                        Gửi thông báo
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom>
            Quy trình tiêm chủng tại trường
          </Typography>
          
          <Stepper orientation="vertical">
            {vaccinationSteps.map((step, index) => (
              <Step key={step} active={true}>
                <StepLabel>
                  <Typography variant="h6">{step}</Typography>
                </StepLabel>
                <StepContent>
                  {index === 0 && (
                    <Typography>
                      Gửi phiếu thông báo đồng ý tiêm chủng cho phụ huynh để xác nhận
                    </Typography>
                  )}
                  {index === 1 && (
                    <Typography>
                      Chuẩn bị danh sách học sinh được phụ huynh đồng ý tiêm chủng
                    </Typography>
                  )}
                  {index === 2 && (
                    <Typography>
                      Thực hiện tiêm chủng và ghi nhận kết quả vào hệ thống
                    </Typography>
                  )}
                  {index === 3 && (
                    <Typography>
                      Theo dõi tình trạng sức khỏe của học sinh sau khi tiêm
                    </Typography>
                  )}
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">Danh sách học sinh tiêm chủng</Typography>
            <Button
              variant="contained"
              startIcon={<Person />}
              onClick={() => setOpenStudentDialog(true)}
            >
              Thêm học sinh
            </Button>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Họ tên</TableCell>
                  <TableCell>Lớp</TableCell>
                  <TableCell>Đồng ý PH</TableCell>
                  <TableCell>Đã tiêm</TableCell>
                  <TableCell>Ngày tiêm</TableCell>
                  <TableCell>Tác dụng phụ</TableCell>
                  <TableCell>Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.class}</TableCell>
                    <TableCell>
                      <Chip
                        label={student.parentConsent ? 'Đã đồng ý' : 'Chưa đồng ý'}
                        color={student.parentConsent ? 'success' : 'warning'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={student.vaccinated ? 'Đã tiêm' : 'Chưa tiêm'}
                        color={student.vaccinated ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{student.vaccinationDate || '-'}</TableCell>
                    <TableCell>{student.afterEffects || '-'}</TableCell>
                    <TableCell>
                      <Button size="small" variant="outlined">
                        Cập nhật
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Typography variant="h6" gutterBottom>
            Theo dõi sau tiêm chủng
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" color="success.main">
                    85
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Học sinh đã tiêm
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" color="warning.main">
                    3
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Có tác dụng phụ nhẹ
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" color="error.main">
                    0
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Có tác dụng phụ nặng
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Paper sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ p: 2 }}>
              Học sinh cần theo dõi đặc biệt
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Nguyễn Thị C"
                  secondary="Lớp 6A3 - Sốt nhẹ sau tiêm, cần theo dõi thêm 24h"
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end">
                    <Visibility />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Paper>
        </TabPanel>
      </Paper>

      {/* Dialog tạo chiến dịch mới */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Tạo chiến dịch tiêm chủng mới</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Tên chiến dịch"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Loại vaccine"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Ngày bắt đầu"
              type="date"
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Ngày kết thúc"
              type="date"
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Mô tả"
              multiline
              rows={3}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Hủy</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            Tạo chiến dịch
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Vaccination;
