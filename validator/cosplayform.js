const { default: validator } = require("validator");
const { isEmpty } = require("../helpers");

const validateCosplayApplyForm = (data) => {
  let errors = {};

  data.coser_name = !isEmpty(data.coser_name) ? data.coser_name : "";
  data.coser_phone = !isEmpty(data.coser_phone) ? data.coser_phone : "";
  data.coser_email = !isEmpty(data.coser_email) ? data.coser_email : "";
  data.coser_citizen_id = !isEmpty(data.coser_citizen_id)
    ? data.coser_citizen_id
    : null;

  data.work_subject = !isEmpty(data.work_subject) ? data.work_subject : null;
  data.work_desc = !isEmpty(data.work_desc) ? data.work_desc : null;

  data.cover_img = !isEmpty(data.cover_img) ? data.cover_img : null;
  data.imgs = !isEmpty(data.imgs) ? data.imgs : null;
  data.agree_policy = !isEmpty(data.agree_policy)
    ? data.agree_policy.toString()
    : null;
  const {
    coser_name,
    coser_phone,
    coser_email,
    coser_citizen_id,
    work_subject,
    work_desc,
    cover_img,
    imgs,
    agree_policy,
  } = data;

  if (!coser_name || validator.isEmpty(coser_name)) {
    errors.coser_name = "必須填寫真實姓名";
  }
  if (!coser_phone || validator.isEmpty(coser_phone)) {
    errors.coser_phone = "必須填寫聯絡手機";
  }

  if (!coser_citizen_id || validator.isEmpty(coser_citizen_id)) {
    errors.coser_citizen_id = "必須填寫身分證字號";
  }

  if (!coser_email || validator.isEmpty(coser_email)) {
    errors.coser_email = "必須填寫Email";
  } else if (!validator.isEmail(coser_email)) {
    errors.coser_email = "Email格式不正確";
  }

  if (!work_subject || validator.isEmpty(work_subject)) {
    errors.work_subject = "必須填寫作品標題";
  }
  if (!work_desc || validator.isEmpty(work_desc)) {
    errors.work_desc = "必須填寫作品描述";
  }

  if (!agree_policy || validator.isEmpty(agree_policy)) {
    errors.agree_policy = "請勾選我已詳閱參賽注意事項，並同意遵守所有規範。";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

module.exports = validateCosplayApplyForm;
