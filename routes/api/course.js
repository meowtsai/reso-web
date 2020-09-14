const express = require("express");
const router = express.Router();
const validator = require("validator");
const moment = require("moment");
const CourseRegister = require("../../models/CourseRegister");
const CourseWireReport = require("../../models/CourseWireReport");

const sgMail = require("@sendgrid/mail");
router.get("/test", async (req, res) => {
  res.json({ msg: "oh hi there" });
});

router.get("/list", async (req, res) => {
  res.json(courseConfig.courses);
});

router.get("/allRegisterData", async (req, res) => {
  try {
    const registers = await CourseRegister.find();
    const wires = await CourseWireReport.find();
    res.json({ registers, wires });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.post("/updateRegister", async (req, res) => {
  const criteria = req.body;
  CourseRegister.findOne({ _id: criteria.id, status: 2 })
    .then((record) => {
      record.status = criteria.status;
      record.save();
      res.json(record);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});
router.post("/seatsByDate", async (req, res) => {
  //const criteria = { courseId: 'A', date: '2020-09-19' };
  const criteria = req.body;

  CourseRegister.aggregate([
    { $match: { registerDate: new Date(criteria.date) } },
    {
      $group: {
        _id: { timeSlot: "$timeSlot", courseId: "$courseId" },
        count: { $sum: 1 },
      },
    },
  ])
    .then((records) => {
      const timeSlots = ["15:00~16:00", "21:30~22:30"];
      const seatsAvailable = timeSlots.map((ts) => {
        const slotStatus = records.filter((r) => r._id.timeSlot === ts);
        if (slotStatus.length === 0) {
          return {
            timeSlot: ts,
            available: 4,
            reason: null,
          };
        } else {
          return {
            timeSlot: ts,
            available:
              slotStatus[0]._id.courseId === criteria.courseId
                ? 4 - slotStatus[0].count
                : 0,
            reason:
              slotStatus[0]._id.courseId !== criteria.courseId
                ? "已排定另一課程"
                : 4 - slotStatus[0].count === 0
                ? "額滿"
                : null,
          };
        }
      });

      return res.json({ criteria, seatsAvailable });

      // [
      //   {
      //     timeSlot: '18:00~19:00',
      //     available: 0,
      //     reason: '已經額滿或是已經預定課程',
      //   },
      // ];
    })
    .catch((err) => {
      return res.status(500).json({ msg: err.message });
    });
});

//課程報名表送出
//等級 99以內的數字
//位階 1~6
//  registerDate: { type: Date, required: true },
//timeSlot: { type: String, required: true },
router.post("/register", async (req, res) => {
  // const data = {
  //   date: "2020-09-20", //只能預約七天後的課程
  //   timeSlot: "16:30~17:30", //該日期時段有四個位置可賣
  //   discordAccount: "test3333", //
  //   name: "測試者3",
  //   email: "testeer3@gmail.com", //email validation
  //   phone: "0926522334", //taiwan phone
  //   level: 33 + "", //1~99
  //   rank: 3 + "", //1~6
  // };
  const data = req.body;
  //console.log(req.body);
  //check basic input
  const errors = validateFormInput(data);
  if (Object.keys(errors).length > 0) {
    return res.status(500).json({ errors });
  }

  //check if seat available
  CourseRegister.find({ registerDate: data.date, timeSlot: data.timeSlot })
    .then((records) => {
      if (records.length >= 4) {
        return res.status(500).json({ msg: "該時段已經額滿，請選擇其他時段" });
      }

      const newRegistration = new CourseRegister({
        courseId: data.courseId,
        checkId: getRandomString(6),
        registerDate: data.date,
        timeSlot: data.timeSlot,
        name: data.name,
        discordAccount: data.discordAccount,
        email: data.email.toLowerCase(),
        phone: data.phone,
        ip: req.ip,
        level: data.level,
        rank: data.rank,
      });

      newRegistration
        .save()
        .then((data) => {
          //console.log(data);
          data.courseDetail = `課程${data.courseId}-${
            courseConfig.courses.filter((c) => c.id === data.courseId)[0].name
          }`;
          sendMailRegister(data);

          res.json({
            CourseRegister: data,
          });
        })
        .catch((err) => {
          console.log(err.message);
          return res.status(500).json({ msg: err.message });
        });
    })
    .catch((err) => {
      return res.status(500).json({ msg: err.message });
    });

  //res.json(errors);
});

router.post("/wirereport", async (req, res) => {
  // const data = {
  //   checkId: "1ehtlgn8", //
  //   ip: "127.0.0.1",
  //   bankName: "台新銀行",
  //   wireName: "如虹",
  //   bankCode: "00123",
  // };
  const data = req.body;
  const errors = validateWireFormInput(data);
  //res.json(errors);
  if (Object.keys(errors).length > 0) {
    return res.status(500).json({ errors });
  }

  const newWireReport = new CourseWireReport({
    checkId: data.checkId,
    ip: req.ip,
    bankName: data.bankName,
    wireName: data.wireName,
    bankCode: data.bankCode,
  });

  CourseRegister.findOne({ checkId: data.checkId })
    .then((registerRecord) => {
      //console.log("registerRecord", registerRecord);
      if (registerRecord) {
        newWireReport.registerId = registerRecord._id;
      }

      registerRecord.status = 2; //改為已經確認
      registerRecord.save();

      newWireReport
        .save()
        .then((data) => {
          res.json({ wireReport: data });
        })
        .catch((err) => {
          return res.status(500).json({ msg: err.message });
        });
    })
    .catch((err) => {
      return res.status(500).json({ msg: err.message });
    });
});
module.exports = router;

const validateWireFormInput = (formData) => {
  const errors = {};
  const { checkId, bankName, wireName, bankCode } = formData;

  if (!checkId) {
    errors.checkId = "預約代號未填寫";
  }
  if (!bankName) {
    errors.bankName = "匯款銀行名稱未填寫";
  }
  if (!wireName) {
    errors.wireName = "匯款帳戶名稱未填寫";
  }
  if (!bankCode) {
    errors.bankCode = "匯款帳號後五碼未填寫";
  }

  return errors;
};

const validateFormInput = (formData) => {
  const errors = {};
  const {
    date,
    timeSlot,
    discordAccount,
    name,
    email,
    phone,
    level,
    rank,
  } = formData;

  if (!date) {
    errors.date = "日期未填寫";
  }
  if (!timeSlot) {
    errors.timeSlot = "時間未填寫";
  }
  if (!discordAccount) {
    errors.discordAccount = "discord account未填寫";
  }
  if (!name) {
    errors.name = "姓名未填寫";
  }

  if (!email) {
    errors.email = "email未填寫";
  }
  if (!phone) {
    errors.phone = "手機未填寫";
  }
  if (!level) {
    errors.level = "等級未填寫";
  }
  if (!rank) {
    errors.rank = "位階未填寫";
  }
  if (Object.keys(errors).length > 0) {
    return errors;
  }
  if (!validator.isEmail(email)) {
    errors.email = "email格式不正確";
  }

  if (
    !validator.isAfter(
      date,
      moment().add(6, "day").format("YYYY-MM-DD").toString()
    )
  ) {
    errors.date = "只能選擇七天後的課程";
  }
  if (validator.isEmpty(discordAccount)) {
    errors.discordAccount = "discord 帳號必填";
  }
  if (validator.isEmpty(name)) {
    errors.name = "姓名必填";
  }

  if (validator.isEmpty(phone)) {
    errors.phone = "手機必填";
  }
  if (validator.isEmpty(level)) {
    errors.level = "等級必填";
  } else if (!validator.isInt(level, { min: 1, max: 99 })) {
    errors.level = "等級不是數字或在錯誤範圍";
  }
  if (validator.isEmpty(rank)) {
    errors.rank = "位階必填";
  } else if (!validator.isInt(rank, { min: 1, max: 6 })) {
    errors.rank = "位階不是數字或在錯誤範圍";
  }

  return errors;
};

const courseConfig = {
  courses: [
    { id: "A", name: "求生者：遛監管者技巧教學" },
    { id: "B", name: "求生者：對戰觀念教學" },
  ],
};

const getRandomString = (length) => {
  const charString = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const charLength = charString.length;
  let result = "";
  for (let index = 0; index < length; index++) {
    result += charString.charAt(Math.floor(Math.random() * charLength));
  }

  return result;
};

const sendMailRegister = (record) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const fs = require("fs");
  let html_template = fs.readFileSync(__dirname + "/mail.html", "utf8");
  const msg = `您的課程註冊預約代號為 <b>${
    record.checkId
  }</b>，請妥善保存!<br />
    

    以下是您的註冊資料:<br />
    您的預約日期和時段: ${moment(record.registerDate)
      .format("YYYY年MM月DD日")
      .toString()}
    ${record.timeSlot} <br />
    discord帳號:${record.discordAccount}<br />
    姓名:${record.name}<br />
    手機:${record.phone}<br />
    email:${record.email}<br /><br />
    角色等級:${record.level}<br />
    角色位階:${record.rank}<br />
    
    <hr />
    課程${record.courseId}-${
    courseConfig.courses.filter((c) => c.id === record.courseId)[0].name
  }
    <br />
    費用合計$500元<br />
    <p className="amount">
    已為您保留預約資格，請於3天內匯款費用至
    <br />
    戶名：高誌陽
    <br />
    銀行：台新國際商業銀行0078台中分行
    <br />
    帳號：(812)2007-10-00099757
  </p>
  <span style="color:red; font-weight:700"> 提醒：匯款成功後，請務必回到官網，點選【匯款成功回報】，核對匯款。若無在3天內匯款，預約資格將取消，還請見諒。</span>
    `;

  html_template = html_template.replace("{{msg}}", msg);

  const mailContent = {
    to: record.email,
    from: process.env.CONTACT_MAIL_COURSE,
    subject: `第五人格課程註冊成功通知`,
    html: html_template,
  };

  //console.log("mailContent", mailContent);
  sgMail.send(mailContent).then(
    (sendResult) => {
      //console.log("mail send result", sendResult);
    },
    (error) => {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  );
};
