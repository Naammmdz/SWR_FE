import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
} from '@mui/material';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

interface HealthEvent {
  id: string;
  studentName: string;
  class: string;
  eventType: string;
  description: string;
  timestamp: Date;
  severity: 'low' | 'medium' | 'high';
  status: 'pending' | 'resolved' | 'ongoing';
  treatment?: string;
}

interface HealthEventDetailDialogProps {
  open: boolean;
  onClose: () => void;
  event: HealthEvent | null;
}

const HealthEventDetailDialog: React.FC<HealthEventDetailDialogProps> = ({
  open,
  onClose,
  event,
}) => {
  if (!event) return null;

  const getSeverityColor = (severity: string): "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" => {
    switch (severity) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string): "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" => {
    switch (status) {
      case 'resolved': return 'success';
      case 'ongoing': return 'warning';
      case 'pending': return 'info';
      default: return 'default';
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Chi tiết sự kiện y tế
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Thông tin cơ bản
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText 
                primary="Học sinh" 
                secondary={`${event.studentName} - Lớp ${event.class}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Loại sự kiện" 
                secondary={event.eventType}
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Thời gian" 
                secondary={format(event.timestamp, 'dd/MM/yyyy HH:mm', { locale: vi })}
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Mức độ nghiêm trọng" 
                secondary={
                  <Chip 
                    label={event.severity === 'high' ? 'Cao' : event.severity === 'medium' ? 'Trung bình' : 'Thấp'} 
                    color={getSeverityColor(event.severity)}
                    size="small"
                  />
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Trạng thái" 
                secondary={
                  <Chip 
                    label={
                      event.status === 'resolved' ? 'Đã xử lý' : 
                      event.status === 'ongoing' ? 'Đang xử lý' : 'Chờ xử lý'
                    } 
                    color={getStatusColor(event.status)}
                    size="small"
                  />
                }
              />
            </ListItem>
          </List>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Mô tả chi tiết
          </Typography>
          <Typography variant="body1" paragraph>
            {event.description}
          </Typography>
        </Box>

        {event.treatment && (
          <>
            <Divider sx={{ my: 2 }} />
            <Box>
              <Typography variant="h6" gutterBottom>
                Phương pháp xử lý
              </Typography>
              <Typography variant="body1">
                {event.treatment}
              </Typography>
            </Box>
          </>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Đóng</Button>
        <Button variant="contained">Cập nhật</Button>
      </DialogActions>
    </Dialog>
  );
};

export default HealthEventDetailDialog;
