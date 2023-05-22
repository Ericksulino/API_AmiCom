const route = require("express").Router();
const authController = require("../controllers/auth.controller")
const authMiddleware = require("../middlewares/auth.middleware");

route.post("/",authController.login);

route.get("/",authMiddleware,authController.valid);

module.exports = route;