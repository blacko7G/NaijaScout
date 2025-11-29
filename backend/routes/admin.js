import express from 'express';
import { param } from 'express-validator';
import { authenticate, authorizeRole } from '../middleware/auth.js';

const router = express.Router();

// GET /api/admin/users
router.get('/users', authenticate, authorizeRole(['Academy', 'Scout']), async (req, res) => {
    res.json({ success: true, data: [] });
});

// DELETE /api/admin/user/:id
router.delete('/user/:id', [param('id').isString().notEmpty()], authenticate, authorizeRole(['Academy', 'Scout']), async (req, res) => {
    res.json({ success: true, message: 'User deleted (stub)' });
});

// GET /api/admin/analytics/overview
router.get('/analytics/overview', authenticate, authorizeRole(['Academy', 'Scout']), async (req, res) => {
    res.json({ success: true, data: {} });
});

export default router;
