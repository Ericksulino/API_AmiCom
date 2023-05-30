const route = require("express").Router();
const eventController = require("../controllers/event.controller");
const {validEvent} = require("../middlewares/event.middleware");

route.post("/",eventController.create);

route.get("/",eventController.findAll);

route.get("/:name",eventController.findByName);

route.patch("/:id",validEvent,eventController.update);

route.delete("/:id",validEvent,eventController.erase);

module.exports = route;