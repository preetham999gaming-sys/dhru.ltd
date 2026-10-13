# dhru.ltd — Indian markets analysis with TradingView & AI predictions

This repository implements dhru.ltd — a dark-first, mobile-first app for Indian market charts (TradingView widgets) plus a paid AI predictions product sold as credits.

Highlights:
- Next.js 14 (App Router), TypeScript, PostgreSQL (Prisma)
- TradingView embeddable widgets for charts, ticker tape, news timeline, heatmap
- Razorpay for payments; append-only credit ledger with atomic spends and idempotency
- ML prediction engine implemented in Python using walk‑forward evaluation, purged labels, baseline comparison, and calibration reporting
- Strong honesty requirements: if the model doesn't beat baseline OOS, predictions are labelled "not_validated" and neutral.

Quick start (dev)
1. Copy .env.example -> .env and set DATABASE_URL, RAZORPAY_* and CANDLE_API_URL.
2. Install:
   - Node: npm install
   - Python (for ML): pip install -r ml/requirements.txt
3. Prisma:
   npx prisma migrate dev --name init
4. Start the ML service (optional locally):
   uvicorn ml.service:app --reload --port 8000
5. Start dev:
   npm run dev

See /ml for training & evaluation instructions, and /sql for SQL schema.

Deployment
- Create a managed Postgres (Supabase / Neon / ElephantSQL); copy DATABASE_URL into Vercel environment variables.
- Add environment variables from .env.example to Vercel.
- Configure Razorpay keys and webhook endpoint (https://dhru.ltd/api/razorpay/webhook) in Razorpay dashboard; verify signature secret.
- For ML engine: either deploy Python FastAPI to a container (Render/Heroku/GCP Cloud Run) and set ML_SERVICE_URL, or re-implement inference in Node if preferred.
- Use Prisma Data Proxy or a connection pooler for serverless deployments.

Legal & services checklist (must complete before public launch)
- TradingView embedding license
- Licensed news feed
- Razorpay KYC and webhook verification
- OHLCV data provider contract
- SEBI Research Analyst compliance (consult counsel)
- Terms of Service, Privacy Policy, Risk Disclosure
- ML model validation artifacts and documentation
