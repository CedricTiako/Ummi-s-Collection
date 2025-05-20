import React, { useState, useEffect } from 'react';
import { Upload, X } from 'lucide-react';
import { t } from '../lib/i18n';
import toast from 'react-hot-toast';
import { uploadProductImage } from '../lib/supabase';
import { Database } from '../types/supabase';

type Product = Database['public']['Tables']['products']['Row'];

interface ProductFormProps {
  product?: Product;
  onSubmit: (data: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  onCancel: () => void;
}

const CATEGORIES = ['abaya', 'jallabiya', 'tshirt', 'handbag'];

const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit, onCancel }) => {
  const [name, setName] = useState(product?.name || '');
  const [description, setDescription] = useState(product?.description || '');
  const [price, setPrice] = useState(product?.price.toString() || '');
  const [category, setCategory] = useState(product?.category || 'abaya');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(product?.image_url || '');
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setErrors({ ...errors, image_url: '' });
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = t('admin.products.validation.nameRequired');
    }
    
    if (!description.trim()) {
      newErrors.description = t('admin.products.validation.descriptionRequired');
    }
    
    if (!price.trim()) {
      newErrors.price = t('admin.products.validation.priceRequired');
    } else if (isNaN(Number(price)) || Number(price) <= 0) {
      newErrors.price = t('admin.products.validation.priceNumeric');
    }
    
    if (!category) {
      newErrors.category = t('admin.products.validation.categoryRequired');
    }
    
    if (!imagePreview && !imageFile) {
      newErrors.image_url = t('admin.products.validation.imageRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      let imageUrl = product?.image_url || '';
      
      if (imageFile) {
        setIsUploading(true);
        try {
          imageUrl = await uploadProductImage(imageFile);
        } catch (error) {
          console.error('Error uploading image:', error);
          toast.error('Failed to upload image');
          setIsSubmitting(false);
          setIsUploading(false);
          return;
        }
        setIsUploading(false);
      }
      
      await onSubmit({
        name,
        description,
        price: Number(price),
        category,
        image_url: imageUrl,
      });
      
      resetForm();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to save product');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    if (!product) {
      setName('');
      setDescription('');
      setPrice('');
      setCategory('abaya');
      setImageFile(null);
      setImagePreview('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {t('admin.products.name')}
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) setErrors({ ...errors, name: '' });
          }}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 ${
            errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {t('admin.products.description')}
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            if (errors.description) setErrors({ ...errors, description: '' });
          }}
          rows={3}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 ${
            errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
        ></textarea>
        {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t('admin.products.price')}
          </label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
              if (errors.price) setErrors({ ...errors, price: '' });
            }}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 ${
              errors.price ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
          />
          {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t('admin.products.category')}
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              if (errors.category) setErrors({ ...errors, category: '' });
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {t(`products.category.${cat}`)}
              </option>
            ))}
          </select>
          {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {t('admin.products.image')}
        </label>
        
        <div className={`border-2 border-dashed rounded-lg p-4 text-center ${
          errors.image_url ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
        } ${imagePreview ? 'bg-gray-50 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'}`}>
          {imagePreview ? (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="max-h-48 mx-auto rounded"
              />
              <button
                type="button"
                onClick={() => {
                  setImageFile(null);
                  setImagePreview('');
                }}
                className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="py-4">
              <Upload className="w-10 h-10 mx-auto text-gray-400" />
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {t('admin.products.chooseFile')}
              </p>
            </div>
          )}
          
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className={`opacity-0 absolute inset-0 w-full h-full cursor-pointer ${
              imagePreview ? 'pointer-events-none' : ''
            }`}
            disabled={isUploading}
          />
          
          {!imagePreview && (
            <label
              htmlFor="image"
              className="mt-2 inline-flex items-center px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 cursor-pointer"
            >
              {t('admin.products.chooseFile')}
            </label>
          )}
        </div>
        {errors.image_url && <p className="mt-1 text-sm text-red-500">{errors.image_url}</p>}
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
        >
          {t('admin.products.cancel')}
        </button>
        <button
          type="submit"
          disabled={isSubmitting || isUploading}
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
        >
          {isSubmitting || isUploading ? t('common.loading') : t('admin.products.save')}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;