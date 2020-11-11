const express = require("express");
const router = express.Router();
const CosplayApply = require("../../models/CosplayApply");
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

router.get("/message/:id", (req, res) => {
  CosplayApply.findOne({ _id: req.params.id })
    .then((msg) => res.json({ contactMessage: msg }))
    .catch((err) => res.status(500).json({ msg: err.message }));
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
    bcc: "呼聲數位<sophie_tsai@resound.global>",
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
