import express from 'express';
import { body, param, validationResult } from 'express-validator';

const router = express.Router();

const handleValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
    next();
};

// GET /api/messages/conversations
router.get('/conversations', async (req, res) => {
    res.json({ success: true, data: [] });
});

// POST /api/messages/:userId
router.post('/:userId', [param('userId').isString().notEmpty(), body('text').isString().notEmpty()], handleValidation, async (req, res) => {
    res.status(201).json({ success: true, data: { id: 'msg-stub-id', ...req.body } });
});

// GET /api/messages/:userId
router.get('/:userId', [param('userId').isString().notEmpty()], async (req, res) => {
    res.json({ success: true, data: [] });
});

export default router;
