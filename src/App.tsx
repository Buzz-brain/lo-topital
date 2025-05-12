import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import LoginPage from './pages/admin/LoginPage';
import SignupPage from './pages/admin/SignupPage';
import ForgotPasswordPage from './pages/admin/ForgotPasswordPage';
import ResetPasswordPage from './pages/admin/ResetPasswordPage';
import DashboardPage from './pages/admin/DashboardPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="blog" element={<BlogPage />} />
          </Route>
          
          {/* Auth Routes */}
          <Route path="admin">
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="reset-password" element={<ResetPasswordPage />} />
            
            {/* Protected Admin Routes */}
            <Route>
            {/* <Route element={<ProtectedRoute />}> */}
              <Route element={<AdminLayout />}>
                <Route path="dashboard" element={<DashboardPage />} />
              </Route>
            </Route>
          </Route>
          
          {/* 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;