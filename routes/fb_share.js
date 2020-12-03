const express = require("express");
const router = express.Router();
const axios = require("axios");
const jwt = require("jsonwebtoken");
const CosplayApply = require("../models/CosplayApply");
const appConfig = require("../config/cosplay");

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const coser = await CosplayApply.findById(id);

  res.render("../pugview/fblink", {
    coserid: id,
    title: coser.nickname + "-" + coser.work_subject,
    img: coser.cover_img,
    desc: coser.work_desc,
  });
});

module.exports = router;
