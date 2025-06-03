// Medical Theme Constants - Centralized Configuration
export const MEDICAL_COLORS = {
  primary: {
    main: '#2C5282', // Deep Medical Blue
    light: '#4299E1',
    dark: '#1A365D',
  },
  secondary: {
    main: '#319795', // Medical Teal
    light: '#4FD1C7',
    dark: '#234E52',
  },
  success: {
    main: '#38A169', // Medical Green
    light: '#68D391',
    dark: '#2F855A',
  },
  info: {
    main: '#3182CE', // Clinical Blue
    light: '#63B3ED',
    dark: '#2C5282',
  },
  warning: {
    main: '#D69E2E', // Medical Amber
    light: '#F6E05E',
    dark: '#B7791F',
  },
  error: {
    main: '#E53E3E', // Medical Red
    light: '#FC8181',
    dark: '#C53030',
  },
  background: {
    default: '#F7FAFC', // Clean Medical Environment
    paper: '#ffffff',
  },
  text: {
    primary: '#2D3748', // Professional Reading
    secondary: '#4A5568', // Secondary Text
  },
} as const;

export const MEDICAL_TYPOGRAPHY = {
  fontFamily: '"Inter", "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
  fontWeights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
} as const;

export const MEDICAL_SPACING = {
  borderRadius: {
    small: '8px',
    medium: '12px',
    large: '16px',
    xlarge: '20px',
  },
  shadows: {
    light: '0 4px 32px rgba(44, 82, 130, 0.08)',
    medium: '0 8px 48px rgba(44, 82, 130, 0.12)',
    heavy: '0 12px 48px rgba(44, 82, 130, 0.15)',
  },
} as const;
