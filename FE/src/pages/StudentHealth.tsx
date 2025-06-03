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
  FormControlLabel,
  Checkbox,
  Alert,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Visibility,
  PersonAdd,
  HealthAndSafety,
  Vaccines,
  FamilyRestroom,
} from '@mui/icons-material';
import { MedicalButton, MedicalCard } from '../components/shared/MedicalComponents';
import { MEDICAL_COLORS } from '../constants/medicalTheme';
import { useAuth } from '../contexts/AuthContext';
import { Permission } from '../utils/permissions';
import PermissionWrapper from '../components/PermissionWrapper';

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

const StudentHealth: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const { user, hasPermission } = useAuth();

  // Sample data - đây là dữ liệu mẫu, trong thực tế sẽ lấy từ API
  const allStudents = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      class: '6A1',
      dateOfBirth: '15/03/2012',
      parentId: '3', // ID của phụ huynh (khớp với user.id trong AuthContext)
      allergies: ['Đậu phộng', 'Sữa'],
      chronicDiseases: ['Hen suyễn'],
      medications: ['Ventolin'],
      vision: '9/10',
      hearing: 'Bình thường',
      lastCheckup: '15/01/2025',
    },
    {
      id: 2,
      name: 'Trần Thị B',
      class: '7B2',
      dateOfBirth: '22/07/2011',
      parentId: '5', // ID phụ huynh khác
      allergies: [],
      chronicDiseases: [],
      medications: [],
      vision: '10/10',
      hearing: 'Bình thường',
      lastCheckup: '20/01/2025',
    },
    {
      id: 3,
      name: 'Lê Văn C',
      class: '6A1',
      dateOfBirth: '10/12/2012',
      parentId: '3', // Cùng phụ huynh với Nguyễn Văn A (anh em)
      allergies: ['Tôm cua'],
      chronicDiseases: [],
      medications: [],
      vision: '8/10',
      hearing: 'Bình thường',
      lastCheckup: '18/01/2025',
    },
  ];

  // Lọc học sinh dựa trên quyền hạn
  const getFilteredStudents = () => {
    if (!user) return [];
    
    if (hasPermission(Permission.MANAGE_HEALTH_RECORDS)) {
      // Admin và medical_staff xem được tất cả học sinh
      return allStudents;
    } else if (hasPermission(Permission.VIEW_OWN_CHILD_HEALTH)) {
      // Phụ huynh chỉ xem được con mình
      return allStudents.filter(student => student.parentId === user.id);
    } else {
      // Các role khác không có quyền xem
      return [];
    }
  };

  const students = getFilteredStudents();

  // Kiểm tra quyền thêm/sửa/xóa
  const canManageStudents = hasPermission(Permission.MANAGE_HEALTH_RECORDS);
  const isParent = user?.role === 'parent';

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleViewStudent = (student: any) => {
    setSelectedStudent(student);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedStudent(null);
  };

  const StudentForm = () => (
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
            gap: 1,
            mb: 3
          }}
        >
          <HealthAndSafety sx={{ color: MEDICAL_COLORS.secondary.main }} />
          Thông tin cơ bản
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Họ và tên"
              variant="outlined"
              margin="normal"
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
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Lớp"
              variant="outlined"
              margin="normal"
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
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Ngày sinh"
              type="date"
              variant="outlined"
              margin="normal"
              InputLabelProps={{ shrink: true }}
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
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth margin="normal" sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: MEDICAL_COLORS.primary.main
                }
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: MEDICAL_COLORS.primary.main
              }
            }}>
              <InputLabel>Giới tính</InputLabel>
              <Select label="Giới tính">
                <MenuItem value="male">Nam</MenuItem>
                <MenuItem value="female">Nữ</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Typography 
          variant="h6" 
          gutterBottom 
          sx={{ 
            mt: 3,
            color: MEDICAL_COLORS.primary.main,
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mb: 3
          }}
        >
          <Vaccines sx={{ color: MEDICAL_COLORS.secondary.main }} />
          Thông tin sức khỏe
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Dị ứng (cách nhau bởi dấu phẩy)"
              variant="outlined"
              margin="normal"
              placeholder="Đậu phộng, Sữa, Tôm cua..."
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
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Bệnh mãn tính"
              variant="outlined"
              margin="normal"
              placeholder="Hen suyễn, Tiểu đường..."
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
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Thuốc đang dùng"
              variant="outlined"
              margin="normal"
              placeholder="Ventolin, Insulin..."
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
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Tiền sử điều trị"
              variant="outlined"
              margin="normal"
              multiline
              rows={2}
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
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Thị lực"
              variant="outlined"
              margin="normal"
              placeholder="10/10, 9/10..."
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
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Thính lực"
              variant="outlined"
              margin="normal"
              placeholder="Bình thường, Giảm nhẹ..."
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
          </Grid>
        </Grid>

        <Typography 
          variant="h6" 
          gutterBottom 
          sx={{ 
            mt: 3,
            color: MEDICAL_COLORS.primary.main,
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mb: 3
          }}
        >
          <Vaccines sx={{ color: MEDICAL_COLORS.secondary.main }} />
          Thông tin tiêm chủng
        </Typography>
        <Grid container spacing={2}>
          {['BCG', 'DPT', 'Sởi - Rubella', 'Viêm gan B', 'Bại liệt'].map((vaccine) => (
            <Grid item xs={12} md={6} key={vaccine}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <FormControlLabel
                  control={<Checkbox sx={{
                    color: MEDICAL_COLORS.primary.main,
                    '&.Mui-checked': {
                      color: MEDICAL_COLORS.primary.main,
                    },
                  }} />}
                  label={vaccine}
                />
                <TextField
                  size="small"
                  label="Ngày tiêm"
                  type="date"
                  InputLabelProps={{ shrink: true }}
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
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <MedicalButton variant="contained" startIcon={<PersonAdd />}>
            Lưu hồ sơ
          </MedicalButton>
          <MedicalButton variant="outlined">
            Hủy
          </MedicalButton>
        </Box>
      </CardContent>
    </MedicalCard>
  );

  const StudentList = () => (
    <MedicalCard>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
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
            <HealthAndSafety sx={{ color: MEDICAL_COLORS.secondary.main }} />
            Danh sách học sinh
          </Typography>
          <MedicalButton variant="contained" startIcon={<Add />}>
            Thêm học sinh
          </MedicalButton>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Tìm kiếm theo tên"
                variant="outlined"
                size="small"
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
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth size="small" sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: MEDICAL_COLORS.primary.main
                  }
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: MEDICAL_COLORS.primary.main
                }
              }}>
                <InputLabel>Lớp</InputLabel>
                <Select label="Lớp">
                  <MenuItem value="">Tất cả</MenuItem>
                  <MenuItem value="6A1">6A1</MenuItem>
                  <MenuItem value="7B2">7B2</MenuItem>
                  <MenuItem value="8A3">8A3</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <MedicalButton variant="outlined" fullWidth>
                Tìm kiếm
              </MedicalButton>
            </Grid>
          </Grid>
        </Box>

        <TableContainer component={Paper} sx={{ 
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
                <TableCell>Họ tên</TableCell>
                <TableCell>Lớp</TableCell>
                <TableCell>Ngày sinh</TableCell>
                <TableCell>Dị ứng</TableCell>
                <TableCell>Bệnh mãn tính</TableCell>
                <TableCell>Kiểm tra cuối</TableCell>
                <TableCell>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow 
                  key={student.id}
                  sx={{
                    '&:nth-of-type(odd)': {
                      backgroundColor: MEDICAL_COLORS.info.light + '20',
                    },
                    '&:hover': {
                      backgroundColor: MEDICAL_COLORS.primary.light + '30',
                    }
                  }}
                >
                  <TableCell sx={{ fontWeight: 500 }}>{student.name}</TableCell>
                  <TableCell>{student.class}</TableCell>
                  <TableCell>{student.dateOfBirth}</TableCell>
                  <TableCell>
                    {student.allergies.map((allergy, index) => (
                      <Chip
                        key={index}
                        label={allergy}
                        size="small"
                        color="warning"
                        sx={{ mr: 0.5, mb: 0.5 }}
                      />
                    ))}
                  </TableCell>
                  <TableCell>
                    {student.chronicDiseases.map((disease, index) => (
                      <Chip
                        key={index}
                        label={disease}
                        size="small"
                        color="error"
                        sx={{ mr: 0.5, mb: 0.5 }}
                      />
                    ))}
                  </TableCell>
                  <TableCell>{student.lastCheckup}</TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleViewStudent(student)}
                      sx={{ 
                        color: MEDICAL_COLORS.info.main,
                        '&:hover': { 
                          backgroundColor: MEDICAL_COLORS.info.light + '20',
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
                          backgroundColor: MEDICAL_COLORS.primary.light + '20',
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
                          backgroundColor: MEDICAL_COLORS.error.light + '20',
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

  return (
    <Container 
      maxWidth="lg"
      sx={{
        background: `linear-gradient(135deg, ${MEDICAL_COLORS.info.light} 0%, #ffffff 50%, ${MEDICAL_COLORS.success.light} 100%)`,
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
        <HealthAndSafety sx={{ fontSize: '2.5rem', color: MEDICAL_COLORS.secondary.main }} />
        Quản lý Hồ sơ Sức khỏe Học sinh
      </Typography>

      <Box sx={{ 
        borderBottom: 1, 
        borderColor: MEDICAL_COLORS.primary.light, 
        mb: 3,
        backgroundColor: 'white',
        borderRadius: 3,
        boxShadow: '0 2px 10px rgba(44, 82, 130, 0.1)',
        overflow: 'hidden'
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
          <Tab label="Thêm hồ sơ mới" icon={<PersonAdd />} />
          <Tab label="Danh sách học sinh" icon={<HealthAndSafety />} />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <StudentForm />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <StudentList />
      </TabPanel>

      {/* Student Detail Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 10px 40px rgba(44, 82, 130, 0.2)'
          }
        }}
      >
        <DialogTitle sx={{
          backgroundColor: MEDICAL_COLORS.primary.main,
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          fontWeight: 600
        }}>
          <HealthAndSafety />
          Hồ sơ sức khỏe - {selectedStudent?.name}
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          {selectedStudent && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom sx={{ 
                  color: MEDICAL_COLORS.primary.main,
                  fontWeight: 600
                }}>
                  Thông tin cơ bản
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>Lớp: {selectedStudent.class}</Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>Ngày sinh: {selectedStudent.dateOfBirth}</Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>Thị lực: {selectedStudent.vision}</Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>Thính lực: {selectedStudent.hearing}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom sx={{ 
                  color: MEDICAL_COLORS.primary.main,
                  fontWeight: 600
                }}>
                  Thông tin y tế
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" gutterBottom>Dị ứng:</Typography>
                  {selectedStudent.allergies.length > 0 ? selectedStudent.allergies.map((allergy: string, index: number) => (
                    <Chip key={index} label={allergy} size="small" color="warning" sx={{ mr: 0.5, mb: 0.5 }} />
                  )) : <Typography variant="body2" color="text.secondary">Không có</Typography>}
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" gutterBottom>Bệnh mãn tính:</Typography>
                  {selectedStudent.chronicDiseases.length > 0 ? selectedStudent.chronicDiseases.map((disease: string, index: number) => (
                    <Chip key={index} label={disease} size="small" color="error" sx={{ mr: 0.5, mb: 0.5 }} />
                  )) : <Typography variant="body2" color="text.secondary">Không có</Typography>}
                </Box>
                <Box>
                  <Typography variant="body2" gutterBottom>Thuốc đang dùng:</Typography>
                  {selectedStudent.medications.length > 0 ? selectedStudent.medications.map((med: string, index: number) => (
                    <Chip key={index} label={med} size="small" color="info" sx={{ mr: 0.5, mb: 0.5 }} />
                  )) : <Typography variant="body2" color="text.secondary">Không có</Typography>}
                </Box>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions sx={{ 
          p: 3, 
          backgroundColor: MEDICAL_COLORS.info.light + '20',
          gap: 2 
        }}>
          <MedicalButton 
            onClick={handleCloseDialog}
            variant="outlined"
          >
            Đóng
          </MedicalButton>
          <MedicalButton variant="contained" startIcon={<Edit />}>
            Chỉnh sửa
          </MedicalButton>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default StudentHealth;
