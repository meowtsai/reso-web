import React from "react";
import { useFormContext } from "react-hook-form";
import { Categories, Platforms, genders, goals, formats } from "./config";
const FinalConfirmSection = ({ step, setStep, loading }) => {
  const { getValues } = useFormContext();
  const formValues = getValues();
  //console.log("savedRecord", savedRecord);

  if (step !== 5) {
    return null;
  }

  return (
    <fieldset
      className={
        step === 5 ? "preview step-current" : "preview step-non-current"
      }
    >
      <div id="campaignSummary" className="form-card">
        <h2>5.請確認發案資訊</h2>
        {/* <!--1--> */}
        <h3 className="underlined">合作對象</h3>
        <div className="categories">
          <h4> 類型 </h4>
          <ul className="value">
            {formValues.categories.map((ca) => (
              <li key={`category-${ca}`}>{Categories[ca].cht}</li>
            ))}
          </ul>
        </div>
        <div className="platform">
          <h4> 平台 </h4>
          <ul className="value">
            {formValues.platforms.map((ca) => (
              <li key={`platform-${ca}`}>{Platforms[ca].cht}</li>
            ))}
          </ul>
        </div>
        <div className="gender">
          <h4> 網紅性別 </h4>
          <span className="value">{genders[formValues.genders]}</span>
        </div>
        <div className="budget">
          <h4 className="inline"> 總預算 </h4>
          <span className="value"> {formValues.budget}</span>{" "}
        </div>
        <div className="celebcount">
          <h4 className="inline"> 網紅人數 </h4>
          <span className="value"> {formValues.kolnumber}</span>{" "}
        </div>
        <div className="goals">
          <h4> 合作目標 </h4>
          <ul className="value">
            {formValues.goals.map((ca) => (
              <li key={`goals-${ca}`}>{goals[ca].cht}</li>
            ))}
          </ul>
        </div>
        {/* <!--2--> */}
        <h3 className="underlined">品牌資訊</h3>
        <div className="brandname">
          <h4 className="inline"> 品牌名稱 </h4>
          <span className="value"> {formValues.brandname}</span>{" "}
        </div>
        <div className="productlinks">
          <h4 className="inline"> 商品名稱 </h4>
          <span className="value"> {formValues.productname}</span>{" "}
        </div>
        <div className="productlinks">
          <h4 className="inline"> 商品連結 </h4>
          <ul className="value">
            <li>{formValues.producturl1}</li>
            {formValues.producturl2 && <li>{formValues.producturl2}</li>}
            {formValues.producturl3 && <li>{formValues.producturl3}</li>}
          </ul>
        </div>

        {/* <!--3--> */}
        <h3 className="underlined">合作方式</h3>
        <div className="format">
          <h4 className="inline"> 合作規格 </h4>
          <ul className="value">
            {formValues.formats.map((ca) => (
              <li key={`formats-${ca}`}>{formats[ca].cht}</li>
            ))}
          </ul>
        </div>
        <div className="startend">
          <h4 className="inline"> 預計檔期 </h4>
          <span className="value">
            {" "}
            {formValues.date_start} - {formValues.date_end}
          </span>{" "}
        </div>
        <div className="desctopic">
          <h4> 想要推廣主軸 </h4>
          <div className="value"> {formValues.main_ideas}</div>
        </div>
        <div className="socialperms">
          <h4 className="inline"> 特殊要求 </h4>
          <ul className="value">
            <li>
              是否要需要開放廣告主投放 -{" "}
              {formValues.socialadperm === "Y"
                ? `是(${formValues.socialadperm_weeks}週)`
                : "否"}{" "}
            </li>
            <li>
              是否需要合作素材授權 -{" "}
              {formValues.mediaperm === "Y"
                ? `是(${formValues.mediaperm_weeks}週)`
                : "否"}{" "}
            </li>
          </ul>
        </div>
        {/* <!--4--> */}
        <h3 className="underlined">聯繫方式</h3>
        <div className="brandname">
          <h4 className="inline"> 公司名稱 </h4>
          <span className="value"> {formValues.company} </span>{" "}
        </div>
        <div className="productlinks">
          <h4 className="inline"> 聯絡人 </h4>
          <span className="value"> {formValues.name} </span>
        </div>
        <div className="productlinks">
          <h4 className="inline"> 聯絡人電話 </h4>
          <span className="value"> {formValues.phone} </span>
        </div>
        <div className="productlinks">
          <h4 className="inline"> E-Mail </h4>
          <span className="value"> {formValues.email} </span>
        </div>
      </div>
      {/* <!--div id="tosAgree"> */}
      {/* <input type="checkbox" id="agree-tos" autoComplete="off" />
      <label htmlFor="agree-tos">
        我同意
        <a href="#e" target="_blank">
          服務條款
        </a>
      </label>
      <div className="form-group msg"></div> */}
      {/* </div--> */}
      <input
        type="button"
        name="previous"
        className="previous action-button-previous"
        value="上一步"
        onClick={() => setStep(-1)}
      />
      {loading ? (
        <div className="spinner-border text-light" role="status">
          {" "}
          <span className="sr-only">Loading...</span>{" "}
        </div>
      ) : (
        <button type="submit" className="action-button" data-ref="">
          送出
        </button>
      )}
    </fieldset>
  );
};

export default FinalConfirmSection;
