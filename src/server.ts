import express, { Application } from 'express';
import dotenv from 'dotenv';
import swaggerUi from "swagger-ui-express";
import { connectDB } from './config/db';
import { specs } from "./config/swagger";
import userRouters from "./routes/user.routes"


const port = process.env.PORT || 3000;
const app: Application = express();

dotenv.config();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));  
app.use("/user", userRouters);

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})