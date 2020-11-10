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

  //   const record = {
  //     coser_name: "金喜喜",
  //     coser_phone: "098625552",
  //     coser_email: "shihfan.tsai@gmail.com",
  //     coser_citizen_id: "G221206270",
  //     work_subject: "超炫麗的表演",
  //     work_desc: "金光閃閃的123 i got a fish alive",
  //     cover_img: "9122333",
  //     imgs: [1222, 123],
  //     agree_policy: "yes",
  //   };

  console.log("req.body", req.body);

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
    cover_img,
    imgs,
  } = record;
  //check if email or citizen id duplicate

  const checkDuplicated = await CosplayApply.findOne({
    coser_email,
    coser_citizen_id,
  });

  console.log("checkDuplicated", checkDuplicated);
  if (checkDuplicated && checkDuplicated._id) {
    return res.status(500).send({ msg: "請勿重複報名" });
  }
  let add_pics = [];

  if (!helper.isEmpty(req.files)) {
    if (Object.keys(req.files).length > 0) {
      Object.keys(req.files).forEach((keyName, index) => {
        console.log("keyName", keyName);

        const new_file_name =
          helper.set_filename() +
          path.extname(req.files[keyName].name).toLowerCase();
        add_pics.push(image_path + new_file_name);

        console.log("whole path", image_path + new_file_name);

        req.files[keyName].mv(
          `${image_upload_dir}/cosplay/${new_file_name}`,
          (err) => {
            //console.log("new_file_name mvResult", err);
            if (err) return res.status(500).send({ file_logo: err.message });
          }
        );

        if (keyName === "cover_img") {
          record.cover_img = image_path + new_file_name;
        }
        if (keyName === "imgs") {
          record.captain_upload2 = image_path + new_file_name;
        }
      });
    }
  } else {
    res.json({ msg: "ok" });
  }

  //   const applyForm = new CosplayApply({
  //     coser_name,
  //     coser_phone,
  //     coser_email,
  //     coser_citizen_id,
  //     work_subject,
  //     work_desc,
  //     cover_img,
  //     imgs,
  //   });

  //   try {
  //     const newRecord = await applyForm.save();
  //     //sendMailSuccessRegistered(newRecord);
  //     res.json(newRecord);
  //   } catch (err) {
  //     return res.status(500).json({ msg: err.message });
  //   }
});

module.exports = router;
