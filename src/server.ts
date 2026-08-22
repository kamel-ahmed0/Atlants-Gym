import express, { Application } from 'express';
import dotenv from 'dotenv';
import swaggerUi from "swagger-ui-express";
import { connectDB } from './config/db';
import { specs } from "./config/swagger";
import userRouters from "./routes/user.routes"
import memberRouters from "./routes/memeber.routes"
import TrainerRouters from "./routes/trainer.routes"
import cookieParser from 'cookie-parser';

const port = Number(process.env.PORT) || 3000;
const app: Application = express();

dotenv.config();
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.status(200).send('OK');
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs,{swaggerOptions: {withCredentials: true,}}));  
app.use("/user", userRouters);
app.use("/member", memberRouters);
app.use("/trainer", TrainerRouters);    

// 1. Listen immediately on process.env.PORT and '0.0.0.0'
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});

// 2. Connect to MongoDB independently without blocking the HTTP server
connectDB()
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });