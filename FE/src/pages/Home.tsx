import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Chip,
} from '@mui/material';
import {
  School,
  LocalHospital,
  Vaccines,
  HealthAndSafety,
  ArticleOutlined,
  NotificationsActive,
} from '@mui/icons-material';

const Home: React.FC = () => {
  const healthTips = [
    {
      title: 'Tầm quan trọng của việc rửa tay',
      content: 'Rửa tay thường xuyên bằng xà phòng là cách hiệu quả nhất để phòng ngừa bệnh tật.',
      image: '/api/placeholder/300/200',
    },
    {
      title: 'Dinh dưỡng cân bằng cho học sinh',
      content: 'Chế độ ăn uống đầy đủ chất dinh dưỡng giúp học sinh phát triển toàn diện.',
      image: '/api/placeholder/300/200',
    },
    {
      title: 'Tập thể dục thường xuyên',
      content: 'Hoạt động thể chất hàng ngày giúp tăng cường sức khỏe và tinh thần học tập.',
      image: '/api/placeholder/300/200',
    },
  ];

  const announcements = [
    {
      title: 'Thông báo tiêm chủng Sởi - Rubella',
      date: '30/05/2025',
      priority: 'high',
      content: 'Trường sẽ tổ chức tiêm chủng Sởi - Rubella cho học sinh lớp 1 vào ngày 05/06/2025.',
    },
    {
      title: 'Kiểm tra sức khỏe định kỳ',
      date: '28/05/2025',
      priority: 'medium',
      content: 'Kiểm tra sức khỏe tổng quát cho học sinh khối lớp 6 từ ngày 10-15/06/2025.',
    },
    {
      title: 'Hướng dẫn phòng chống dịch bệnh mùa hè',
      date: '25/05/2025',
      priority: 'low',
      content: 'Các biện pháp phòng chống sốt xuất huyết và tay chân miệng trong mùa hè.',
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'default';
    }
  };

  return (
    <Container maxWidth="lg">
      {/* Header Section */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom color="primary">
          Trường THCS ABC
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
          Hệ thống Quản lý Y tế Học đường
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Chăm sóc sức khỏe toàn diện cho học sinh - Đảm bảo môi trường học tập an toàn
        </Typography>
      </Box>

      {/* School Info Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ textAlign: 'center', p: 2 }}>
            <School sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
            <Typography variant="h6">Số học sinh</Typography>
            <Typography variant="h4" color="primary">1,245</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ textAlign: 'center', p: 2 }}>
            <LocalHospital sx={{ fontSize: 48, color: 'success.main', mb: 1 }} />
            <Typography variant="h6">Nhân viên Y tế</Typography>
            <Typography variant="h4" color="success.main">5</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ textAlign: 'center', p: 2 }}>
            <Vaccines sx={{ fontSize: 48, color: 'warning.main', mb: 1 }} />
            <Typography variant="h6">Đã tiêm chủng</Typography>
            <Typography variant="h4" color="warning.main">98%</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ textAlign: 'center', p: 2 }}>
            <HealthAndSafety sx={{ fontSize: 48, color: 'info.main', mb: 1 }} />
            <Typography variant="h6">Sự kiện Y tế</Typography>
            <Typography variant="h4" color="info.main">12</Typography>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Health Tips Section */}
        <Grid item xs={12} md={8}>
          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <ArticleOutlined sx={{ mr: 1 }} />
            Kiến thức Sức khỏe Học đường
          </Typography>
          <Grid container spacing={2}>
            {healthTips.map((tip, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card>
                  <CardMedia
                    component="div"
                    sx={{
                      height: 140,
                      backgroundColor: 'primary.light',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <HealthAndSafety sx={{ fontSize: 64, color: 'white' }} />
                  </CardMedia>
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {tip.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {tip.content}
                    </Typography>
                    <Button size="small" sx={{ mt: 1 }}>
                      Đọc thêm
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Announcements Section */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <NotificationsActive sx={{ mr: 1 }} />
              Thông báo mới
            </Typography>
            <List>
              {announcements.map((announcement, index) => (
                <ListItem key={index} sx={{ flexDirection: 'column', alignItems: 'flex-start', mb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mb: 1 }}>
                    <Chip 
                      label={announcement.date} 
                      size="small" 
                      color={getPriorityColor(announcement.priority) as any}
                      sx={{ mr: 1 }}
                    />
                  </Box>
                  <ListItemText
                    primary={announcement.title}
                    secondary={announcement.content}
                    sx={{ margin: 0 }}
                  />
                </ListItem>
              ))}
            </List>
            <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
              Xem tất cả thông báo
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Truy cập nhanh
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button variant="contained" size="large" startIcon={<LocalHospital />}>
              Báo cáo sự kiện Y tế
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" size="large" startIcon={<Vaccines />}>
              Đăng ký tiêm chủng
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" size="large" startIcon={<HealthAndSafety />}>
              Kiểm tra sức khỏe
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
