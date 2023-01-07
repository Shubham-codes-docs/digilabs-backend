const express = require("express");
const headings = require("../controllers/heading");
const logo = require("../controllers/imageUpload");

const route = express.Router();

route.get("/get-headings", headings.viewHeadings);

route.post("/change-headings", headings.changeHeading);

route.post("/change-logo", logo.changeImage);
route.get("/get-logo", logo.getLogo);

module.exports = route;
