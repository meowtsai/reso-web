import React from "react";
import { useFormContext } from "react-hook-form";
const ContactMethodSection = ({ step, setStep }) => {
  const { register, errors, trigger } = useFormContext();
  const nextStep = async () => {
    const result = await trigger(["company", "name", "phone", "email"]);
    //console.log("result", result);
    if (result) {
      setStep(1);
    }
  };
  return (
    <fieldset className={step === 3 ? "step-current" : "step-non-current"}>
      <div className="form-card">
        <h2>4.聯繫方式</h2>
        <div id="campaign-contact" className="form-group row ml-0 mr-0">
          <label className="col-form-label col-12">
            <i className="far fa fa-pencil"></i> 公司名稱{" "}
            {errors.company && (
              <small className="text-danger">* {errors.company.message}</small>
            )}
          </label>
          <div className="col-12 pl-0 pr-0">
            <input
              type="text"
              className="form-control required"
              placeholder="請輸入公司名稱"
              name="company"
              ref={register({
                required: "請輸入公司名稱",
              })}
            />
          </div>
          <label className="col-form-label col-12">
            <i className="far fa fa-pencil"></i> 聯絡人{" "}
            {errors.name && (
              <small className="text-danger">* {errors.name.message}</small>
            )}
          </label>
          <div className="col-12 pl-0 pr-0">
            <input
              type="text"
              className="form-control required"
              placeholder="請輸入姓名"
              name="name"
              ref={register({
                required: "請輸入姓名",
              })}
            />
          </div>
          <label className="col-form-label col-12">
            <i className="far fa fa-pencil"></i> 聯絡人電話{" "}
            {errors.phone && (
              <small className="text-danger">* {errors.phone.message}</small>
            )}
          </label>
          <div className="col-12 pl-0 pr-0">
            <input
              type="text"
              className="form-control required"
              placeholder="請輸入聯絡電話"
              name="phone"
              ref={register({
                required: "*必填，請提供手機或電話",
                maxLength: 30,
              })}
            />
          </div>
          <label className="col-form-label col-12">
            <i className="far fa fa-pencil"></i> E-Mail{" "}
            {errors.email && (
              <small className="text-danger">* {errors.email.message}</small>
            )}
          </label>
          <div className="col-12 pl-0 pr-0">
            <input
              type="text"
              className="form-control required"
              style={{ textTransform: "lowercase" }}
              name="email"
              placeholder={errors.email?.message || "E-mail"}
              ref={register({
                required: "*必填，請輸入您的電子郵件",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "電子郵件格式不符合",
                },
              })}
            />
          </div>
        </div>
      </div>

      <input
        type="button"
        name="previous"
        className="previous action-button-previous"
        value="上一步"
        onClick={() => setStep(-1)}
      />
      <input
        type="button"
        name="next"
        className="next action-button step-2"
        value="下一步"
        onClick={nextStep}
      />
    </fieldset>
  );
};

export default ContactMethodSection;
