const User = require("../models/user");
const jwt = require("jsonwebtoken");

const login = (name) => User.findOne({name:name}).select("+password")

const generateToken = (name) => jwt.sign({name: name},process.env.SECRET_JWT,{expiresIn: 86400})

module.exports = {
    login,
    generateToken
}