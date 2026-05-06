import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import HeaderPoster from './visitor/components/HeaderPoster';
import NavComp from './visitor/components/NavComp';
import Footer from './visitor/components/Footer';
import EmailCapture from './visitor/components/EmailCapture';
import Home from './visitor/pages/Home';
import About from './visitor/pages/About';
import Services from './visitor/pages/Services';
import Contact from './visitor/pages/Contact';
import Login from './adminControl/comp/Login';
import AdminDashboard from './adminControl/pages/AdminDashboard';
import AdminPortal from './adminControl/pages/AdminPortal';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = React.useContext(AuthContext);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/admin-portal" replace />;
};

// Layout component for pages with HeaderPoster and Nav
const Layout = ({ children, showHeaderPoster = true }) => {
  return (
    <div className="w-full min-h-screen relative">
      {/* Container with flex order - Nav on top for mobile, HeaderPoster on top for desktop */}
      <div className="flex flex-col">
        {/* Nav - appears first on mobile, second on desktop, sticky when scrolling */}
        <div className="order-1 md:order-2">
          <NavComp />
        </div>

        {/* HeaderPoster - appears second on mobile, first on desktop */}
        {showHeaderPoster && (
          <div className="order-2 md:order-1 m-2 mb-4  md:m-0 md:p-0 relative z-10">
            <div className="rounded-lg shadow-2xl overflow-hidden">
              <HeaderPoster />
            </div>
          </div>
        )}
      </div>
      {/* Content starts below HeaderPoster and Nav */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Footer */}
      <Footer />

      {/* Email Capture Modal */}
      <EmailCapture />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes with layout */}
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/about"
            element={
              <Layout showHeaderPoster={false}>
                <About />
              </Layout>
            }
          />
          <Route
            path="/services"
            element={
              <Layout showHeaderPoster={false}>
                <Services />
              </Layout>
            }
          />
          <Route
            path="/contact"
            element={
              <Layout showHeaderPoster={false}>
                <Contact />
              </Layout>
            }
          />
          {/* Admin Portal Routes - Not linked publicly */}
          <Route
            path="/admin-portal"
            element={<AdminPortal />}
          />
          <Route
            path="/admin-portal/login"
            element={<Login />}
          />

          {/* Protected admin route */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
