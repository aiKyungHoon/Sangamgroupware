import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import OrganizationChart from './pages/OrganizationChart';
import WorshipManagement from './pages/WorshipManagement';
import EducationManagement from './pages/EducationManagement';
import EvangelismManagement from './pages/EvangelismManagement';
import AccountingManagement from './pages/AccountingManagement';
import VisitationManagement from './pages/VisitationManagement';

function ProtectedRoute({ children, roles }: { children: React.ReactNode, roles: string[] }) {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (!roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        
        {/* Protected Routes */}
        <Route path="/org" element={
          <ProtectedRoute roles={['ADMIN', 'USER']}>
            <OrganizationChart />
          </ProtectedRoute>
        } />
        <Route path="/worship" element={
          <ProtectedRoute roles={['ADMIN', 'USER']}>
            <WorshipManagement />
          </ProtectedRoute>
        } />
        <Route path="/education" element={
          <ProtectedRoute roles={['ADMIN', 'USER']}>
            <EducationManagement />
          </ProtectedRoute>
        } />
        <Route path="/evangelism" element={
          <ProtectedRoute roles={['ADMIN', 'USER']}>
            <EvangelismManagement />
          </ProtectedRoute>
        } />
        <Route path="/accounting" element={
          <ProtectedRoute roles={['ADMIN']}>
            <AccountingManagement />
          </ProtectedRoute>
        } />
        <Route path="/visitation" element={
          <ProtectedRoute roles={['ADMIN', 'USER']}>
            <VisitationManagement />
          </ProtectedRoute>
        } />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}
