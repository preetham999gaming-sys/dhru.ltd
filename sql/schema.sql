-- Basic tables (if not using Prisma migrations)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  is_email_verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE credit_packs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  credits int NOT NULL,
  price_inr int NOT NULL,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE credits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id),
  change int NOT NULL,
  balance int NOT NULL,
  reason text,
  meta jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE purchases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id),
  razorpay_order_id text UNIQUE,
  razorpay_payment_id text UNIQUE,
  pack_id uuid REFERENCES credit_packs(id),
  amount int NOT NULL,
  currency text DEFAULT 'INR',
  status text,
  meta jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE prediction_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  symbol text NOT NULL,
  credits_used int NOT NULL,
  result jsonb,
  status text,
  created_at timestamptz DEFAULT now(),
  completed_at timestamptz
);
