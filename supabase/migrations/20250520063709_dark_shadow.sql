/*
  # Create products table

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `description` (text, not null)
      - `price` (numeric, not null)
      - `image_url` (text, not null)
      - `category` (text, not null)
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, nullable)
  2. Security
    - Enable RLS on `products` table
    - Add policy for authenticated users to select, insert, update, and delete data
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price numeric NOT NULL,
  image_url text NOT NULL,
  category text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to view all products
CREATE POLICY "Anyone can view products"
  ON products
  FOR SELECT
  TO authenticated, anon
  USING (true);

-- Allow authenticated users to insert products
CREATE POLICY "Authenticated users can insert products"
  ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update their products
CREATE POLICY "Authenticated users can update products"
  ON products
  FOR UPDATE
  TO authenticated
  USING (true);

-- Allow authenticated users to delete products
CREATE POLICY "Authenticated users can delete products"
  ON products
  FOR DELETE
  TO authenticated
  USING (true);