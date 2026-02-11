# Dream Shoots App - Production Ready

A full-stack web application for booking professional video shoots and content creation services.

## 🚀 Quick Links

- **[Deployment Guide](DEPLOYMENT_GUIDE.md)** - Comprehensive production deployment documentation
- **[Railway Quick Start](RAILWAY_QUICKSTART.md)** - 5-minute Railway deployment guide
- **[Production Checklist](PRODUCTION_CHECKLIST.md)** - Pre-deployment verification checklist

## 📋 Project Structure

```
Dream_Shoots_App/
├── frontend/              # React.js web application
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── hooks/        # Custom React hooks
│   │   └── lib/          # Utility functions
│   ├── public/
│   ├── Dockerfile        # Frontend production image
│   └── package.json
│
├── backend/              # FastAPI REST API
│   ├── server.py         # Main application
│   ├── requirements.txt   # Python dependencies
│   ├── Dockerfile        # Backend production image
│   └── .env.example      # Environment template
│
├── docker-compose.yml    # Local development with Docker
├── railway.toml          # Railway deployment config
├── Dockerfile            # Combined deployment image
└── DEPLOYMENT_GUIDE.md   # Full deployment documentation
```

## 🛠️ Technology Stack

### Frontend
- **React 19** - UI framework
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP client
- **Shadcn UI** - Component library

### Backend
- **FastAPI** - Web framework
- **Python 3.11** - Runtime
- **MongoDB** - Database
- **Motor** - Async MongoDB driver
- **Uvicorn** - ASGI server

### Deployment
- **Docker** - Containerization
- **Railway.app** - Cloud platform
- **MongoDB Atlas** - Managed database

## 🚀 Quick Start (Development)

### Prerequisites
- Node.js 18+
- Python 3.11+
- MongoDB (local or Atlas)
- Git

### Setup Backend

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Edit .env with your MongoDB URL
nano .env

# Run development server
uvicorn server:app --reload
# API: http://localhost:8000
# Docs: http://localhost:8000/docs
```

### Setup Frontend

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server
npm start
# App: http://localhost:3000
```

## 📦 Deployment to Production (Railway)

### Step 1: Prepare Repository

```bash
# Ensure all files are committed
git add .
git commit -m "Production ready"
git push origin main
```

### Step 2: Create Railway Project

1. Go to https://railway.app
2. Create new project
3. Deploy from GitHub repository

### Step 3: Configure Services

**Backend Service:**
- Set Dockerfile: `backend/Dockerfile`
- Environment variables:
  - `MONGO_URL`: Your MongoDB Atlas connection string
  - `DB_NAME`: `dream_shoots`
  - `ENVIRONMENT`: `production`
  - `FRONTEND_URL`: Your frontend domain
  - `CORS_ORIGINS`: Your domain(s)

**Frontend Service:**
- Set Dockerfile: `frontend/Dockerfile`
- Build argument: `REACT_APP_BACKEND_URL=https://api.yourdomain.com`

### Step 4: Setup Custom Domain

1. Railway Dashboard → Domains
2. Add domain for each service
3. Update DNS CNAME records at your domain provider

### Step 5: Verify Deployment

```bash
# Windows:
.\verify-deployment.ps1 -BackendUrl "https://api.yourdomain.com" -FrontendUrl "https://yourdomain.com"

# Linux/macOS:
./verify-deployment.sh https://api.yourdomain.com https://yourdomain.com
```

## 📱 Features

- **Landing Page** - Professional marketing site
- **Booking System** - Easy appointment booking
- **Admin Panel** - Manage bookings and status
- **Responsive Design** - Works on all devices
- **Mobile Footer** - Optimized for mobile view
- **WhatsApp Integration** - Direct contact button
- **Pricing Section** - Display package options
- **Locations** - Multiple service locations
- **Team Showcase** - Creator profiles

## 🔐 Environment Configuration

### Development (.env)
```env
REACT_APP_BACKEND_URL=http://localhost:8000
MONGO_URL=mongodb://localhost:27017
DB_NAME=dream_shoots
ENVIRONMENT=development
```

### Production (.env)
```env
MONGO_URL=mongodb+srv://user:pass@cluster.mongodb.net/?retryWrites=true&w=majority
DB_NAME=dream_shoots
ENVIRONMENT=production
FRONTEND_URL=https://yourdomain.com
CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

**Important:** Never commit `.env` files. Use `.env.example` as template.

## 🧪 Testing

### Frontend
```bash
cd frontend
npm test          # Run tests
npm run build     # Production build
```

### Backend
```bash
cd backend
pytest            # Run tests
python -m black . # Format code
python -m flake8  # Lint code
```

## 📊 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/api/` | API status |
| POST | `/api/bookings` | Create booking |
| GET | `/api/bookings` | List bookings |
| GET | `/api/bookings/{id}` | Get booking |
| PATCH | `/api/bookings/{id}/status` | Update status |
| DELETE | `/api/bookings/{id}` | Delete booking |

## 🐳 Docker

### Build Images

```bash
# Backend
docker build -f backend/Dockerfile -t dream-shoots-backend .

# Frontend
docker build -f frontend/Dockerfile \
  --build-arg REACT_APP_BACKEND_URL=http://localhost:8000 \
  -t dream-shoots-frontend .
```

### Run with Docker Compose

```bash
docker-compose up -d

# Frontend: http://localhost:3000
# Backend: http://localhost:8000
# MongoDB: localhost:27017
```

## 📈 Monitoring

### View Logs (Railway)
```bash
railway logs -s backend
railway logs -s frontend
```

### Health Checks

```bash
# Backend health
curl https://api.yourdomain.com/health

# Frontend health
curl https://yourdomain.com
```

## 🔧 Troubleshooting

### Backend Issues
- **MongoDB connection failed**: Check connection string and IP whitelist
- **CORS errors**: Verify `CORS_ORIGINS` environment variable
- **Port already in use**: Change `PORT` environment variable

### Frontend Issues
- **Cannot reach backend**: Verify `REACT_APP_BACKEND_URL` environment variable
- **Booking form doesn't submit**: Check browser console for errors
- **Mobile layout issues**: Clear cache and rebuild

### Deployment Issues
- **Build fails**: Check Docker build logs on Railway dashboard
- **Service crashes**: Check service logs and environment variables
- **Database connection fails**: Verify MongoDB Atlas connection string

## 📚 Documentation

- **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - Complete deployment guide
- **[RAILWAY_QUICKSTART.md](RAILWAY_QUICKSTART.md)** - Railway 5-minute setup
- **[PRODUCTION_CHECKLIST.md](PRODUCTION_CHECKLIST.md)** - Pre-deployment checklist

## 🤝 Contributing

1. Fork repository
2. Create feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Submit pull request

## 📝 License

This project is proprietary. All rights reserved.

## 📞 Support

For issues and questions:
- Email: dreamshootsofficial@gmail.com
- Phone: +91 73308 58705
- Instagram: @dreamshootsofficial

---

## 🎯 Next Steps

1. **Setup MongoDB Atlas**: Create free cluster
2. **Create Railway Account**: Connect GitHub
3. **Configure Domains**: Set up custom domains
4. **Deploy**: Push code to trigger deployment
5. **Verify**: Run verification script
6. **Monitor**: Check logs and metrics

---

**Version:** 1.0.0  
**Last Updated:** February 2026  
**Status:** Production Ready ✅
