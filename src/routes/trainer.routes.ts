import express from 'express';
import { getTrainerBookings, updateSession, deleteSession, createSession } from '../controllers/trainer.controller';
import { auth , requireRole } from '../middleware/auth.middleware';

const router = express.Router();
router.post('/sessions', auth,requireRole('Trainer'), createSession);
router.put('/sessions/:sessionId', auth,requireRole('Trainer'), updateSession);
router.delete('/sessions/:sessionId', auth,requireRole('Trainer'), deleteSession);
router.get('/bookings', auth,requireRole('Trainer'), getTrainerBookings);


export default router;