# Dream Shoots App - Production Deployment Guide

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Architecture Overview](#architecture-overview)
3. [Local Development Setup](#local-development-setup)
4. [Production Build & Configuration](#production-build--configuration)
5. [Railway Deployment Guide](#railway-deployment-guide)
6. [Frontend-Backend Connection](#frontend-backend-connection)
7. [Monitoring & Troubleshooting](#monitoring--troubleshooting)

---

## Prerequisites

### Required Tools & Accounts
- **Node.js** v18+ (LTS recommended)
- **Python** 3.11+
- **Git**
- **Docker** (optional but recommended)
- **MongoDB Atlas** account (free tier available)
- **Railway.app** account (free tier available)
- **GitHub** repository access

### Accounts Setup
1. **MongoDB Atlas**: Create cluster at https://www.mongodb.com/cloud/atlas
2. **Railway**: Sign up at https://railway.app
3. **GitHub**: Connect repository to Railway

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Railway.app                          │
│  ┌──────────────────┐        ┌────────────────────┐   │
│  │  Frontend (React)│◄──────►│ Backend (FastAPI)  │   │
│  │  Port: 3000      │        │ Port: 8000         │   │
│  └──────────────────┘        └────────────────────┘   │
│           │                            │               │
│           ▼                            ▼               │
│    ┌────────────────────────────────────────┐          │
│    │      MongoDB Atlas Cluster             │          │
│    │  (Bookings & Application Data)        │          │
│    └────────────────────────────────────────┘          │
└─────────────────────────────────────────────────────────┘
```

---

## Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Rohithprox/Dream_Shoots_App.git
cd Dream_Shoots_App-main
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Edit .env with your configuration
nano .env
```

**Backend .env contents:**
```env
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
DB_NAME=dream_shoots
ENVIRONMENT=development
FRONTEND_URL=http://localhost:3000
CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

### 3. Frontend Setup

```bash
# Open new terminal, navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with backend URL
# REACT_APP_BACKEND_URL=http://localhost:8000
```

### 4. Run Development Environment

**Terminal 1 - Backend:**
```bash
cd backend
uvicorn server:app --reload --host 0.0.0.0 --port 8000
# Backend running on http://localhost:8000
# API docs available at http://localhost:8000/docs
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
# Frontend running on http://localhost:3000
```

---

## Production Build & Configuration

### 1. Frontend Production Build

```bash
cd frontend

# Set production backend URL
set REACT_APP_BACKEND_URL=https://api.yourdomain.com

# Create optimized build
npm run build

# Test the build locally (requires 'serve' package)
npx serve -s build -l 3000
```

### 2. Backend Production Configuration

Ensure your `.env` file in backend has:
```env
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
DB_NAME=dream_shoots
ENVIRONMENT=production
FRONTEND_URL=https://yourdomain.com
CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

### 3. Docker Build (Local Testing)

**Build Backend Docker Image:**
```bash
docker build -f backend/Dockerfile -t dream-shoots-backend:latest ./
docker run -p 8000:8000 \
  -e MONGO_URL="your_mongo_url" \
  -e DB_NAME="dream_shoots" \
  -e FRONTEND_URL="http://localhost:3000" \
  dream-shoots-backend:latest
```

**Build Frontend Docker Image:**
```bash
docker build -f frontend/Dockerfile \
  --build-arg REACT_APP_BACKEND_URL=http://localhost:8000 \
  -t dream-shoots-frontend:latest ./

docker run -p 3000:3000 dream-shoots-frontend:latest
```

---

## Railway Deployment Guide

### Step 1: Prepare Repository

1. **Push to GitHub:**
```bash
git add .
git commit -m "Production ready: Add Dockerfile, railway.toml, env configs"
git push origin main
```

2. **Verify key files exist:**
   - `railway.toml`
   - `Dockerfile` (or separate `backend/Dockerfile` and `frontend/Dockerfile`)
   - `backend/requirements.txt`
   - `frontend/package.json`

### Step 2: Create Railway Project

1. Go to https://railway.app/dashboard
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your GitHub repository
5. Authorize Railway to access GitHub

### Step 3: Configure Backend Service

1. **Add Environment Variables:**
   - `MONGO_URL`: Your MongoDB Atlas connection string
   - `DB_NAME`: `dream_shoots`
   - `ENVIRONMENT`: `production`
   - `FRONTEND_URL`: Your frontend domain (Railway will provide)
   - `CORS_ORIGINS`: Comma-separated list of allowed origins

2. **Set Port:** Railway automatically assigns `$PORT` variable
   - Backend will use this automatically

3. **Configure Health Check:**
   - Railway should detect `/health` endpoint automatically

### Step 4: Configure Frontend Service

1. **Build Arguments:**
   - `REACT_APP_BACKEND_URL`: Your backend Railway URL

2. **Environment Variables:**
   - `NODE_ENV`: `production`

### Step 5: Setup Custom Domain

1. In Railway Dashboard → Project Settings
2. Go to "Domains"
3. Add custom domain for frontend:
   - `yourdomain.com` → Frontend service
   - `api.yourdomain.com` → Backend service

4. Update DNS records at your domain provider:
   ```
   CNAME: yourdomain.com → your-railway-domain.railway.app
   CNAME: api.yourdomain.com → your-railway-api-domain.railway.app
   ```

### Step 6: Deploy

Railway should automatically deploy when you push to GitHub. Monitor deployment in Dashboard → Deployments.

---

## Frontend-Backend Connection

### API Configuration

**Frontend expects environment variable:**
```env
REACT_APP_BACKEND_URL=https://api.yourdomain.com
```

**Frontend API calls example (from BookingSection.js):**
```javascript
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Create booking
await axios.post(`${API}/bookings`, formData);

// Get bookings (admin)
await axios.get(`${API}/bookings`);
```

### Backend API Endpoints

All endpoints require `CORS_ORIGINS` to include your frontend domain.

**Available Endpoints:**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/` | API status |
| GET | `/health` | Health check |
| POST | `/api/bookings` | Create new booking |
| GET | `/api/bookings` | List all bookings |
| GET | `/api/bookings/{booking_id}` | Get booking details |
| PATCH | `/api/bookings/{booking_id}/status` | Update booking status |
| DELETE | `/api/bookings/{booking_id}` | Delete booking |

### Testing Connection

1. **Check Backend Health:**
```bash
curl https://api.yourdomain.com/health
# Expected response: {"status": "healthy", "environment": "production", "version": "1.0.0"}
```

2. **Test CORS:**
```bash
curl -H "Origin: https://yourdomain.com" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -X OPTIONS https://api.yourdomain.com/api/bookings -v
```

---

## Monitoring & Troubleshooting

### Check Logs

**Railway Dashboard:**
1. Go to Project → Services
2. Select service → "View Logs"
3. Real-time logs appear

**Check Specific Issues:**

**Frontend shows "Cannot connect to backend":**
- Verify `REACT_APP_BACKEND_URL` is set correctly
- Check backend service is running: `curl https://api.yourdomain.com/health`
- Verify CORS settings in backend `.env`

**Backend returns 500 errors:**
- Check MongoDB connection string in `.env`
- Verify MongoDB cluster is accessible from Railway
- Check database name matches: `dream_shoots`

**Build fails on Railway:**
- Verify `requirements.txt` has all dependencies
- Check `package.json` has build script
- Review build logs for specific errors

### Performance Optimization

1. **Enable Caching:**
   - Railway caches Docker layers automatically
   - Use `.dockerignore` to exclude unnecessary files

2. **Database Optimization:**
   - Add indexes to MongoDB
   - Implement pagination for booking list

3. **Frontend Optimization:**
   - Code splitting (handled by create-react-app)
   - Lazy loading components
   - Image optimization

### Scaling

To handle more traffic:

1. **Increase Railway Resources:**
   - Go to Service Settings
   - Increase RAM/CPU allocation

2. **Enable Auto-scaling:**
   - Railway Team plan includes auto-scaling
   - Set min/max replicas

3. **Database Scaling:**
   - MongoDB Atlas offers auto-scaling
   - Monitor connection pool usage

---

## Important Notes

### Environment Variables

**DO NOT commit `.env` file to GitHub**
- Add to `.gitignore`: `backend/.env`, `frontend/.env`
- Only commit `.env.example`
- Set real values in Railway Dashboard

### Security Checklist

- [ ] MongoDB credentials are strong
- [ ] CORS_ORIGINS only includes your domain
- [ ] ENVIRONMENT=production in production
- [ ] SSL/HTTPS enabled (Railway provides automatically)
- [ ] Regular backups of MongoDB data
- [ ] Monitor booking data for compliance

### Maintenance

**Weekly:**
- Check Railway logs for errors
- Monitor MongoDB storage usage
- Review new bookings

**Monthly:**
- Update dependencies
- Review and optimize queries
- Check security updates

---

## Quick Reference Commands

```bash
# Local development
npm install          # Frontend
pip install -r requirements.txt  # Backend

# Production build
npm run build       # Frontend
# Backend runs as-is with production .env

# Docker local testing
docker build -f backend/Dockerfile -t dream-shoots-backend .
docker run -p 8000:8000 -e MONGO_URL="..." dream-shoots-backend

# Git operations
git add .
git commit -m "message"
git push origin main

# Monitor Railway (requires Railway CLI)
railway logs
railway status
```

---

## Support & Resources

- **Railway Docs:** https://docs.railway.app
- **FastAPI Docs:** https://fastapi.tiangolo.com
- **React Docs:** https://react.dev
- **MongoDB Docs:** https://docs.mongodb.com

---

**Version:** 1.0.0  
**Last Updated:** February 2026  
**Maintained by:** Dream Shoots Development Team
