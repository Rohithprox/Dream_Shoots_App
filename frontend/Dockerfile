# Dockerfile for Frontend (React)
FROM node:18-alpine as builder

WORKDIR /app

# Copy package files
# Diagnostic: check what's in the current context
RUN ls -la
COPY package*.json ./ || (ls -la .. && ls -la ../frontend && exit 1)

# Install dependencies
RUN npm ci || (npm install && echo "npm ci failed, falling back to npm install")

# Copy configuration and source files
COPY . ./

# Build the application
ARG REACT_APP_BACKEND_URL=https://api.yourdomain.com
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Install serve to run the static site
RUN npm install -g serve

# Copy built files from builder
COPY --from=builder /app/build ./build

# Expose port
EXPOSE 3000

# Set environment
ENV NODE_ENV=production

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:3000 || exit 1

# Serve the application
CMD ["serve", "-s", "build", "-l", "3000"]
