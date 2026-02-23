/*const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');

exports.register = async (req, res) => {
   try {
        const { email } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(new AppError('User already exists', 400));      
        }
        const newUser = await User.create(req.body);
        res.status(201).json({ 
            status: 'success',
            data: newUser,
        });
   } catch (error) {
        next(error);
   }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar campos requeridos
    if (!email || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Email and password are required',
      });
    }

    // Buscar usuario por email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found',
      });
    }

    // Comparar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid password',
      });
    }

    // Generar token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Devolver usuario sin contraseña
    const userSafe = {
      _id: user._id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    };

    res.status(200).json({
      status: 'success',
      user: userSafe,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong logging in',
    });
  }
};  */

exports.register = catchAsync(async (req, res, next) => {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return next(new AppError('User already exists', 400));      
    }
    const newUser = await User.create(req.body);
    res.status(201).json({ 
        status: 'success',
        data: newUser,
    });
});
