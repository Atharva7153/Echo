# 🏙️ ECHO Backend API (Node.js + Express)

Backend REST API for the Echo Civic Issue Reporting & Engagement Platform.

> For complete documentation, Docker deployment instructions, and screenshots, see the [Root README](../README.md).

## Quick Start (Backend Only)

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env

# 3. (Optional) Seed mock users & points
npm run seed

# 4. Start API server
PORT=5001 npm run dev
```

## Key Endpoints
- `GET /ping` — Uptime monitor ping-pong response (`{"message": "pong"}`)
- `GET /health` — Health check with database connection status
- `GET /api/issues` — Query civic issues
- `POST /api/issues` — Report new issue
- `POST /api/ai/gemini` — Issue AI categorizer stub
- `GET /api/leaderboard` — Civic leaderboard
