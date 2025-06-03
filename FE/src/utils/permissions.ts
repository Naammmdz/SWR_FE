// Định nghĩa các quyền hạn trong hệ thống
export enum Permission {
  // Quyền quản trị
  MANAGE_USERS = 'manage_users',
  MANAGE_SYSTEM = 'manage_system',
  VIEW_ALL_REPORTS = 'view_all_reports',
  
  // Quyền y tế
  MANAGE_HEALTH_RECORDS = 'manage_health_records',
  CONDUCT_HEALTH_CHECKS = 'conduct_health_checks',
  MANAGE_VACCINATIONS = 'manage_vaccinations',
  HANDLE_MEDICAL_EVENTS = 'handle_medical_events',
  APPROVE_MEDICINES = 'approve_medicines',
  VIEW_MEDICAL_REPORTS = 'view_medical_reports',
  
  // Quyền phụ huynh
  VIEW_OWN_CHILD_HEALTH = 'view_own_child_health',
  SUBMIT_MEDICINE_REQUEST = 'submit_medicine_request',
  VIEW_VACCINATION_SCHEDULE = 'view_vaccination_schedule',
  RECEIVE_HEALTH_NOTIFICATIONS = 'receive_health_notifications',
  
  // Quyền giáo viên
  VIEW_CLASS_HEALTH_STATUS = 'view_class_health_status',
  REPORT_HEALTH_INCIDENTS = 'report_health_incidents',
  VIEW_STUDENT_BASIC_HEALTH = 'view_student_basic_health',
  
  // Quyền chung
  VIEW_DASHBOARD = 'view_dashboard',
  UPDATE_PROFILE = 'update_profile',
}

export type UserRole = 'admin' | 'medical_staff' | 'parent' | 'teacher';

// Định nghĩa quyền hạn cho từng vai trò
export const rolePermissions: Record<UserRole, Permission[]> = {
  admin: [
    // Quản trị viên có tất cả quyền
    Permission.MANAGE_USERS,
    Permission.MANAGE_SYSTEM,
    Permission.VIEW_ALL_REPORTS,
    Permission.MANAGE_HEALTH_RECORDS,
    Permission.CONDUCT_HEALTH_CHECKS,
    Permission.MANAGE_VACCINATIONS,
    Permission.HANDLE_MEDICAL_EVENTS,
    Permission.APPROVE_MEDICINES,
    Permission.VIEW_MEDICAL_REPORTS,
    Permission.VIEW_CLASS_HEALTH_STATUS,
    Permission.REPORT_HEALTH_INCIDENTS,
    Permission.VIEW_STUDENT_BASIC_HEALTH,
    Permission.VIEW_DASHBOARD,
    Permission.UPDATE_PROFILE,
  ],
  
  medical_staff: [
    // Nhân viên y tế
    Permission.MANAGE_HEALTH_RECORDS,
    Permission.CONDUCT_HEALTH_CHECKS,
    Permission.MANAGE_VACCINATIONS,
    Permission.HANDLE_MEDICAL_EVENTS,
    Permission.APPROVE_MEDICINES,
    Permission.VIEW_MEDICAL_REPORTS,
    Permission.VIEW_CLASS_HEALTH_STATUS,
    Permission.VIEW_STUDENT_BASIC_HEALTH,
    Permission.VIEW_DASHBOARD,
    Permission.UPDATE_PROFILE,
  ],
  
  parent: [
    // Phụ huynh
    Permission.VIEW_OWN_CHILD_HEALTH,
    Permission.SUBMIT_MEDICINE_REQUEST,
    Permission.VIEW_VACCINATION_SCHEDULE,
    Permission.RECEIVE_HEALTH_NOTIFICATIONS,
    Permission.VIEW_DASHBOARD,
    Permission.UPDATE_PROFILE,
  ],
  
  teacher: [
    // Giáo viên
    Permission.VIEW_CLASS_HEALTH_STATUS,
    Permission.REPORT_HEALTH_INCIDENTS,
    Permission.VIEW_STUDENT_BASIC_HEALTH,
    Permission.VIEW_DASHBOARD,
    Permission.UPDATE_PROFILE,
  ],
};

