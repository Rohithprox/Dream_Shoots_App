# Railway Deployment - Quick Start (5 Minutes)

## Prerequisites Setup (Do Once)

### 1. MongoDB Atlas Setup
```
1. Go to: https://www.mongodb.com/cloud/atlas
2. Create account and cluster (free tier)
3. Create database user with strong password
4. Whitelist IP: 0.0.0.0/0 (for Railway access)
5. Get connection string:
   mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
```

### 2. Railway.app Setup
```
1. Go to: https://railway.app
2. Sign up with GitHub
3. Create new project
4. Connect your GitHub repository
```

---

## Deployment Steps

### Step 1: Update Code (Local)

```bash
# 1. Ensure all files are ready
ls backend/Dockerfile          # Should exist
ls frontend/Dockerfile         # Should exist
ls railway.toml                # Should exist

# 2. Update .env files with your values
# DO NOT COMMIT these files

# 3. Commit production-ready code
git add .
git commit -m "Production ready deployment"
git push origin main
```

### Step 2: Create Services on Railway

**Option A: Using Railway Dashboard (Recommended)**

1. Go to https://railway.app/dashboard
2. Create new project → "Deploy from GitHub"
3. Select repository

**Option B: Using Railway CLI**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Create project
railway init
```

### Step 3: Configure Backend Service

In Railway Dashboard:

```
1. Add Service → Deploy from repo
2. Select: backend/Dockerfile path

Environment Variables:
  ✓ MONGO_URL = mongodb+srv://user:pass@cluster.mongodb.net/?retryWrites=true&w=majority
  ✓ DB_NAME = dream_shoots
  ✓ ENVIRONMENT = production
  ✓ FRONTEND_URL = (leave empty for now, update later)
  ✓ CORS_ORIGINS = (leave empty for now, update later)

Port: 8000 (automatic)
```

### Step 4: Configure Frontend Service

In Railway Dashboard:

```
1. Add Service → Deploy from repo
2. Select: frontend/Dockerfile path

Build Args:
  ✓ REACT_APP_BACKEND_URL = https://api.yourdomain.com (use Railway backend URL for now)

Port: 3000 (automatic)
```

### Step 5: Test Services

Once deployed, Railway will provide URLs:
- Frontend: `https://your-frontend-service.railway.app`
- Backend: `https://your-backend-service.railway.app`

**Test backend:**
```
curl https://your-backend-service.railway.app/health
```

**Test frontend:** Visit the frontend URL in browser

**Test connection:** Try booking form in frontend

### Step 6: Setup Custom Domain (Optional but Recommended)

In Railway Dashboard → Project Settings → Domains:

```
1. Add Domain
   Service: frontend
   Domain: yourdomain.com
   
2. Add Domain
   Service: backend  
   Domain: api.yourdomain.com

3. At your domain provider (GoDaddy, Namecheap, etc.):
   Create CNAME records:
   
   yourdomain.com    →  your-railway-url.railway.app
   api.yourdomain.com → your-railway-api-url.railway.app
```

### Step 7: Update Environment Variables

After getting Railway URLs, update:

**Backend:**
```env
FRONTEND_URL = https://yourdomain.com
CORS_ORIGINS = https://yourdomain.com,https://www.yourdomain.com
```

**Frontend .env.production:**
```env
REACT_APP_BACKEND_URL = https://api.yourdomain.com
```

Redeploy frontend with updated build args.

---

## Verify Everything Works

```bash
# 1. Check backend health
curl https://api.yourdomain.com/health

# 2. Open frontend in browser
https://yourdomain.com

# 3. Try booking form - submit test booking

# 4. Check admin page for booking
https://yourdomain.com/admin
```

---

## Common Issues & Fixes

| Problem | Solution |
|---------|----------|
| "Cannot reach backend" | Check MongoDB connection string, verify CORS settings |
| Build fails | Ensure Dockerfile path is correct, check syntax |
| "ERR_CONNECTION_REFUSED" | Backend port might not be 8000, check Railway logs |
| Form doesn't submit | Check browser console for CORS error, update CORS_ORIGINS |
| Database connection fails | Test connection string in MongoDB Atlas, verify IP whitelist |

---

## Auto-Deploy on Push

Railway automatically deploys when you push to GitHub:

```bash
# Make code changes locally
git add .
git commit -m "Fix bug"
git push origin main

# Railway will automatically:
# 1. Detect changes
# 2. Build new Docker image
# 3. Deploy services
# 4. Keep same URLs
```

Monitor deployments in Railway Dashboard → Deployments tab.

---

## Useful Railway Commands (CLI)

```bash
# View logs in real-time
railway logs -s backend
railway logs -s frontend

# Check service status
railway status

# View environment variables
railway env

# Manually trigger deploy
railway redeploy -s backend
```

---

## Scaling & Monitoring

### If Traffic Increases:
1. Railway Dashboard → Service → Increase RAM/CPU
2. For multiple instances: Railway Team plan (paid)

### Monitor Performance:
1. Railway Dashboard → Metrics tab
2. Watch CPU, Memory, Requests
3. Set up alerts (Railway Team plan)

---

## Next Steps

1. ✅ Deploy both services
2. ✅ Configure custom domains
3. ✅ Test booking functionality
4. 📊 Monitor logs and metrics
5. 🔐 Set up monitoring alerts
6. 📦 Plan for auto-scaling

---

**Need help?** Check full guide: [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
