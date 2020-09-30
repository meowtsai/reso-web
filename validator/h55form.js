const { default: validator } = require("validator");
const { isEmpty } = require("../helpers");
const validateTeamForm = (data) => {
  let errors = {};

  data.team = !isEmpty(data.team) ? data.team : "";
  data.name = !isEmpty(data.name) ? data.name : "";
  data.gender = !isEmpty(data.gender) ? data.gender : "";
  data.phone_code = !isEmpty(data.phone_code) ? data.phone_code : null;
  data.phone = !isEmpty(data.phone) ? data.phone : null;
  data.line_id = !isEmpty(data.line_id) ? data.line_id : null;
  data.email = !isEmpty(data.email) ? data.email : null;
  data.verify_code = !isEmpty(data.verify_code) ? data.verify_code : null;
  data.game_id = !isEmpty(data.game_id) ? data.game_id : null;
  data.game_name = !isEmpty(data.game_name) ? data.game_name : null;
  data.role = !isEmpty(data.role) ? data.role : null;
  data.agree_policy = !isEmpty(data.agree_policy) ? data.agree_policy : null;
  data.birthday = !isEmpty(data.birthday) ? data.birthday : null;
  data.captain_upload1 = !isEmpty(data.captain_upload1)
    ? data.captain_upload1
    : null;
  data.captain_upload2 = !isEmpty(data.captain_upload1)
    ? data.captain_upload1
    : null;
  const {
    team,
    name,
    gender,
    phone_code,
    phone,
    line_id,
    email,
    verify_code,
    game_id,
    game_name,
    role,
    agree_policy,
    birthday,
    captain_upload1,
    captain_upload2,
  } = data;

  if (!team || validator.isEmpty(team)) {
    errors.team = "必須填寫隊伍名稱。";
  }

  if (!name || validator.isEmpty(name)) {
    errors.name = "必須填寫隊長名稱";
  }
  if (!gender || validator.isEmpty(gender)) {
    errors.gender = "必須選擇性別";
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
  if (!verify_code || validator.isEmpty(verify_code)) {
    errors.verify_code = "必須填入認證碼";
  }
  if (!game_id || validator.isEmpty(game_id)) {
    errors.game_id = "必須填寫隊長Game ID";
  }
  if (!game_name || validator.isEmpty(game_name)) {
    errors.game_name = "必須填寫隊長Game Name";
  }

  if (!role || validator.isEmpty(role)) {
    errors.role = "請選擇隊長角色";
  }
  if (!agree_policy || validator.isEmpty(agree_policy)) {
    errors.agree_policy = "請勾選我已經閱讀賽事規章並同意";
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

module.exports = validateTeamForm;
