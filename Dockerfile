# ====================================================
# Stage 1: Build Frontend (React + Vite)
# ====================================================
FROM node:18-alpine AS frontend-builder
WORKDIR /app/frontend

ARG VITE_API_URL=/api
ARG VITE_CLOUDINARY_CLOUD_NAME=tsotl3tf
ARG VITE_CLOUDINARY_UPLOAD_PRESET=civic-issues

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_CLOUDINARY_CLOUD_NAME=$VITE_CLOUDINARY_CLOUD_NAME
ENV VITE_CLOUDINARY_UPLOAD_PRESET=$VITE_CLOUDINARY_UPLOAD_PRESET

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ ./
RUN npm run build

# ====================================================
# Stage 2: Unified Production Server (Backend + Static Frontend)
# ====================================================
FROM node:18-alpine
WORKDIR /app

# Install backend production dependencies
COPY backend/package*.json ./backend/
RUN cd backend && npm install --production

# Copy backend server code
COPY backend/ ./backend/

# Copy compiled frontend build to backend/public for static serving
COPY --from=frontend-builder /app/frontend/dist ./backend/public

WORKDIR /app/backend

# Render, Railway, Fly.io dynamically assign PORT at runtime
ENV PORT=5000
EXPOSE 5000

# Container healthcheck for uptime monitoring
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:${PORT:-5000}/ping || exit 1

CMD ["node", "server.js"]
