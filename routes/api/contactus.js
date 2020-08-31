const express = require("express");
const router = express.Router();
const ContactMessage = require("../../models/ContactMessages");
const moment = require("moment");
const sgMail = require("@sendgrid/mail");
router.get("/test", (req, res) => {
  res.json({ msg: "contactus API Route works" });
});

router.get("/message/:id", (req, res) => {
  ContactMessage.findOne({ _id: req.params.id })
    .then((msg) => res.json({ contactMessage: msg }))
    .catch((err) => res.status(500).json({ msg: err.message }));
});

// url: /api/contactus/
// method: POST
// receive data from contact us form
router.post("/", (req, res) => {
  //validation
  const { name, company, email, phone, message } = req.body;
  let errors = [];
  // check required fields
  if (!name || !email || !phone || !message) {
    errors.push({ msg: "請輸入所有欄位" });
  }
  if (errors.length > 0) {
    res.render("contact", { ...req.body, errors });
  } else {
    const newMessage = new ContactMessage({
      name,
      company,
      email,
      phone,
      ip: req.ip,
      message,
    });

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    newMessage
      .save()
      .then((message) => {
        //console.log("message save result", message);
        const fs = require("fs");
        let html_template = fs.readFileSync(__dirname + "/mail.html", "utf8");
        const msg = `有人透過呼聲網站的<strong>聯絡我們</strong>頁面傳送以下訊息<br /><hr />
        姓名:${name}  <br />公司: ${company}  <br />聯絡mail: ${email}  <br />聯絡電話: ${phone}  <br />訊息內容:<pre>${
          message.message
        }</pre> <hr />  <br />時間:${moment().format(
          "MMMM Do YYYY, h:mm:ss a"
        )}<br />(參考單號: ${message._id})`;

        html_template = html_template.replace("{{msg}}", msg);

        const mailContent = {
          to: process.env.CONTACT_MAIL_TO,
          from: process.env.CONTACT_MAIL_FROM,
          subject: `${name}透過呼聲網站傳送訊息`,
          text: `有人透過呼聲網站的聯絡我們頁面傳送以下訊息\\n------------------------\\n姓名:${name}\\n
      公司:${company}\\n
      聯絡mail:${email}\\n
      聯絡電話:${phone}\\n
      訊息內容:${message}\\n`,
          html: html_template,
        };

        sgMail.send(mailContent);
        res.json(message);
      })
      .catch((err) => res.status(500).json({ msg: err.message }));
  }
});

module.exports = router;
