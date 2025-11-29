import express from 'express';
import { param } from 'express-validator';

const router = express.Router();

// GET /api/analytics/player/:id
router.get('/player/:id', [param('id').isString().notEmpty()], async (req, res) => {
    res.json({ success: true, data: { id: req.params.id, metrics: {} } });
});

// GET /api/analytics/trials
router.get('/trials', async (req, res) => {
    res.json({ success: true, data: {} });
});

// GET /api/analytics/posts
router.get('/posts', async (req, res) => {
    res.json({ success: true, data: {} });
});

export default router;
