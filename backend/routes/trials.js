import express from 'express';
import { body, param, query, validationResult } from 'express-validator';

const router = express.Router();

const handleValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
    next();
};

// POST /api/trials - create trial
router.post('/', [
    body('title').isString().notEmpty(),
    body('location').optional().isString(),
    body('date').optional().isISO8601()
], handleValidation, async (req, res) => {
    res.status(201).json({ success: true, data: { id: 'stub-trial-id', ...req.body } });
});

// GET /api/trials - public list
router.get('/', async (req, res) => {
    res.json({ success: true, data: [] });
});

// GET /api/trials/:id
router.get('/:id', [param('id').isString().notEmpty()], async (req, res) => {
    res.json({ success: true, data: { id: req.params.id } });
});

// POST /api/trials/:id/apply
router.post('/:id/apply', [param('id').isString().notEmpty(), body('playerId').isString().notEmpty()], handleValidation, async (req, res) => {
    res.json({ success: true, message: 'Application received (stub)' });
});

// GET /api/trials/:id/applications
router.get('/:id/applications', [param('id').isString().notEmpty()], async (req, res) => {
    res.json({ success: true, data: [] });
});

// PUT /api/trials/:id/application/:applicantId
router.put('/:id/application/:applicantId', [param('id').isString(), param('applicantId').isString(), body('status').isIn(['approved', 'rejected'])], handleValidation, async (req, res) => {
    res.json({ success: true, message: `Applicant ${req.params.applicantId} ${req.body.status}` });
});

export default router;
