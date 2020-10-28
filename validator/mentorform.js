const { default: validator } = require("validator");
const { isEmpty } = require("../helpers");
const moment = require("moment");
const validateMentorFormInput = (formData) => {
  const errors = {};
  //   {"mentor":"5f964424fdce7e2fc43507ac","course":"5f964424fdce7e2fc4350798","timeSlot":"21:30~22:30","discordAccount":"sophietsai","name":"蔡湜梵","phone":"0926568279","email":"shihfan.tsai@gmail.com","roleData1":"11","roleData2":"2","date":"2020-11-06T16:00:00.000Z"}

  formData.mentor = !isEmpty(formData.mentor) ? formData.mentor : "";
  formData.course = !isEmpty(formData.course) ? formData.course : "";
  formData.timeSlot = !isEmpty(formData.timeSlot) ? formData.timeSlot : "";
  formData.discordAccount = !isEmpty(formData.discordAccount)
    ? formData.discordAccount
    : "";
  formData.name = !isEmpty(formData.name) ? formData.name : "";
  formData.phone = !isEmpty(formData.phone) ? formData.phone : "";
  formData.email = !isEmpty(formData.email) ? formData.email : "";
  formData.roleData1 = !isEmpty(formData.roleData1) ? formData.roleData1 : "";
  formData.roleData2 = !isEmpty(formData.roleData2) ? formData.roleData2 : "";
  formData.date = !isEmpty(formData.date) ? formData.date : "";

  const {
    mentor,
    course,
    timeSlot,
    discordAccount,
    phone,
    name,
    email,
    roleData1,
    roleData2,
    date,
  } = formData;

  if (!mentor || validator.isEmpty(mentor)) {
    errors.mentor = "必須選擇導師。";
  }

  if (!course || validator.isEmpty(course)) {
    errors.course = "必須選擇課程．";
  }
  if (!timeSlot || validator.isEmpty(timeSlot)) {
    errors.timeSlot = "時間未選擇";
  }
  if (!discordAccount || validator.isEmpty(discordAccount)) {
    errors.discordAccount = "discord account未填寫";
  }
  if (!name || validator.isEmpty(name)) {
    errors.name = "姓名未填寫";
  }

  if (!email || validator.isEmpty(email)) {
    errors.email = "email未填寫";
  } else if (!validator.isEmail(email)) {
    errors.email = "email格式不正確";
  }
  if (!phone || validator.isEmpty(phone)) {
    errors.phone = "手機未填寫";
  }
  if (!roleData1 || validator.isEmpty(roleData1)) {
    errors.roleData1 = "角色資料未填寫";
  }
  // if (!roleData2 || validator.isEmpty(roleData2)) {
  //   errors.roleData2 = "位階未填寫";
  // }

  if (
    !validator.isAfter(
      date,
      moment().add(6, "day").format("YYYY-MM-DD").toString()
    )
  ) {
    errors.date = "只能選擇七天後的課程";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

module.exports = validateMentorFormInput;
