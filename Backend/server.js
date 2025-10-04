import express from 'express'
import dotenv from "dotenv";
import cors from "cors";

import authRoute from './Routers/authRoute.js'
const app=express()
app.use(express.json());


dotenv.config();
app.use('/auth',authRoute)
app.use(cors({
    origin: "http://localhost:5174",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));


connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`✅ Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err);
  });
