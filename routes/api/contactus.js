const express = require("express");
const router = express.Router();
const ContactMessage = require("../../models/ContactMessages");

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

    newMessage
      .save()
      .then((message) => {
        console.log("message save result", message);
        res.json(message);
      })
      .catch((err) => res.status(500).json({ msg: err.message }));
  }
});

module.exports = router;
