const User = require('../models/user.model');
const bcryptjs = require('bcryptjs');
const errorHandler = require('../utils/error');

const signup = async (req, res,next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password || !username.trim() || !email.trim() || !password.trim()){
       next(errorHandler(400, 'All fields are required'));
    }

    const user = await User
        .findOne({ email })
        .select('-password');

    if (user){
      next(errorHandler(400, 'User already exists'));
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

   
    const newUser = new User({
        username,
        email,
        password: hashedPassword
    });

    try {
        await newUser.save();
        res.status(201).json({
            success: true,
            message: 'SignUp Successful!!!'
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    signup
}