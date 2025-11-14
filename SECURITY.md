# Security Configuration

This document outlines all security measures and environment variable configuration.

## Environment Variables

All sensitive data is stored in environment variables and never committed to Git.

### Backend Secrets

Located in `backend/.env`:

- **PORT**: Server port (default: 5000)
- **NODE_ENV**: Environment mode (`development` or `production`)
- **MONGODB_URI**: MongoDB connection string (contains credentials)
- **JWT_SECRET**: Secret key for signing JWT tokens (MUST be strong and random)
- **JWT_EXPIRE**: JWT token expiration time (default: 30d)
- **FRONTEND_URL**: Frontend URL for CORS configuration

### Frontend Configuration

Located in `frontend/.env`:

- **VITE_API_URL**: Backend API endpoint URL

## Generating Secure Secrets

### JWT Secret

Generate a strong JWT secret (32+ characters):

```bash
# Linux/Mac
openssl rand -base64 32

# Windows PowerShell
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | ForEach-Object {[char]$_})
```

### MongoDB Connection String

Get your connection string from MongoDB Atlas:
1. Go to your cluster
2. Click "Connect"
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your actual password

## Production Checklist

Before deploying to production:

- [ ] Generate a new, strong `JWT_SECRET` (never reuse development secrets)
- [ ] Set `NODE_ENV=production`
- [ ] Use production MongoDB database (not development)
- [ ] Set `FRONTEND_URL` to your actual frontend domain
- [ ] Set `VITE_API_URL` to your actual backend API URL
- [ ] Verify `.env` files are in `.gitignore`
- [ ] Never commit `.env` files to Git
- [ ] Use HTTPS in production
- [ ] Configure CORS to only allow your frontend domain
- [ ] Enable MongoDB network access restrictions
- [ ] Use strong database passwords

## Security Best Practices

1. **Never commit secrets**: All `.env` files are in `.gitignore`
2. **Use strong secrets**: JWT secrets should be 32+ random characters
3. **Environment-specific configs**: Use different secrets for dev/prod
4. **CORS configuration**: Only allow your frontend domain
5. **Password hashing**: All passwords are hashed with bcryptjs
6. **JWT tokens**: Tokens expire after 30 days (configurable)
7. **Input validation**: All inputs validated with Joi (backend) and Zod (frontend)

## Deployment Platforms

### Setting Environment Variables

#### Render
1. Go to your service settings
2. Navigate to "Environment"
3. Add each variable from `.env.example`
4. Use production values

#### Railway
1. Go to your project settings
2. Navigate to "Variables"
3. Add each variable from `.env.example`
4. Use production values

#### Vercel
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add each variable from `.env.example`
4. Use production values

#### Netlify
1. Go to your site settings
2. Navigate to "Environment variables"
3. Add each variable from `.env.example`
4. Use production values

## Verifying Security

After deployment, verify:

1. ✅ No `.env` files in Git repository
2. ✅ Environment variables set in deployment platform
3. ✅ CORS only allows your frontend domain
4. ✅ HTTPS is enabled
5. ✅ Database connection is secure
6. ✅ JWT tokens are working correctly
7. ✅ Authentication is required for protected routes

