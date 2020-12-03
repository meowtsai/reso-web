const express = require("express");
const router = express.Router();
const axios = require("axios");
const jwt = require("jsonwebtoken");
const CosplayApply = require("../models/CosplayApply");
const appConfig = require("../config/cosplay");

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  //
  if (
    req.query.fbclid ||
    req.headers["user-agent"] !== "facebookexternalhit/1.1"
  ) {
    res.redirect(
      "https://www.resound.global/cosplay/showcase/" +
        id +
        "?fbclid=" +
        req.query?.fbclid
    );
  } else {
    const coser = await CosplayApply.findById(id);

    res.render("../pugview/fblink", {
      coserid: id,
      title: coser.nickname + "-" + coser.work_subject,
      img: coser.cover_img,
      desc: coser.work_desc,
    });
  }
  //console.log("Referrer ", req);
  //if(req.headers["referer"].endsWith("public/public.html"))
});

module.exports = router;
