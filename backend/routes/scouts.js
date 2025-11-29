import express from 'express';
import { body, param, query, validationResult } from 'express-validator';
import { authenticate, authorizeRole } from '../middleware/auth.js';

const router = express.Router();

const handleValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
    next();
};

// GET /api/scouts/players - discovery search
router.get('/players', [
    query('position').optional().isString(),
    query('ageMin').optional().isInt(),
    query('ageMax').optional().isInt()
], handleValidation, authenticate, authorizeRole(['Scout', 'Admin']), async (req, res) => {
    // TODO: implement actual search against Player model
    res.json({ success: true, data: [], message: 'Player discovery endpoint (stub)' });
});

// POST /api/scouts/report - create scouting report
router.post('/report', [
    body('playerId').isString().notEmpty(),
    body('summary').isString().notEmpty()
], handleValidation, authenticate, authorizeRole(['Scout', 'Admin']), async (req, res) => {
    // TODO: persist report
    res.status(201).json({ success: true, data: { id: 'stub-report-id', ...req.body } });
});

// GET /api/scouts/reports/:playerId
router.get('/reports/:playerId', [param('playerId').isString().notEmpty()], handleValidation, authenticate, authorizeRole(['Scout', 'Admin']), async (req, res) => {
    res.json({ success: true, data: [], message: 'Reports for player (stub)' });
});

// POST /api/scouts/shortlist/:playerId
router.post('/shortlist/:playerId', [param('playerId').isString().notEmpty()], handleValidation, authenticate, authorizeRole(['Scout', 'Admin']), async (req, res) => {
    res.json({ success: true, message: 'Player added to shortlist (stub)' });
});

// GET /api/scouts/shortlist
router.get('/shortlist', authenticate, authorizeRole(['Scout', 'Admin']), async (req, res) => {
    res.json({ success: true, data: [] });
});

// GET /api/scouts/trials/applications
router.get('/trials/applications', authenticate, authorizeRole(['Scout', 'Admin']), async (req, res) => {
    res.json({ success: true, data: [] });
});

export default router;
