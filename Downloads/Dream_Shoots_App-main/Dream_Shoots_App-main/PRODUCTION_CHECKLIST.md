# Production Checklist for Dream Shoots App

## Pre-Deployment Checklist

### Code Quality & Security
- [ ] Remove console.log() statements from production code
- [ ] Check for hardcoded credentials or API keys
- [ ] Run security audit: `npm audit` (frontend), `pip check` (backend)
- [ ] Enable HTTPS/SSL (Railway handles this automatically)
- [ ] Review CORS_ORIGINS - only allow your domain
- [ ] Validate all form inputs (both frontend and backend)

### Frontend Optimization
- [ ] Run production build: `npm run build`
- [ ] Check bundle size (target: < 500KB gzipped)
- [ ] Verify environment variables are set correctly
- [ ] Test on mobile devices
- [ ] Check accessibility (a11y) with Lighthouse
- [ ] Performance score > 90 on Lighthouse
- [ ] Test with slow network (DevTools throttling)

### Backend Optimization
- [ ] Set `ENVIRONMENT=production`
- [ ] Configure appropriate logging level
- [ ] Test all API endpoints with production config
- [ ] Verify MongoDB connection with production string
- [ ] Test error handling and edge cases
- [ ] Verify health check endpoint works
- [ ] Check response times (target: < 200ms for bookings)

### Database
- [ ] Create MongoDB Atlas cluster
- [ ] Set strong admin password
- [ ] Enable VPC/private network (optional)
- [ ] Configure IP whitelist (0.0.0.0/0 for Railway)
- [ ] Enable automated backups
- [ ] Create database indexes on frequently queried fields
- [ ] Test failover (if replica set)

### Deployment Configuration
- [ ] Create `.env` files with production values
- [ ] Set all environment variables in Railway Dashboard
- [ ] Configure custom domain (if using custom domain)
- [ ] Set up SSL/TLS (automatic with Railway)
- [ ] Configure error notifications/alerts
- [ ] Set up log aggregation if needed

### Docker
- [ ] Verify Dockerfile builds successfully
- [ ] Test Docker image locally with docker-compose
- [ ] Check .dockerignore to exclude unnecessary files
- [ ] Verify health checks work in Docker

### GitHub & Version Control
- [ ] Tag release version: `git tag -a v1.0.0 -m "Production release"`
- [ ] Push tags: `git push origin --tags`
- [ ] Ensure .env files are in .gitignore
- [ ] Create release notes on GitHub

### Monitoring & Logging
- [ ] Set up Railway logs monitoring
- [ ] Configure error tracking (optional: Sentry, DataDog)
- [ ] Set up uptime monitoring
- [ ] Create alerts for high error rates
- [ ] Plan backup strategy

### Documentation
- [ ] Document API endpoints
- [ ] Create runbook for common issues
- [ ] Document deployment process
- [ ] Create troubleshooting guide
- [ ] Update README with production info

### Testing (In Staging/Production)
- [ ] Book a test appointment
- [ ] Verify booking appears in admin panel
- [ ] Test all page sections load
- [ ] Verify responsive design on mobile
- [ ] Test navigation links
- [ ] Test WhatsApp button
- [ ] Check footer displays correctly on mobile
- [ ] Test admin panel functionality

### Post-Deployment
- [ ] Monitor error rates for 24 hours
- [ ] Check performance metrics
- [ ] Verify email notifications (if implemented)
- [ ] Collect initial user feedback
- [ ] Document any issues found
- [ ] Plan for first hotfix if needed

---

## Deployment Readiness Verification

### Environment Variables Ready?
```bash
# Backend
MONGO_URL=✓
DB_NAME=✓
ENVIRONMENT=✓
FRONTEND_URL=✓
CORS_ORIGINS=✓

# Frontend
REACT_APP_BACKEND_URL=✓
```

### Files Present?
```bash
✓ backend/Dockerfile
✓ frontend/Dockerfile
✓ railway.toml (or equivalent)
✓ .dockerignore
✓ docker-compose.yml (optional, for testing)
✓ DEPLOYMENT_GUIDE.md
✓ RAILWAY_QUICKSTART.md
```

### Tests Passing?
```bash
✓ Frontend builds without errors
✓ Backend starts without errors
✓ Database connection works
✓ API endpoints respond
✓ CORS headers correct
✓ Health check returns 200
```

---

## Post-Deployment Validation (In Order)

1. **Immediate (Minutes 0-5)**
   - [ ] Frontend loads without errors
   - [ ] Backend health check passes
   - [ ] No console errors
   - [ ] No 500 errors in backend

2. **First Hour**
   - [ ] Test booking form submission
   - [ ] Verify data in MongoDB
   - [ ] Admin panel loads bookings
   - [ ] Email notifications sent (if implemented)

3. **First Day**
   - [ ] Monitor error logs
   - [ ] Check response times
   - [ ] Verify no memory leaks
   - [ ] Test on different browsers/devices

4. **First Week**
   - [ ] Monitor usage patterns
   - [ ] Check database growth
   - [ ] Review security logs
   - [ ] Plan scaling if needed

---

## Rollback Plan

If critical issues occur:

```bash
# Identify previous working version
git log --oneline

# Revert to previous version
git revert <commit-hash>
git push origin main

# Railway will auto-redeploy
# Monitor Railway dashboard for redeployment status

# In Railway Dashboard:
# Services → Select service → Deployments
# Click on working deployment to rollback immediately
```

---

## Performance Benchmarks (Targets)

- Frontend First Contentful Paint: < 2s
- API Response Time (bookings): < 200ms
- Database Query Time: < 50ms
- Monthly uptime: > 99.5%
- Page load time: < 3s
- Bundle size: < 500KB gzipped

---

## Security Checklist

- [ ] HTTPS/SSL enabled
- [ ] CORS configured properly
- [ ] No sensitive data in logs
- [ ] Rate limiting configured (optional)
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention (using ORM)
- [ ] XSS prevention enabled
- [ ] CSRF tokens (if needed)
- [ ] Regular security updates planned

---

## Backup & Disaster Recovery

- [ ] MongoDB backups enabled
- [ ] Backup frequency: Daily (minimum)
- [ ] Tested restore process
- [ ] Disaster recovery RTO: < 1 hour
- [ ] RPO: < 24 hours
- [ ] Off-site backup storage

---

**Status:** ☐ Ready for Production ☐ Not Ready

**Last Reviewed:** [Date]
**Reviewed By:** [Name]
**Sign-off:** [Approved/Hold]
