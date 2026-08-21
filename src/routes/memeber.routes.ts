import {Router} from "express"
import { getAllSessions, getSessionById, cancelBooking, bookSession  } from '../controllers/members.controller';
import { auth , requireRole } from '../middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * /member/sessions:
 *   get:
 *     summary: Retrieve all available class sessions
 *     tags: [Member]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of available sessions retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Available sessions
 *                 sessions:
 *                   type: array
 *                   items:
 *                     type: object
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - Requires Member role
 *       500:
 *         description: Internal server error
 */
router.get('/sessions', auth, requireRole('Member'), getAllSessions);

/**
 * @swagger
 * /member/sessions/{sessionId}:
 *   get:
 *     summary: Retrieve a specific class session by ID
 *     tags: [Member]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the session
 *     responses:
 *       200:
 *         description: Session details retrieved successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - Requires Member role
 *       404:
 *         description: Session not found
 *       500:
 *         description: Internal server error
 */
router.get('/sessions/:sessionId', auth, requireRole('Member'), getSessionById);

/**
 * @swagger
 * /member/sessions/{sessionId}:
 *   put    :
 *     summary: Retrieve details for a specific class session
 *     tags: [Member]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The MongoDB ObjectId of the session
 *     responses:
 *       200:
 *         description: Session details retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Session details
 *                 session:
 *                   type: object
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: Session not found
 *       500:
 *         description: Internal server error
 */
router.put('/cancelBooking/:bookingId', auth, requireRole('Member'), cancelBooking);

/**
 * @swagger
 * /member/bookSession/{sessionId}:
 *   post:
 *     summary: Book a place or join the waitlist for a class session
 *     tags: [Member]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The MongoDB ObjectId of the class session
 *     responses:
 *       201:
 *         description: Booking successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Booking successful
 *                 booking:
 *                   type: object
 *       200:
 *         description: Session full; placed on waitlist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: You are waitlisted for this session
 *                 booking:
 *                   type: object
 *       400:
 *         description: User has already booked this session
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: User or Session not found
 *       500:
 *         description: Internal server error
 */
router.post('/bookSession/:sessionId', auth, requireRole('Member'), bookSession);
export default router;