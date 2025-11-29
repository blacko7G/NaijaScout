import express from 'express';
import Player from '../models/Player.js';
import { body, param, query, validationResult } from 'express-validator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Players
 *   description: Player management and statistics
 */

/**
 * @swagger
 * /api/players:
 *   get:
 *     summary: Get all players
 *     tags: [Players]
 *     parameters:
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [scoutPoints, age, name, position, status]
 *         description: Field to sort by
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort order
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Results per page
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: position
 *         schema:
 *           type: string
 *           enum: [Forward, Midfielder, Defender, Goalkeeper]
 *         description: Filter by position
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [active, inactive, scouted, signed]
 *         description: Filter by status
 *     responses:
 *       200:
 *         description: List of players
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: integer
 *                 total:
 *                   type: integer
 *                 pagination:
 *                   type: object
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Player'
 *
 *   post:
 *     summary: Create a new player
 *     tags: [Players]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Player'
 *     responses:
 *       201:
 *         description: Player created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Player'
 *       400:
 *         description: Validation error
 *
 * /api/players/{id}:
 *   get:
 *     summary: Get a player by ID
 *     tags: [Players]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Player ID
 *     responses:
 *       200:
 *         description: Player found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Player'
 *       404:
 *         description: Player not found
 *
 *   put:
 *     summary: Update a player by ID
 *     tags: [Players]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Player ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Player'
 *     responses:
 *       200:
 *         description: Player updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Player'
 *       400:
 *         description: Validation error
 *       404:
 *         description: Player not found
 *
 *   delete:
 *     summary: Delete a player by ID
 *     tags: [Players]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Player ID
 *     responses:
 *       200:
 *         description: Player deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       404:
 *         description: Player not found
 *
 * /api/players/stats/overview:
 *   get:
 *     summary: Get player statistics overview
 *     tags: [Players]
 *     responses:
 *       200:
 *         description: Player statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *
 * components:
 *   schemas:
 *     Player:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         position:
 *           type: string
 *         age:
 *           type: integer
 *         nationality:
 *           type: string
 *         club:
 *           type: string
 *         engagement:
 *           type: object
 *           properties:
 *             goals:
 *               type: integer
 *             assists:
 *               type: integer
 *             interactions:
 *               type: integer
 *             matches:
 *               type: integer
 *             minutes:
 *               type: integer
 *         stats:
 *           type: object
 *           properties:
 *             pace:
 *               type: integer
 *             shooting:
 *               type: integer
 *             passing:
 *               type: integer
 *             dribbling:
 *               type: integer
 *             defending:
 *               type: integer
 *             physical:
 *               type: integer
 *         scoutPoints:
 *           type: integer
 *         status:
 *           type: string
 *         image:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
// Validation middleware for player creation/updating
const validatePlayer = [
  body('name').trim().isLength({ min: 1, max: 50 }).withMessage('Name is required and must be less than 50 characters'),
  body('age').isInt({ min: 16, max: 50 }).withMessage('Age must be between 16 and 50'),
  body('position').isIn(['Forward', 'Midfielder', 'Defender', 'Goalkeeper']).withMessage('Invalid position'),
  body('nationality').optional().isString().isLength({ min: 2, max: 50 }).withMessage('Nationality must be a string'),
  body('club').optional().isString().isLength({ min: 1, max: 100 }).withMessage('Club must be a string'),
  body('engagement.goals').isInt({ min: 0 }).withMessage('Goals must be a non-negative integer'),
  body('engagement.assists').isInt({ min: 0 }).withMessage('Assists must be a non-negative integer'),
  body('engagement.interactions').isInt({ min: 0 }).withMessage('Interactions must be a non-negative integer'),
  body('engagement.matches').optional().isInt({ min: 0 }).withMessage('Matches must be a non-negative integer'),
  body('engagement.minutes').optional().isInt({ min: 0 }).withMessage('Minutes must be a non-negative integer'),
  body('stats.pace').optional().isInt({ min: 0, max: 100 }).withMessage('Pace must be between 0 and 100'),
  body('stats.shooting').optional().isInt({ min: 0, max: 100 }).withMessage('Shooting must be between 0 and 100'),
  body('stats.passing').optional().isInt({ min: 0, max: 100 }).withMessage('Passing must be between 0 and 100'),
  body('stats.dribbling').optional().isInt({ min: 0, max: 100 }).withMessage('Dribbling must be between 0 and 100'),
  body('stats.defending').optional().isInt({ min: 0, max: 100 }).withMessage('Defending must be between 0 and 100'),
  body('stats.physical').optional().isInt({ min: 0, max: 100 }).withMessage('Physical must be between 0 and 100'),
  body('status').optional().isIn(['active', 'inactive', 'scouted', 'signed']).withMessage('Invalid status'),
  body('image').optional().isString().isLength({ max: 300 }).withMessage('Image must be a string'),
];

// Validation middleware for query params (GET /api/players)
const validatePlayerQuery = [
  query('sort').optional().isString().isIn(['scoutPoints', 'age', 'name', 'position', 'status']).withMessage('Invalid sort field'),
  query('order').optional().isString().isIn(['asc', 'desc']).withMessage('Order must be asc or desc'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be at least 1'),
  query('position').optional().isString().isIn(['Forward', 'Midfielder', 'Defender', 'Goalkeeper']).withMessage('Invalid position'),
  query('status').optional().isString().isIn(['active', 'inactive', 'scouted', 'signed']).withMessage('Invalid status'),
];

// Helper: handle validation errors
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error('Validation error');
    err.status = 400;
    err.errors = errors.array();
    return next(err);
  }
  next();
};

// @desc    Get all players
// @route   GET /api/players
// @access  Public
router.get('/', validatePlayerQuery, handleValidation, async (req, res, next) => {
  try {
    const { sort = 'scoutPoints', order = 'desc', limit = 10, page = 1, position, status } = req.query;
    // Build filter object
    const filter = {};
    if (position) filter.position = position;
    if (status) filter.status = status;
    // Build sort object
    const sortObj = {};
    sortObj[sort] = order === 'desc' ? -1 : 1;
    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const players = await Player.find(filter)
      .sort(sortObj)
      .limit(parseInt(limit))
      .skip(skip);
    const total = await Player.countDocuments(filter);
    res.json({
      success: true,
      count: players.length,
      total,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      },
      data: players
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get single player
// @route   GET /api/players/:id
// @access  Public
router.get('/:id', param('id').isMongoId().withMessage('Invalid player ID'), handleValidation, async (req, res, next) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) {
      const err = new Error('Player not found');
      err.status = 404;
      return next(err);
    }
    res.json({ success: true, data: player });
  } catch (error) {
    next(error);
  }
});

// @desc    Create new player
// @route   POST /api/players
// @access  Public
router.post('/', validatePlayer, handleValidation, async (req, res, next) => {
  try {
    const player = await Player.create(req.body);
    res.status(201).json({ success: true, data: player });
  } catch (error) {
    if (error.code === 11000) {
      const err = new Error('Player already exists');
      err.status = 400;
      return next(err);
    }
    next(error);
  }
});

// @desc    Update player
// @route   PUT /api/players/:id
// @access  Public
router.put('/:id', param('id').isMongoId().withMessage('Invalid player ID'), validatePlayer, handleValidation, async (req, res, next) => {
  try {
    const player = await Player.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!player) {
      const err = new Error('Player not found');
      err.status = 404;
      return next(err);
    }
    res.json({ success: true, data: player });
  } catch (error) {
    next(error);
  }
});

// @desc    Delete player
// @route   DELETE /api/players/:id
// @access  Public
router.delete('/:id', param('id').isMongoId().withMessage('Invalid player ID'), handleValidation, async (req, res, next) => {
  try {
    const player = await Player.findByIdAndDelete(req.params.id);
    if (!player) {
      const err = new Error('Player not found');
      err.status = 404;
      return next(err);
    }
    res.json({ success: true, message: 'Player deleted successfully' });
  } catch (error) {
    next(error);
  }
});

// @desc    Get player statistics
// @route   GET /api/players/stats/overview
// @access  Public
router.get('/stats/overview', async (req, res, next) => {
  try {
    const stats = await Player.aggregate([
      {
        $group: {
          _id: null,
          totalPlayers: { $sum: 1 },
          avgScoutPoints: { $avg: '$scoutPoints' },
          maxScoutPoints: { $max: '$scoutPoints' },
          totalGoals: { $sum: '$engagement.goals' },
          totalAssists: { $sum: '$engagement.assists' },
          totalInteractions: { $sum: '$engagement.interactions' },
          avgAge: { $avg: '$age' }
        }
      }
    ]);
    const positionStats = await Player.aggregate([
      {
        $group: {
          _id: '$position',
          count: { $sum: 1 },
          avgScoutPoints: { $avg: '$scoutPoints' }
        }
      }
    ]);
    res.json({
      success: true,
      data: {
        overview: stats[0] || {},
        positions: positionStats
      }
    });
  } catch (error) {
    next(error);
  }
});

export default router;
