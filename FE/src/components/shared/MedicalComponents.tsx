import React from 'react';
import { Button, Card, Avatar, styled, alpha, createTheme } from '@mui/material';

// Shared Medical Theme (exact same as Homepage/Login)
export const medicalTheme = createTheme({
  palette: {
    primary: {
      main: '#2C5282', // Deep Medical Blue
      light: '#4299E1',
      dark: '#1A365D',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#319795', // Medical Teal
      light: '#4FD1C7',
      dark: '#234E52',
      contrastText: '#ffffff',
    },
    success: {
      main: '#38A169', // Medical Green
      light: '#68D391',
      dark: '#2F855A',
      contrastText: '#ffffff',
    },
    background: {
      default: '#F7FAFC',
      paper: '#ffffff',
    },
    text: {
      primary: '#2D3748',
      secondary: '#4A5568',
    },
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 16,
  },
});

// Shared Medical Button Component
export const MedicalButton = styled(Button)(() => ({
  borderRadius: '16px',
  textTransform: 'none',
  fontWeight: 600,
  padding: '16px 32px',
  fontSize: '1.1rem',
  background: `linear-gradient(135deg, ${medicalTheme.palette.primary.main}, ${medicalTheme.palette.primary.dark})`,
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 8px 24px ${alpha(medicalTheme.palette.primary.main, 0.4)}`,
  },
}));

// Shared Medical Card Component
export const MedicalCard = styled(Card)(() => ({
  borderRadius: '20px',
  boxShadow: '0 4px 32px rgba(44, 82, 130, 0.08)',
  border: '1px solid rgba(226, 232, 240, 0.8)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 48px rgba(44, 82, 130, 0.15)',
  },
}));

// Shared Medical Avatar Component
export const MedicalAvatar = styled(Avatar)(() => ({
  background: `linear-gradient(135deg, ${medicalTheme.palette.primary.main}, ${medicalTheme.palette.primary.dark})`,
  boxShadow: `0 8px 24px ${alpha(medicalTheme.palette.primary.main, 0.3)}`,
}));
