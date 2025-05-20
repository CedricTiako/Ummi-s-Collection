import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Plus, Trash2, Edit, AlertCircle } from 'lucide-react';
import { t } from '../../lib/i18n';
import { getProducts, createProduct, updateProduct, deleteProduct, signOut } from '../../lib/supabase';
import ProductForm from '../../components/ProductForm';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { Database } from '../../types/supabase';

type Product = Database['public']['Tables']['products']['Row'];

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const { session } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const data = await getProducts({ limit: 100 });
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error(t('common.error'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProduct = () => {
    setCurrentProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = async (id: string) => {
    setIsDeleting(id);
    try {
      await deleteProduct(id);
      setProducts(products.filter(product => product.id !== id));
      toast.success(t('admin.products.success.delete'));
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error(t('common.error'));
    } finally {
      setIsDeleting(null);
      setShowDeleteConfirm(null);
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setCurrentProduct(null);
  };

  const handleSubmitForm = async (data: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      if (currentProduct) {
        // Update existing product
        const updated = await updateProduct(currentProduct.id, data);
        setProducts(products.map(p => (p.id === currentProduct.id ? updated : p)));
        toast.success(t('admin.products.success.update'));
      } else {
        // Create new product
        const created = await createProduct(data);
        setProducts([created, ...products]);
        toast.success(t('admin.products.success.create'));
      }
      setShowForm(false);
      setCurrentProduct(null);
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error(t('common.error'));
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/admin/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (!session) {
    return null;
  }

  return (
    <div className="pt-24 pb-16 animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-heading">
            {t('admin.dashboard.title')}
          </h1>
          <button
            onClick={handleLogout}
            className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 flex items-center"
          >
            <LogOut className="w-5 h-5 mr-1" />
            {t('admin.dashboard.logout')}
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {t('admin.products.title')}
            </h2>
            <button
              onClick={handleAddProduct}
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md flex items-center transition-colors"
            >
              <Plus className="w-5 h-5 mr-1" />
              {t('admin.products.add')}
            </button>
          </div>

          {showForm ? (
            <ProductForm
              product={currentProduct || undefined}
              onSubmit={handleSubmitForm}
              onCancel={handleCancelForm}
            />
          ) : isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              No products found. Add your first product!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {t('admin.products.image')}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {t('admin.products.name')}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {t('admin.products.category')}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {t('admin.products.price')}
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="h-12 w-12 rounded-md object-cover"
                        />
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {product.name}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200">
                          {t(`products.category.${product.category}`)}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {product.price.toLocaleString()} {t('products.currency')}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          {showDeleteConfirm === product.id ? (
                            <div className="flex items-center space-x-2">
                              <AlertCircle className="w-5 h-5 text-red-500" />
                              <button
                                onClick={() => handleDeleteProduct(product.id)}
                                className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                disabled={isDeleting === product.id}
                              >
                                {isDeleting === product.id ? 
                                  t('common.loading') : 
                                  t('admin.products.confirm')}
                              </button>
                              <button
                                onClick={() => setShowDeleteConfirm(null)}
                                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                                disabled={isDeleting === product.id}
                              >
                                {t('admin.products.cancel')}
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setShowDeleteConfirm(product.id)}
                              className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;