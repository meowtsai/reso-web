import React from "react";

const FinalConfirmSection = () => {
  return (
    <fieldset className="preview">
      <div id="campaignSummary" className="form-card">
        <h2>5.請確認發案資訊</h2>

        {/* <!--1--> */}
        <h3 className="underlined">合作對象</h3>
        <div className="categories">
          <h4> 類型 </h4>
          <ul className="value"></ul>
        </div>
        <div className="platform">
          <h4> 平台 </h4>
          <ul className="value"></ul>
        </div>
        <div className="gender">
          <h4> 網紅性別 </h4>
          <ul className="value"></ul>
        </div>
        <div className="budget">
          <h4 className="inline"> 總預算 </h4>
          <span className="value"> </span>{" "}
        </div>
        <div className="celebcount">
          <h4 className="inline"> 網紅人數 </h4>
          <span className="value"> </span>{" "}
        </div>

        {/* <!--2--> */}
        <h3 className="underlined">品牌質詢</h3>
        <div className="brandname">
          <h4 className="inline"> 品牌名稱 </h4>
          <span className="value"> </span>{" "}
        </div>
        <div className="productlinks">
          <h4 className="inline"> 商品連結 </h4>
          <ul className="value"></ul>
        </div>

        {/* <!--3--> */}
        <h3 className="underlined">合作方式</h3>
        <div className="format">
          <h4 className="inline"> 合作規格 </h4>
          <ul className="value"></ul>
        </div>
        <div className="startend">
          <h4 className="inline"> 預計檔期 </h4>
          <span className="value"> 06/10/2020 - 06/15/2020 </span>{" "}
        </div>
        <div className="desctopic">
          <h4> 想要推廣主軸 </h4>
          <div className="value"> </div>
        </div>
        <div className="socialperms">
          <h4 className="inline"> 特殊要求 </h4>
          <ul className="value">
            <li> - </li>
          </ul>
        </div>
        {/* <!--4--> */}
        <h3 className="underlined">聯繫方式</h3>
        <div className="brandname">
          <h4 className="inline"> 公司名稱 </h4>
          <span className="value"> </span>{" "}
        </div>
        <div className="productlinks">
          <h4 className="inline"> 聯絡人 </h4>
          <ul className="value"></ul>
        </div>
        <div className="productlinks">
          <h4 className="inline"> 聯絡人電話 </h4>
          <ul className="value"></ul>
        </div>
        <div className="productlinks">
          <h4 className="inline"> E-Mail </h4>
          <ul className="value"></ul>
        </div>
      </div>
      {/* <!--div id="tosAgree"> */}
      <input type="checkbox" id="agree-tos" autoComplete="off" />
      <label htmlFor="agree-tos">
        我同意
        <a href="#e" target="_blank">
          服務條款
        </a>
      </label>
      <div className="form-group msg"></div>
      {/* </div--> */}
      <input
        type="button"
        name="previous"
        className="previous action-button-previous"
        value="上一步"
      />
      <button id="submit" type="button" className="action-button" data-ref="">
        送出
        <div className="spinner-border text-light" role="status">
          {" "}
          <span className="sr-only">Loading...</span>{" "}
        </div>
      </button>
    </fieldset>
  );
};

export default FinalConfirmSection;
