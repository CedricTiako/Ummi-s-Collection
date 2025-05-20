import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  if (error) throw error;
  return data;
};

export const getCurrentSession = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const uploadProductImage = async (file: File) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `products/${fileName}`;

  const { error: uploadError, data } = await supabase.storage
    .from('products')
    .upload(filePath, file);

  if (uploadError) {
    throw uploadError;
  }

  const { data: { publicUrl } } = supabase.storage
    .from('products')
    .getPublicUrl(filePath);

  return publicUrl;
};

export const getProducts = async ({ 
  category = null, 
  page = 1, 
  limit = 8 
}: { 
  category?: string | null;
  page?: number;
  limit?: number;
}) => {
  let query = supabase
    .from('products')
    .select('*');

  if (category) {
    query = query.eq('category', category);
  }

  const { data, error } = await query
    .range((page - 1) * limit, page * limit - 1)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const getCategories = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('category');

  if (error) throw error;

  // Get unique categories using Set
  const uniqueCategories = [...new Set(data.map(product => product.category))];
  return uniqueCategories;
};

export const createProduct = async (productData: Omit<Database['public']['Tables']['products']['Insert'], 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('products')
    .insert(productData)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateProduct = async (
  id: string,
  productData: Omit<Database['public']['Tables']['products']['Update'], 'id' | 'created_at' | 'updated_at'>
) => {
  const { data, error } = await supabase
    .from('products')
    .update({ ...productData, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteProduct = async (id: string) => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) throw error;
};