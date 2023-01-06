const express = require("express");
const click = require("../controllers/buttonClick");

const route = express.Router();

route.post("/increase-count", click.increaseCountOnClick);
route.get("/get-count", click.getTotalCount);

module.exports = route;
