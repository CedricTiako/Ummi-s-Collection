import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import Contact from './pages/Contact';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import NotFound from './pages/NotFound';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Context
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';

// Utils
import { initializeLanguage } from './lib/i18n';
import { initializeTheme } from './lib/theme';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize language and theme
    initializeLanguage();
    initializeTheme();
    setIsInitialized(true);
  }, []);

  if (!isInitialized) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <Router>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/admin/login" element={<Login />} />
                  <Route 
                    path="/admin/*" 
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route path="/404" element={<NotFound />} />
                  <Route path="*" element={<Navigate to="/404" replace />} />
                </Routes>
              </main>
              <Footer />
            </div>
            <Toaster position="top-right" />
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;