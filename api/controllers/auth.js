const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');

const register = async (req, res) => {
    const user = await User.create({ ...req.body })
    const token = user.createJWT();
    res
        .status(StatusCodes.CREATED)
        .json({user: {name: user.getName()}, token})
}

const login = async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        return res.json('Please provide email and password')
    }

    const user = await User.findOne({email});
    if(!user){
        return res.json('Invalid Credentials')
    }

    const isCorrectPass = await user.comparePassword(password);
    if(!isCorrectPass){
        return res.json('Invalid Credentials')
    }

    const token = user.createJWT();
    res.json({user: {name: user.getName()}, token})
}

module.exports = {
    register,
    login
}