const express = require("express");
const router = express.Router();
const axios = require("axios");
const jwt = require("jsonwebtoken");
const EventUser = require("../models/EventUser");
const appConfig = require("../config/cosplay");

router.get("/", async (req, res) => {
  res.render("../pugview/fblink", { title: "Hey", message: "Hello there!" });
});

module.exports = router;
