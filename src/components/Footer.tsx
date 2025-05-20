import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Facebook, MessageCircle, MapPin } from 'lucide-react';
import { t } from '../lib/i18n';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 pt-12 pb-8 mt-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-primary-700 dark:text-primary-300">
              <ShoppingBag className="w-8 h-8" />
              <span className="text-xl font-heading font-bold">
                {t('common.appName')}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {t('home.subtitle')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
              {t('navigation.home')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-300 transition-colors"
                >
                  {t('navigation.home')}
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-300 transition-colors"
                >
                  {t('navigation.products')}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-300 transition-colors"
                >
                  {t('navigation.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
              {t('products.title')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/products?category=abaya"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-300 transition-colors"
                >
                  {t('products.category.abaya')}
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=jallabiya"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-300 transition-colors"
                >
                  {t('products.category.jallabiya')}
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=tshirt"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-300 transition-colors"
                >
                  {t('products.category.tshirt')}
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=handbag"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-300 transition-colors"
                >
                  {t('products.category.handbag')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
              {t('contact.title')}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MessageCircle className="w-5 h-5 text-primary-600 dark:text-primary-300 mr-2 mt-0.5" />
                <div>
                  <p className="text-gray-700 dark:text-gray-300 font-medium">WhatsApp</p>
                  <a
                    href="https://wa.me/237683998930"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-300 transition-colors"
                  >
                    +237 683 998 930
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <Facebook className="w-5 h-5 text-primary-600 dark:text-primary-300 mr-2 mt-0.5" />
                <div>
                  <p className="text-gray-700 dark:text-gray-300 font-medium">Facebook</p>
                  <a
                    href="https://facebook.com/UmmulUmar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-300 transition-colors"
                  >
                    Ummul Umar
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-primary-600 dark:text-primary-300 mr-2 mt-0.5" />
                <div>
                  <p className="text-gray-700 dark:text-gray-300 font-medium">{t('contact.location')}</p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {t('contact.locationDetail')}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-10 pt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} {t('common.appName')}. {t('contact.subtitle')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;