
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose'); // Assuming MongoDB integration

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(bodyParser.json());
app.use(require('helmet')()); // Security
app.use(require('rate-limit')({ windowMs: 15 * 60 * 1000, max: 100 })); // Rate limiting

// MongoDB Connection (update with your URI)
mongoose.connect('mongodb://localhost:27017/naijascout', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'scout', 'fan', 'academy', 'player'], required: true },
  email: { type: String, required: true, unique: true },
});
const User = mongoose.model('User', userSchema);

// JWT Secret (move to env file later)
const JWT_SECRET = 'your-secret-key';

// Register Endpoint
app.post('/api/register', [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').isIn(['admin', 'scout', 'fan', 'academy', 'player']).withMessage('Invalid role'),
  body('email').isEmail().withMessage('Valid email is required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { username, password, role, email } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) return res.status(400).json({ message: 'Username or email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, role, email });
    await user.save();

    res.status(201).json({ message: 'User registered successfully', user: { id: user._id, username, role, email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Login Endpoint
app.post('/api/login', [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Protect Routes Middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied, no token provided' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Role-based Access
const authorizeRole = (role) => (req, res, next) => {
  if (req.user.role !== role) return res.status(403).json({ message: `Access denied, ${role} role required` });
  next();
};

// Example Protected Route
app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Protected data', user: req.user });
});

// Existing Player and Feed Endpoints (from prior setup)
app.get('/api/players', authenticateToken, (req, res) => {
  res.json(data.players); // Replace with MongoDB query later
});

app.post('/api/players', authenticateToken, authorizeRole('admin'), (req, res) => {
  const newPlayer = req.body;
  newPlayer.id = Date.now().toString();
  newPlayer.engagement = newPlayer.engagement || { goals: 0, assists: 0, interactions: 0 };
  newPlayer.scoutPoints = newPlayer.engagement.goals + newPlayer.engagement.assists * 2 + newPlayer.engagement.interactions;
  data.players.push(newPlayer);
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
  res.status(201).json(newPlayer);
});

app.post('/api/feed', authenticateToken, (req, res) => {
  const feedItem = {
    id: Date.now().toString(),
    player: req.body.player,
    content: req.body.content || `Added ${req.body.player} to your feed!`,
    type: req.body.type || 'text',
    timestamp: new Date().toISOString()
  };
  data.feed.unshift(feedItem);
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
  res.status(201).json(feedItem);
});

app.get('/api/feed', authenticateToken, (req, res) => {
  res.json(data.feed); // Replace with MongoDB query later
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// Update Profile
app.put('/api/profile', authenticateToken, [
    body('email').optional().isEmail().withMessage('Valid email is required'),
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  
    try {
      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      if (req.body.email) user.email = req.body.email;
      await user.save();
      res.json({ message: 'Profile updated', user: { id: user._id, username: user.username, email: user.email, role: user.role } });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });
  
  // Change Password
  app.put('/api/change-password', authenticateToken, [
    body('oldPassword').notEmpty().withMessage('Old password is required'),
    body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters'),
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  
    try {
      const user = await User.findById(req.user.id);
      if (!user || !(await bcrypt.compare(req.body.oldPassword, user.password))) {
        return res.status(401).json({ message: 'Invalid old password' });
      }
  
      user.password = await bcrypt.hash(req.body.newPassword, 10);
      await user.save();
      res.json({ message: 'Password changed successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });