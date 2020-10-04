const { default: validator } = require("validator");
const { isEmpty } = require("../helpers");

const validateMatchForm = (data) => {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.phone_code = !isEmpty(data.phone_code) ? data.phone_code : null;
  data.phone = !isEmpty(data.phone) ? data.phone : null;
  data.line_id = !isEmpty(data.line_id) ? data.line_id : null;
  data.email = !isEmpty(data.email) ? data.email : null;
  data.game_id = !isEmpty(data.game_id) ? data.game_id : null;
  data.game_name = !isEmpty(data.game_name) ? data.game_name : null;
  data.birthday = !isEmpty(data.birthday) ? data.birthday : null;
  data.needHunter = !isEmpty(data.needHunter) ? data.needHunter : "0";
  data.ownHunter = !isEmpty(data.ownHunter) ? data.ownHunter : "0";
  data.ownSurvivor = !isEmpty(data.ownSurvivor) ? data.ownSurvivor : "0";
  data.needSurvivor = !isEmpty(data.needSurvivor) ? data.needSurvivor : "0";
  const {
    name,
    phone_code,
    phone,
    line_id,
    email,
    game_id,
    game_name,
    birthday,
    need_hunter,
    need_survivor,
    own_hunter,
    own_survivor,
  } = data;

  if (
    !validator.isNumeric(need_hunter) ||
    !validator.isNumeric(need_survivor) ||
    !validator.isNumeric(own_hunter) ||
    !validator.isNumeric(own_survivor)
  ) {
    errors.need_hunter = "需求隊員必須為數字";
  }

  if (!name || validator.isEmpty(name)) {
    errors.name = "必須填寫隊長名稱";
  }

  if (!phone_code || validator.isEmpty(phone_code)) {
    errors.phone_code = "必須選擇區域號碼";
  }
  if (!phone || validator.isEmpty(phone)) {
    errors.phone = "必須填入手機";
  }
  if (!line_id || validator.isEmpty(line_id)) {
    errors.line_id = "必須填入line ID";
  }
  if (!email || validator.isEmpty(email)) {
    errors.email = "必須填寫Email";
  } else if (!validator.isEmail(email)) {
    errors.email = "Email格式不正確";
  }

  if (!game_id || validator.isEmpty(game_id)) {
    errors.game_id = "必須填寫 Game ID";
  }
  if (!game_name || validator.isEmpty(game_name)) {
    errors.game_name = "必須填寫 Game Name";
  }

  if (!birthday || validator.isEmpty(birthday)) {
    errors.birthday = "必須選擇生日";
  } else if (!validator.isDate(birthday, "YYYY-MM-DD")) {
    errors.birthday = "生日格式不正確";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

module.exports = validateMatchForm;
