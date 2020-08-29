import React from "react";

const ContactMethodSection = ({ step }) => {
  return (
    <fieldset className={step === 3 ? "step-current" : "step-non-current"}>
      <div className="form-card">
        <h2>4.聯繫方式</h2>
        <div id="campaign-contact" className="form-group row ml-0 mr-0">
          <label className="col-form-label col-12">
            <i className="far fa fa-pencil"></i> 公司名稱{" "}
          </label>
          <div className="col-12 pl-0 pr-0">
            <input
              type="text"
              className="form-control required"
              placeholder="請輸入公司名稱"
            />
          </div>
          <label className="col-form-label col-12">
            <i className="far fa fa-pencil"></i> 聯絡人{" "}
          </label>
          <div className="col-12 pl-0 pr-0">
            <input
              type="text"
              className="form-control required"
              placeholder="請輸入姓名"
            />
          </div>
          <label className="col-form-label col-12">
            <i className="far fa fa-pencil"></i> 聯絡人電話{" "}
          </label>
          <div className="col-12 pl-0 pr-0">
            <input
              type="text"
              className="form-control required"
              placeholder="請輸入聯絡電話"
            />
          </div>
          <label className="col-form-label col-12">
            <i className="far fa fa-pencil"></i> E-Mail{" "}
          </label>
          <div className="col-12 pl-0 pr-0">
            <input
              type="text"
              className="form-control required"
              placeholder="請輸入信箱"
            />
          </div>
        </div>
      </div>
      <input
        type="button"
        name="previous"
        className="previous action-button-previous"
        value="上一步"
      />
      <input
        type="button"
        name="next"
        className="next action-button step-2"
        value="下一步"
      />
    </fieldset>
  );
};

export default ContactMethodSection;
