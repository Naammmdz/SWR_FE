import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import UserPermissions from './components/UserPermissions';
import Home from './pages/Home';
import Homepage from './pages/Homepage';
import StudentHealth from './pages/StudentHealth';
import MedicineManagement from './pages/MedicineManagement';
import HealthEvents from './pages/HealthEvents';
import Vaccination from './pages/Vaccination';
import HealthCheck from './pages/HealthCheck';
import UserManagement from './pages/UserManagement';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { Permission } from './utils/permissions';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#4caf50',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NotificationProvider>        <AuthProvider>          <Router>            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Homepage />} />
              <Route path="/dashboard" element={<Layout />}>
                <Route index element={<Home />} />
                <Route 
                  path="main" 
                  element={
                    <ProtectedRoute requiredPermissions={[Permission.VIEW_DASHBOARD]}>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />                <Route 
                  path="student-health" 
                  element={
                    <ProtectedRoute requiredPermissions={[Permission.MANAGE_HEALTH_RECORDS, Permission.VIEW_OWN_CHILD_HEALTH]}>
                      <StudentHealth />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="medicine" 
                  element={
                    <ProtectedRoute requiredPermissions={[Permission.SUBMIT_MEDICINE_REQUEST, Permission.APPROVE_MEDICINES]}>
                      <MedicineManagement />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="health-events" 
                  element={
                    <ProtectedRoute requiredPermissions={[Permission.HANDLE_MEDICAL_EVENTS, Permission.REPORT_HEALTH_INCIDENTS]}>
                      <HealthEvents />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="vaccination" 
                  element={
                    <ProtectedRoute requiredPermissions={[Permission.MANAGE_VACCINATIONS, Permission.VIEW_VACCINATION_SCHEDULE]}>
                      <Vaccination />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="health-check" 
                  element={
                    <ProtectedRoute requiredPermissions={[Permission.CONDUCT_HEALTH_CHECKS]}>
                      <HealthCheck />
                    </ProtectedRoute>
                  } 
                />                <Route 
                  path="users" 
                  element={
                    <ProtectedRoute requiredPermissions={[Permission.MANAGE_USERS]}>
                      <UserManagement />
                    </ProtectedRoute>
                  } 
                />
                <Route path="permissions" element={<UserPermissions />} />
              </Route>
            </Routes>
          </Router>
        </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
