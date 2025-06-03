import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Paper,
  Avatar,
  Chip,
  IconButton,
  alpha,
  Fade,
  Slide,
  Zoom,
  Grow,
  keyframes,
  LinearProgress,
  Divider,
  styled,
  PaletteColor,
  createTheme,
  ThemeProvider,
  CardActions,
  Badge,
  CssBaseline,
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,  ListItemIcon,
  useScrollTrigger,
  Slide as MuiSlide,
  Stack,
  Link,
} from '@mui/material';
import {
  LocalHospital,
  Facebook,
  LinkedIn,
  YouTube,
  School,
  Security,
  TrendingUp,
  HealthAndSafety,
  Vaccines,
  Assignment,
  People,
  Timeline,
  Star,
  ArrowForward,
  PlayArrow,
  AutoAwesome,
  Favorite,
  EmojiEvents,
  Speed,
  CheckCircle,
  Insights,
  FlashOn,
  Visibility,
  CloudUpload,
  Article,
  NewReleases,
  Schedule,  AccessTime,
  Psychology,
  Biotech,
  Science,
  RocketLaunch,
  Diamond,
  Celebration,
  Healing,
  MonitorHeart,
  MedicalInformation,
  MedicalServices,
  HealthAndSafetyOutlined,
  FavoriteOutlined,
  ShieldOutlined,  Menu as MenuIcon,
  Phone,
  Email,  Login,
  Dashboard,
  Info,
  ContactSupport,
  Close,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Professional Medical Color Palette - Elegant & Healthcare Appropriate
const medicalTheme = createTheme({
  palette: {
    primary: {
      main: '#2C5282', // Deep Medical Blue - Professional & Trustworthy
      light: '#4299E1',
      dark: '#1A365D',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#319795', // Medical Teal - Calming & Healthcare
      light: '#4FD1C7',
      dark: '#234E52',
      contrastText: '#ffffff',
    },
    success: {
      main: '#38A169', // Medical Green - Health & Wellness
      light: '#68D391',
      dark: '#2F855A',
      contrastText: '#ffffff',
    },
    info: {
      main: '#3182CE', // Clinical Blue - Professional Information
      light: '#63B3ED',
      dark: '#2C5282',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#D69E2E', // Medical Amber - Attention without Alarm
      light: '#F6E05E',
      dark: '#B7791F',
      contrastText: '#ffffff',
    },
    error: {
      main: '#E53E3E', // Medical Red - Emergency & Critical
      light: '#FC8181',
      dark: '#C53030',
      contrastText: '#ffffff',
    },
    background: {
      default: '#F7FAFC', // Very Light Blue-Gray - Clean Medical Environment
      paper: '#ffffff',
    },
    text: {
      primary: '#2D3748', // Dark Blue-Gray - Professional Reading
      secondary: '#4A5568', // Medium Blue-Gray - Secondary Text
    },
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.025em',
      color: '#1A202C',
    },
    h2: {
      fontWeight: 600,
      letterSpacing: '-0.025em',
      color: '#2D3748',
    },
    h3: {
      fontWeight: 600,
      letterSpacing: '-0.015em',
      color: '#2D3748',
    },
    h4: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
      color: '#2D3748',
    },
    h5: {
      fontWeight: 600,
      letterSpacing: '0em',
      color: '#2D3748',
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '0.01em',
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
  },
});

// Helper function to get palette color from medicalTheme
const getPaletteColor = (theme: typeof medicalTheme, color: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error'): PaletteColor => {
  return theme.palette[color];
};

// Professional Medical Styled Components
const FloatingIcon = styled(Box)(() => ({
  animation: 'float 6s ease-in-out infinite',
  '@keyframes float': {
    '0%, 100%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-8px)' },
  },
}));

const MedicalCard = styled(Card)(() => ({
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  backgroundColor: '#ffffff',
  border: `1px solid ${alpha('#E2E8F0', 0.8)}`,
  borderRadius: '20px',
  boxShadow: '0 4px 32px rgba(44, 82, 130, 0.08)',
  backdropFilter: 'blur(8px)',
  '&:hover': {
    transform: 'translateY(-12px)',
    boxShadow: '0 12px 48px rgba(44, 82, 130, 0.15)',
    borderColor: alpha(medicalTheme.palette.primary.main, 0.3),
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: `linear-gradient(90deg, ${medicalTheme.palette.primary.main}, ${medicalTheme.palette.secondary.main}, ${medicalTheme.palette.success.main})`,
    borderRadius: '20px 20px 0 0',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    background: `linear-gradient(45deg, ${alpha(medicalTheme.palette.primary.main, 0.1)}, ${alpha(medicalTheme.palette.secondary.main, 0.1)})`,
    borderRadius: '22px',
    zIndex: -1,
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover::after': {
    opacity: 1,
  },
}));

const ProfessionalText = styled(Typography)<{ component?: React.ElementType }>(() => ({
  background: `linear-gradient(135deg, ${medicalTheme.palette.primary.main}, ${medicalTheme.palette.secondary.main})`,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  fontWeight: 700,
  letterSpacing: '-0.02em',
  position: 'relative',
}));

