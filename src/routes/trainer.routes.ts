import express from 'express';
import { getTrainerBookings } from '../controllers/trainer.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/my-bookings', authenticate, getTrainerBookings);

export default router;