const jwt = require('jsonwebtoken');
const { jwt: jwtConfig } = require('../config/config');
const userService = require('../services/authService');

const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.startsWith('Bearer') ? authHeader.split(' ')[1] : null;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Not authorised, no token'
            });
        }

        const decoded = jwt.verify(token, jwtConfig.secret);

        const user = await userService.getUserById(decoded.id); 

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found'
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(401).json({
            success: false,
            message: 'Not authorised, token failed'
        });
    }
};

module.exports = { protect };
