const route = require("express").Router();
const eventController = require("../controllers/event.controller");

route.post("/",eventController.create);

route.get("/",eventController.findAll);

//route.get("/:name",eventController.findByName);

route.patch("/:id",eventController.update);

route.delete("/:id",eventController.erase);

module.exports = route;