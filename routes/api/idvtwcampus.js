const express = require("express");
const router = express.Router();
const moment = require("moment");
const validator = require("validator");
const validateTeamForm = require("../../validator/h55form");
const helper = require("../../helpers/");
const EmailVerify = require("../../models/EmailVerify");
const H55eventForm = require("../../models/H55eventForm");
const sgMail = require("@sendgrid/mail");

const image_path = process.env.IMAGE_PATH;
const image_upload_dir = process.env.IMAGE_UPLOAD_DIR;
const path = require("path");
// api/idvtwcampus
router.get("/test", async (req, res) => {
  res.json({ msg: "oh hi there" });
});

router.post("/form_submit", async (req, res) => {
  const record = req.body;
  console.log("form_submit", record);
  const checkErrors = validateTeamForm(record);

  if (!checkErrors.isValid) {
    return res.status(500).send(checkErrors.errors);
  }

  // 1. email & code 是正確的, 把isVerified 改成true
  const existRecord = await EmailVerify.findOneAndUpdate(
    {
      email: record.email,
      code: record.verify_code,
    },
    { isValid: true }
  );

  console.log(existRecord);
  if (!existRecord) {
    return res.status(500).json({
      code: "驗證碼不正確, 請確認您填寫的mail信箱中有收到我們寄發的驗證碼",
    });
  } else {
    let add_pics = [];
    //console.log("req.files", req.files);

    if (!helper.isEmpty(req.files)) {
      if (Object.keys(req.files).length > 0) {
        Object.keys(req.files).forEach((keyName, index) => {
          const new_file_name =
            helper.set_filename() +
            path.extname(req.files[keyName].name).toLowerCase();
          add_pics.push(image_path + new_file_name);

          // try {
          //   const mvResult =await req.files[keyName].mv(
          //     `${image_upload_dir}pictures/${new_file_name}`
          //   );
          //   console.log("new_file_name mvResult", mvResult);
          // } catch (error) {
          //   console.log("new_file_name mvResult", error);
          // }

          req.files[keyName].mv(
            `${image_upload_dir}/h55/${new_file_name}`,
            (err) => {
              //console.log("new_file_name mvResult", err);
              if (err) return res.status(500).send({ file_logo: err.message });
            }
          );

          if (keyName === "captain_upload1") {
            record.captain_upload1 = image_path + new_file_name;
          }
          if (keyName === "captain_upload2") {
            record.captain_upload2 = image_path + new_file_name;
          }
          if (keyName.indexOf("member") === 0) {
            record[keyName] = image_path + new_file_name;
          }
          // if (keyName === "captain-upload1") {
          //   record.captain - upload1 = image_path + "pictures/" + new_file_name;
          // }
        });
      }
      const members = [
        {
          name: record.name1,
          birthday: record.birthday1,
          game_id: record.game_id1,
          line_id: record.line_id1,
          role: record.role1,
          img1: record.member1_upload1,
          img2: record.member1_upload2,
        },
        {
          name: record.name2,
          birthday: record.birthday2,
          game_id: record.game_id2,
          line_id: record.line_id2,
          role: record.role2,
          img1: record.member2_upload1,
          img2: record.member2_upload2,
        },
        {
          name: record.name3,
          birthday: record.birthday3,
          game_id: record.game_id3,
          line_id: record.line_id3,
          role: record.role3,
          img1: record.member3_upload1,
          img2: record.member3_upload2,
        },
        {
          name: record.name4,
          birthday: record.birthday4,
          game_id: record.game_id4,
          line_id: record.line_id4,
          role: record.role4,
          img1: record.member4_upload1,
          img2: record.member4_upload2,
        },
      ];

      if (record.name5) {
        members.push({
          name: record.name5,
          birthday: record.birthday5,
          game_id: record.game_id5,
          line_id: record.line_id5,
          role: record.role5,
          img1: record.member5_upload1,
          img2: record.member5_upload2,
        });
      }

      if (record.name6) {
        members.push({
          name: record.name6,
          birthday: record.birthday6,
          game_id: record.game_id6,
          line_id: record.line_id6,
          role: record.role6,
          img1: record.member6_upload1,
          img2: record.member6_upload2,
        });
      }
      const formRecord = new H55eventForm({
        team: record.team,
        captain_name: record.name,
        captain_gender: record.gender,
        captain_phone_code: record.phone_code,
        captain_phone: record.phone,
        captain_line_id: record.line_id,
        captain_email: record.email,
        verify_code: record.verify_code,
        captain_game_id: record.game_id,
        captain_game_name: record.game_name,
        captain_role: record.role,
        members,
        captain_birthday: record.birthday,
        captain_img1: record.captain_upload1,
        captain_img2: record.captain_upload2,
      });

      try {
        const savedResult = await formRecord.save();
        sendMailSuccessRegistered(savedResult);
        res.json(savedResult);
      } catch (err) {
        return res.status(500).json({ save: err.message });
      }

      //H55eventForm
    }
  }

  // 2. 圖檔張數正確, size不會過大
  // 3. 每個欄位都有填寫且在適當的長度
  // 4. 存到db
  // 5. 發信告知已經報名成功
});

// POST /api/idvtwcampus/getcode

