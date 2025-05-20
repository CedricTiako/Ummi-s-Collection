import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import background from '../assets/images/background.jpg';
import background2 from '../assets/images/background2.jpg';
import backgroundMilieu from '../assets/images/background-milieux.jpg';
import { t } from '../lib/i18n';
import { getProducts } from '../lib/supabase';
import ProductCard from '../components/ProductCard';
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
        {/* Fond gauche */}
        <div 
          className="absolute top-0 left-0 w-1/3 h-full bg-cover bg-center background-left"
          style={{ 
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center left',
            opacity: 0.8
          }}
        />
        
        {/* Fond milieu */}
        <div 
          className="absolute top-0 left-1/3 w-1/3 h-full bg-cover bg-center background-center parallax"
          style={{ 
            backgroundImage: `url(${backgroundMilieu})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            opacity: 0.9
          }}
        />
        
        {/* Fond droit */}
        <div 
          className="absolute top-0 right-0 w-1/3 h-full bg-cover bg-center background-right"
          style={{ 
            backgroundImage: `url(${background2})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center right',
            opacity: 0.8
          }}
        />
        
        {/* Overlay et contenu */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="container mx-auto px-4 z-10 text-center relative" style={{
          transform: 'translateY(-50%)',
          top: '50%'
        }}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-heading animate-bounce">
            {t('home.welcome')}
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto animate-pulse">
            {t('home.subtitle')}
          </p>
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md transition-colors animate-bounce hover:animate-none"
          >
            {t('home.shopNow')}
            <ArrowRight className="ml-2 h-5 w-5" />
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
                src="https://images.pexels.com/photos/6347885/pexels-photo-6347885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
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
                src="https://images.pexels.com/photos/6348057/pexels-photo-6348057.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
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
                src="https://images.pexels.com/photos/5868207/pexels-photo-5868207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
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
                src="https://images.pexels.com/photos/1204464/pexels-photo-1204464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
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