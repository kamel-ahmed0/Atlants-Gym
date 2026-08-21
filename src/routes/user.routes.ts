import { Router } from "express"
import { registerUser, loginUser } from "../controllers/user.controller"
const router = Router();

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstname
 *               - lastname
 *               - email
 *               - password
 *               - repeatedPassword
 *               - role
 *             properties:
 *               firstname:
 *                 type: string
 *                 example: Kamel
 *               lastname:
 *                 type: string
 *                 example: Ahmed
 *               email:
 *                 type: string
 *                 example: kamel.ahmed@gym-atlamts.com
 *               password:
 *                 type: string
 *                 example: password123
 *               repeatedPassword:
 *                 type: string
 *                 example: password123
 *               role:
 *                 type: string
 *                 example: Trainer
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Passwords do not match, wrong role , missing required fields or User already exists
 *       500:
 *         description: Failed to create User
 */
router.post("/register", registerUser);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login user and set token cookie
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: kamel.ahmed@gym-atlamts.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Missing email or password
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.post("/login", loginUser);

export default router;