import express from 'express'
import dotenv from "dotenv";
import cors from "cors";
import authRoute from './Routers/authRoute.js';
import noteRoute from "./Routers/noteRoute.js";
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();
app.use(express.json());

// ✅ Enable CORS first
app.use(
  cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// ✅ Then define your routes
app.use('/auth', authRoute);
app.use('/api', noteRoute);

const port = 3000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`✅ Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err);
  });