router.post("/getcode", async (req, res) => {
  //get email
  const email = req.body.email;
  const errors = {};
  if (!email || validator.isEmpty(email)) {
    errors.email = "email必填";
  } else if (!validator.isEmail(email)) {
    errors.email = "email格式不正確";
  }
  if (Object.keys(errors).length > 0) {
    return res.status(500).json(errors);
  }
  const code = helper.getRandomString(6);

  const existRecord = await EmailVerify.findOne({ email });
  console.log("existRecord", existRecord);

  if (existRecord) {
    //資料已經存在 檢查日期

    const duration = moment
      .duration(moment().diff(moment(existRecord.date)))
      .asHours();
    //重新發送
    if (duration > 24) {
      try {
        sendMailVerifyCode({ email, code });
        EmailVerify.findByIdAndUpdate(
          { _id: existRecord._id },
          { code, isVerified: false, date: new Date() }
        );
      } catch (err) {
        return res.status(500).json({ email: err.message });
      }
    } else {
      return res
        .status(500)
        .json({ email: "我們在稍早已經傳送email給您, 請您查收" });
    }
  } else {
    const newRecord = new EmailVerify({ email, code });
    try {
      sendMailVerifyCode({ email, code });
      newRecord.save();
    } catch (err) {
      return res.status(500).json({ email: err.message });
    }
  }
  //send mail
  res.json(true);
});

module.exports = router;

const sendMailVerifyCode = (record) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const fs = require("fs");
  let html_template = fs.readFileSync(__dirname + "/mail.html", "utf8");
  const msg = `您提供了這個 mail 作為《第五人格萬聖狂歡盃》報名的聯絡信箱，<br />
  為了確保這個重要的聯絡資料正確，<br />
  請您在表單中的認證碼欄位輸入以下資訊:<br />
  <b>${record.code}</b> <br /> 
  <br /> 
  第五人格遊戲團隊
  `;

  html_template = html_template.replace("{{msg}}", msg);

  const mailContent = {
    to: record.email,
    //bcc: "呼聲數位<hi@resound.global>",
    bcc: "呼聲數位<sophie_tsai@resound.global>",
    from: "呼聲數位<hi@resound.global>",
    subject: `《第五人格萬聖狂歡盃》Email 認證碼通知`,
    html: html_template,
  };

  //console.log("mailContent", mailContent);
  sgMail.send(mailContent).then(
    (sendResult) => {
      console.log("mail send result", sendResult);
      if (sendResult[0].response.statusCode === "202") {
        return true;
      }
    },
    (error) => {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  );
};

const sendMailSuccessRegistered = (record) => {
  console.log("sendMailSuccessRegistered", record);
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const fs = require("fs");
  let html_template = fs.readFileSync(__dirname + "/mail.html", "utf8");

  const memberInfo = record.members.map(
    (m) =>
      `<ul>
    <li>姓名: ${m.name}</li>
    <li>生日: ${moment(m.birthday).format("YYYY-MM-DD")}</li>
    <li>Game_ID: ${m.game_id}</li>
    <li>Line ID: ${m.line_id}</li>
    <li>角色:  ${m.role === "1" ? "監管者" : "求生者"}</li>
  </ul>`
  );
  const msg = `我們已經收到您所送出的《第五人格萬聖狂歡盃》報名表，<br />
  感謝您的支持，<br />
  我們會在審核隊伍資格之後於官網公布賽程名單，<br />
  若有任何資訊也會與您同步．<br />
  <br />
  <hr />
  <h3>隊長資料</h3>
  <hr />
  <ul>
  <li>隊伍名稱: ${record.team}</li>
  <li>隊長姓名: ${record.captain_name}</li>
  <li>隊長手機: ${record.captain_phone_code} ${record.captain_phone}</li>
  <li>隊長line ID:  ${record.captain_line_id}</li>
  <li>隊長Email:  ${record.captain_email}</li>
  <li>隊長Game_ID:  ${record.captain_game_id}</li>
  <li>隊長Game_Name:  ${record.captain_game_name}</li>
  <li>隊長角色:  ${record.captain_role === "1" ? "監管者" : "求生者"}</li>
  <li>隊長生日:  ${moment(record.captain_birthday).format("YYYY-MM-DD")}</li>


  
  </ul>
<hr />
  <h3>隊員資料</h3>
  <hr />
  ${memberInfo}


  <br /> 
  <hr />
  <br /> 
  <br /> 
  第五人格遊戲團隊
  `;

  html_template = html_template.replace("{{msg}}", msg);

  const mailContent = {
    to: record.captain_email,
    //bcc: "呼聲數位<hi@resound.global>",
    bcc: "呼聲數位<sophie_tsai@resound.global>",
    from: "呼聲數位<hi@resound.global>",
    subject: `《第五人格萬聖狂歡盃》報名表填寫完成通知`,
    html: html_template,
  };

  //console.log("mailContent", mailContent);
  sgMail.send(mailContent).then(
    (sendResult) => {
      console.log("mail send result", sendResult);
      console.log("mail send statusCode", sendResult.statusCode);

      if (sendResult[0].response.statusCode === "202") {
        return true;
      }
    },
    (error) => {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  );
};
