# Multi-stage build for backend (FastAPI)
FROM python:3.11-slim as backend-builder

WORKDIR /build

# Install dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt -t ./lib

# Build stage for frontend (React)
FROM node:18-alpine as frontend-builder

WORKDIR /build

# Copy frontend files
COPY frontend/package*.json ./
RUN npm ci --omit=dev

# Copy source
COPY frontend/src ./src
COPY frontend/public ./public
COPY frontend/craco.config.js ./
COPY frontend/tailwind.config.js ./
COPY frontend/postcss.config.js ./
COPY frontend/jsconfig.json ./

# Build the React app
RUN npm run build

# Final stage - production image
FROM python:3.11-slim

WORKDIR /app

# Install curl for healthcheck
RUN apt-get update && apt-get install -y --no-install-recommends curl && rm -rf /var/lib/apt/lists/*

# Copy Python dependencies from builder
COPY --from=backend-builder /build/lib /usr/local/lib/python3.11/site-packages
COPY backend ./backend

# Copy built frontend from builder
COPY --from=frontend-builder /build/build ./frontend/build

# Expose ports
EXPOSE 8000 3000

# Set environment
ENV PYTHONUNBUFFERED=1
ENV NODE_ENV=production

# Create startup script
RUN echo '#!/bin/bash\n\
cd /app/backend && uvicorn server:app --host 0.0.0.0 --port 8000 &\n\
sleep 2\n\
cd /app/frontend && npx serve -s build -l 3000\n\
wait' > /app/start.sh && chmod +x /app/start.sh

CMD ["/app/start.sh"]
