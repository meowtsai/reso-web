import React from "react";
import { useFormContext } from "react-hook-form";
const CooperationSection = ({ step, setStep }) => {
  const { register, errors, trigger } = useFormContext();
  const nextStep = async () => {
    const result = await trigger(["company", "name", "phone", "email"]);
    //console.log("result", result);
    if (result) {
      setStep(1);
    }
  };
  return (
    <fieldset>
      <div className="form-card">
        <h2>3.合作方式</h2>
        <div id="campaign-format" className="form-group row ml-0 mr-0">
          <label className="col-form-label col-12">
            <i className="far fa fa-pencil"></i> 合作規格{" "}
          </label>
          <div className="col-12 pl-0 pr-0">
            <div className="btn-group-toggle" data-toggle="buttons">
              <label className="btn btn-secondary" data-value="image">
                <input type="checkbox" autoComplete="off" />
                貼文{" "}
              </label>
              <label className="btn btn-secondary" data-value="video">
                <input type="checkbox" autoComplete="off" />
                影片{" "}
              </label>
              <label className="btn btn-secondary" data-value="feed">
                <input type="checkbox" autoComplete="off" />
                即時動態{" "}
              </label>
              <label className="btn btn-secondary" data-value="activity">
                <input type="checkbox" autoComplete="off" />
                邀請實體活動出席{" "}
              </label>
            </div>
          </div>
        </div>
        <div id="campaign-startend" className="form-group row ml-0 mr-0">
          <label className="col-form-label col-12">
            <i className="far fa fa-pencil"></i> 預計檔期{" "}
          </label>
          <div className="col-4 pl-0 pr-0 datewrap datestart">
            <input id="datepicker-start" placeholder="開始" />
          </div>
          <div className="col-4 pl-0 pr-0 datewrap dateend">
            <input id="datepicker-end" placeholder="結束" />
          </div>
        </div>
        <div id="campaign-desctopic" className="form-group row ml-0 mr-0">
          <label className="col-form-label col-12">
            <i className="far fa fa-pencil"></i> 想要推廣主軸{" "}
          </label>
          <textarea
            type="text"
            rows="5"
            className="form-control required"
            placeholder=""
          ></textarea>
        </div>
        <h3 className="underlined">
          <i className="far fa fa-pencil"></i> 特殊要求
        </h3>
        <div id="campaign-socialadperm" className="form-group row ml-0 mr-0">
          <label className="col-form-label col-12">
            {" "}
            是否要需要開放廣告主投放{" "}
          </label>
          <div className="col-12 pl-0 pr-0">
            <div className="btn-group-toggle" data-toggle="buttons">
              <label className="btn btn-secondary active" data-value="no">
                <input type="radio" name="socialadperm" autoComplete="off" />否{" "}
              </label>
              <label className="btn btn-secondary" data-value="yes">
                <input type="radio" name="socialadperm" autoComplete="off" />是{" "}
              </label>
              <input
                type="number"
                className="form-control required inline d-none"
                placeholder="請填寫需要週數"
              />
            </div>
          </div>
        </div>
        <div id="campaign-socialpageperm" className="form-group row ml-0 mr-0">
          <label className="col-form-label col-12">
            {" "}
            是否需要合作素材授權{" "}
          </label>
          <div className="col-12 pl-0 pr-0">
            <div className="btn-group-toggle" data-toggle="buttons">
              <label className="btn btn-secondary active" data-value="no">
                <input type="radio" name="socialpageperm" autoComplete="off" />
                否{" "}
              </label>
              <label className="btn btn-secondary" data-value="yes">
                <input type="radio" name="socialpageperm" autoComplete="off" />
                是{" "}
              </label>
              <input
                type="number"
                className="form-control required inline d-none"
                placeholder="請填寫需要週數"
              />
            </div>
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
        name="make_payment"
        className="next action-button step-3"
        value="下一步"
      />
    </fieldset>
  );
};

export default CooperationSection;
