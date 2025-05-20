import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { t } from '../lib/i18n';
import { Database } from '../types/supabase';

type Product = Database['public']['Tables']['products']['Row'];

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const handleOrderClick = () => {
    const whatsappText = encodeURIComponent(
      `Bonjour, je suis intéressé(e) par ${product.name} vu sur Ummi's Collection.`
    );
    window.open(`https://wa.me/237683998930?text=${whatsappText}`, '_blank');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in">
      <div className="h-64 overflow-hidden">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="mb-2">
          <span className="inline-block px-2 py-1 text-xs bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full">
            {product.category === 'abaya'
              ? t('products.category.abaya')
              : product.category === 'jallabiya'
              ? t('products.category.jallabiya')
              : product.category === 'tshirt'
              ? t('products.category.tshirt')
              : t('products.category.handbag')}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
          {product.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 text-sm h-10">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <p className="font-bold text-primary-600 dark:text-primary-300">
            {product.price.toLocaleString()} {t('products.currency')}
          </p>
          <button
            onClick={handleOrderClick}
            className="flex items-center text-sm bg-primary-600 hover:bg-primary-700 text-white px-3 py-2 rounded-md transition-colors"
          >
            <ShoppingBag className="w-4 h-4 mr-1" />
            <span>{t('products.orderViaWhatsApp')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;