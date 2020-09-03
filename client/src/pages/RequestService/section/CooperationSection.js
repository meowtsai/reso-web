import React from "react";
import { formats } from "./config";
import { useFormContext } from "react-hook-form";
import CheckboxSubSection from "./CheckboxSubSection";

const CooperationSection = ({ step, setStep }) => {
  const {
    register,
    errors,
    trigger,
    watch,
    getValues,
    setValue,
    setError,
  } = useFormContext();

  const watchAdOK = watch("socialadperm", "N");
  const watchMediaOK = watch("mediaperm", "N");

  const nextStep = async () => {
    const values = getValues();
    console.log(values);
    const result = await trigger([
      "formats",
      "date_start",
      "date_end",
      "main_ideas",
      "socialadperm",
    ]);
    if (getValues("socialadperm_weeks") === "" && watchAdOK === "Y") {
      setError("socialadperm_weeks", {
        type: "manual",
        message: "請填寫週數",
      });
      return;
    }
    if (getValues("mediaperm_weeks") === "" && watchMediaOK === "Y") {
      setError("mediaperm_weeks", {
        type: "manual",
        message: "請填寫週數",
      });
      return;
    }
    console.log("result", result);
    console.log("errors", errors);
    if (result) {
      setStep(1);
    }
  };
  return (
    <fieldset className={step === 3 ? "step-current" : "step-non-current"}>
      <div className="form-card">
        <h2>3.合作方式</h2>

        <CheckboxSubSection
          secid={"formats"}
          title="合作規格"
          note="(可複選)"
          error={errors.formats}
          list={formats}
          register={register({
            required: "請至少選擇一種合作規格",
          })}
        />

        <div id="campaign-startend" className="form-group row ml-0 mr-0">
          <label className="col-form-label col-12">
            <i className="far fa fa-pencil"></i> 預計檔期{" "}
            {errors.date_start && (
              <small className="text-danger">
                * {errors.date_start.message}
              </small>
            )}
            {errors.date_end && (
              <small className="text-danger">* {errors.date_end.message}</small>
            )}
          </label>
          <div className="col-4 pl-0 pr-0 datewrap datestart">
            <input
              type="date"
              className="form-control required"
              placeholder="開始"
              name="date_start"
              ref={register({
                required: "請輸入開始日期",
              })}
            />
          </div>
          <div className="col-4 pl-0 pr-0 datewrap dateend">
            <input
              type="date"
              className="form-control required"
              placeholder="結束"
              name="date_end"
              ref={register({
                required: "請輸入結束日期",
              })}
            />
          </div>
        </div>
        <div id="campaign-desctopic" className="form-group row ml-0 mr-0">
          <label className="col-form-label col-12">
            <i className="far fa fa-pencil"></i> 想要推廣主軸{" "}
            {errors.main_ideas && (
              <small className="text-danger">
                * {errors.main_ideas.message}
              </small>
            )}
          </label>
          <textarea
            type="text"
            rows="5"
            className="form-control required"
            placeholder=""
            name="main_ideas"
            ref={register({
              required: "請輸入推廣主軸",
            })}
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
              <label
                className="btn btn-secondary active"
                data-value="no"
                onClick={() => setValue("socialadperm", "N")}
              >
                <input
                  type="radio"
                  name="socialadperm"
                  autoComplete="off"
                  value="N"
                  defaultChecked={true}
                  label="N"
                  ref={register}
                />
                否{" "}
              </label>
              <label
                className="btn btn-secondary"
                data-value="yes"
                onClick={() => setValue("socialadperm", "Y")}
              >
                <input
                  type="radio"
                  name="socialadperm"
                  autoComplete="off"
                  value="Y"
                  ref={register}
                  label="Y"
                />
                是{" "}
              </label>
              {watchAdOK === "Y" && (
                <input
                  type="number"
                  className="form-control required inline d-none"
                  placeholder="請填寫需要週數"
                  name={"socialadperm_weeks"}
                  ref={register({
                    required: "請填寫需要週數",
                  })}
                />
              )}
              {errors.socialadperm_weeks && (
                <small className="text-danger">
                  * {errors.socialadperm_weeks.message}
                </small>
              )}
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
              <label
                className="btn btn-secondary active"
                data-value="no"
                onClick={() => setValue("mediaperm", "N")}
              >
                <input
                  type="radio"
                  name="mediaperm"
                  autoComplete="off"
                  value="N"
                  defaultChecked={true}
                  ref={register}
                />
                否{" "}
              </label>
              <label
                className="btn btn-secondary"
                data-value="yes"
                onClick={() => setValue("mediaperm", "Y")}
              >
                <input type="radio" name="socialpageperm" autoComplete="off" />
                <input
                  type="radio"
                  name="mediaperm"
                  autoComplete="off"
                  value="Y"
                  ref={register}
                />
                是{" "}
              </label>
              {watchMediaOK === "Y" && (
                <input
                  type="number"
                  className="form-control required inline d-none"
                  name={"mediaperm_weeks"}
                  placeholder="請填寫需要週數"
                  ref={register({
                    required: "請填寫需要週數",
                  })}
                />
              )}
              {errors.mediaperm_weeks && (
                <small className="text-danger">
                  * {errors.mediaperm_weeks.message}
                </small>
              )}
            </div>
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
        name="make_payment"
        className="next action-button step-3"
        value="下一步"
        onClick={nextStep}
      />
    </fieldset>
  );
};

export default CooperationSection;
