import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// POST /api/register
router.post('/register', async (req, res) => {
  try {
    const { name, username, email, password, role } = req.body;
    if (!name || !username || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const existing = await User.findOne({ $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }] });
    if (existing) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const passwordHash = await User.hashPassword(password);
    const user = await User.create({ name, username, email, passwordHash, role });

    return res.status(201).json({
      id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role
    });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({
      message: 'Registration failed',
      ...(process.env.NODE_ENV === 'development' && { error: err.message })
    });
  }
});

// POST /api/login
router.post('/login', async (req, res) => {
  try {
    const { username, password, role } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Missing credentials' });
    }

    // Normalize lookup key
    const lookup = username.toLowerCase();
    const user = await User.findOne({ $or: [{ username: lookup }, { email: lookup }] });
    if (!user) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`[auth] Login attempt for unknown user: ${lookup}`);
        return res.status(401).json({ message: 'Invalid credentials', reason: 'user-not-found' });
      }
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const valid = await user.comparePassword(password);
    if (!valid) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`[auth] Invalid password attempt for user: ${lookup}`);
        return res.status(401).json({ message: 'Invalid credentials', reason: 'invalid-password' });
      }
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (role && user.role.toLowerCase() !== role.toLowerCase()) {
      return res.status(403).json({ message: 'Role mismatch' });
    }

    const token = jwt.sign(
      { sub: user._id, role: user.role },
      process.env.JWT_SECRET || 'dev-secret',
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({
      message: 'Login failed',
      ...(process.env.NODE_ENV === 'development' && { error: err.message })
    });
  }
});

export default router;


