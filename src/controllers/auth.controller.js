const User = require("../models/User");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

const signToken = (id) => {
 return jwt.sign({ id }, process.env.JWT_SECRET, {
   expiresIn: "7d",
 });
};

// REGISTER
exports.register = catchAsync(async (req, res, next) => {
 const { email, password } = req.body;

 const user = await User.create({ email, password });

 const token = signToken(user._id);

 res.status(201).json({
   status: "success",
   token,
 });
});

// LOGIN
exports.login = catchAsync(async (req, res, next) => {
 const { email, password } = req.body;

 if (!email || !password) {
   return next(new AppError("Provide email and password", 400));
 }

 const user = await User.findOne({ email }).select("+password");

 if (!user || !(await user.correctPassword(password))) {
   return next(new AppError("Incorrect email or password", 401));
 }

 const token = signToken(user._id);

 res.status(200).json({
   status: "success",
   token,
 });
});