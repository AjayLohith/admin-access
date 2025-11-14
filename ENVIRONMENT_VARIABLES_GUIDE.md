# Complete Environment Variables Guide

## 🚀 Quick Copy-Paste for Deployment

### 📦 RENDER (Backend) - Environment Variables

Copy and paste these **EXACTLY** into Render Dashboard → Your Service → Environment:

```
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://Ajay:Ajay123@cluster0.mepnfw0.mongodb.net/adminAccess?retryWrites=true&w=majority
JWT_SECRET=your_strong_random_secret_key_here_generate_with_openssl_rand_base64_32
JWT_EXPIRE=30d
FRONTEND_URL=https://admin-access-kappa.vercel.app
```

**⚠️ IMPORTANT:** Replace `your_strong_random_secret_key_here_generate_with_openssl_rand_base64_32` with a strong random secret!

**Generate JWT_SECRET:**
```bash
openssl rand -base64 32
```

---

### 🎨 VERCEL (Frontend) - Environment Variables

Copy and paste this **EXACTLY** into Vercel Dashboard → Your Project → Settings → Environment Variables:

```
VITE_API_URL=https://admin-access-2-a9g1.onrender.com/api
```

---

## 📋 Step-by-Step Instructions

### For RENDER (Backend):

1. Go to https://dashboard.render.com
2. Click on your **Web Service** (backend)
3. Click on **Environment** in the left sidebar
4. Click **Add Environment Variable** for each variable below:

   **Variable 1:**
   - Key: `PORT`
   - Value: `5000`

   **Variable 2:**
   - Key: `NODE_ENV`
   - Value: `production`

   **Variable 3:**
   - Key: `MONGODB_URI`
   - Value: `mongodb+srv://Ajay:Ajay123@cluster0.mepnfw0.mongodb.net/adminAccess?retryWrites=true&w=majority`

   **Variable 4:**
   - Key: `JWT_SECRET`
   - Value: `[Generate a strong random string - see below]`

   **Variable 5:**
   - Key: `JWT_EXPIRE`
   - Value: `30d`

   **Variable 6:**
   - Key: `FRONTEND_URL`
   - Value: `https://admin-access-kappa.vercel.app`

5. Click **Save Changes**
6. Your service will automatically redeploy

---

### For VERCEL (Frontend):

1. Go to https://vercel.com/dashboard
2. Click on your project
3. Go to **Settings** → **Environment Variables**
4. Click **Add New**
5. Enter:
   - **Key:** `VITE_API_URL`
   - **Value:** `https://admin-access-2-a9g1.onrender.com/api`
   - **Environments:** Select all (Production, Preview, Development)
6. Click **Save**
7. Go to **Deployments** tab
8. Click **⋯** (three dots) on latest deployment → **Redeploy**

---

## 🔐 Generate JWT_SECRET

**Windows PowerShell:**
```powershell
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | ForEach-Object {[char]$_})
```

**Linux/Mac:**
```bash
openssl rand -base64 32
```

**Online Generator:**
- Visit: https://randomkeygen.com/
- Use "CodeIgniter Encryption Keys" (256-bit)

---

## ✅ Verification Checklist

After setting environment variables:

- [ ] All 6 variables set in Render (backend)
- [ ] 1 variable set in Vercel (frontend)
- [ ] JWT_SECRET is a strong random string (32+ characters)
- [ ] Services have been redeployed
- [ ] Frontend can connect to backend API
- [ ] CORS is working (no CORS errors in browser console)

---

## 🐛 Troubleshooting

**If frontend can't connect to backend:**
- Check `VITE_API_URL` in Vercel matches your Render backend URL
- Verify backend is running and accessible
- Check browser console for errors

**If CORS errors:**
- Verify `FRONTEND_URL` in Render matches your Vercel frontend URL exactly
- Make sure there's no trailing slash: `https://admin-access-kappa.vercel.app` (not `https://admin-access-kappa.vercel.app/`)

**If authentication fails:**
- Verify `JWT_SECRET` is set correctly in Render
- Check that `JWT_SECRET` is the same if you're using multiple backend instances

