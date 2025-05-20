import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Filter } from 'lucide-react';
import { t } from '../lib/i18n';
import { getProducts, getCategories } from '../lib/supabase';
import ProductCard from '../components/ProductCard';
import { Database } from '../types/supabase';

type Product = Database['public']['Tables']['products']['Row'];

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get category from URL query parameter
  const searchParams = new URLSearchParams(location.search);
  const activeCategory = searchParams.get('category') || '';

  useEffect(() => {
    // Reset page when category changes
    setPage(1);
    setProducts([]);
    setHasMore(true);
  }, [activeCategory]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const data = await getProducts({
          category: activeCategory || null,
          page,
          limit: 8,
        });
        
        if (page === 1) {
          setProducts(data);
        } else {
          setProducts((prev) => [...prev, ...data]);
        }
        
        setHasMore(data.length === 8);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [page, activeCategory]);

  const handleCategoryChange = (category: string) => {
    if (category) {
      navigate(`/products?category=${category}`);
    } else {
      navigate('/products');
    }
  };

  const loadMore = () => {
    if (!isLoading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return (
    <div className="pt-24 pb-16 animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Mobile filter button */}
          <button
            className="md:hidden flex items-center mb-4 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg"
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          >
            <Filter className="h-5 w-5 mr-2" />
            {t('products.allCategories')}
          </button>

          {/* Sidebar filters */}
          <div
            className={`w-full md:w-64 md:sticky md:top-24 transition-all duration-300 ${
              mobileFiltersOpen ? 'max-h-screen opacity-100' : 'max-h-0 md:max-h-screen opacity-0 md:opacity-100 overflow-hidden md:overflow-visible'
            }`}
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                {t('products.allCategories')}
              </h2>
              <div className="space-y-2">
                <button
                  onClick={() => handleCategoryChange('')}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                    activeCategory === ''
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {t('products.allCategories')}
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      activeCategory === category
                        ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {t(`products.category.${category}`)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product grid */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white font-heading">
              {activeCategory
                ? t(`products.category.${activeCategory}`)
                : t('products.title')}
            </h1>
            
            {isLoading && products.length === 0 ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                No products found
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                
                {hasMore && (
                  <div className="flex justify-center mt-10">
                    <button
                      onClick={loadMore}
                      disabled={isLoading}
                      className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-md transition-colors disabled:opacity-50"
                    >
                      {isLoading ? t('common.loading') : t('products.loadMore')}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;