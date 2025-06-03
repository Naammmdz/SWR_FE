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
  Stepper,
  Step,
  StepLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ThemeProvider,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Visibility,
  LocalHospital,
  Assignment,
  CheckCircle,
  Schedule,
  Warning,
  ExpandMore,
  Person,
  AccessTime,
  HealthAndSafety,
  EventNote,
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
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const HealthEvents: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const { user, hasPermission } = useAuth();

  // Sample data
  const allHealthEvents = [
    {
      id: 1,
      studentName: 'Nguyễn Văn A',
      class: '6A1',
      parentId: '3', // ID của phụ huynh
      eventType: 'accident',
      title: 'Té ngã sân trường',
      description: 'Học sinh bị té ngã khi chạy trong giờ ra chơi, đau ở đầu gối',
      severity: 'medium',
      status: 'completed',
      reportedBy: 'Cô Lan (Giáo viên)',
      reportedTime: '09:30 - 30/05/2025',
      treatedBy: 'Y tá Mai',
      treatment: 'Rửa vết thương, băng gạc, thuốc giảm đau',
      parentNotified: true,
      followUp: 'Theo dõi 2 ngày',
    },
    {
      id: 2,
      studentName: 'Trần Thị B',
      class: '7B2',
      parentId: '5', // ID phụ huynh khác
      eventType: 'fever',
      title: 'Sốt cao 38.5°C',
      description: 'Học sinh phản ánh đau đầu, mệt mỏi, đo nhiệt độ 38.5°C',
      severity: 'high',
      status: 'in_progress',
      reportedBy: 'Học sinh tự báo',
      reportedTime: '14:15 - 30/05/2025',
      treatedBy: 'Y tá Hòa',
      treatment: 'Cho về nhà nghỉ, uống thuốc hạ sốt',
      parentNotified: true,
      followUp: 'Chờ phụ huynh đón',
    },
    {
      id: 3,
      studentName: 'Lê Văn C',
      class: '6A1',
      parentId: '3', // Cùng phụ huynh với Nguyễn Văn A
      eventType: 'stomach_ache',
      title: 'Đau bụng',
      description: 'Học sinh đau bụng sau khi ăn trưa',
      severity: 'low',
      status: 'pending',
      reportedBy: 'Bạn học',
      reportedTime: '15:45 - 30/05/2025',
      treatedBy: '',
      treatment: '',
      parentNotified: false,
      followUp: '',
    },
  ];

  // Lọc sự kiện y tế dựa trên quyền hạn
  const getFilteredHealthEvents = () => {
    if (!user) return [];
    
    if (hasPermission(Permission.HANDLE_MEDICAL_EVENTS)) {
      // Admin và medical_staff xem được tất cả sự kiện
      return allHealthEvents;
    } else if (user.role === 'parent') {
      // Phụ huynh chỉ xem được sự kiện của con mình
      return allHealthEvents.filter(event => event.parentId === user.id);
    } else {
      // Giáo viên có thể xem sự kiện để báo cáo
      return allHealthEvents;
    }
  };

  const healthEvents = getFilteredHealthEvents();

  const treatmentSteps = [
    'Tiếp nhận báo cáo',
    'Đánh giá tình trạng',
    'Sơ cứu ban đầu',
    'Liên hệ phụ huynh',
    'Điều trị/Chuyển viện',
    'Theo dõi sau điều trị',
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'accident': return 'error';
      case 'fever': return 'warning';
      case 'stomach_ache': return 'info';
      case 'headache': return 'primary';
      default: return 'default';
    }
  };

  const getEventTypeText = (type: string) => {
    switch (type) {
      case 'accident': return 'Tai nạn';
      case 'fever': return 'Sốt';
      case 'stomach_ache': return 'Đau bụng';
      case 'headache': return 'Đau đầu';
      default: return type;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case 'high': return 'Nghiêm trọng';
      case 'medium': return 'Vừa phải';
      case 'low': return 'Nhẹ';
      default: return severity;
    }
  };

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
  };
  const NewEventForm = () => (
    <MedicalCard>
      <CardContent>        <Typography variant="h6" gutterBottom sx={{ color: MEDICAL_COLORS.primary.main, fontWeight: 600 }}>
          <HealthAndSafety sx={{ mr: 1, verticalAlign: 'middle' }} />
          Báo cáo sự kiện y tế mới
        </Typography><Alert severity="info" sx={{ 
          mb: 3,
          backgroundColor: MEDICAL_COLORS.info.light,
          '& .MuiAlert-icon': { color: MEDICAL_COLORS.primary.main }
        }}>
          Vui lòng cung cấp thông tin chi tiết về sự kiện để đảm bảo xử lý kịp thời và hiệu quả.
        </Alert>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Tên học sinh"
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Lớp"
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Loại sự kiện</InputLabel>
              <Select label="Loại sự kiện">
                <MenuItem value="accident">Tai nạn</MenuItem>
                <MenuItem value="fever">Sốt</MenuItem>
                <MenuItem value="stomach_ache">Đau bụng</MenuItem>
                <MenuItem value="headache">Đau đầu</MenuItem>
                <MenuItem value="allergy">Dị ứng</MenuItem>
                <MenuItem value="injury">Chấn thương</MenuItem>
                <MenuItem value="other">Khác</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Mức độ nghiêm trọng</InputLabel>
              <Select label="Mức độ nghiêm trọng">
                <MenuItem value="low">Nhẹ</MenuItem>
                <MenuItem value="medium">Vừa phải</MenuItem>
                <MenuItem value="high">Nghiêm trọng</MenuItem>
                <MenuItem value="critical">Cấp cứu</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Tiêu đề sự kiện"
              variant="outlined"
              margin="normal"
              placeholder="Mô tả ngắn gọn về sự kiện"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Mô tả chi tiết"
              variant="outlined"
              margin="normal"
              multiline
              rows={4}
              placeholder="Mô tả chi tiết về tình trạng, triệu chứng, hoàn cảnh xảy ra..."
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Người báo cáo"
              variant="outlined"
              margin="normal"
              placeholder="Tên giáo viên, học sinh, nhân viên..."
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Thời gian xảy ra"
              type="datetime-local"
              variant="outlined"
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Địa điểm xảy ra"
              variant="outlined"
              margin="normal"
              placeholder="Sân trường, lớp học, nhà vệ sinh..."
            />
          </Grid>        </Grid>        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <MedicalButton variant="contained" startIcon={<LocalHospital />}>
            Báo cáo sự kiện
          </MedicalButton>
          <MedicalButton variant="outlined">
            Hủy
          </MedicalButton>
        </Box>
      </CardContent>
    </MedicalCard>
  );
  const EventList = () => (
    <MedicalCard>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>          <Typography variant="h6" sx={{ color: MEDICAL_COLORS.primary.main, fontWeight: 600 }}>
            <EventNote sx={{ mr: 1, verticalAlign: 'middle' }} />
            Danh sách sự kiện y tế
          </Typography>
          <MedicalButton variant="contained" startIcon={<LocalHospital />}>
            Báo cáo mới
          </MedicalButton>
        </Box>

        {/* Filter Section */}
        <Box sx={{ mb: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Trạng thái</InputLabel>
                <Select label="Trạng thái">
                  <MenuItem value="">Tất cả</MenuItem>
                  <MenuItem value="pending">Chờ xử lý</MenuItem>
                  <MenuItem value="in_progress">Đang xử lý</MenuItem>
                  <MenuItem value="completed">Đã xử lý</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Loại sự kiện</InputLabel>
                <Select label="Loại sự kiện">
                  <MenuItem value="">Tất cả</MenuItem>
                  <MenuItem value="accident">Tai nạn</MenuItem>
                  <MenuItem value="fever">Sốt</MenuItem>
                  <MenuItem value="stomach_ache">Đau bụng</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Từ ngày"
                type="date"
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Đến ngày"
                type="date"
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </Box>        <TableContainer component={Paper} sx={{ 
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
                <TableCell>Thời gian</TableCell>
                <TableCell>Học sinh</TableCell>
                <TableCell>Lớp</TableCell>
                <TableCell>Sự kiện</TableCell>
                <TableCell>Mức độ</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Người xử lý</TableCell>
                <TableCell>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {healthEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>{event.reportedTime}</TableCell>
                  <TableCell>{event.studentName}</TableCell>
                  <TableCell>{event.class}</TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" fontWeight="bold">
                        {event.title}
                      </Typography>
                      <Chip
                        label={getEventTypeText(event.eventType)}
                        size="small"
                        color={getEventTypeColor(event.eventType) as any}
                      />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={getSeverityText(event.severity)}
                      size="small"
                      color={getSeverityColor(event.severity) as any}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={getStatusText(event.status)}
                      size="small"
                      color={getStatusColor(event.status) as any}
                    />
                  </TableCell>
                  <TableCell>{event.treatedBy || 'Chưa phân công'}</TableCell>                  <TableCell>                    <IconButton 
                      size="small" 
                      onClick={() => setSelectedEvent(event)}
                      sx={{ color: MEDICAL_COLORS.primary.main }}
                    >
                      <Visibility />
                    </IconButton>
                    <IconButton 
                      size="small"
                      sx={{ color: MEDICAL_COLORS.secondary.main }}
                    >
                      <Edit />
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
  const TreatmentProcess = () => (
    <MedicalCard>
      <CardContent>        <Typography variant="h6" gutterBottom sx={{ color: MEDICAL_COLORS.primary.main, fontWeight: 600 }}>
          <LocalHospital sx={{ mr: 1, verticalAlign: 'middle' }} />
          Quy trình xử lý sự kiện y tế
        </Typography>

        <Stepper activeStep={2} orientation="vertical">
          {treatmentSteps.map((step, index) => (
            <Step key={step}>
              <StepLabel>
                <Typography variant="body1">{step}</Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>        <Box sx={{ mt: 3 }}>          <Typography variant="h6" gutterBottom sx={{ color: MEDICAL_COLORS.primary.main, fontWeight: 600 }}>
            Hướng dẫn xử lý theo mức độ
          </Typography>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography color="success.main" fontWeight="bold">Nhẹ (Xanh)</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                • Sơ cứu tại chỗ<br/>
                • Ghi nhận vào sổ theo dõi<br/>
                • Thông báo giáo viên chủ nhiệm<br/>
                • Theo dõi trong ngày
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography color="warning.main" fontWeight="bold">Vừa phải (Vàng)</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                • Sơ cứu và điều trị ban đầu<br/>
                • Liên hệ phụ huynh ngay lập tức<br/>
                • Ghi nhận chi tiết vào hồ sơ<br/>
                • Theo dõi sát trong 24h
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography color="error.main" fontWeight="bold">Nghiêm trọng (Đỏ)</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                • Sơ cứu khẩn cấp<br/>
                • Gọi 115 nếu cần thiết<br/>
                • Thông báo phụ huynh và ban giám hiệu<br/>
                • Đưa đến cơ sở y tế gần nhất<br/>
                • Theo dõi liên tục
              </Typography>
            </AccordionDetails>
          </Accordion>        </Box>
      </CardContent>
    </MedicalCard>
  );  return (
    <Container maxWidth="lg" sx={{ 
      background: `linear-gradient(135deg, ${MEDICAL_COLORS.info.light} 0%, #ffffff 50%, ${MEDICAL_COLORS.success.light} 100%)`,
      minHeight: '100vh',
      py: 3
    }}>
      <Typography variant="h4" gutterBottom sx={{ 
        color: MEDICAL_COLORS.primary.main, 
        fontWeight: 700,
        textAlign: 'center',
        mb: 4
      }}>
        <LocalHospital sx={{ mr: 2, fontSize: '2rem', verticalAlign: 'middle' }} />
        Quản lý Sự kiện Y tế
      </Typography>        <Box sx={{ 
          borderBottom: 1, 
          borderColor: 'divider', 
          mb: 3,
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
            <Tab label="Báo cáo mới" icon={<LocalHospital />} />
            <Tab label="Danh sách sự kiện" icon={<Assignment />} />
            <Tab label="Quy trình xử lý" icon={<LocalHospital />} />
          </Tabs>
        </Box>

      <TabPanel value={tabValue} index={0}>
        <NewEventForm />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <EventList />
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <TreatmentProcess />
      </TabPanel>

      {/* Event Detail Dialog */}
      <Dialog open={!!selectedEvent} onClose={() => setSelectedEvent(null)} maxWidth="md" fullWidth>
        <DialogTitle>
          Chi tiết sự kiện y tế
        </DialogTitle>
        <DialogContent>
          {selectedEvent && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  {selectedEvent.title}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Chip
                    label={getEventTypeText(selectedEvent.eventType)}
                    color={getEventTypeColor(selectedEvent.eventType) as any}
                    size="small"
                  />
                  <Chip
                    label={getSeverityText(selectedEvent.severity)}
                    color={getSeverityColor(selectedEvent.severity) as any}
                    size="small"
                  />
                  <Chip
                    label={getStatusText(selectedEvent.status)}
                    color={getStatusColor(selectedEvent.status) as any}
                    size="small"
                  />
                </Box>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" gutterBottom>Thông tin học sinh</Typography>
                <Typography variant="body2">Tên: {selectedEvent.studentName}</Typography>
                <Typography variant="body2">Lớp: {selectedEvent.class}</Typography>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" gutterBottom>Thông tin sự kiện</Typography>
                <Typography variant="body2">Thời gian: {selectedEvent.reportedTime}</Typography>
                <Typography variant="body2">Người báo cáo: {selectedEvent.reportedBy}</Typography>
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>Mô tả chi tiết</Typography>
                <Typography variant="body2">{selectedEvent.description}</Typography>
              </Grid>
              
              {selectedEvent.treatment && (
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>Điều trị</Typography>
                  <Typography variant="body2">Người điều trị: {selectedEvent.treatedBy}</Typography>
                  <Typography variant="body2">Phương pháp: {selectedEvent.treatment}</Typography>
                </Grid>
              )}
            </Grid>
          )}        </DialogContent>
        <DialogActions>
          <MedicalButton onClick={() => setSelectedEvent(null)}>Đóng</MedicalButton>
          <MedicalButton variant="contained">Cập nhật</MedicalButton>
        </DialogActions>        </Dialog>
      </Container>
  );
};

export default HealthEvents;
