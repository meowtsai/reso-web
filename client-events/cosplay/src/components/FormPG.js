import React, { Fragment, useEffect, useState, useCallback } from "react";
import classnames from "classnames";
import { useForm } from "react-hook-form";
import MyDropzone from "./MyDropzone";

const FormPG = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    errors,
    watch,
    control,
    setValue,
  } = useForm(); // initialise

  register({ name: "cover_upload" }, { required: "請上傳封面圖檔" });
  register({ name: "works_upload" }, { required: "請上傳作品圖檔" });

  const onSubmit = (registerData) => {
    console.log(registerData);
    // setLoading(true);
    // axios
    //   .post("/api/mentor/register", registerData)
    //   .then((res) => {
    //     setLoading(false);

    //     setRegisterResult(res.data.CourseRegister);
    //   })
    //   .catch((err) => {
    //     setLoading(false);
    //     setError(err.response.data);
    //   });
  };
  return (
    <section className="sec4">
      <div className="typePage">
        <div className="sec-title_form">
          <div className="sec-title_pg"></div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="userSign-box">
              <p className="sec-title_h3">STEP 1 請填寫以下基本資料</p>
              <div className="sec-title_key">
                {" "}
                <span className="essential_icon">*</span>
                <label>真 實 姓 名:</label>
                <input
                  type="text"
                  className={classnames("sec-title_val", {
                    invalid: errors.name,
                  })}
                  id="inputname"
                  name="name"
                  placeholder="請輸入姓名"
                  ref={register({
                    required: "姓名必填．",
                    maxLength: 20,
                  })}
                />
                &nbsp;&nbsp;&nbsp; <span className="essential_icon">*</span>
                <label>身分證字號:</label>
                <input
                  type="text"
                  className={classnames("sec-title_val", {
                    invalid: errors.id_number,
                  })}
                  id="inputname"
                  name="id_number"
                  placeholder="請輸入身分證字號"
                  ref={register({
                    required: "請輸入身分證字號",
                    maxLength: 20,
                  })}
                />
              </div>
              <div className="sec-title_key">
                {" "}
                <span className="essential_icon">*</span>
                <label>手 機 號 碼:</label>
                <input
                  type="phone"
                  className={classnames("sec-title_val", {
                    invalid: errors.phone,
                  })}
                  id="inputphone"
                  name="phone"
                  placeholder="請填寫你的手機號碼"
                  ref={register({
                    required: "手機號碼必填．",
                    maxLength: 20,
                  })}
                />
                &nbsp;&nbsp;&nbsp; <span className="essential_icon">*</span>
                <label>電 子 信 箱&thinsp;:</label>
                <input
                  type="email"
                  className={classnames("sec-title_val", {
                    invalid: errors.email,
                  })}
                  id="inputEmail"
                  name="email"
                  placeholder="請輸入E-mail"
                  ref={register({
                    required: "請輸入E-mail",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "E-mail格式不符合",
                    },
                  })}
                />
              </div>

              <p className="sec-title_h3" style={{ marginTop: "50px" }}>
                STEP 2 請填寫參賽作品資料
              </p>
              <p className="sec-title2">
                每位參賽者可上傳至多10張照片(包含封面圖)，需以副檔名*.jpg,*.jpeg,*.png格式上傳，每張照片檔案大小需小於4MB。
              </p>
              <div className="sec-title_key">
                {" "}
                <span className="essential_icon">*</span>
                <label>作 品 標 題:</label>
                <input
                  type="text"
                  className={classnames("sec-title_va2", {
                    invalid: errors.title,
                  })}
                  id="title"
                  name="title"
                  placeholder="請輸入作品標題(20字符以內)"
                  ref={register({
                    required: "請輸入作品標題(20字符以內)",
                    maxLength: 20,
                  })}
                />
              </div>
              <div className="sec-title_key">
                {" "}
                <span className="essential_icon">*</span>
                <label>作 品 描 述:</label>
                <textarea
                  ref={register({
                    required: "*必填，您需要什麼樣的服務或是有任何建議呢？",
                  })}
                  className={classnames("sec-title_va3", {
                    invalid: errors.ideas,
                  })}
                  name="ideas"
                  rows="6"
                  cols="16"
                  placeholder="請簡述Cos的角色名稱及創作理念(300字符以內)"
                ></textarea>
              </div>
              <div className="sec-title_key">
                {" "}
                <span className="essential_icon">*</span>
                <label>作品封面圖:</label>
                <div className="cover">
                  <MyDropzone
                    filesCount={1}
                    title={"封面圖"}
                    setFile={(value) => {
                      console.log("cover file set", value);
                      setValue("cover_upload", value);
                    }}
                  />
                  <p className="p1">※照片大小需小於4MB</p>
                </div>
                <span className="essential_icon">*</span>
                <label>其他作品圖:</label>
                <div className="works">
                  <MyDropzone
                    filesCount={9}
                    title={"作品集"}
                    setFile={(value) => setValue("works_upload", value)}
                  />

                  <p className="p1">※照片大小需小於4MB</p>
                </div>
              </div>
            </div>
            <div className="sec-title_checkbox ">
              <input type="checkbox" />
              我已詳閱
              <a href="/cosplay/#note" target="_blank">
                <font>參賽注意事項</font>
              </a>
              ，並同意遵守所有規範。{" "}
            </div>

            {loading === false ? (
              <button type="submit" className="button button1">
                送出報名
              </button>
            ) : (
              <button type="button" className="button button1" disabled>
                傳送資料中...
              </button>
            )}
          </form>
        </div>
        <div className="sec-title_rule">
          <dt className="title">
            <span>注意事項</span>
          </dt>
          <dl>
            <dd>
              1.不限任何Cosplay技法，需完整呈現遊戲中的角色人物設定，並透過個人創意設計合適的場景、道具及構圖。
            </dd>
            <dd>
              2.不限制單人或團體形式創作作品。若為多人、團隊之作品只需代表人投稿參賽即可。切勿以相同作品重覆投稿，否則視為參賽資格不符。
            </dd>
            <dd>
              3.作品資訊僅有一次上傳機會，上傳後無法修改，請確認無誤後再送出！
            </dd>
          </dl>
          <button className="button2">
            <a href="signup-cg">報名創意組</a>
          </button>
          <button className="button2">
            <a href="/cosplay/">返回首頁</a>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FormPG;
