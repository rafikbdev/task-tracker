const User = require('../models/User');

const register = (req, res) => {
    res.json({msg: 'register'})
}

const login = (req, res) => {
    res.json({msg: 'login'})
}

module.exports = {
    register,
    login
}