const User = require('../models/user.model');
const bcryptjs = require('bcryptjs');

const signup = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password || !username.trim() || !email.trim() || !password.trim()){
        return res.status(400).send('Missing required fields');
    }

    const user = await User
        .findOne({ email })
        .select('-password');

    if (user){
        return res.status(400).send('User already registered');
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
        res.send('User registered successfully');
    } catch (error) {
        return res.status(500).send('Failed to register user');
    }
};

module.exports = {
    signup
}