const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors/index');

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
        throw new BadRequestError('Please provide email and password')
    }

    const user = await User.findOne({email});
    if(!user){
        throw new UnauthenticatedError('Invalid Credentials')
    }

    const isCorrectPass = await user.comparePassword(password);
    if(!isCorrectPass){
        throw new UnauthenticatedError('Invalid Credentials')
    }

    const token = user.createJWT();
    res.json({user: {name: user.getName()}, token})
}

module.exports = {
    register,
    login
}