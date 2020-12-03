const express = require("express");
const router = express.Router();
const axios = require("axios");
const jwt = require("jsonwebtoken");
const EventUser = require("../models/EventUser");
const appConfig = require("../config/cosplay");

router.get("/", async (req, res) => {
  res.render("../pugview/fblink", {
    title: "棋佈星羅",
    message: "第五人格監管者 雕刻家 伽拉泰亞 金皮!",
  });
});

module.exports = router;
