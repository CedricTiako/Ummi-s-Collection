import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Sun, Moon, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { t, languages } from '../lib/i18n';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { isAdmin } = useAuth();
  const location = useLocation();

  // Hide/show header on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white dark:bg-gray-900 shadow-md py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-2 text-primary-700 dark:text-primary-300"
        >
          <ShoppingBag className="w-8 h-8" />
          <span className="text-xl font-heading font-bold">
            {t('common.appName')}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className={`font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-300 ${
              location.pathname === '/'
                ? 'text-primary-600 dark:text-primary-300'
                : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            {t('navigation.home')}
          </Link>
          <Link
            to="/products"
            className={`font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-300 ${
              location.pathname === '/products'
                ? 'text-primary-600 dark:text-primary-300'
                : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            {t('navigation.products')}
          </Link>
          <Link
            to="/contact"
            className={`font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-300 ${
              location.pathname === '/contact'
                ? 'text-primary-600 dark:text-primary-300'
                : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            {t('navigation.contact')}
          </Link>
          {isAdmin && (
            <Link
              to="/admin"
              className={`font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-300 ${
                location.pathname.startsWith('/admin')
                  ? 'text-primary-600 dark:text-primary-300'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              {t('navigation.admin')}
            </Link>
          )}
        </nav>

        {/* Controls (language and theme) */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Language Switcher */}
          <div className="relative group">
            <button
              className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-300"
              aria-label={t('common.language')}
            >
              <Globe className="w-5 h-5" />
              <span className="text-sm">{languages[language as keyof typeof languages]}</span>
            </button>
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
              {Object.entries(languages).map(([code, name]) => (
                <button
                  key={code}
                  onClick={() => setLanguage(code as 'fr' | 'en')}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    language === code
                      ? 'text-primary-600 dark:text-primary-300 font-medium'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-300"
            aria-label={
              theme === 'dark'
                ? t('common.theme.light')
                : t('common.theme.dark')
            }
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-700 dark:text-gray-300"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute w-full bg-white dark:bg-gray-900 transition-all duration-300 ease-in-out shadow-lg ${
          isMenuOpen
            ? 'max-h-screen opacity-100 translate-y-0'
            : 'max-h-0 opacity-0 -translate-y-10 pointer-events-none'
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col">
          <nav className="flex flex-col space-y-4 mb-6">
            <Link
              to="/"
              className={`font-medium p-2 transition-colors ${
                location.pathname === '/'
                  ? 'text-primary-600 dark:text-primary-300'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              {t('navigation.home')}
            </Link>
            <Link
              to="/products"
              className={`font-medium p-2 transition-colors ${
                location.pathname === '/products'
                  ? 'text-primary-600 dark:text-primary-300'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              {t('navigation.products')}
            </Link>
            <Link
              to="/contact"
              className={`font-medium p-2 transition-colors ${
                location.pathname === '/contact'
                  ? 'text-primary-600 dark:text-primary-300'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              {t('navigation.contact')}
            </Link>
            {isAdmin && (
              <Link
                to="/admin"
                className={`font-medium p-2 transition-colors ${
                  location.pathname.startsWith('/admin')
                    ? 'text-primary-600 dark:text-primary-300'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {t('navigation.admin')}
              </Link>
            )}
          </nav>

          <div className="flex items-center justify-between border-t dark:border-gray-700 pt-4">
            {/* Language Switcher */}
            <div className="flex flex-col">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                {t('common.language')}:
              </p>
              <div className="flex space-x-2">
                {Object.entries(languages).map(([code, name]) => (
                  <button
                    key={code}
                    onClick={() => setLanguage(code as 'fr' | 'en')}
                    className={`px-3 py-1 text-sm rounded-md ${
                      language === code
                        ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 font-medium'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Switcher */}
            <div className="flex flex-col items-end">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                {t('common.theme.light')}/{t('common.theme.dark')}:
              </p>
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                aria-label={
                  theme === 'dark'
                    ? t('common.theme.light')
                    : t('common.theme.dark')
                }
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;