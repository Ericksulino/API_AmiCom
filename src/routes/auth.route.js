const route = require("express").Router();
const authController = require("../controllers/auth.controller")

route.post("/",authController.login);

route.get("/",authController.valid);

module.exports = route;