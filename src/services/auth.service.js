const User = require("../models/user");
const jwt = require("jsonwebtoken");

const login = (name) => User.findOne({name:name}).select("+password")

const generateToken = (id) => jwt.sign({id:id},process.env.SECRET_JWT,{expiresIn: 86400})

module.exports = {
    login,
    generateToken
}