import express from 'express';
import { body, param } from 'express-validator';

const router = express.Router();

// GET /api/posts
router.get('/', async (req, res) => {
    res.json({ success: true, data: [] });
});

// POST /api/posts
router.post('/', [body('type').optional().isIn(['image', 'video', 'text'])], async (req, res) => {
    res.status(201).json({ success: true, data: { id: 'stub-post-id', ...req.body } });
});

// POST /api/posts/:id/like
router.post('/:id/like', [param('id').isString().notEmpty()], async (req, res) => {
    res.json({ success: true, message: 'Post liked (stub)' });
});

// POST /api/posts/:id/comment
router.post('/:id/comment', [param('id').isString().notEmpty(), body('text').isString().notEmpty()], async (req, res) => {
    res.json({ success: true, message: 'Comment added (stub)' });
});

// GET /api/posts/user/:userId
router.get('/user/:userId', async (req, res) => {
    res.json({ success: true, data: [] });
});

export default router;
