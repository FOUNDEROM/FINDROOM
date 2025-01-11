/*
  # Create PGs Database Schema

  1. New Tables
    - `pgs`
      - `id` (uuid, primary key)
      - `name` (text)
      - `address` (text)
      - `contact` (text)
      - `photos` (text array)
      - `created_at` (timestamp)
      - `owner_id` (uuid, foreign key to auth.users)

  2. Security
    - Enable RLS on `pgs` table
    - Add policies for reading and managing PG listings
*/

CREATE TABLE IF NOT EXISTS pgs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text NOT NULL,
  contact text NOT NULL,
  photos text[] NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  owner_id uuid REFERENCES auth.users(id)
);

-- Enable Row Level Security
ALTER TABLE pgs ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read PG listings
CREATE POLICY "Anyone can view PGs"
  ON pgs
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated owners to manage their PGs
CREATE POLICY "Owners can manage their PGs"
  ON pgs
  FOR ALL
  TO authenticated
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);