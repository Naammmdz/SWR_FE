import React from 'react';
import { Fade, Slide, useScrollTrigger } from '@mui/material';

// Page Transition Component
export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Fade in={true} timeout={600}>
      <div>{children}</div>
    </Fade>
  );
};

// Scroll-triggered Animation
export const ScrollAnimation: React.FC<{ 
  children: React.ReactNode; 
  threshold?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}> = ({ children, threshold = 0.1, direction = 'up' }) => {
  const trigger = useScrollTrigger({
    threshold,
    disableHysteresis: true,
  });

  return (
    <Slide direction={direction} in={trigger} timeout={500}>
      <div>{children}</div>
    </Slide>
  );
};

// Medical-themed Loading Animation
export const MedicalLoader: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '200px',
    }}>
      {/* Heartbeat Animation */}
      <div style={{
        width: '40px',
        height: '40px',
        border: '3px solid #2C5282',
        borderRadius: '50%',
        borderTopColor: 'transparent',
        animation: 'medicalSpin 1s linear infinite',
      }} />
      <style>{`
        @keyframes medicalSpin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
