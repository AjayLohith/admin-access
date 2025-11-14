import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import itemRoutes from './routes/items.js';
import userRoutes from './routes/users.js';

dotenv.config();

const app = express();

// --------------------
//  CORS CONFIGURATION
// --------------------

// Allow localhost and your deployed Vercel frontend
const whitelist = [
  process.env.FRONTEND_URL,       // your Vercel frontend
  "http://localhost:3000",        // dev
  "http://127.0.0.1:3000"         // dev
].filter(Boolean); // remove undefined if FRONTEND_URL is missing

console.log("Allowed CORS origins:", whitelist);

const corsOptions = {
  origin: function (origin, callback) {
    console.log("Incoming CORS request from:", origin);

    // Allow server-to-server, Postman, curl (no origin)
    if (!origin) return callback(null, true);

    if (whitelist.includes(origin)) {
      return callback(null, true);
    }

    console.log("❌ Blocked by CORS:", origin);
    return callback(
      new Error(`CORS Error: Origin ${origin} not allowed by CORS policy.`),
      false
    );
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Preflight support

// --------------------
//  MIDDLEWARE
// --------------------
app.use(express.json());

// --------------------
//  ROUTES
// --------------------
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/users', userRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

// CORS debugging route
app.get('/api/cors-debug', (req, res) => {
  res.json({
    incomingOrigin: req.get("origin") || null,
    allowedOrigins: whitelist,
    frontendUrlEnv: process.env.FRONTEND_URL || null
  });
});

// --------------------
//  DATABASE + SERVER
// --------------------
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });
