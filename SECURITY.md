# Security policies and recommendations

This document summarizes the recommended security setup for dhru.ltd.

1. Secrets
- Keep all secrets in your hosting provider (Vercel) environment variables.
- Do NOT commit any secret to the repository.

2. Database
- Use managed Postgres with IAM or password-protected access.
- Use Prisma Data Proxy for serverless environments or a connection pooler.

3. Cookies and sessions
- Use strong JWT_SECRET and set session cookie to HttpOnly; Secure in production; SameSite=Strict.

4. Webhooks
- Store webhook secrets in env vars and verify signatures (HMAC SHA256) before processing.

5. Rate limiting
- Add per-user rate-limits (e.g., 60 RPM) and stricter limits on paid endpoints.

6. Monitoring & logging
- Configure Sentry for exception monitoring and an APM for ML endpoints.
- Log credit ledger actions and payment events with audit trails.
