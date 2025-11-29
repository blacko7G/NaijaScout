import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

export const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers['x-access-token'];
    if (!authHeader) return res.status(401).json({ success: false, message: 'No token provided' });

    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
    if (!token) return res.status(401).json({ success: false, message: 'Invalid token format' });

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ success: false, message: 'Token invalid or expired' });
        req.user = decoded; // { sub, role, iat, exp }
        next();
    });
};

export const authorizeRole = (roles = []) => (req, res, next) => {
    if (!req.user) return res.status(401).json({ success: false, message: 'Not authenticated' });
    const userRole = (req.user.role || '').toString().toLowerCase();
    const allowed = Array.isArray(roles) ? roles.map(r => r.toString().toLowerCase()) : [roles.toString().toLowerCase()];
    if (!allowed.includes(userRole)) return res.status(403).json({ success: false, message: 'Forbidden: insufficient role' });
    next();
};

export default { authenticate, authorizeRole };
