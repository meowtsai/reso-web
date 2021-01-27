const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.render("../pugview/fbpixel", {});
});

module.exports = router;
