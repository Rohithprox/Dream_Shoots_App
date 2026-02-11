#!/bin/bash

# Dream Shoots App - Start Script for Railway
# This script determines what to run based on environment and available services

set -e

echo "🚀 Starting Dream Shoots App..."

# Determine which service to run
if [ "$SERVICE" = "backend" ] || [ -z "$SERVICE" ]; then
    echo "📦 Starting Backend Service..."
    cd backend
    
    # Install dependencies
    echo "📥 Installing Python dependencies..."
    pip install --no-cache-dir -r requirements.txt
    
    # Run backend with Uvicorn
    echo "✅ Backend starting on port ${PORT:-8000}"
    exec uvicorn server:app --host 0.0.0.0 --port ${PORT:-8000}
    
elif [ "$SERVICE" = "frontend" ]; then
    echo "📦 Starting Frontend Service..."
    cd frontend
    
    # Install dependencies
    echo "📥 Installing Node dependencies..."
    npm ci
    
    # Build frontend
    echo "🔨 Building frontend..."
    npm run build
    
    # Serve frontend
    echo "✅ Frontend starting on port ${PORT:-3000}"
    exec npx serve -s build -l ${PORT:-3000}
    
else
    echo "❌ Unknown service: $SERVICE"
    echo "Set SERVICE=backend or SERVICE=frontend"
    exit 1
fi
