# Fix Vercel Deployment - 404 Error

## Problem
Getting 404 error: `POST https://admin-access-3.onrender.com/auth/login 404 (Not Found)`

## Root Cause
The `VITE_API_URL` environment variable is either:
1. Not set in Vercel
2. Not being read during build
3. Missing `/api` suffix

## Solution

### Step 1: Set Environment Variable in Vercel

1. Go to https://vercel.com/dashboard
2. Click on your project: **admin-access-kappa**
3. Go to **Settings** → **Environment Variables**
4. Add/Update this variable:

   **Key:** `VITE_API_URL`
   
   **Value:** `https://admin-access-2-a9g1.onrender.com/api`
   
   **Important:** The value MUST end with `/api`
   
   **Environments:** Select all (Production, Preview, Development)

5. Click **Save**

### Step 2: Redeploy

1. Go to **Deployments** tab
2. Find your latest deployment
3. Click **⋯** (three dots) → **Redeploy**
4. Wait for deployment to complete

### Step 3: Verify

After redeployment, check:
1. Open browser console (F12)
2. Look for: `API URL: https://admin-access-2-a9g1.onrender.com/api`
3. Try logging in again

## Correct Environment Variable

```
VITE_API_URL=https://admin-access-2-a9g1.onrender.com/api
```

**⚠️ CRITICAL:** 
- Must include `/api` at the end
- No trailing slash after `/api`
- Use your actual Render backend URL: `admin-access-2-a9g1.onrender.com`

## If Still Not Working

1. **Clear browser cache** (Ctrl+Shift+Delete)
2. **Hard refresh** (Ctrl+Shift+R)
3. **Check Vercel build logs** to see if environment variable is being read
4. **Verify Render backend is running** at: https://admin-access-2-a9g1.onrender.com/api/health

## Debugging

Add this to browser console to check:
```javascript
console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
```

If it shows `undefined`, the environment variable is not set correctly in Vercel.

