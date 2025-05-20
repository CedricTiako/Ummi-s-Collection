import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import background from '../assets/images/background.jpg';
import background2 from '../assets/images/background2.jpg';
import backgroundMilieu from '../assets/images/background-milieux.jpg';
import abayaImage from '../assets/images/category-abaya.jpg';
import jallabiyaImage from '../assets/images/category-jallabiya.jpg';
import tshirtImage from '../assets/images/category-tshirt.jpg';
import handbagImage from '../assets/images/category-handbag.jpg';
import { t } from '../lib/i18n';
import { getProducts } from '../lib/supabase';
import ProductCard from '../components/ProductCard';
import Carousel from '../components/Carousel';
import { Database } from '../types/supabase';
import '../styles/backgroundAnimations.css';

type Product = Database['public']['Tables']['products']['Row'];

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts({ limit: 4 });
        setFeaturedProducts(products);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="animate-fade-in">
      {/* Hero section */}
      <section 
        className="relative h-screen overflow-hidden"
        style={{ 
          position: 'relative',
          height: '100vh'
        }}
      >
        {/* Carousel */}
        <div className="hero-carousel">
          <Carousel
            images={[background2, backgroundMilieu, background]}
            interval={5000}
          />
        </div>

        {/* Overlay et contenu */}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="container mx-auto px-4 z-20 text-center relative" style={{
          transform: 'translateY(-50%)',
          top: '50%'
        }}>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {t('home.welcome')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8">
            {t('home.subtitle')}
          </p>
          <Link
            to="/products"
            className="inline-flex items-center px-8 py-4 bg-white text-gray-800 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {t('home.shopNow')}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Featured products section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-heading">
              {t('home.featuredProducts')}
            </h2>
            <Link
              to="/products"
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 inline-flex items-center font-medium"
            >
              {t('home.viewAll')} <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : featuredProducts.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              No products found
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Categories section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center font-heading">
            {t('products.title')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              to="/products?category=abaya"
              className="relative h-64 rounded-lg overflow-hidden group"
            >
              <img
                src={abayaImage}
                alt={t('products.category.abaya')}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h3 className="text-white text-2xl font-bold">{t('products.category.abaya')}</h3>
              </div>
            </Link>

            <Link
              to="/products?category=jallabiya"
              className="relative h-64 rounded-lg overflow-hidden group"
            >
              <img
                src={jallabiyaImage}
                alt={t('products.category.jallabiya')}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h3 className="text-white text-2xl font-bold">{t('products.category.jallabiya')}</h3>
              </div>
            </Link>

            <Link
              to="/products?category=tshirt"
              className="relative h-64 rounded-lg overflow-hidden group"
            >
              <img
                src={tshirtImage}
                alt={t('products.category.tshirt')}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h3 className="text-white text-2xl font-bold">{t('products.category.tshirt')}</h3>
              </div>
            </Link>

            <Link
              to="/products?category=handbag"
              className="relative h-64 rounded-lg overflow-hidden group"
            >
              <img
                src={handbagImage}
                alt={t('products.category.handbag')}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h3 className="text-white text-2xl font-bold">{t('products.category.handbag')}</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;