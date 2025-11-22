const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Job:
 *       type: object
 *       required:
 *         - companyName
 *         - jobTitle
 *         - description
 *         - salary
 *       properties:
 *         companyName:
 *           type: string
 *           description: Name of the company
 *         jobTitle:
 *           type: string
 *           description: Title of the job position
 *         description:
 *           type: string
 *           description: Job description
 *         salary:
 *           type: number
 *           description: Salary for the position
 */

/**
 * @swagger
 * /create/job:
 *   post:
 *     summary: Create a new job (Admin only)
 *     tags: [Jobs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       201:
 *         description: Job created successfully
 *       400:
 *         description: Validation failed
 */
router.post('/job', jobController.createJob);

/**
 * @swagger
 * /jobs:
 *   get:
 *     summary: Get all jobs
 *     tags: [Jobs]
 *     responses:
 *       200:
 *         description: List of all jobs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 jobs:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Job'
 */
router.get('/', jobController.getAllJobs);

module.exports = router;
