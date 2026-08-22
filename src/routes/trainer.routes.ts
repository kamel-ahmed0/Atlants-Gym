import express from 'express';
import { getTrainerBookings, updateSession, deleteSession, createSession } from '../controllers/trainer.controller';
import { auth , requireRole } from '../middleware/auth.middleware';

const router = express.Router();
/**
 * @swagger
 * /trainer/sessions:
 *   post:
 *     summary: Create a new class session
 *     tags: [Trainer]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - date
 *               - capacity
 *             properties:
 *               title:
 *                 type: string
 *                 example: Morning Yoga
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-09-01T08:00:00Z"
 *               capacity:
 *                 type: integer
 *                 example: 15
 *               description:
 *                 type: string
 *                 example: An energizing morning yoga session for all levels.
 *     responses:
 *       201:
 *         description: Session created successfully
 *       400:
 *         description: Bad request - Missing or invalid fields
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - Requires Trainer role
 *       500:
 *         description: Internal server error
 */
router.post('/sessions', auth, requireRole('Trainer'), createSession);
/**
 * @swagger
 * /trainer/sessions/{sessionId}:
 *   put:
 *     summary: Update an existing class session
 *     tags: [Trainer]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the session to update
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Advanced Power Yoga
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-09-01T10:00:00Z"
 *               capacity:
 *                 type: integer
 *                 example: 20
 *               description:
 *                 type: string
 *                 example: Updated session description and details.
 *     responses:
 *       200:
 *         description: Session updated successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - Requires Trainer role
 *       404:
 *         description: Session not found
 *       500:
 *         description: Internal server error
 */
router.put('/sessions/:sessionId', auth, requireRole('Trainer'), updateSession);

/**
 * @swagger
 *  /trainer/sessions/{sessionId}:
 *   delete:
 *     summary: Delete a class session
 *     tags: [Trainer]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the session to delete
 *     responses:
 *       200:
 *         description: Session deleted successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - Requires Trainer role
 *       404:
 *         description: Session not found
 *       500:
 *         description: Internal server error
 */
router.delete('/sessions/:sessionId', auth, requireRole('Trainer'), deleteSession);

/**
 * @swagger
 *  /trainer/bookings:
 *   get:
 *     summary: Retrieve all bookings for the authenticated trainer's sessions
 *     tags: [Trainer]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of bookings for trainer's sessions retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Here are the bookings for your sessions
 *                 bookings:
 *                   type: array
 *                   items:
 *                     type: object
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - Requires Trainer role
 *       404:
 *         description: Trainer profile not found
 *       500:
 *         description: Internal server error
 */
router.get('/bookings', auth, requireRole('Trainer'), getTrainerBookings);
export default router;