import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { t } from '../lib/i18n';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 animate-fade-in">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary-600 dark:text-primary-400">404</h1>
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mt-4 mb-6">
          {t('common.notFound')}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md transition-colors"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          {t('navigation.home')}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;