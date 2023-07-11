const route = require("express").Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

route.post("/",userController.create);

route.patch("/",authMiddleware,userController.update);

route.delete("/",authMiddleware,userController.erase);

module.exports = route;