import React, { useState, useEffect } from "react";
import classnames from "classnames";
import axios from "axios";
import { useForm } from "react-hook-form";
import MyDropzone from "./MyDropzone";
import { useHistory } from "react-router-dom";

const FormCG = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [registerResult, setRegisterResult] = useState(null);
  const { register, handleSubmit, errors, setValue } = useForm(); // initialise

  register({ name: "cover_img" }, { required: "請上傳封面圖檔" });
  register({ name: "imgs" }, { required: "請上傳作品圖檔" });

  const onSubmit = (registerData) => {
    //console.log("registerData", registerData);
    setLoading(true);
    let formData = new FormData();
    Object.keys(registerData).forEach((itemKey) => {
      if (itemKey === "imgs") {
        registerData[itemKey].forEach((img, index) => {
          formData.append("img" + index, registerData[itemKey][index]);
        });
      } else {
        formData.append(itemKey, registerData[itemKey]);
      }
    });

    formData.append("category", "CG");

    axios
      .post("/api/cosplay", formData, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((res) => {
        //console.log(res.data);
        setRegisterResult(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response.data);
      });
  };

  let history = useHistory();

  useEffect(() => {
    if (registerResult && registerResult?._id) {
      window.alert("報名成功!");
      history.push(`/cosplay`);
    }
    return () => {
      setRegisterResult(null);
    };
  }, [registerResult, history]);

  return (
    <section className="sec4">
      {registerResult?._id ? (
        "完成!"
      ) : (
        <div className="typePage">
          <div className="sec-title_form">
            <div className="sec-title_cg"></div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="userSign-box">
                <p className="sec-title_h3">STEP 1 請填寫以下基本資料</p>
                <p className="text-danger">{error && error.msg}</p>

                <div className="sec-title_key">
                  {" "}
                  <span className="essential_icon">*</span>
                  <label>真 實 姓 名:</label>
                  <input
                    type="text"
                    className={classnames("sec-title_val", {
                      invalid: errors.coser_name,
                    })}
                    id="coser_name"
                    name="coser_name"
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
                      invalid: errors.coser_citizen_id,
                    })}
                    id="coser_citizen_id"
                    name="coser_citizen_id"
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
                      invalid: errors.coser_phone,
                    })}
                    id="coser_phone"
                    name="coser_phone"
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
                      invalid: errors.coser_email,
                    })}
                    id="coser_email"
                    name="coser_email"
                    placeholder="請輸入E-mail"
                    ref={register({
                      required: "請輸入E-mail",
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                        message: "E-mail格式不符合",
                      },
                    })}
                  />
                </div>

                <p className="sec-title_h3" style={{ marginTop: "50px" }}>
                  STEP 2 請填寫參賽作品資料
                </p>
                <p className="sec-title2">
                  每位參賽者可上傳至多5張照片(包含封面圖)，需以副檔名*.jpg,*.jpeg,*.png格式上傳，每張照片檔案大小需小於2MB。
                </p>
                <div className="sec-title_key">
                  {" "}
                  <span className="essential_icon">*</span>
                  <label>作 品 標 題:</label>
                  <input
                    type="text"
                    className={classnames("sec-title_va2", {
                      invalid: errors.work_subject,
                    })}
                    id="work_subject"
                    name="work_subject"
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
                      invalid: errors.work_desc,
                    })}
                    name="work_desc"
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
                      fileSize={2000000}
                      title={"封面圖"}
                      setFile={(value) => {
                        setValue("cover_img", value[0]);
                      }}
                    />
                    <p className="p1">※照片大小需小於2MB </p>{" "}
                    <span className="text-danger">
                      {errors["cover_img"] && errors["cover_img"].message}
                    </span>
                  </div>
                  <span className="essential_icon">*</span>
                  <label>其他作品圖:</label>
                  <div className="works">
                    <MyDropzone
                      filesCount={4}
                      fileSize={2000000}
                      title={"作品集"}
                      setFile={(value) => setValue("imgs", value)}
                    />

                    <p className="p1">※照片大小需小於2MB </p>
                    <span className="text-danger">
                      {errors["imgs"] && errors["imgs"].message}
                    </span>
                  </div>
                </div>
              </div>
              <div className="sec-title_checkbox ">
                <br />
                <br />
                <br />
                <input
                  type="checkbox"
                  name="agree_policy"
                  id="agree_policy"
                  ref={register({
                    required: "請勾選同意賽事規則",
                  })}
                />
                我已詳閱
                <a href="/cosplay/#note" target="_blank">
                  <font>參賽注意事項</font>
                </a>
                ，並同意遵守所有規範。{" "}
                <span className="text-danger">
                  {errors["agree_policy"] && errors["agree_policy"].message}
                </span>
              </div>
              <p className="text-danger">{error && error.msg}</p>
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
                1.以創意、低成本、DIY手工製作為主要呈現方式進行角色Cosplay。
              </dd>
              <dd>2.僅限個人投稿參賽，不接受團體創作之作品。</dd>
              <dd>
                3.投稿作品時，上傳圖檔中必須至少含有一張原始角色與Cosplay對比圖。
              </dd>
              <dd>
                4.作品資訊僅有一次上傳機會，上傳後無法修改，請確認無誤後再送出！
              </dd>
            </dl>
            <button className="button2">
              <a href="/cosplay/signup/pg">報名專業組</a>
            </button>
            <button className="button2">
              <a href="/cosplay/">返回首頁</a>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default FormCG;
