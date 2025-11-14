# Admin Access - Full-Stack Role-Based Authentication

A full-stack web application with role-based authentication (User/Admin) built with React + Vite, Node.js, Express, and MongoDB.

## Features

### Core Features
- ✅ User signup with role selection (User/Admin)
- ✅ Secure login with JWT authentication
- ✅ Password hashing with bcrypt
- ✅ Protected routes and dashboard
- ✅ Role-based dashboard display
- ✅ Logout functionality
- ✅ Modern UI with TailwindCSS

### Enhanced Features
- ✅ **CRUD Operations**: Create, read, update, and delete items (user-specific)
- ✅ **Item Listing**: Display items with search and pagination
- ✅ **Search Functionality**: Search items by title or description
- ✅ **Pagination**: Navigate through items with page controls
- ✅ **Form Validation**: Zod (frontend) and Joi (backend) validation
- ✅ **Different UI for Roles**: Admin sees all items, Users see only their items
- ✅ **Backend Tests**: Jest tests for authentication routes
- ✅ **Frontend Tests**: React Testing Library tests for components

## Tech Stack

### Frontend
- React 18
- Vite
- React Router DOM
- Axios
- TailwindCSS
- React Hook Form
- Zod (validation)
- Vitest (testing)
- React Testing Library

### Backend
- Node.js
- Express
- MongoDB (Mongoose)
- JWT (jsonwebtoken)
- bcryptjs
- CORS
- Joi (validation)
- Jest (testing)
- Supertest (API testing)

## Project Structure

```
AdminAccess/
├── backend/
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── auth.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Signup.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── .env.example
└── README.md
```



The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication Endpoints

#### POST `/api/auth/signup`
Register a new user.

**Request Body:**
```json
{
  "name": "Ajay",
  "email": "22l31a0252@vignaniit.edu.in",
  "password": "password123",
  "role": "Admin"
}
```

**Response:**
```json
{
  "_id": "691747a3acae06806ed030c8",
  "name": "Ajay",
  "email": "22l31a0252@vignaniit.edu.in",
  "role": "Admin",
  "token": "jwt_token_here"
}
```

#### POST `/api/auth/login`
Login user.

**Request Body:**
```json
{
  "email": "22l31a0252@vignaniit.edu.in",
  "password": "password123"
}

```

**Response:**
```json
{
  "_id": "691747a3acae06806ed030c8",
  "name": "Ajay",
  "email": "22l31a0252@vignaniit.edu.in",
  "role": "Admin",
  "token": "jwt_token_here"
}


```

#### GET `/api/auth/me`
Get current user information (Protected route).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "_id": "691747a3acae06806ed030c8",
  "name": "Ajay",
  "email": "22l31a0252@vignaniit.edu.in",
  "role": "Admin"
}

```

### Items Endpoints (All Protected)

#### GET `/api/items`
Get items with search and pagination.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `search` (optional): Search term for title/description

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "items": [...],
  "currentPage": 1,
  "totalPages": 5,
  "totalItems": 50,
  "hasNextPage": true,
  "hasPrevPage": false
}
```

**Note:** Users see only their items. Admins see all items.

#### GET `/api/items/:id`
Get single item by ID.

**Headers:**
```
Authorization: Bearer <token>
```

#### POST `/api/items`
Create a new item.

**Request Body:**
```json
{
  "title": "Item Title",
  "description": "Item description (optional)"
}
```

**Headers:**
```
Authorization: Bearer <token>
```

#### PUT `/api/items/:id`
Update an item.

**Request Body:**
```json
{
  "title": "Updated Title",
  "description": "Updated description"
}
```

**Headers:**
```
Authorization: Bearer <token>
```

**Note:** Users can only update their own items. Admins can update any item.

#### DELETE `/api/items/:id`
Delete an item.

**Headers:**
```
Authorization: Bearer <token>
```

**Note:** Users can only delete their own items. Admins can delete any item.

## Deployment

### Backend Deployment (Render)

1. Push your code to GitHub
2. Connect your repository to [Render](https://render.com)
3. Set environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `PORT` (usually auto-set)
   - `NODE_ENV=production`
4. Deploy

### Frontend Deployment (Vercel/Netlify)

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Deploy to [Vercel](https://vercel.com):
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set output directory: `dist`
   - Add environment variable: `VITE_API_URL` (your backend URL)



## Usage

1. Start both backend and frontend servers
2. Navigate to `http://localhost:3000`
3. Click "Sign up" to create a new account
4. Select your role (User or Admin)
5. After signup, you'll be redirected to the dashboard
6. The dashboard displays: "Welcome, [Name] ([Role])"
7. **Create Items**: Click "+ Create Item" to add new items
8. **Search Items**: Use the search bar to find items by title or description
9. **Edit/Delete**: Click Edit or Delete buttons on any item
10. **Pagination**: Navigate through pages if you have many items
11. **Admin View**: Admins see all items from all users with creator information
12. Click "Logout" to sign out

## Testing

### Backend Tests
```bash
cd backend
npm test
```

Tests cover:
- User signup and validation
- User login
- Authentication middleware

### Frontend Tests
```bash
cd frontend
npm test
```

Tests cover:
- Form validation
- Component rendering
- User interactions

## Environment Variables

### Backend (.env)
Create a `.env` file in the `backend` directory:

```env
PORT=5000
NODE_ENV=production
MONGODB_URI=your_mongodb_connection_string_here
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=30d
FRONTEND_URL=https://admin-access-kappa.vercel.app
```

**Important for Production:**
- `JWT_SECRET`: Generate a strong random string (32+ characters)
  ```bash
  openssl rand -base64 32
  ```
- `MONGODB_URI`: Your MongoDB Atlas connection string
- `FRONTEND_URL`: Your deployed frontend URL (for CORS)
- `NODE_ENV`: Set to `production` in production

### Frontend (.env)
Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=https://admin-access-2-a9g1.onrender.com/api
```

**Production URLs:**
- Frontend: https://admin-access-kappa.vercel.app
- Backend API: https://admin-access-2-a9g1.onrender.com/api

**⚠️ Security Note:** Never commit `.env` files to Git. They are already in `.gitignore`.

## Security Features

- Passwords are hashed using bcryptjs
- JWT tokens for authentication
- Protected routes on frontend
- Authentication middleware on backend
- CORS enabled for cross-origin requests
- Form validation on both frontend (Zod) and backend (Joi)
- Role-based access control (Users can only access their own items)
- Admin privileges for viewing/managing all items


