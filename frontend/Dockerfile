# Dockerfile for Frontend (React)
FROM node:18-alpine as builder

WORKDIR /app

# Copy package files
COPY frontend/package*.json ./frontend/

# Install dependencies
WORKDIR /app/frontend
RUN npm ci

# Copy configuration and source files
WORKDIR /app
COPY frontend/src ./frontend/src
COPY frontend/public ./frontend/public
COPY frontend/craco.config.js ./frontend/
COPY frontend/tailwind.config.js ./frontend/
COPY frontend/postcss.config.js ./frontend/
COPY frontend/jsconfig.json ./frontend/
COPY frontend/components.json ./frontend/

# Build the application
WORKDIR /app/frontend
ARG REACT_APP_BACKEND_URL=https://api.yourdomain.com
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Install serve to run the static site
RUN npm install -g serve

# Copy built files from builder
COPY --from=builder /app/frontend/build ./frontend/build

# Expose port
EXPOSE 3000

# Set environment
ENV NODE_ENV=production

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:3000 || exit 1

# Serve the application
CMD ["serve", "-s", "frontend/build", "-l", "3000"]
