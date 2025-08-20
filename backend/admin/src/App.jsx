import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ContentManager from './pages/ContentManager';
import SEOManager from './pages/SEOManager';
import CoursesManager from './pages/CoursesManager';
import FormsManager from './pages/FormsManager';
import BlogManager from './pages/BlogManager';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import PaymentsManager from './pages/PaymentsManager';
import InstagramManager from './pages/InstagramManager';
import LoadingSpinner from './components/LoadingSpinner';



// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Public Route Component (redirect if authenticated)
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  
  if (user) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
          <div className="App">
            <Routes>
              {/* Public Routes */}
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />
              
              {/* Protected Routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Dashboard />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/content"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <ContentManager />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/seo"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <SEOManager />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/courses"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <CoursesManager />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/forms"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <FormsManager />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              
              <Route path="/blog" element={
                <ProtectedRoute>
                  <Layout>
                    <BlogManager />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/payments" element={
                <ProtectedRoute>
                  <Layout>
                    <PaymentsManager />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/instagram" element={
                <ProtectedRoute>
                  <Layout>
                    <InstagramManager />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route
                path="/analytics"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Analytics />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Settings />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              
              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            
            {/* Toast notifications */}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  duration: 3000,
                  theme: {
                    primary: '#4aed88',
                  },
                },
                error: {
                  duration: 5000,
                  theme: {
                    primary: '#f56565',
                  },
                },
              }}
            />
          </div>
    </Router>
  );
}

export default App;