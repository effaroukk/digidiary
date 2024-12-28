//get the controller 
const controller = require("../controllers/memories");
//get the express
const express = require('express');
//create an instance of a router
const Router = express.Router();
//create a create method
Router.post("/create", controller.createMemories);
//create a read method
Router.get("/read", controller.getMemories);
//create an update method
Router.post("/update", controller.updateMemories);
//create an filter method
Router.get("/filter", controller.filterDate);
//create an delete method
Router.delete("/delete", controller.deleteMemories);
//export the router
module.exports = Router;
