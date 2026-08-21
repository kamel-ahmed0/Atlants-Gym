import {Router} from "express"
import { getAllSessions, getSessionById, cancelBooking, bookSession  } from '../controllers/members.controller';
import { auth , requireRole } from '../middleware/auth.middleware';

const router = Router();

router.get('/sessions', auth, requireRole('Member'), getAllSessions);
router.get('/sessions/:sessionId', auth, requireRole('Member'), getSessionById);
router.put('/cancelBooking/:bookingId', auth, requireRole('Member'), cancelBooking);
router.post('/bookSession/:sessionId', auth, requireRole('Member'), bookSession);

export default router;