# Dockerfile for Frontend (React)
FROM node:18-alpine as builder

WORKDIR /app

# Copy everything from the context
COPY . .

# Install dependencies (use legacy-peer-deps to resolve react-day-picker/date-fns conflict)
RUN npm install --legacy-peer-deps

# Build the application
ARG REACT_APP_BACKEND_URL
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
