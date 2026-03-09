const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

const signToken = (id) =>
    jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
    
    const register = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email});
    if (userExists) {
        return next(new AppError('User already exists', 400));
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
        email,
        password: hashedPassword,
    });

    const token = signToken(newUser._id);

    res.status(201).json({
        status: 'success',
        token,
    });
});

    const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return next(new AppError('Invalid email or password', 401));
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        return next(new AppError('Invalid email or password', 401));
    }

    const token = signToken(user._id);

    res.status(200).json({
        status: 'success',
        token,
    });
}); 

module.exports = { register, login };
