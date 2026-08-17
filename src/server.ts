import express, { Application } from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
const port = process.env.PORT || 3000;
const app: Application = express();
dotenv.config();
app.use(express.json());
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})