const validateMentorWireFormInput = (formData) => {
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

module.exports = validateMentorWireFormInput;
