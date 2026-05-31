# UniDocs Deployment Guide

A comprehensive guide to deploy your UniDocs full-stack application to production.

---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Backend Deployment](#backend-deployment)
3. [Frontend Deployment](#frontend-deployment)
4. [Environment Variables](#environment-variables)
5. [Database Setup](#database-setup)
6. [File Upload Configuration](#file-upload-configuration)
7. [Post-Deployment Verification](#post-deployment-verification)

---

## Prerequisites

Before deploying, ensure you have:
- **Git** installed and repository initialized
- **Node.js v18+** installed locally
- **MongoDB Atlas** account (for cloud database)
- **Cloudinary** account (for file uploads)
- Deployment platform account (Render, Railway, Vercel, Netlify, etc.)
- Built frontend (`npm run build` in client folder)

---

## Backend Deployment

### Option 1: Deploy on Render (Recommended for Free Tier)

#### Step 1: Prepare Your Repository

```bash
cd server
npm install
```

Ensure your `server.js` listens on `process.env.PORT`:
```javascript
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

#### Step 2: Create Render Account & Connect Repository

1. Go to [render.com](https://render.com)
2. Sign up with GitHub account
3. Click **New +** → **Web Service**
4. Select your repository
5. Configure:
   - **Name:** `unidocs-api`
   - **Environment:** Node
   - **Build Command:** `cd server && npm install`
   - **Start Command:** `cd server && npm start`
   - **Instance Type:** Free (or Paid)

#### Step 3: Add Environment Variables

In Render dashboard:
1. Go to **Environment**
2. Add the following variables:
   ```
   PORT=5000
   NODE_ENV=production
   MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/unidocs
   JWT_SECRET=<your-very-secure-secret-key>
   CLIENT_URL=https://your-frontend-url.com
   CLOUDINARY_CLOUD_NAME=<your-cloud-name>
   CLOUDINARY_API_KEY=<your-api-key>
   CLOUDINARY_API_SECRET=<your-api-secret>
   ```

#### Step 4: Deploy

- Click **Deploy** (auto-deploys on push to main branch)
- Your backend will be live at: `https://unidocs-api.onrender.com`

---

### Option 2: Deploy on Railway.app

#### Step 1: Create Railway Account

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click **New Project** → **Deploy from GitHub repo**

#### Step 2: Configure Service

1. Select your repository
2. In the Railway dashboard, add environment variables
3. Set Build Command: `npm install && npm run build` (if applicable)
4. Set Start Command: `npm start`

#### Step 3: Add Variables & Deploy

Similar to Render, add all environment variables and Railway will auto-deploy.

---

### Option 3: Deploy on Heroku (Legacy but Still Works)

#### Step 1: Install Heroku CLI

```bash
# Windows (via npm)
npm install -g heroku

# Or download from heroku.com/download
```

#### Step 2: Login & Create App

```bash
heroku login
heroku create unidocs-api
```

#### Step 3: Set Environment Variables

```bash
heroku config:set PORT=5000
heroku config:set NODE_ENV=production
heroku config:set MONGO_URI=mongodb+srv://<user>:<password>@...
heroku config:set JWT_SECRET=<secret>
heroku config:set CLIENT_URL=https://your-frontend.com
heroku config:set CLOUDINARY_CLOUD_NAME=<name>
heroku config:set CLOUDINARY_API_KEY=<key>
heroku config:set CLOUDINARY_API_SECRET=<secret>
```

#### Step 4: Deploy

```bash
git push heroku main
```

---

## Frontend Deployment

### Option 1: Deploy on Vercel (Recommended)

#### Step 1: Build Your Frontend

```bash
cd client
npm run build
```

#### Step 2: Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click **Add New** → **Project**
4. Import your repository

#### Step 3: Configure Build Settings

In Vercel dashboard:
- **Framework:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

#### Step 4: Add Environment Variables

Add in **Settings** → **Environment Variables**:
```
VITE_API_BASE_URL=https://your-backend-api.com/api
```

#### Step 5: Deploy

Click **Deploy** - Vercel will auto-deploy on push to main branch.

**Your frontend URL:** `https://unidocs.vercel.app`

---

### Option 2: Deploy on Netlify

#### Step 1: Build Locally

```bash
cd client
npm run build
```

#### Step 2: Create Netlify Account

1. Go to [netlify.com](https://netlify.com)
2. Sign in with GitHub
3. Click **Add new site** → **Import an existing project**
4. Select your repository

#### Step 3: Configure

- **Base directory:** `client`
- **Build command:** `npm run build`
- **Publish directory:** `dist`

#### Step 4: Add Environment Variables

In Site settings:
```
VITE_API_BASE_URL=https://your-backend-api.com/api
```

#### Step 5: Deploy

Click **Deploy** - Auto-deploys on push.

---

### Option 3: Deploy on GitHub Pages (Static Only)

#### Step 1: Update vite.config.js

```javascript
export default {
  base: '/UniDocs--notesXchange/',
  // ... rest of config
}
```

#### Step 2: Build & Push

```bash
cd client
npm run build
git add dist/
git commit -m "Build for GitHub Pages"
git push
```

#### Step 3: Enable GitHub Pages

In repository settings:
- **Source:** Deploy from a branch
- **Branch:** main
- **Folder:** /docs (or move dist to docs folder)

---

## Environment Variables

### Backend (.env in `/server`)

```env
# Server
PORT=5000
NODE_ENV=production

# Database
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/unidocs

# Auth
JWT_SECRET=your-super-secret-key-change-this

# CORS
CLIENT_URL=https://your-frontend-url.com

# Cloudinary (if using)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Frontend (.env in `/client`)

```env
VITE_API_BASE_URL=https://your-backend-api.com/api
```

---

## Database Setup

### Using MongoDB Atlas (Cloud)

#### Step 1: Create Free Cluster

1. Go to [mongodb.com/atlas](https://mongodb.com/atlas)
2. Sign up for free
3. Create a new project
4. Click **Build a Cluster** → Choose **M0 Free** tier

#### Step 2: Create Database User

1. Go to **Database Access**
2. Click **Add New Database User**
3. Create username and password
4. Choose **Read and write to any database**

#### Step 3: Get Connection String

1. Go to **Clusters** → **Connect**
2. Select **Drivers** → Copy connection string
3. Replace `<username>`, `<password>`, `<database>` in `.env`

```
mongodb+srv://username:password@cluster.mongodb.net/unidocs
```

#### Step 4: Configure IP Whitelist

1. Go to **Network Access**
2. Click **Add IP Address**
3. For production: Add your server's IP
4. For testing: Click **Allow Access from Anywhere** (0.0.0.0/0)

---

## File Upload Configuration

### Using Cloudinary (Recommended for Production)

#### Step 1: Create Cloudinary Account

1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Get your **Cloud Name**, **API Key**, and **API Secret** from dashboard

#### Step 2: Add to Environment Variables

```env
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

#### Step 3: Backend Already Configured

Your backend is already set up to use Cloudinary via [multer-storage-cloudinary](https://github.com/ioxu/multer-storage-cloudinary).

---

## Post-Deployment Verification

### 1. Test Backend Health

```bash
curl https://your-backend-api.com/
# Should return: {"message":"UniDocs API is running"}
```

### 2. Test Database Connection

```bash
curl https://your-backend-api.com/api/auth/health
# Or check backend logs for MongoDB connection
```

### 3. Test CORS

Make a request from your frontend to the backend. Check browser console for CORS errors.

### 4. Test Authentication Flow

1. Register a new user
2. Login
3. Verify JWT token is returned
4. Test protected routes (upload, profile)

### 5. Test File Upload

1. Upload a PDF/image
2. Verify it's stored in Cloudinary dashboard
3. Verify file is accessible via returned URL

### 6. Check Environment Variables

Backend should log port on startup:
```
Server running on port 5000
```

---

## Troubleshooting

### Common Issues

#### ❌ "CORS error" on frontend
**Solution:** Ensure `CLIENT_URL` in backend matches your frontend URL exactly (with protocol and domain)

#### ❌ "Cannot connect to MongoDB"
**Solution:** 
- Verify `MONGO_URI` is correct
- Check IP whitelist on MongoDB Atlas
- Test connection: `mongosh "mongodb+srv://..."`

#### ❌ "Cloudinary upload fails"
**Solution:**
- Verify `CLOUDINARY_*` variables
- Check Cloudinary dashboard for upload presets
- Verify account has upload quota

#### ❌ "Backend not responding"
**Solution:**
- Check deployment logs
- Verify PORT environment variable is set
- Ensure all dependencies installed: `npm install`

#### ❌ "Frontend shows blank page"
**Solution:**
- Verify `VITE_API_BASE_URL` is correct
- Check browser console for errors
- Ensure `npm run build` was successful
- Clear browser cache

---

## Monitoring & Maintenance

### Recommended Tools

- **Backend Logs:** Use deployment platform's log viewer (Render, Railway)
- **Error Tracking:** Add Sentry or LogRocket
- **Uptime Monitoring:** Use UptimeRobot or StatusPage
- **Database:** MongoDB Atlas Dashboard for metrics

### Regular Checks

- Monitor deployment logs weekly
- Check MongoDB storage quota monthly
- Review Cloudinary usage monthly
- Update dependencies: `npm outdated`

---

## Security Checklist

- ✅ Change `JWT_SECRET` to a long random string
- ✅ Use HTTPS everywhere
- ✅ Set `NODE_ENV=production` on backend
- ✅ Restrict MongoDB IP whitelist to your server
- ✅ Use environment variables (never hardcode secrets)
- ✅ Enable CORS only for your frontend domain
- ✅ Validate all user inputs on backend
- ✅ Use bcryptjs for password hashing (already done)

---

## Summary

**Fastest Deployment Path:**
1. **Backend:** Render.com (free tier + auto-deploy)
2. **Frontend:** Vercel (free tier + auto-deploy)
3. **Database:** MongoDB Atlas (free tier)
4. **File Storage:** Cloudinary (free tier)

**Total time:** ~30 minutes for full production setup

---

## Resources

- [Render.com Documentation](https://render.com/docs)
- [Vercel Deployment Docs](https://vercel.com/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [Cloudinary Upload Docs](https://cloudinary.com/documentation/image_upload_api_reference)
- [Express Deployment Guides](https://expressjs.com/en/advanced/best-practice-performance.html)
