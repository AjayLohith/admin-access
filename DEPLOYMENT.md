# Deployment Guide

This guide explains how to deploy the application to production with all secrets properly configured.

## Environment Variables

### Backend Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=production

# Database Configuration
MONGODB_URI=your_mongodb_connection_string_here

# JWT Configuration
JWT_SECRET=your_strong_random_secret_key_here
JWT_EXPIRE=30d

# Frontend URL (for CORS)
FRONTEND_URL=https://admin-access-kappa.vercel.app
```

**Important:**
- `JWT_SECRET`: Generate a strong random string (at least 32 characters). You can use:
  ```bash
  openssl rand -base64 32
  ```
- `MONGODB_URI`: Your MongoDB Atlas connection string
- `FRONTEND_URL`: Your deployed frontend URL (for CORS)

### Frontend Environment Variables

Create a `.env` file in the `frontend` directory with:

```env
# Backend API URL
VITE_API_URL=https://admin-access-2-a9g1.onrender.com/api
```

**Important:**
- Replace `https://your-backend-api-url.com` with your actual backend deployment URL

## Deployment Platforms

### Backend Deployment (Render/Railway/Vercel)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for production"
   git push origin main
   ```

2. **Connect to Deployment Platform:**
   - **Render**: https://render.com
   - **Railway**: https://railway.app
   - **Vercel**: https://vercel.com

3. **Set Environment Variables:**
   - Go to your project settings
   - Add all variables from `backend/.env.example`
   - Make sure to use production values

4. **Build Settings:**
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `backend`

### Frontend Deployment (Vercel/Netlify)

1. **Build the frontend:**
   ```bash
   cd frontend
   npm install
   npm run build
   ```

2. **Deploy to Vercel:**
   - Connect your GitHub repository
   - Set root directory to `frontend`
   - Add environment variable: `VITE_API_URL` (your backend URL)
   - Build command: `npm run build`
   - Output directory: `dist`

3. **Deploy to Netlify:**
   - Connect your GitHub repository
   - Set base directory to `frontend`
   - Add environment variable: `VITE_API_URL` (your backend URL)
   - Build command: `npm run build`
   - Publish directory: `dist`

## Security Checklist

- [ ] All `.env` files are in `.gitignore`
- [ ] `.env.example` files are committed (without real values)
- [ ] `JWT_SECRET` is a strong random string (32+ characters)
- [ ] `MONGODB_URI` uses a secure connection string
- [ ] `FRONTEND_URL` matches your actual frontend domain
- [ ] `NODE_ENV` is set to `production`
- [ ] CORS is configured to only allow your frontend domain
- [ ] No secrets are hardcoded in the codebase

## Post-Deployment

1. Test all endpoints
2. Verify authentication works
3. Check CORS is working correctly
4. Monitor logs for any errors
5. Test user registration and login

## Troubleshooting

### CORS Errors
- Make sure `FRONTEND_URL` in backend matches your frontend domain exactly
- Check that the frontend is using the correct `VITE_API_URL`

### Database Connection Issues
- Verify `MONGODB_URI` is correct
- Check MongoDB Atlas network access settings
- Ensure IP whitelist includes your deployment platform's IPs (or 0.0.0.0/0 for development)

### Authentication Issues
- Verify `JWT_SECRET` is set correctly
- Check that tokens are being sent in requests
- Verify token expiration settings

