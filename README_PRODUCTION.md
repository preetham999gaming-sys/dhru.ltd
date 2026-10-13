# Production checklist and post-deploy smoke tests

After deploying to Vercel and starting the ML service, run these smoke checks:

1. Health endpoint
   curl -s https://<YOUR_DOMAIN>/api/health | jq
   - Ensure db: ok and ml: ok (if ML_SERVICE_URL is set)

2. Create test user and seed packs (locally or via admin)
   node prisma/seed.ts

3. Create Razorpay order (test)
   POST /api/credits/purchase with { userId, packId }

4. Simulate webhook (test mode)
   Use Razorpay dashboard or send a signed POST to /api/razorpay/webhook

5. Request a prediction (requires ML service)
   POST /api/predict with { userId, symbol }

Notes:
- If ML_SERVICE_URL is not configured the app will operate in preview mode.
- Confirm TradingView embedding license before public launch.
