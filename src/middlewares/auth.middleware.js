const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protects routes by verifying JWT token
exports.protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return res.status(401).json({ message: "Not logged in!"});
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    req.user = user;
    next();
}