// Hàm kiểm tra quyền hạn
export const hasPermission = (userRole: UserRole, permission: Permission): boolean => {
  return rolePermissions[userRole]?.includes(permission) || false;
};

// Hàm kiểm tra nhiều quyền hạn
export const hasAnyPermission = (userRole: UserRole, permissions: Permission[]): boolean => {
  return permissions.some(permission => hasPermission(userRole, permission));
};

// Hàm kiểm tra tất cả quyền hạn
export const hasAllPermissions = (userRole: UserRole, permissions: Permission[]): boolean => {
  return permissions.every(permission => hasPermission(userRole, permission));
};

// Thông tin chi tiết về từng quyền
export const permissionDescriptions: Record<Permission, string> = {
  [Permission.MANAGE_USERS]: 'Quản lý người dùng (thêm, sửa, xóa tài khoản)',
  [Permission.MANAGE_SYSTEM]: 'Quản lý hệ thống (cấu hình, backup, restore)',
  [Permission.VIEW_ALL_REPORTS]: 'Xem tất cả báo cáo của hệ thống',
  [Permission.MANAGE_HEALTH_RECORDS]: 'Quản lý hồ sơ sức khỏe học sinh',
  [Permission.CONDUCT_HEALTH_CHECKS]: 'Thực hiện khám sức khỏe định kỳ',
  [Permission.MANAGE_VACCINATIONS]: 'Quản lý tiêm chủng',
  [Permission.HANDLE_MEDICAL_EVENTS]: 'Xử lý các sự kiện y tế',
  [Permission.APPROVE_MEDICINES]: 'Duyệt thuốc từ phụ huynh',
  [Permission.VIEW_MEDICAL_REPORTS]: 'Xem báo cáo y tế',
  [Permission.VIEW_OWN_CHILD_HEALTH]: 'Xem thông tin sức khỏe con em',
  [Permission.SUBMIT_MEDICINE_REQUEST]: 'Gửi yêu cầu thuốc cho con',
  [Permission.VIEW_VACCINATION_SCHEDULE]: 'Xem lịch tiêm chủng',
  [Permission.RECEIVE_HEALTH_NOTIFICATIONS]: 'Nhận thông báo sức khỏe',
  [Permission.VIEW_CLASS_HEALTH_STATUS]: 'Xem tình trạng sức khỏe lớp học',
  [Permission.REPORT_HEALTH_INCIDENTS]: 'Báo cáo sự cố sức khỏe',
  [Permission.VIEW_STUDENT_BASIC_HEALTH]: 'Xem thông tin sức khỏe cơ bản học sinh',
  [Permission.VIEW_DASHBOARD]: 'Xem trang tổng quan',
  [Permission.UPDATE_PROFILE]: 'Cập nhật thông tin cá nhân',
};

// Mapping giữa route và quyền cần thiết
export const routePermissions: Record<string, Permission[]> = {
  '/dashboard': [Permission.VIEW_DASHBOARD],
  '/student-health': [Permission.MANAGE_HEALTH_RECORDS, Permission.VIEW_OWN_CHILD_HEALTH],
  '/medicine': [Permission.SUBMIT_MEDICINE_REQUEST, Permission.APPROVE_MEDICINES],
  '/health-events': [Permission.HANDLE_MEDICAL_EVENTS, Permission.REPORT_HEALTH_INCIDENTS],
  '/vaccination': [Permission.MANAGE_VACCINATIONS, Permission.VIEW_VACCINATION_SCHEDULE],
  '/health-check': [Permission.CONDUCT_HEALTH_CHECKS],
  '/users': [Permission.MANAGE_USERS],
};
