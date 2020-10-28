const express = require("express");
const router = express.Router();
const Course = require("../../models/mentors/CourseModel");
const Mentor = require("../../models/mentors/MentorModel");
const MentorCourseRegister = require("../../models/mentors/MentorCourseRegister");
const MentorCourseWireReport = require("../../models/mentors/MentorCourseWireReport");
const ObjectId = require("mongoose").Types.ObjectId;
const moment = require("moment");
const validateMentorFormInput = require("../../validator/mentorform");
const validateMentorWireFormInput = require("../../validator/mentorwirereport");

const helper = require("../../helpers/");
const sgMail = require("@sendgrid/mail");
const CONFIG = require("../../config/course");

router.get("/test", async (req, res) => {
  const game = await Course.findById("5f964424fdce7e2fc435079a").select({
    courses: 1,
  });
  console.log("game", game);
  console.log(
    "courses array",
    game.courses.map((c) => c._id)
  );

  const records = await MentorCourseRegister.findOne({
    checkId: "4SCCCM",
    status: 1,
    course: game.courses.map((c) => c._id),
  });

  res.json({ msg: records });
});

router.get("/game_list", async (req, res) => {
  try {
    const games = await Course.find({}).select({
      gameId: 1,
      gameName: 1,
      img: 1,
      slogan: 1,
    });
    res.json({ games });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.get("/game/:game_id", async (req, res) => {
  const game_id = req.params.game_id;
  try {
    const game = await Course.findOne({ _id: game_id });
    //console.log("game", game);
    const mentors = await Mentor.find({ courseId: game.gameId });
    res.json({ game, mentors });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.post("/seatsByDate", async (req, res) => {
  // const criteria = {
  //   mentorId: "5f964424fdce7e2fc43507ac",
  //   courseId: "5f964424fdce7e2fc4350798",
  //   date: "2020-11-08",
  // };

  //const criteria = { mentorId:"5f964424fdce7e2f", courseId: '5f964424fdce7e2fc4350798', date: '2020-11-08' };
  const criteria = req.body;
  console.log("criteria", criteria);
  //get nono_dates
  //db.mentors.find(ObjectId("5f964424fdce7e2fc43507ac"), {periods:1})

  if (!ObjectId.isValid(criteria.mentorId)) {
    return res.json({
      criteria,
      seatsAvailable: [
        {
          timeSlot: "NA",
          available: 0,
          reason: "資料有誤",
        },
      ],
    });
  }

  const mentor = await Mentor.findById(criteria.mentorId, { periods: 1 });
  const game = await Course.findOne(
    { courses: { $elemMatch: { _id: criteria.courseId } } },
    { courses: 1 }
  );

  if (!mentor || !game) {
    return res.json({
      criteria,
      seatsAvailable: [
        {
          timeSlot: "NA",
          available: 0,
          reason: "資料有誤, 沒有這個講師",
        },
      ],
    });
  }

  const course = game.courses.filter(
    (c) => c._id.toString() === criteria.courseId
  )[0];
  // console.log(game.courses);
  // console.log("course", course);
  //db.courses.find({courses:{$elemMatch:{_id: ObjectId("5f964424fdce7e2fc4350798")}}}, {courses:1}).pretty();

  const {
    excludedStartDate,
    excludedEndDate,
    weekdays,
    timeSlots,
  } = mentor.periods;

  //check if the specific date is within the range
  if (excludedStartDate && excludedEndDate) {
    const isBetween = moment(criteria.date).isBetween(
      excludedStartDate,
      excludedEndDate
    );
    console.log("isBetween", isBetween);
    if (isBetween === true) {
      return res.json({
        criteria,
        seatsAvailable: [
          {
            timeSlot: "NA",
            available: 0,
            reason: "講師設定該日期區間不開放預約",
          },
        ],
      });
    }
  }

  //check if the date weekday

  if (weekdays.indexOf(moment(criteria.date).weekday()) < 0) {
    console.log(
      "weekdays.indexOf(moment(criteria.date).weekday())",
      weekdays.indexOf(moment(criteria.date).weekday())
    );
    return res.json({
      criteria,
      seatsAvailable: [
        {
          timeSlot: "NA",
          available: 0,
          reason: "講師設定該周間日不開放預約",
        },
      ],
    });
  }

  // console.log("excludedStartDate", excludedStartDate)
  // console.log("excludedEndDate", excludedEndDate)

  //

  MentorCourseRegister.aggregate([
    {
      $match: {
        registerDate: new Date(criteria.date),
        //course: ObjectId(criteria.courseId),
        mentor: ObjectId(criteria.mentorId),
      },
    },
    {
      $group: {
        _id: { timeSlot: "$timeSlot", course: "$course" },
        count: { $sum: 1 },
      },
    },
  ])
    .then((records) => {
      //console.log("records", records);
      //console.log("timeSlots", timeSlots);
      //const timeSlots = ["15:00~16:00", "21:30~22:30"];
      const seatsAvailable = timeSlots.map((ts) => {
        const slotStatus = records.filter((r) => r._id.timeSlot === ts);
        if (slotStatus.length === 0) {
          return {
            timeSlot: ts,
            available: course.seats,
            reason: null,
          };
        } else {
          return {
            timeSlot: ts,
            available:
              slotStatus[0]._id.course.toString() === criteria.courseId
                ? course.seats - slotStatus[0].count
                : 0,
            reason:
              slotStatus[0]._id.course.toString() !== criteria.courseId
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

router.post("/register", async (req, res) => {
  // //validateMentorFormInput
  // const data = {
  //   //mentor: "5f964424fdce7e2fc43507ac",
  //   //course: "5f964424fdce7e2fc4350798",

  //   date: "2020-11-06T16:00:00.000Z", //只能預約七天後的課程
  //   timeSlot: "21:30~22:30", //該日期時段有四個位置可賣
  //   discordAccount: "test3333", //
  //   name: "測試者3",
  //   email: "testeer3@gmail.com", //email validation
  //   phone: "0926522334", //taiwan phone
  //   roleData1: 33 + "", //1~99
  //   roleData2: 3 + "", //1~6
  // };

  //   {"mentor":"5f964424fdce7e2fc43507ac","course":"5f964424fdce7e2fc4350798","timeSlot":"21:30~22:30","discordAccount":"sophietsai","name":"蔡湜梵","phone":"0926568279","email":"shihfan.tsai@gmail.com","roleData1":"11","roleData2":"2","date":"2020-11-06T16:00:00.000Z"}
  const data = req.body;
  //console.log(req.body);
  //check basic input

  const checkErrors = validateMentorFormInput(data);
  //console.log("checkErrors", checkErrors);
  if (!checkErrors.isValid) {
    return res.status(500).json(checkErrors.errors);
  }

  const mentorFull = await Mentor.findById(data.mentor, {
    email: 1,
    wireInfo: 1,
  });
  const game = await Course.findOne(
    { courses: { $elemMatch: { _id: data.course } } },
    { courses: 1, gameName: 1 }
  );
  const courseFull = game.courses.filter(
    (c) => c._id.toString() === data.course
  )[0];

  //check if seat available
  MentorCourseRegister.aggregate([
    {
      $match: {
        registerDate: new Date(data.date),
        timeSlot: data.timeSlot,
        course: ObjectId(data.course),
        mentor: ObjectId(data.mentor),
      },
    },
    {
      $group: {
        _id: { timeSlot: "$timeSlot", course: "$course" },
        count: { $sum: 1 },
      },
    },
  ])
    .then((records) => {
      if (records.length > 0) {
        if (records[0].count >= courseFull.seats) {
          return res
            .status(500)
            .json({ msg: "該時段已經額滿，請選擇其他時段" });
        }
      }

      const newRegistration = new MentorCourseRegister({
        course: data.course,
        mentor: data.mentor,
        checkId: helper.getRandomString(6),
        registerDate: data.date,
        timeSlot: data.timeSlot,
        name: data.name,
        discordAccount: data.discordAccount,
        email: data.email.toLowerCase(),
        phone: data.phone,
        ip: req.ip,
        roleData1: data.roleData1,
        roleData2: data.roleData2,
      });

      newRegistration
        .save()
        .then((data) => {
          //console.log(data);
          // data.courseDetail = `課程${data.courseId}-${
          //   CONFIG.courses.filter((c) => c.id === data.courseId)[0].name
          // }`;
          sendMailRegister({
            ...data._doc,
            mentorFull,
            courseFull,
            gameName: game.gameName,
          });

          res.json({
            CourseRegister: { ...data._doc, mentorFull, courseFull },
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
  const data = req.body;
  const errors = validateMentorWireFormInput(data);
  //res.json(errors);
  if (Object.keys(errors).length > 0) {
    return res.status(500).json({ errors });
  }

  const gameId = data.gameId;
  const newWireReport = new MentorCourseWireReport({
    checkId: data.checkId,
    ip: req.ip,
    bankName: data.bankName,
    wireName: data.wireName,
    bankCode: data.bankCode,
  });

  //find courses id list
  const game = await Course.findById(gameId.toString(), { courses: 1 });

  // console.log("game", game);
  // console.log(
  //   "courses array",
  //   game.courses.map((c) => c._id)
  // );

  MentorCourseRegister.findOne({
    checkId: data.checkId,
    status: 1,
    course: game.courses.map((c) => c._id),
  })
    .then((registerRecord) => {
      console.log("registerRecord", registerRecord);
      if (registerRecord) {
        newWireReport.registerId = registerRecord._id;
      } else {
        return res.status(500).json({ msg: "預約代碼不存在或是該筆已經確認" });
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
    discord帳號: ${record.discordAccount}<br />
    姓名: ${record.name}<br />
    手機: ${record.phone}<br />
    Email: ${record.email}<br /><br />
    
   


    <hr />
    以下是您的課程匯款明細:<br />
    課程: ${record.courseFull.title}-${record.courseFull.desc}
    <br />
    費用合計: $${record.courseFull.fee}元<br />
    <p className="amount">
    已為您保留預約資格，請於3天內匯款費用至
    <br />
    戶名：${record.mentorFull.wireInfo.account_name}
    <br />
    銀行：${record.mentorFull.wireInfo.bank_name} ${
    record.mentorFull.wireInfo.branch_name
  }
    <br />
    帳號：${record.mentorFull.wireInfo.account_no}
  </p>
  <span style="color:red; font-weight:700"> 提醒：匯款成功後，請務必回到官網，點選【匯款成功回報】，核對匯款。若無在3天內匯款，預約資格將取消，還請見諒。</span>
    `;

  html_template = html_template.replace("{{msg}}", msg);

  const mailContent = {
    to: record.email,
    bcc: CONFIG.cclist.map((email) => ({
      email,
    })),
    from: record.mentorFull.email,
    subject: `${record.gameName}課程註冊預約成功通知`,
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
