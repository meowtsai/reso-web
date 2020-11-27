const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const CosplayApply = require("../../models/CosplayApply");
const EventUser = require("../../models/EventUser");
const EventLog = require("../../models/EventLog");
const helper = require("../../helpers/");
const validateCosplayApplyForm = require("../../validator/cosplayform");
const moment = require("moment");
const sgMail = require("@sendgrid/mail");
const path = require("path");
const image_path = process.env.IMAGE_PATH;
const image_upload_dir = process.env.IMAGE_UPLOAD_DIR;

router.get("/test", (req, res) => {
  res.json({ msg: "contactus API Route works" });
});

router.get("/", async (req, res) => {
  const list = await CosplayApply.find({}).select({
    nickname: 1,
    work_subject: 1,
    cover_img: 1,
    category: 1,
  });

  const voteResult = await EventLog.aggregate([
    { $match: { action: "vote" } },
    {
      $group: {
        _id: { coser_id: "$event" },
        count: { $sum: 1 },
      },
    },
  ]);

  const aggrList = list.map((coser) => {
    const coserVoteCnt = voteResult.filter(
      (d) => coser._id.toString() === d._id.coser_id
    );

    //console.log("coserVoteCnt", coserVoteCnt);
    return {
      ...coser._doc,
      voteCount: coserVoteCnt.length > 0 ? coserVoteCnt[0].count : 0,
    };
  });

  console.log(aggrList);

  res.json(aggrList);
});

