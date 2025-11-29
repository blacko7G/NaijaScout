import express from 'express';

const router = express.Router();

// NOTE: simplified stub implementation. In production, replace with multer + S3/Cloudinary logic.
router.post('/image', async (req, res) => {
    res.status(201).json({ success: true, data: { url: null, message: 'Upload endpoint stub - implement S3/Cloudinary' } });
});

router.post('/video', async (req, res) => {
    res.status(201).json({ success: true, data: { url: null, message: 'Upload endpoint stub - implement S3/Cloudinary' } });
});

export default router;
