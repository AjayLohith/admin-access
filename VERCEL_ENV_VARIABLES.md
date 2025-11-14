# Vercel Environment Variables

## Frontend Deployment (Vercel)

Copy and paste these environment variables into your Vercel project settings:

### Environment Variables for Vercel Dashboard

**Variable Name:** `VITE_API_URL`  
**Value:** `https://admin-access-2-a9g1.onrender.com/api`

---

## How to Set in Vercel:

1. Go to your Vercel project dashboard
2. Click on **Settings**
3. Click on **Environment Variables** in the left sidebar
4. Click **Add New**
5. Enter:
   - **Key:** `VITE_API_URL`
   - **Value:** `https://admin-access-2-a9g1.onrender.com/api`
   - **Environment:** Select all (Production, Preview, Development)
6. Click **Save**
7. **Redeploy** your application for changes to take effect

---

## Complete Environment Variable for Vercel:

```
VITE_API_URL=https://admin-access-2-a9g1.onrender.com/api
```

**Note:** Vercel will automatically use this variable during the build process. Make sure to redeploy after adding it.

---

## For Render (Backend) - Reference:

If you need to set backend environment variables in Render:

```
PORT=5000
NODE_ENV=production
MONGODB_URI=your_mongodb_connection_string_here
JWT_SECRET=your_strong_random_secret_key_here
JWT_EXPIRE=30d
FRONTEND_URL=https://admin-access-kappa.vercel.app
```