router.get("/:id", async (req, res) => {
  try {
    const contestant = await CosplayApply.findOne({ _id: req.params.id });
    const voteResult = await EventLog.aggregate([
      { $match: { action: "vote", event: req.params.id } },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
        },
      },
    ]);

    //console.log("voteResult", voteResult);

    res.json({
      ...contestant._doc,
      voteCount: voteResult.length > 0 ? voteResult[0].count : 0,
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

router.post("/auth/user", async (req, res) => {
  const { siteToken } = req.body;
  //console.log(req.query);
  //const { siteToken } = req.query;

  try {
    const decoded = jwt.verify(siteToken, process.env.JWT_CODE);
    console.log("decoded", decoded);

    const user = await EventUser.findById(decoded._id);
    console.log("user", user);

    if (user) {
      res.json({
        _id: user._id,
        name: user.userName,
        token: jwt.sign({ _id: user._id }, process.env.JWT_CODE, {
          expiresIn: "1d",
        }),
      });
    } else {
      //throw new Error("User not exist");
      return res.status(401).json({ error: "User not exist" });
    }
  } catch (error) {
    //throw new Error("Invalid token");
    return res.status(401).json({ error: "Invalid token" });
  }
});

router.post("/event/vote", async (req, res) => {
  const { coser_id, action } = req.body;
  // console.log(req.body);
  // console.log(req.headers.authorization);
  //const { coser_id, action, token } = req.query;
  //1. 檢查user 是否存在
  let token;
  let user;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_CODE);

      console.log(decoded);
      user = await EventUser.findById(decoded._id);
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Token驗證失敗" });
      //throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    return res.status(401).json({ message: "沒有Token" });
    //throw new Error("Not authorized, no token");
  }

  //2. 檢查今天是否投票過 //moment().format("YYYY-MM-DD")
  const today = moment().format("YYYY-MM-DD");
  //console.log(moment().format("YYYY-MM-DD"));
  const votes = await EventLog.find({
    user: user._id,
    createdAt: { $gte: new Date(today) },
  });
  //console.log("votes", votes);

  if (votes.length <= 0) {
    const newLog = new EventLog({
      user: user._id,
      event: coser_id,
      action,
    });

    const saveResult = await newLog.save();

    res.json(saveResult);
  } else {
    return res.status(418).json({ message: "您今天已經投票過了喔!" });
  }
});

// url: /api/cosplay/
// method: POST
// receive apply data
router.post("/", async (req, res) => {
  //validation

  const record = req.body;
  //console.log("req.body", req.body);

  const checkErrors = validateCosplayApplyForm(record);
  if (!checkErrors.isValid) {
    return res.status(500).send(checkErrors.errors);
  }

  const {
    coser_name,
    coser_phone,
    coser_email,
    coser_citizen_id,
    work_subject,
    work_desc,
    category,
    nickname,
  } = record;
  //check if email or citizen id duplicate

  const checkDuplicated = await CosplayApply.findOne({
    $or: [{ coser_email }, { coser_citizen_id }],
  });

  //console.log("checkDuplicated", checkDuplicated);
  if (checkDuplicated && checkDuplicated._id) {
    return res.status(500).send({ msg: "請勿重複報名" });
  }
  //console.log("req.files", req.files);
  let add_pics = [];
  record.imgs = [];
  if (!helper.isEmpty(req.files)) {
    if (Object.keys(req.files).length > 0) {
      Object.keys(req.files).forEach((keyName, index) => {
        //console.log("keyName", keyName);

        const new_file_name =
          helper.set_filename() +
          path.extname(req.files[keyName].name).toLowerCase();
        add_pics.push(image_path + new_file_name);

        //console.log("whole path", image_path + new_file_name);

        req.files[keyName].mv(
          `${image_upload_dir}/cosplay/${category.toLowerCase()}/${new_file_name}`,
          (err) => {
            //console.log("new_file_name mvResult", err);
            if (err) return res.status(500).send({ file_logo: err.message });
          }
        );

        if (keyName === "cover_img") {
          record.cover_img =
            image_path +
            "cosplay/" +
            category.toLowerCase() +
            "/" +
            new_file_name;
        }
        if (keyName.indexOf("img") === 0) {
          record.imgs.push(
            image_path +
              "cosplay/" +
              category.toLowerCase() +
              "/" +
              new_file_name
          );
        }
      });

      const applyForm = new CosplayApply({
        coser_name,
        coser_phone,
        coser_email,
        coser_citizen_id,
        work_subject,
        work_desc,
        cover_img: record.cover_img,
        imgs: record.imgs,
        category,
        nickname,
      });

      try {
        const newRecord = await applyForm.save();
        sendMailSuccessApplied(newRecord);
        res.json(newRecord);
      } catch (err) {
        return res.status(500).json({ msg: err.message });
      }
    }
  } else {
    return res.status(500).json({ msg: "請上傳參賽圖檔" });
  }
});

module.exports = router;

const sendMailSuccessApplied = (record) => {
  //console.log("sendMailSuccessRegis//tered", record);
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const fs = require("fs");
  let html_template = fs.readFileSync(__dirname + "/mail2.html", "utf8");

  const msg = `
我們已收到您的報名申請，您已成功報名本賽事 <strong>[${
    record.category === "PG" ? "專業組" : "創意組"
  }]</strong>。 <br />
投稿作品將經由主辦單位審核後，於12/11進入網路人氣票選階段。<br />
屆時別忘了號召親朋好友為您投票助力，幫助您獲得佳績。<br />
感謝您對本賽事的支持，並預祝您能取得好成績！<br />
<br />
---本信箱為系統通知信，請勿直接回覆信件。---<br /><br />
若有賽事相關疑問，請以線上客服回報的方式聯繫主辦單位，謝謝您!<br /><br />
<a href="https://support.longeplay.com.tw/service_quick?param_game_id=h55naxx2tw">第五人格 線上客服回報</a> <br /><br />

第五人格創意Cosplay大賽 賽事小組<br />


 
  `;

  html_template = html_template
    .replace("{{msg}}", msg)
    .replace("{{name}}", record.coser_name);

  const mailContent = {
    to: `${record.coser_name}<${record.coser_email}>`,
    from: "龍邑遊戲<no-reply@longeplay.com.tw>",
    subject: `【第五人格創意Cosplay大賽 - ${
      record.category === "PG" ? "專業組" : "創意組"
    } 】 報名完成通知`,
    html: html_template,
  };

  //console.log("mailContent", mailContent);
  sgMail.send(mailContent).then(
    (sendResult) => {
      // console.log("mail send result", sendResult);
      // console.log("mail send statusCode", sendResult.statusCode);
      // if (sendResult[0].response.statusCode === "202") {
      //   //        return true;
      // }
    },
    (error) => {
      // console.error(error);
      // if (error.response) {
      //   console.error(error.response.body);
      // }
    }
  );
};