const MedicalButton = styled(Button)(() => ({
  borderRadius: '16px',
  textTransform: 'none',
  fontWeight: 600,
  padding: '16px 40px',
  fontSize: '1.1rem',
  boxShadow: 'none',
  position: 'relative',
  overflow: 'hidden',
  letterSpacing: '0.025em',
  border: `2px solid ${medicalTheme.palette.primary.main}`,
  background: `linear-gradient(135deg, ${medicalTheme.palette.primary.main}, ${medicalTheme.palette.primary.dark})`,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: `linear-gradient(90deg, transparent, ${alpha(medicalTheme.palette.common.white, 0.4)}, transparent)`,
    transition: 'left 0.8s',
  },
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 12px 32px ${alpha(medicalTheme.palette.primary.main, 0.4)}`,
    background: `linear-gradient(135deg, ${medicalTheme.palette.primary.dark}, ${medicalTheme.palette.primary.main})`,
    '&::before': {
      left: '100%',
    },
  },
  '&:active': {
    transform: 'translateY(0px)',
  },
}));

// Additional styled components for enhanced medical design
const PulsingCard = styled(Card)(() => ({
  animation: 'pulse 3s ease-in-out infinite',
  '@keyframes pulse': {
    '0%': { boxShadow: `0 4px 32px ${alpha(medicalTheme.palette.primary.main, 0.08)}` },
    '50%': { boxShadow: `0 8px 48px ${alpha(medicalTheme.palette.primary.main, 0.12)}` },
    '100%': { boxShadow: `0 4px 32px ${alpha(medicalTheme.palette.primary.main, 0.08)}` },
  },
}));

// Header styled components
const HeaderAppBar = styled(AppBar)(() => ({
  background: `linear-gradient(135deg, ${alpha(medicalTheme.palette.primary.main, 0.95)}, ${alpha(medicalTheme.palette.primary.dark, 0.98)})`,
  backdropFilter: 'blur(20px)',
  borderBottom: `1px solid ${alpha(medicalTheme.palette.primary.light, 0.1)}`,
  boxShadow: `0 8px 32px ${alpha(medicalTheme.palette.primary.main, 0.15)}`,
  transition: 'all 0.3s ease',
}));

const NavButton = styled(Button)(() => ({
  color: alpha(medicalTheme.palette.common.white, 0.9),
  textTransform: 'none',
  fontWeight: 600,
  padding: '8px 16px',
  borderRadius: '12px',
  fontSize: '0.95rem',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: alpha(medicalTheme.palette.common.white, 0.1),
    color: medicalTheme.palette.common.white,
    transform: 'translateY(-2px)',
  },
}));

const LogoBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

// Header component with hide on scroll functionality
function HideOnScroll(props: { children: React.ReactElement }) {
  const { children } = props;
  const trigger = useScrollTrigger({
    threshold: 100,
  });

  return (
    <MuiSlide appear={false} direction="down" in={!trigger}>
      {children}
    </MuiSlide>
  );
}

const GradientText = styled(Typography)(() => ({
  background: `linear-gradient(135deg, ${medicalTheme.palette.primary.main}, ${medicalTheme.palette.secondary.main}, ${medicalTheme.palette.success.main})`,
  backgroundSize: '300% 300%',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  animation: 'gradientShift 4s ease-in-out infinite',
  '@keyframes gradientShift': {
    '0%': { backgroundPosition: '0% 50%' },
    '50%': { backgroundPosition: '100% 50%' },
    '100%': { backgroundPosition: '0% 50%' },
  },
}));

const ShimmerButton = styled(Button)(() => ({
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: `linear-gradient(90deg, transparent, ${alpha('#ffffff', 0.4)}, transparent)`,
    transition: 'left 0.6s',
  },
  '&:hover::before': {
    left: '100%',
  },
}));

// Main Homepage component
const Homepage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
  
  // Header navigation state
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    setIsVisible(true);

    const featureInterval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 3000);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearInterval(featureInterval);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Header handlers
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileOpen(false);
    handleMenuClose();
  };

  // Navigation items
  const navigationItems = [
    { label: 'Trang chủ', path: '/', icon: <HealthAndSafety /> },
    { label: 'Giới thiệu', path: '/about', icon: <Info /> },
    { label: 'Dịch vụ', path: '/services', icon: <MedicalServices /> },
    { label: 'Liên hệ', path: '/contact', icon: <ContactSupport /> },
  ];
  const createRipple = (e: React.MouseEvent) => {
    const newRipple = {
      x: e.clientX,
      y: e.clientY,
      id: Date.now(),
    };
    setRipples(prev => [...prev, newRipple]);
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 1000);
  };

  const features = [
    {
      icon: <MedicalServices />,
      title: 'Quản lý Hồ sơ Y tế Điện tử',
      description: 'Hệ thống lưu trữ và quản lý hồ sơ sức khỏe điện tử (EHR) toàn diện, tuân thủ tiêu chuẩn HIPAA với bảo mật tối ưu và truy xuất nhanh chóng.',
      color: medicalTheme.palette.primary.main,
      gradient: `linear-gradient(135deg, ${medicalTheme.palette.primary.main}, ${medicalTheme.palette.primary.dark})`,
      bgIcon: <HealthAndSafetyOutlined />,
    },
    {
      icon: <Vaccines />,
      title: 'Lịch Tiêm chủng Thông minh',
      description: 'Quản lý lịch tiêm chủng theo tiêu chuẩn WHO, cảnh báo tự động, theo dõi phản ứng sau tiêm và tối ưu hóa kế hoạch tiêm chủng cộng đồng.',
      color: medicalTheme.palette.success.main,
      gradient: `linear-gradient(135deg, ${medicalTheme.palette.success.main}, ${medicalTheme.palette.success.dark})`,
      bgIcon: <ShieldOutlined />,
    },
    {
      icon: <Psychology />,
      title: 'AI Phân tích Y tế Thông minh',
      description: 'Trí tuệ nhân tạo phân tích dữ liệu sức khỏe, dự đoán rủi ro bệnh tật, đưa ra khuyến nghị điều trị và hỗ trợ quyết định lâm sàng chính xác.',
      color: medicalTheme.palette.info.main,
      gradient: `linear-gradient(135deg, ${medicalTheme.palette.info.main}, ${medicalTheme.palette.info.dark})`,
      bgIcon: <Insights />,
    },
    {
      icon: <Security />,
      title: 'Bảo mật Chuẩn Y tế',
      description: 'Hệ thống bảo mật đa lớp tuân thủ chuẩn ISO 27001, mã hóa AES-256, xác thực đa yếu tố và kiểm soát truy cập role-based cho dữ liệu nhạy cảm.',
      color: medicalTheme.palette.warning.main,
      gradient: `linear-gradient(135deg, ${medicalTheme.palette.warning.main}, ${medicalTheme.palette.warning.dark})`,
      bgIcon: <Diamond />,
    },
  ];
  const stats = [
    { 
      icon: <School />, 
      value: '1,245', 
      label: 'Học sinh', 
      color: 'primary' as const,
      subtext: '+12% so với năm ngoái',
      trend: 'up',
      progress: 85
    },
    { 
      icon: <CheckCircle />, 
      value: '98.5%', 
      label: 'Tỷ lệ khám', 
      color: 'success' as const,
      subtext: 'Mục tiêu: 95%',
      trend: 'up',
      progress: 98
    },
    { 
      icon: <Vaccines />, 
      value: '96.2%', 
      label: 'Tiêm chủng', 
      color: 'info' as const,
      subtext: 'Đạt chuẩn WHO',
      trend: 'up',
      progress: 96
    },
    { 
      icon: <Speed />, 
      value: '24/7', 
      label: 'Hỗ trợ AI', 
      color: 'warning' as const,
      subtext: 'Phản hồi <2 phút',
      trend: 'stable',
      progress: 100
    },  ];
  const testimonials = [
    {
      name: 'TS. Nguyễn Thị Minh Lan',
      role: 'Hiệu trưởng trường THPT Chuyên Hà Nội - Amsterdam',
      comment: 'Hệ thống quản lý y tế học đường này đã cách mạng hóa cách chúng tôi theo dõi sức khỏe học sinh. Giao diện trực quan, dữ liệu chính xác và tính năng AI phân tích rất ấn tượng.',
      rating: 5,
      avatar: '👩‍⚕️',
    },
    {
      name: 'BS. Trần Văn Hùng',
      role: 'Trưởng khoa Y tế học đường - Sở GD&ĐT Hà Nội',
      comment: 'Công nghệ tiên tiến, tuân thủ đầy đủ các tiêu chuẩn y tế quốc tế. Hệ thống bảo mật tuyệt vời, giao diện thân thiện và hỗ trợ kỹ thuật chuyên nghiệp.',
      rating: 5,
      avatar: '👨‍⚕️',
    },    {
      name: 'ThS. Phạm Thị Hương',
      role: 'Y tá trưởng - Trường THCS Nguyễn Du',
      comment: 'Việc quản lý hồ sơ sức khỏe trở nên dễ dàng và hiệu quả hơn rất nhiều. Tính năng nhắc nhở tiêm chủng và theo dõi tăng trưởng rất hữu ích trong công việc hàng ngày.',
      rating: 5,      avatar: '👩‍🍼',
    },
  ];

  // News data
  const newsArticles = [
    {
      id: 1,
      title: 'Triển khai Hệ thống AI phân tích sức khỏe cho học sinh THPT',
      excerpt: 'Bộ GD&ĐT phối hợp với Bộ Y tế ra mắt hệ thống AI tiên tiến giúp phân tích và dự đoán tình trạng sức khỏe học sinh, nâng cao chất lượng chăm sóc y tế học đường.',
      category: 'Công nghệ Y tế',
      date: '15/12/2024',
      author: 'ThS. Nguyễn Minh Hoàng',
      image: '🏥',
      readTime: '5 phút đọc',
      tags: ['AI', 'Y tế học đường', 'Công nghệ'],
    },
    {
      id: 2,
      title: 'Cập nhật Lịch tiêm chủng mở rộng 2024-2025',
      excerpt: 'WHO và Bộ Y tế Việt Nam công bố lịch tiêm chủng mở rộng mới với 3 vaccine bổ sung, tăng cường bảo vệ sức khỏe trẻ em và học sinh toàn quốc.',
      category: 'Tiêm chủng',
      date: '12/12/2024',
      author: 'BS. Phạm Thị Lan',
      image: '💉',
      readTime: '3 phút đọc',
      tags: ['Vaccine', 'WHO', 'Chính sách'],
    },
    {
      id: 3,
      title: 'Hướng dẫn Quản lý sức khỏe tâm thần học sinh thời đại số',
      excerpt: 'Khuyến nghị mới từ Hiệp hội Tâm lý Việt Nam về cách phát hiện sớm và can thiệp hiệu quả các vấn đề sức khỏe tâm thần ở học sinh trong môi trường số hóa.',
      category: 'Sức khỏe Tâm thần',
      date: '10/12/2024',
      author: 'PGS.TS. Trần Văn Minh',
      image: '🧠',
      readTime: '7 phút đọc',
      tags: ['Tâm lý', 'Học sinh', 'Số hóa'],
    },
    {
      id: 4,
      title: 'Báo cáo Tình hình sức khỏe học sinh Việt Nam 2024',
      excerpt: 'Viện Dinh dưỡng Quốc gia công bố báo cáo toàn diện về tình hình sức khỏe, dinh dưỡng và tăng trưởng của học sinh Việt Nam năm 2024 với nhiều dữ liệu đáng chú ý.',
      category: 'Báo cáo Y tế',
      date: '08/12/2024',
      author: 'TS. Lê Thị Hương',
      image: '📊',
      readTime: '6 phút đọc',      tags: ['Báo cáo', 'Dinh dưỡng', 'Thống kê'],
    },
  ];

  // Blog data
  const blogPosts = [
    {
      id: 1,
      title: 'Cách xây dựng hệ thống y tế học đường hiệu quả',
      excerpt: 'Hướng dẫn chi tiết về việc triển khai và quản lý hệ thống y tế học đường, từ lập kế hoạch ban đầu đến vận hành thường xuyên.',
      category: 'Hướng dẫn',
      date: '18/12/2024',
      author: 'TS. Nguyễn Văn An',
      image: '📋',
      readTime: '8 phút đọc',
      tags: ['Quản lý', 'Y tế học đường', 'Hướng dẫn'],
      featured: true,
    },
    {
      id: 2,
      title: '5 lợi ích của việc số hóa hồ sơ sức khỏe học sinh',
      excerpt: 'Khám phá những ưu điểm vượt trội của hệ thống hồ sơ sức khỏe điện tử trong việc quản lý và theo dõi sức khỏe học sinh.',
      category: 'Công nghệ',
      date: '16/12/2024',
      author: 'ThS. Lê Thị Mai',
      image: '💻',
      readTime: '6 phút đọc',
      tags: ['Số hóa', 'Hồ sơ y tế', 'Công nghệ'],
      featured: false,
    },
    {
      id: 3,
      title: 'Phòng chống bệnh truyền nhiễm trong trường học',
      excerpt: 'Các biện pháp phòng ngừa và kiểm soát bệnh truyền nhiễm hiệu quả trong môi trường giáo dục, bảo vệ sức khỏe cộng đồng học đường.',
      category: 'Phòng chống bệnh',
      date: '14/12/2024',
      author: 'BS. Phạm Minh Đức',
      image: '🛡️',
      readTime: '10 phút đọc',
      tags: ['Phòng chống', 'Bệnh truyền nhiễm', 'An toàn'],
      featured: false,
    },
    {
      id: 4,
      title: 'Vai trò của AI trong chẩn đoán sức khỏe học sinh',
      excerpt: 'Tìm hiểu cách trí tuệ nhân tạo đang cách mạng hóa việc phát hiện sớm và chẩn đoán các vấn đề sức khỏe ở học sinh.',
      category: 'AI & Y tế',
      date: '12/12/2024',
      author: 'PGS. Trần Quang Minh',
      image: '🤖',
      readTime: '7 phút đọc',
      tags: ['AI', 'Chẩn đoán', 'Công nghệ y tế'],
      featured: false,
    },
    {
      id: 5,
      title: 'Dinh dưỡng học đường: Xu hướng và thách thức',
      excerpt: 'Phân tích tình hình dinh dưỡng học sinh hiện tại và những thách thức trong việc cải thiện chất lượng bữa ăn học đường.',
      category: 'Dinh dưỡng',
      date: '10/12/2024',
      author: 'TS. Hoàng Thị Linh',
      image: '🥗',
      readTime: '9 phút đọc',
      tags: ['Dinh dưỡng', 'Bữa ăn học đường', 'Sức khỏe'],
      featured: false,
    },
    {
      id: 6,
      title: 'Tầm quan trọng của khám sức khỏe định kỳ',
      excerpt: 'Lý do tại sao việc khám sức khỏe định kỳ cho học sinh là cần thiết và cách tổ chức hiệu quả chương trình khám sức khỏe.',
      category: 'Khám sức khỏe',
      date: '08/12/2024',
      author: 'BS. Nguyễn Thị Hoa',
      image: '🩺',
      readTime: '5 phút đọc',
      tags: ['Khám sức khỏe', 'Định kỳ', 'Phòng ngừa'],
      featured: false,
    },
  ];

  return (
    <ThemeProvider theme={medicalTheme}>
      <CssBaseline />
      
      {/* Professional Header with Hide on Scroll */}
      <HideOnScroll>
        <HeaderAppBar position="fixed" elevation={0}>
          <Toolbar sx={{ px: { xs: 2, md: 4 }, py: 1 }}>
            {/* Mobile Menu Button */}
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
              sx={{ 
                mr: 2, 
                display: { xs: 'block', md: 'none' },
                '&:hover': {
                  background: alpha(medicalTheme.palette.common.white, 0.1),
                }
              }}
            >
              <MenuIcon />
            </IconButton>

            {/* Logo and Brand */}
            <LogoBox onClick={() => handleNavigation('/')}>
              <Avatar
                sx={{
                  bgcolor: 'transparent',
                  border: `2px solid ${alpha(medicalTheme.palette.common.white, 0.9)}`,
                  width: 40,
                  height: 40,
                }}
              >
                <LocalHospital sx={{ color: 'white', fontSize: 24 }} />
              </Avatar>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: 'white',
                    lineHeight: 1,
                    fontSize: '1.1rem',
                  }}
                >
                  Y tế Học đường
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: alpha(medicalTheme.palette.common.white, 0.8),
                    fontSize: '0.75rem',
                    fontWeight: 500,
                  }}
                >
                  Chăm sóc toàn diện
                </Typography>
              </Box>
            </LogoBox>

            {/* Spacer */}
            <Box sx={{ flexGrow: 1 }} />

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
              {navigationItems.map((item) => (
                <NavButton
                  key={item.label}
                  onClick={() => handleNavigation(item.path)}
                  startIcon={item.icon}
                >
                  {item.label}
                </NavButton>
              ))}
            </Box>

            {/* Contact Info & Auth */}
            <Box sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center', gap: 2, ml: 3 }}>
              {/* Contact Info */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Phone sx={{ fontSize: 16, color: alpha(medicalTheme.palette.common.white, 0.8) }} />
                  <Typography variant="caption" sx={{ color: alpha(medicalTheme.palette.common.white, 0.8) }}>
                    024.1234.5678
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Email sx={{ fontSize: 16, color: alpha(medicalTheme.palette.common.white, 0.8) }} />
                  <Typography variant="caption" sx={{ color: alpha(medicalTheme.palette.common.white, 0.8) }}>
                    info@ytehocduong.vn
                  </Typography>
                </Box>
              </Box>

              {/* Divider */}
              <Divider orientation="vertical" flexItem sx={{ bgcolor: alpha(medicalTheme.palette.common.white, 0.3), height: 24 }} />

              {/* Auth Section */}
              {isAuthenticated && user ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar sx={{ width: 32, height: 32, bgcolor: alpha(medicalTheme.palette.common.white, 0.2) }}>
                    {user.name.charAt(0)}
                  </Avatar>
                  <Button
                    onClick={handleMenuClick}
                    sx={{
                      color: 'white',
                      textTransform: 'none',
                      minWidth: 'auto',
                      p: 0,
                    }}
                  >
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      {user.name}
                    </Typography>
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                    <MenuItem onClick={() => handleNavigation('/dashboard')}>
                      <Dashboard sx={{ mr: 1 }} />
                      Dashboard
                    </MenuItem>
                    <MenuItem onClick={() => handleNavigation('/profile')}>
                      <Login sx={{ mr: 1 }} />
                      Hồ sơ
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={() => {/* Add logout logic */}}>
                      <Close sx={{ mr: 1 }} />
                      Đăng xuất
                    </MenuItem>
                  </Menu>
                </Box>
              ) : (
                <NavButton
                  onClick={() => handleNavigation('/login')}
                  startIcon={<Login />}
                  sx={{
                    border: `1px solid ${alpha(medicalTheme.palette.common.white, 0.3)}`,
                    '&:hover': {
                      border: `1px solid ${medicalTheme.palette.common.white}`,
                      background: alpha(medicalTheme.palette.common.white, 0.1),
                    },
                  }}
                >
                  Đăng nhập
                </NavButton>
              )}
            </Box>
          </Toolbar>
        </HeaderAppBar>
      </HideOnScroll>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 280,
            background: `linear-gradient(135deg, ${medicalTheme.palette.primary.main}, ${medicalTheme.palette.primary.dark})`,
            color: 'white',
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          {/* Mobile Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Avatar
              sx={{
                bgcolor: 'transparent',
                border: `2px solid ${alpha(medicalTheme.palette.common.white, 0.9)}`,
                width: 48,
                height: 48,
              }}
            >
              <LocalHospital sx={{ color: 'white', fontSize: 28 }} />
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'white', lineHeight: 1 }}>
                Y tế Học đường
              </Typography>
              <Typography variant="caption" sx={{ color: alpha(medicalTheme.palette.common.white, 0.8) }}>
                Chăm sóc toàn diện
              </Typography>
            </Box>
            <IconButton
              onClick={handleDrawerToggle}
              sx={{ 
                ml: 'auto',
                color: 'white',
                '&:hover': {
                  background: alpha(medicalTheme.palette.common.white, 0.1),
                }
              }}
            >
              <Close />
            </IconButton>
          </Box>

          {/* Mobile Navigation */}
          <List>
            {navigationItems.map((item) => (
              <ListItem
                key={item.label}
                component="button"
                onClick={() => handleNavigation(item.path)}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    background: alpha(medicalTheme.palette.common.white, 0.1),
                  },
                }}
              >
                <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.label}
                  sx={{ '& .MuiListItemText-primary': { fontWeight: 500 } }}
                />
              </ListItem>
            ))}
          </List>

          {/* Mobile Contact Info */}
          <Box sx={{ mt: 4, p: 2, background: alpha(medicalTheme.palette.common.white, 0.1), borderRadius: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
              Liên hệ
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Phone sx={{ fontSize: 18 }} />
              <Typography variant="body2">024.1234.5678</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Email sx={{ fontSize: 18 }} />
              <Typography variant="body2">info@ytehocduong.vn</Typography>
            </Box>
          </Box>

          {/* Mobile Auth */}
          <Box sx={{ mt: 3 }}>
            {isAuthenticated && user ? (
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2, p: 2, background: alpha(medicalTheme.palette.common.white, 0.1), borderRadius: 2 }}>
                  <Avatar sx={{ width: 40, height: 40, bgcolor: alpha(medicalTheme.palette.common.white, 0.2) }}>
                    {user.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {user.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: alpha(medicalTheme.palette.common.white, 0.8) }}>
                      {user.role}
                    </Typography>
                  </Box>
                </Box>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => handleNavigation('/dashboard')}
                  startIcon={<Dashboard />}
                  sx={{
                    color: 'white',
                    borderColor: alpha(medicalTheme.palette.common.white, 0.3),
                    mb: 1,
                    '&:hover': {
                      borderColor: 'white',
                      background: alpha(medicalTheme.palette.common.white, 0.1),
                    },
                  }}
                >
                  Dashboard
                </Button>
              </Box>
            ) : (
              <Button
                fullWidth
                variant="outlined"
                onClick={() => handleNavigation('/login')}
                startIcon={<Login />}
                sx={{
                  color: 'white',
                  borderColor: alpha(medicalTheme.palette.common.white, 0.3),
                  '&:hover': {
                    borderColor: 'white',
                    background: alpha(medicalTheme.palette.common.white, 0.1),
                  },
                }}
              >
                Đăng nhập
              </Button>
            )}
          </Box>
        </Box>
      </Drawer>

      <Box
        sx={{
          minHeight: '100vh',
          background: `linear-gradient(135deg, ${alpha(medicalTheme.palette.primary.main, 0.03)}, ${alpha(medicalTheme.palette.secondary.main, 0.02)})`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Animated background elements */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${alpha(medicalTheme.palette.primary.main, 0.05)} 0%, transparent 50%)`,
            pointerEvents: 'none',
            transition: 'background 0.3s ease',
            zIndex: 0,
          }}
        />        {/* Main Content */}
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          {/* Hero Section */}
          <Box
            component="section"
            sx={{
              pt: { xs: 6, md: 12 },
              pb: { xs: 8, md: 10 },
              background: `linear-gradient(135deg, ${alpha(medicalTheme.palette.primary.main, 0.03)}, ${alpha(medicalTheme.palette.secondary.main, 0.015)}, ${alpha(medicalTheme.palette.background.paper, 0.98)})`,
              borderBottom: `1px solid ${alpha(medicalTheme.palette.primary.main, 0.1)}`,
              textAlign: 'center',
            }}
          >
            <Container maxWidth="lg">
              <Fade in={isVisible} timeout={1000}>
                <Box>
                  <ProfessionalText variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, mb: 3 }}>
                    Hệ thống Y tế Học đường Thông minh
                  </ProfessionalText>
                  <GradientText variant="h5" sx={{ mb: 6, opacity: 0.9, maxWidth: 800, mx: 'auto' }}>
                    Quản lý toàn diện sức khỏe học sinh với công nghệ AI tiên tiến, 
                    tuân thủ chuẩn y tế quốc tế và bảo mật tối ưu
                  </GradientText>
                  <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <MedicalButton
                      variant="contained"
                      size="large"
                      onClick={() => navigate(isAuthenticated ? '/dashboard' : '/login')}
                      onMouseDown={createRipple}
                    >
                      {isAuthenticated ? 'Vào Dashboard' : 'Bắt đầu ngay'}
                    </MedicalButton>
                    <ShimmerButton
                      variant="outlined"
                      size="large"
                      onClick={() => navigate('/about')}
                    >
                      Tìm hiểu thêm
                    </ShimmerButton>
                  </Box>
                </Box>
              </Fade>
            </Container>
          </Box>          {/* Stats Section */}
          <Box
            component="section"
            sx={{
              py: { xs: 6, md: 8 },
              background: `linear-gradient(135deg, ${alpha(medicalTheme.palette.primary.main, 0.02)}, ${alpha(medicalTheme.palette.background.paper, 0.95)})`,
              borderTop: `1px solid ${alpha(medicalTheme.palette.primary.main, 0.08)}`,
              borderBottom: `1px solid ${alpha(medicalTheme.palette.primary.main, 0.05)}`,
            }}
          >
            <Container maxWidth="lg">
              <Box textAlign="center" sx={{ mb: 6 }}>
                <Typography variant="h4" fontWeight="bold" color="primary.main" gutterBottom>
                  Thống kê Hệ thống
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500, mx: 'auto' }}>
                  Các chỉ số quan trọng phản ánh hiệu quả hoạt động của hệ thống
                </Typography>
              </Box>
              
              <Grid container spacing={4} justifyContent="center">
                {stats.map((stat, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Slide
                      direction="up"
                      in={isVisible}
                      timeout={1200 + index * 200}
                    >
                      <MedicalCard sx={{ p: 4, textAlign: 'center', height: '100%' }}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 70,
                            height: 70,
                            borderRadius: '50%',
                            background: `linear-gradient(135deg, ${getPaletteColor(medicalTheme, stat.color).main}, ${getPaletteColor(medicalTheme, stat.color).dark})`,
                            mb: 3,
                            mx: 'auto',
                          }}
                        >
                          {React.cloneElement(stat.icon, { sx: { fontSize: 35, color: 'white' } })}
                        </Box>
                        <Typography variant="h3" fontWeight="bold" color={`${stat.color}.main`} gutterBottom>
                          {stat.value}
                        </Typography>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                          {stat.label}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {stat.subtext}
                        </Typography>
                      </MedicalCard>
                    </Slide>
                  </Grid>
                ))}
              </Grid>            </Container>
          </Box>          {/* Features Section */}
          <Box
            component="section"
            sx={{
              py: { xs: 6, md: 10 },
              background: `linear-gradient(135deg, ${alpha(medicalTheme.palette.secondary.main, 0.03)}, ${alpha(medicalTheme.palette.background.default, 0.85)})`,
              borderBottom: `1px solid ${alpha(medicalTheme.palette.secondary.main, 0.08)}`,
            }}
          >
            <Container maxWidth="lg">
              <Box textAlign="center" sx={{ mb: 8 }}>
                <ProfessionalText variant="h3" gutterBottom>
                  Tính năng Chuyên nghiệp
                </ProfessionalText>
                <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
                  Giải pháp toàn diện cho quản lý y tế học đường hiện đại                </Typography>
              </Box>
              
              <Grid container spacing={4}>
                {features.map((feature, index) => (
                  <Grid item xs={12} sm={6} lg={3} key={index}>
                    <Zoom in={isVisible} timeout={1500 + index * 200}>
                      <MedicalCard
                        sx={{
                          p: 4,
                          height: '100%',
                          cursor: 'pointer',
                          transform: activeFeature === index ? 'scale(1.05)' : 'scale(1)',
                          transition: 'all 0.3s ease',
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 80,
                            height: 80,
                            borderRadius: '20px',
                            background: feature.gradient,
                            mb: 3,
                            mx: 'auto',
                          }}
                        >
                          {React.cloneElement(feature.icon, { sx: { fontSize: 40, color: 'white' } })}
                        </Box>
                        <Typography variant="h6" fontWeight="bold" gutterBottom textAlign="center">
                          {feature.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ flexGrow: 1 }}>
                          {feature.description}
                        </Typography>
                      </MedicalCard>
                    </Zoom>
                  </Grid>
                ))}
              </Grid>
            </Container>          </Box>          {/* Testimonials */}
          <Box
            component="section"
            sx={{
              py: { xs: 6, md: 10 },
              background: `linear-gradient(135deg, ${alpha(medicalTheme.palette.success.main, 0.02)}, ${alpha(medicalTheme.palette.background.paper, 0.92)})`,
              borderTop: `1px solid ${alpha(medicalTheme.palette.success.main, 0.06)}`,
              borderBottom: `1px solid ${alpha(medicalTheme.palette.success.main, 0.04)}`,
            }}
          >
            <Container maxWidth="lg">
              <Box textAlign="center" sx={{ mb: 8 }}>
                <ProfessionalText variant="h4" gutterBottom>
                  Đánh giá từ Chuyên gia
                </ProfessionalText>
                <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500, mx: 'auto' }}>
                  Nhận xét từ các chuyên gia y tế và giáo dục hàng đầu
                </Typography>
              </Box>

              <Grid container spacing={4}>
                {testimonials.map((testimonial, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <Zoom in={isVisible} timeout={1500 + index * 300}>
                      <MedicalCard 
                        sx={{ 
                          p: 4, 
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          textAlign: 'center',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-8px)',
                            boxShadow: `0 12px 48px ${alpha(medicalTheme.palette.primary.main, 0.15)}`,
                          },
                        }}
                      >
                        {/* Avatar */}
                        <Box sx={{ mb: 3 }}>
                          <Typography variant="h2" sx={{ mb: 2 }}>
                            {testimonial.avatar}
                          </Typography>
                          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} sx={{ color: medicalTheme.palette.warning.main, fontSize: 20 }} />
                            ))}
                          </Box>
                        </Box>

                        {/* Comment */}
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            mb: 4, 
                            fontStyle: 'italic', 
                            lineHeight: 1.6,
                            flexGrow: 1,
                            color: 'text.secondary',
                          }}
                        >
                          "{testimonial.comment}"
                        </Typography>

                        {/* Author Info */}
                        <Box>
                          <Typography variant="h6" fontWeight="bold" color="text.primary" gutterBottom>
                            {testimonial.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {testimonial.role}
                          </Typography>
                        </Box>
                      </MedicalCard>
                    </Zoom>
                  </Grid>
                ))}
              </Grid>            </Container>          </Box>          {/* News Section */}
          <Box
            component="section"
            sx={{
              py: { xs: 6, md: 10 },
              background: `linear-gradient(135deg, ${alpha(medicalTheme.palette.info.main, 0.02)}, ${alpha(medicalTheme.palette.background.default, 0.88)})`,
              borderBottom: `1px solid ${alpha(medicalTheme.palette.info.main, 0.06)}`,
            }}
          >
            <Container maxWidth="lg">
              <Box textAlign="center" sx={{ mb: 8 }}>
                <ProfessionalText variant="h4" gutterBottom>
                  Tin tức & Cập nhật Y tế
                </ProfessionalText>
                <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500, mx: 'auto' }}>
                  Những thông tin mới nhất về y tế học đường và công nghệ chăm sóc sức khỏe
                </Typography>
              </Box>

              <Grid container spacing={4}>
                {newsArticles.map((article, index) => (
                  <Grid item xs={12} md={6} lg={3} key={article.id}>
                    <Zoom in={isVisible} timeout={1500 + index * 200}>
                      <MedicalCard
                        sx={{
                          p: 0,
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          overflow: 'hidden',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-8px)',
                            boxShadow: `0 12px 48px ${alpha(medicalTheme.palette.primary.main, 0.15)}`,
                          },
                        }}
                      >
                        {/* Article Image/Icon */}
                        <Box
                          sx={{
                            height: 160,
                            background: `linear-gradient(135deg, ${alpha(medicalTheme.palette.primary.main, 0.1)}, ${alpha(medicalTheme.palette.secondary.main, 0.05)})`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            overflow: 'hidden',
                          }}
                        >
                          <Typography variant="h1" sx={{ fontSize: '4rem', opacity: 0.8 }}>
                            {article.image}
                          </Typography>
                          <Box
                            sx={{
                              position: 'absolute',
                              top: 16,
                              left: 16,
                            }}
                          >
                            <Chip 
                              label={article.category}
                              size="small"
                              sx={{
                                backgroundColor: alpha(medicalTheme.palette.primary.main, 0.1),
                                color: medicalTheme.palette.primary.main,
                                fontWeight: 600,
                              }}
                            />
                          </Box>
                          <Box
                            sx={{
                              position: 'absolute',
                              top: 16,
                              right: 16,
                              display: 'flex',
                              alignItems: 'center',
                              gap: 0.5,
                              color: 'text.secondary',
                            }}
                          >
                            <AccessTime sx={{ fontSize: 14 }} />
                            <Typography variant="caption">
                              {article.readTime}
                            </Typography>
                          </Box>
                        </Box>

                        {/* Article Content */}
                        <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                          <Typography 
                            variant="h6" 
                            fontWeight="bold" 
                            gutterBottom
                            sx={{
                              lineHeight: 1.3,
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                            }}
                          >
                            {article.title}
                          </Typography>
                          
                          <Typography 
                            variant="body2" 
                            color="text.secondary"
                            sx={{
                              lineHeight: 1.5,
                              display: '-webkit-box',
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              flexGrow: 1,
                              mb: 2,
                            }}
                          >
                            {article.excerpt}
                          </Typography>

                          {/* Tags */}
                          <Box sx={{ mb: 2 }}>
                            {article.tags.slice(0, 2).map((tag, tagIndex) => (
                              <Chip
                                key={tagIndex}
                                label={tag}
                                size="small"
                                variant="outlined"
                                sx={{
                                  mr: 0.5,
                                  mb: 0.5,
                                  fontSize: '0.7rem',
                                  height: 20,
                                }}
                              />
                            ))}
                          </Box>

                          {/* Article Meta */}
                          <Box sx={{ mt: 'auto' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                              <Typography variant="caption" color="text.secondary">
                                {article.author}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {article.date}
                              </Typography>
                            </Box>
                            
                            <Button
                              size="small"
                              endIcon={<ArrowForward />}
                              sx={{
                                textTransform: 'none',
                                fontWeight: 600,
                                color: medicalTheme.palette.primary.main,
                                '&:hover': {
                                  backgroundColor: alpha(medicalTheme.palette.primary.main, 0.05),
                                },
                              }}
                            >
                              Đọc thêm
                            </Button>
                          </Box>
                        </CardContent>
                      </MedicalCard>
                    </Zoom>
                  </Grid>
                ))}
              </Grid>

              {/* View All News Button */}
              <Box textAlign="center" sx={{ mt: 6 }}>
                <MedicalButton
                  variant="outlined"
                  size="large"
                  startIcon={<NewReleases />}
                  sx={{
                    borderColor: medicalTheme.palette.primary.main,
                    color: medicalTheme.palette.primary.main,
                    background: 'transparent',
                    '&:hover': {
                      background: alpha(medicalTheme.palette.primary.main, 0.05),
                    },
                  }}
                >
                  Xem tất cả tin tức
                </MedicalButton>
              </Box>            </Container>          </Box>          {/* Blog Section */}
          <Box
            component="section"
            sx={{
              py: { xs: 6, md: 10 },
              background: `linear-gradient(135deg, ${alpha(medicalTheme.palette.warning.main, 0.015)}, ${alpha(medicalTheme.palette.background.paper, 0.95)})`,
              borderTop: `1px solid ${alpha(medicalTheme.palette.warning.main, 0.05)}`,
            }}
          >
            <Container maxWidth="lg">
              <Box textAlign="center" sx={{ mb: 8 }}>
                <ProfessionalText variant="h4" gutterBottom>
                  Blog Y tế Chuyên nghiệp
                </ProfessionalText>
                <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500, mx: 'auto' }}>
                  Chia sẻ kiến thức và kinh nghiệm trong lĩnh vực y tế học đường từ các chuyên gia hàng đầu
                </Typography>
              </Box>

              {/* Featured Blog Post */}
              {blogPosts.filter(post => post.featured).map((featuredPost) => (
                <Box key={featuredPost.id} sx={{ mb: 6 }}>
                  <Zoom in={isVisible} timeout={1000}>
                    <MedicalCard
                      sx={{
                        p: 0,
                        overflow: 'hidden',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: `0 16px 56px ${alpha(medicalTheme.palette.primary.main, 0.2)}`,
                        },
                      }}
                    >
                      <Grid container>
                        <Grid item xs={12} md={6}>
                          <Box
                            sx={{
                              height: { xs: 250, md: 350 },
                              background: `linear-gradient(135deg, ${alpha(medicalTheme.palette.primary.main, 0.15)}, ${alpha(medicalTheme.palette.secondary.main, 0.1)})`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              position: 'relative',
                            }}
                          >
                            <Typography variant="h1" sx={{ fontSize: '6rem', opacity: 0.8 }}>
                              {featuredPost.image}
                            </Typography>
                            <Box
                              sx={{
                                position: 'absolute',
                                top: 20,
                                left: 20,
                              }}
                            >
                              <Chip 
                                label="Bài viết nổi bật"
                                size="small"
                                sx={{
                                  backgroundColor: medicalTheme.palette.primary.main,
                                  color: 'white',
                                  fontWeight: 600,
                                  mb: 1,
                                }}
                              />
                              <Chip 
                                label={featuredPost.category}
                                size="small"
                                variant="outlined"
                                sx={{
                                  color: medicalTheme.palette.primary.main,
                                  borderColor: medicalTheme.palette.primary.main,
                                  fontWeight: 600,
                                }}
                              />
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Typography 
                              variant="h4" 
                              fontWeight="bold" 
                              gutterBottom
                              sx={{ lineHeight: 1.2, mb: 3 }}
                            >
                              {featuredPost.title}
                            </Typography>
                            
                            <Typography 
                              variant="body1" 
                              color="text.secondary"
                              sx={{ lineHeight: 1.6, mb: 4, flexGrow: 1 }}
                            >
                              {featuredPost.excerpt}
                            </Typography>

                            {/* Tags */}
                            <Box sx={{ mb: 3 }}>
                              {featuredPost.tags.map((tag, tagIndex) => (
                                <Chip
                                  key={tagIndex}
                                  label={tag}
                                  size="small"
                                  variant="outlined"
                                  sx={{
                                    mr: 1,
                                    mb: 0.5,
                                    fontSize: '0.75rem',
                                  }}
                                />
                              ))}
                            </Box>

                            {/* Meta info */}
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="body2" fontWeight="600">
                                  {featuredPost.author}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  • {featuredPost.date}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <AccessTime sx={{ fontSize: 16, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  {featuredPost.readTime}
                                </Typography>
                              </Box>
                            </Box>
                            
                            <MedicalButton
                              variant="contained"
                              endIcon={<ArrowForward />}
                              sx={{ alignSelf: 'flex-start' }}
                            >
                              Đọc bài viết
                            </MedicalButton>
                          </CardContent>
                        </Grid>
                      </Grid>
                    </MedicalCard>
                  </Zoom>
                </Box>
              ))}

              {/* Regular Blog Posts */}
              <Grid container spacing={4}>
                {blogPosts.filter(post => !post.featured).map((post, index) => (
                  <Grid item xs={12} md={6} lg={4} key={post.id}>
                    <Zoom in={isVisible} timeout={1500 + index * 200}>
                      <MedicalCard
                        sx={{
                          p: 0,
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          overflow: 'hidden',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-8px)',
                            boxShadow: `0 12px 48px ${alpha(medicalTheme.palette.primary.main, 0.15)}`,
                          },
                        }}
                      >
                        {/* Blog Image/Icon */}
                        <Box
                          sx={{
                            height: 180,
                            background: `linear-gradient(135deg, ${alpha(medicalTheme.palette.info.main, 0.1)}, ${alpha(medicalTheme.palette.success.main, 0.05)})`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            overflow: 'hidden',
                          }}
                        >
                          <Typography variant="h1" sx={{ fontSize: '4rem', opacity: 0.8 }}>
                            {post.image}
                          </Typography>
                          <Box
                            sx={{
                              position: 'absolute',
                              top: 16,
                              left: 16,
                            }}
                          >
                            <Chip 
                              label={post.category}
                              size="small"
                              variant="outlined"
                              sx={{
                                backgroundColor: alpha(medicalTheme.palette.info.main, 0.1),
                                color: medicalTheme.palette.info.main,
                                fontWeight: 600,
                              }}
                            />
                          </Box>
                          <Box
                            sx={{
                              position: 'absolute',
                              top: 16,
                              right: 16,
                              display: 'flex',
                              alignItems: 'center',
                              gap: 0.5,
                              color: 'text.secondary',
                            }}
                          >
                            <AccessTime sx={{ fontSize: 14 }} />
                            <Typography variant="caption">
                              {post.readTime}
                            </Typography>
                          </Box>
                        </Box>

                        {/* Blog Content */}
                        <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                          <Typography 
                            variant="h6" 
                            fontWeight="bold" 
                            gutterBottom
                            sx={{
                              lineHeight: 1.3,
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                            }}
                          >
                            {post.title}
                          </Typography>
                          
                          <Typography 
                            variant="body2" 
                            color="text.secondary"
                            sx={{
                              lineHeight: 1.5,
                              display: '-webkit-box',
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              flexGrow: 1,
                              mb: 2,
                            }}
                          >
                            {post.excerpt}
                          </Typography>

                          {/* Tags */}
                          <Box sx={{ mb: 2 }}>
                            {post.tags.slice(0, 2).map((tag, tagIndex) => (
                              <Chip
                                key={tagIndex}
                                label={tag}
                                size="small"
                                variant="outlined"
                                sx={{
                                  mr: 0.5,
                                  mb: 0.5,
                                  fontSize: '0.7rem',
                                  height: 20,
                                }}
                              />
                            ))}
                          </Box>

                          {/* Blog Meta */}
                          <Box sx={{ mt: 'auto' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                              <Typography variant="caption" color="text.secondary" fontWeight="600">
                                {post.author}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {post.date}
                              </Typography>
                            </Box>
                            
                            <Button
                              size="small"
                              endIcon={<ArrowForward />}
                              fullWidth
                              sx={{
                                textTransform: 'none',
                                fontWeight: 600,
                                color: medicalTheme.palette.info.main,
                                borderColor: medicalTheme.palette.info.main,
                                '&:hover': {
                                  backgroundColor: alpha(medicalTheme.palette.info.main, 0.05),
                                  borderColor: medicalTheme.palette.info.main,
                                },
                              }}
                              variant="outlined"
                            >
                              Đọc bài viết
                            </Button>
                          </Box>
                        </CardContent>
                      </MedicalCard>
                    </Zoom>
                  </Grid>
                ))}
              </Grid>

              {/* View All Blog Button */}
              <Box textAlign="center" sx={{ mt: 6 }}>
                <MedicalButton
                  variant="outlined"
                  size="large"
                  startIcon={<Article />}
                  sx={{
                    borderColor: medicalTheme.palette.info.main,
                    color: medicalTheme.palette.info.main,
                    background: 'transparent',
                    '&:hover': {
                      background: alpha(medicalTheme.palette.info.main, 0.05),
                    },
                  }}
                >
                  Xem tất cả blog
                </MedicalButton>              </Box>
            </Container>
          </Box>          {/* Call-to-Action Section */}          <Box
            component="section"
            sx={{
              py: { xs: 5, md: 6 },
              background: `linear-gradient(135deg, ${alpha(medicalTheme.palette.primary.main, 0.08)}, ${alpha(medicalTheme.palette.primary.dark, 0.05)})`,
              borderTop: `1px solid ${alpha(medicalTheme.palette.primary.main, 0.1)}`,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
              <Box textAlign="center">
                <Fade in={isVisible} timeout={800}>
                  <Box>
                    <Typography
                      variant="h4"
                      fontWeight="bold"
                      gutterBottom
                      sx={{
                        fontSize: { xs: '1.75rem', md: '2rem' },
                        lineHeight: 1.3,
                        mb: 3,
                        color: medicalTheme.palette.primary.dark,
                      }}
                    >
                      Hệ thống Y tế Học đường
                    </Typography>
                    
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 4,
                        color: '#64748b',
                        lineHeight: 1.6,
                        fontSize: { xs: '1rem', md: '1.1rem' },
                        maxWidth: 600,
                        mx: 'auto',
                      }}
                    >
                      Theo dõi sức khỏe học sinh, quản lý hồ sơ y tế và cập nhật thông tin sức khỏe một cách hiệu quả
                    </Typography>

                    <Grid container spacing={3} justifyContent="center" sx={{ mb: 5 }}>
                      <Grid item xs={12} sm={6} md={4}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Box
                            sx={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: 48,
                              height: 48,
                              borderRadius: '12px',
                              backgroundColor: alpha(medicalTheme.palette.primary.main, 0.1),
                              color: medicalTheme.palette.primary.main,
                              mb: 2,
                            }}
                          >                            <MedicalServices sx={{ fontSize: '1.8rem' }} />
                          </Box>                          <Typography variant="body1" sx={{ color: medicalTheme.palette.primary.dark, fontWeight: 600, mb: 1 }}>
                            Quản lý y tế
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Box
                            sx={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: 48,
                              height: 48,
                              borderRadius: '12px',
                              backgroundColor: alpha(medicalTheme.palette.primary.main, 0.1),
                              color: medicalTheme.palette.primary.main,
                              mb: 2,
                            }}
                          >
                            <MonitorHeart sx={{ fontSize: '1.8rem' }} />
                          </Box>
                          <Typography variant="body1" sx={{ color: medicalTheme.palette.primary.dark, fontWeight: 600, mb: 1 }}>
                            Theo dõi sức khỏe
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Box
                            sx={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: 48,
                              height: 48,
                              borderRadius: '12px',
                              backgroundColor: alpha(medicalTheme.palette.primary.main, 0.1),
                              color: medicalTheme.palette.primary.main,
                              mb: 2,
                            }}
                          >
                            <Biotech sx={{ fontSize: '1.8rem' }} />
                          </Box>
                          <Typography variant="body1" sx={{ color: medicalTheme.palette.primary.dark, fontWeight: 600, mb: 1 }}>
                            Khám sức khỏe
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>

                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                      <MedicalButton
                        variant="contained"
                        size="large"                        onClick={() => navigate('/dashboard')}
                        sx={{
                          fontSize: '1rem',
                          px: 4,
                          py: 1.5,
                          borderRadius: '12px',
                          textTransform: 'none',
                          background: `linear-gradient(135deg, ${medicalTheme.palette.primary.main}, ${medicalTheme.palette.primary.dark})`,
                          boxShadow: `0 4px 12px ${alpha(medicalTheme.palette.primary.main, 0.3)}`,
                          fontWeight: 600,
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: `0 6px 16px ${alpha(medicalTheme.palette.primary.main, 0.4)}`,
                          },
                        }}                        startIcon={<Dashboard sx={{ fontSize: '1.4rem', color: 'white' }} />}
                      >
                        Vào hệ thống
                      </MedicalButton>                      <MedicalButton                        variant="outlined"
                        size="large"
                        onClick={() => navigate('/help')}
                        sx={{
                          fontSize: '1rem',
                          px: 4,
                          py: 1.5,
                          borderRadius: '12px',
                          textTransform: 'none',
                          fontWeight: 600,
                          color: medicalTheme.palette.primary.main,
                          border: `2px solid ${medicalTheme.palette.primary.main}`,
                          background: 'transparent',
                          '&:hover': {
                            background: alpha(medicalTheme.palette.primary.main, 0.05),
                            borderColor: medicalTheme.palette.primary.main,
                            color: medicalTheme.palette.primary.main,
                            transform: 'translateY(-2px)',
                            boxShadow: `0 4px 12px ${alpha(medicalTheme.palette.primary.main, 0.2)}`,
                          },
                        }}
                        startIcon={<School sx={{ fontSize: '1.4rem', color: medicalTheme.palette.primary.main }} />}
                      >
                        Hướng dẫn
                      </MedicalButton>
                    </Box>
                  </Box>
                </Fade>
              </Box>
            </Container>
          </Box>

          {/* Footer */}
          <Box
            component="footer"
            sx={{
              py: { xs: 6, md: 8 },
              background: `linear-gradient(180deg, ${alpha(medicalTheme.palette.primary.dark, 0.05)}, ${alpha(medicalTheme.palette.primary.main, 0.08)})`,
              borderTop: `1px solid ${alpha(medicalTheme.palette.primary.main,  0.1)}`,
            }}
          >
            <Container maxWidth="lg">
              <Grid container spacing={4}>
                {/* Company Info */}
                <Grid item xs={12} md={4}>
                  <Box>                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, color: medicalTheme.palette.primary.dark }}>
                      Y tế Học đường
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
                      Hệ thống quản lý y tế học đường thông minh, mang lại giải pháp toàn diện cho việc chăm sóc sức khỏe học sinh.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>                      <IconButton
                        size="small"
                        sx={{
                          color: medicalTheme.palette.primary.main,
                          '&:hover': { backgroundColor: alpha(medicalTheme.palette.primary.main, 0.1) },
                        }}
                      >
                        <Facebook sx={{ fontSize: 20 }} />
                      </IconButton>
                      <IconButton
                        size="small"
                        sx={{
                          color: medicalTheme.palette.primary.main,
                          '&:hover': { backgroundColor: alpha(medicalTheme.palette.primary.main, 0.1) },
                        }}
                      >
                        <LinkedIn sx={{ fontSize: 20 }} />
                      </IconButton>
                      <IconButton
                        size="small"
                        sx={{
                          color: medicalTheme.palette.primary.main,
                          '&:hover': { backgroundColor: alpha(medicalTheme.palette.primary.main, 0.1) },
                        }}
                      >
                        <YouTube sx={{ fontSize: 20 }} />
                      </IconButton>
                    </Box>
                  </Box>
                </Grid>

                {/* Quick Links */}
                <Grid item xs={12} sm={6} md={2}>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, color: medicalTheme.palette.primary.dark }}>
                    Truy cập nhanh
                  </Typography>
                  <Stack spacing={1}>
                    <Link
                      component={Button}
                      onClick={() => navigate('/about')}
                      sx={{
                        color: 'text.secondary',
                        textTransform: 'none',
                        justifyContent: 'flex-start',
                        '&:hover': { color: medicalTheme.palette.primary.main },
                      }}
                    >
                      Giới thiệu
                    </Link>
                    <Link
                      component={Button}
                      onClick={() => navigate('/services')}
                      sx={{
                        color: 'text.secondary',
                        textTransform: 'none',
                        justifyContent: 'flex-start',
                        '&:hover': { color: medicalTheme.palette.primary.main },
                      }}
                    >
                      Dịch vụ
                    </Link>
                    <Link
                      component={Button}
                      onClick={() => navigate('/contact')}
                      sx={{
                        color: 'text.secondary',
                        textTransform: 'none',
                        justifyContent: 'flex-start',
                        '&:hover': { color: medicalTheme.palette.primary.main },
                      }}
                    >
                      Liên hệ
                    </Link>
                    <Link
                      component={Button}
                      onClick={() => navigate('/faq')}
                      sx={{
                        color: 'text.secondary',
                        textTransform: 'none',
                        justifyContent: 'flex-start',
                        '&:hover': { color: medicalTheme.palette.primary.main },
                      }}
                    >
                      FAQ
                    </Link>
                  </Stack>
                </Grid>                {/* Medical Services */}
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, color: medicalTheme.palette.primary.dark }}>
                    Dịch vụ y tế
                  </Typography>
                  <Stack spacing={1}>
                    <Link
                      component={Button}
                      onClick={() => navigate('/health-check')}
                      sx={{
                        color: 'text.secondary',
                        textTransform: 'none',
                        justifyContent: 'flex-start',
                        '&:hover': { color: medicalTheme.palette.primary.main },
                      }}
                    >
                      Khám sức khỏe định kỳ
                    </Link>
                    <Link
                      component={Button}
                      onClick={() => navigate('/vaccination')}
                      sx={{
                        color: 'text.secondary',
                        textTransform: 'none',
                        justifyContent: 'flex-start',
                        '&:hover': { color: medicalTheme.palette.primary.main },
                      }}
                    >
                      Tiêm chủng
                    </Link>
                    <Link
                      component={Button}
                      onClick={() => navigate('/health-records')}
                      sx={{
                        color: 'text.secondary',
                        textTransform: 'none',
                        justifyContent: 'flex-start',
                        '&:hover': { color: medicalTheme.palette.primary.main },
                      }}
                    >
                      Hồ sơ sức khỏe
                    </Link>
                    <Link
                      component={Button}
                      onClick={() => navigate('/emergency')}
                      sx={{
                        color: 'text.secondary',
                        textTransform: 'none',
                        justifyContent: 'flex-start',
                        '&:hover': { color: medicalTheme.palette.primary.main },
                      }}
                    >
                      Cấp cứu
                    </Link>
                  </Stack>
                </Grid>

                {/* Support */}
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, color: medicalTheme.palette.primary.dark }}>
                    Hỗ trợ
                  </Typography>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        Hotline
                      </Typography>
                      <Typography variant="body1" fontWeight="600" color={medicalTheme.palette.primary.main}>
                        1800-6868
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        Email
                      </Typography>
                      <Typography variant="body1" fontWeight="600" color={medicalTheme.palette.primary.main}>
                        support@ytehocduong.vn
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        Địa chỉ
                      </Typography>
                      <Typography variant="body1" color="text.primary">
                        123 Đường Y tế, Quận Cầu Giấy, Hà Nội
                      </Typography>
                    </Box>
                  </Stack>
                </Grid>
              </Grid>

              {/* Copyright */}
              <Box
                sx={{
                  mt: 6,
                  pt: 3,
                  borderTop: `1px solid ${alpha(medicalTheme.palette.primary.main, 0.1)}`,
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  © {new Date().getFullYear()} Y tế Học đường. All rights reserved.
                </Typography>
                <Stack direction="row" spacing={3}>
                  <Link
                    component={Button}
                    sx={{
                      color: 'text.secondary',
                      textTransform: 'none',
                      fontSize: '0.875rem',
                      '&:hover': { color: medicalTheme.palette.primary.main },
                    }}
                  >
                    Điều khoản sử dụng
                  </Link>
                  <Link
                    component={Button}
                    sx={{
                      color: 'text.secondary',
                      textTransform: 'none',
                      fontSize: '0.875rem',
                      '&:hover': { color: medicalTheme.palette.primary.main },
                    }}
                  >
                    Chính sách bảo mật
                  </Link>
                </Stack>
              </Box>
            </Container>
          </Box>
        </Box>

        
      </Box>
    </ThemeProvider>
  );
};

export default Homepage;
