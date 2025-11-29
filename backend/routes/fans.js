import express from 'express';
import { param } from 'express-validator';

const router = express.Router();

// GET /api/fans/feed
router.get('/feed', async (req, res) => {
    res.json({ success: true, data: [] });
});

// POST /api/fans/follow/:userId
router.post('/follow/:userId', [param('userId').isString().notEmpty()], async (req, res) => {
    res.json({ success: true, message: 'Followed user (stub)' });
});

export default router;
