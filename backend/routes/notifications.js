import express from 'express';
import { param } from 'express-validator';

const router = express.Router();

// GET /api/notifications
router.get('/', async (req, res) => {
    res.json({ success: true, data: [] });
});

// POST /api/notifications/read/:id
router.post('/read/:id', [param('id').isString().notEmpty()], async (req, res) => {
    res.json({ success: true, message: 'Notification marked read (stub)' });
});

// POST /api/notifications/read-all
router.post('/read-all', async (req, res) => {
    res.json({ success: true, message: 'All notifications marked read (stub)' });
});

export default router;
