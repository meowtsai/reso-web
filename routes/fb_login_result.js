const express = require("express");
const router = express.Router();
const axios = require("axios");
const jwt = require("jsonwebtoken");
const EventUser = require("../models/EventUser");
const appConfig = require("../config/cosplay");

router.get("/", async (req, res) => {
  //1. 預設會有 code 或 error 參數, error 和無都直接導回原本頁面

  const fb_code = req.query.code;
  //const fb_error = req.query.error;
  if (fb_code) {
    //2. 繼續取得存取權杖
    console.log("fb_code", fb_code);

    const fb_app_id = appConfig.COSPLAY_EVENT_APP_ID;
    const redirect_uri = appConfig.COSPLAY_EVENT_REDIRECT_URL;
    const client_secret = appConfig.COSPLAY_EVENT_CLIENT_SECRET;
    const fb_graph_url = `https://graph.facebook.com/v9.0/oauth/access_token?client_id=${fb_app_id}&redirect_uri=${redirect_uri}&client_secret=${client_secret}&code=${fb_code}`;

    try {
      const getFbAccessToken = await axios.get(fb_graph_url);
      console.log("getFbAccessToken", getFbAccessToken.data);
      const access_token = getFbAccessToken.data.access_token;

      const account_info = await axios.get(
        `https://graph.facebook.com/me?access_token=${access_token}`
      );

      console.log("account_info data", account_info.data);

      const { name, id } = account_info.data;
      let user = await EventUser.findOne({ channelUid: id });

      if (user) {
        //console.log("user", user);
        user.token = access_token;
      } else {
        user = new EventUser({
          channelUid: id,
          userName: name,
          channel: "facebook",
          token: access_token,
        });
        //user.save();
      }
      const updateOrInsertResult = await user.save();

      //console.log("updateOrInsertResult", updateOrInsertResult);
      //res.json({ msg: updateOrInsertResult });

      //加密自己的jwt

      const siteToken = jwt.sign(
        { _id: updateOrInsertResult._id },
        process.env.JWT_CODE,
        {
          expiresIn: "1d",
        }
      );

      res.redirect("/cosplay/showcase?site_token=" + siteToken);
    } catch (error) {
      console.log("error ", error);
      return res.status(500).json({ error: error });
    }
  } else {
    res.redirect("/cosplay/showcase");
  }
});

router.get("/test", async (req, res) => {
  let user = await EventUser.findOne({ channelUid: "10218844363396563" });
  console.log("user", user);
  //res.json({ user: user });

  if (user) {
    user.token = "new token";
  } else {
    user = new EventUser({
      channelUid: "10218844363396563",
      userName: "Hello",
      channel: "facebook",
      token: "old tokenm",
    });
  }

  const updateOrInsertResult = await user.save();
  res.json({ result: updateOrInsertResult });
});

module.exports = router;
