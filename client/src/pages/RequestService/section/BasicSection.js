import React from "react";
import { Categories, Platforms, genders, goals } from "./config";
import { useFormContext } from "react-hook-form";
import classnames from "classnames";
const BasicSection = ({ step, setStep }) => {
  const { register, errors, getValues } = useFormContext();

  // const nextStep = () => {
  //   console.log(errors);
  // };
  return (
    <fieldset className={step === 1 ? "step-current" : "step-non-current"}>
      <div className="form-card">
        <h2>1.你想要合作的網紅類型是什麼？</h2>

        <CheckboxSubSection
          secid={"categories"}
          title="類型"
          note="(可複選)"
          error={errors.categories}
          list={Categories}
          register={register({
            required: "請至少選擇一種類型",
          })}
        />

        <CheckboxSubSection
          secid={"platforms"}
          title="平台"
          note="(可複選)"
          error={errors.platforms}
          list={Platforms}
          register={register({
            required: "請至少選擇一種平台",
          })}
        />

        <div id="campaign-gender" className="form-group row ml-0 mr-0">
          <label className="col-form-label col-12">
            <i className="far fa fa-pencil"></i> 網紅性別{" "}
          </label>
          <div className="col-12 pl-0 pr-0">
            <div className="btn-group-toggle" data-toggle="buttons">
              {Object.keys(genders).map((g) => (
                <label
                  key={`gender_${g}`}
                  className={classnames("btn btn-secondary", {
                    active: g === "all",
                  })}
                  data-value="f,m"
                >
                  <input
                    type="radio"
                    autoComplete="off"
                    value={g}
                    name="genders"
                    defaultChecked={g === "all" ? true : false}
                    ref={register({
                      required: "請選擇合作對象偏好性別",
                    })}
                  />
                  {genders[g]}{" "}
                </label>
              ))}
            </div>
          </div>
        </div>
        <div id="campaign-budget" className="form-group row ml-0 mr-0">
          <label className="col-form-label col-12">
            <i className="far fa fa-pencil"></i> 總預算&nbsp;
            <span className="note">(未稅)</span>{" "}
            {errors.budget && (
              <small className="text-danger">* {errors.budget.message}</small>
            )}
          </label>
          <div className="col-12 pl-0 pr-0">
            <input
              type="number"
              className="form-control required"
              placeholder="請輸入總預算"
              name="budget"
              ref={register({
                required: "請填寫大概預算",
              })}
            />
          </div>
        </div>
        <div id="campaign-celebcount" className="form-group row ml-0 mr-0">
          <label className="col-form-label col-12">
            <i className="far fa fa-pencil"></i> 總合作人數{" "}
            {errors.kolnumber && (
              <small className="text-danger">
                * {errors.kolnumber.message}
              </small>
            )}
          </label>
          <div className="col-12 pl-0 pr-0">
            <input
              type="number"
              className="form-control required"
              placeholder="請輸入總合作人數"
              name="kolnumber"
              ref={register({
                required: "請輸入總合作人數",
              })}
            />
          </div>
        </div>

        <CheckboxSubSection
          secid={"goals"}
          title="類型"
          note="(可複選)"
          error={errors.goals}
          list={goals}
          register={register({
            required: "請至少選擇一個目標",
          })}
        />
      </div>
      <input
        type="submit"
        name="next"
        className="next action-button step-1"
        value="下一步"
      />
    </fieldset>
  );
};

export default BasicSection;

const CheckboxSubSection = ({
  secid,
  title = "類型",
  note = "(可複選)",
  error,
  list,
  register,
}) => {
  return (
    <div id={`campaign-${secid}`} className="form-group row ml-0 mr-0">
      <label className="col-form-label col-12">
        <i className="far fa fa-pencil"></i>
        {title} &nbsp;
        <span className="note">{note}</span>
        {error && <small className="text-danger">* {error.message}</small>}
      </label>
      <div className="col-12 pl-0 pr-0">
        <div className="btn-group-toggle" data-toggle="buttons">
          {Object.keys(list).map((key) => (
            <label key={`cate_${key}`} className="btn btn-secondary">
              <input
                type="checkbox"
                autoComplete="off"
                value={key}
                name={secid}
                ref={register}
              />
              {list[key].cht}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
