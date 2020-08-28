import React, { useEffect, useState } from "react";
import { WOW } from "wowjs";
import { useForm } from "react-hook-form";
import classnames from "classnames";
import axios from "axios";
import "./contact.css";
import { useHistory } from "react-router-dom";
const ContactIndex = () => {
  const [loading, setLoading] = useState(false);
  let history = useHistory();
  useEffect(() => {
    const wow = new WOW({
      offset: 100,
      mobile: false,
      live: false,
    });

    wow.init();
  }, []);
  const { register, handleSubmit, errors } = useForm(); // initialise the hook

  const onSubmit = (contactMessage) => {
    //console.log(contactMessage);
    setLoading(true);
    axios
      .post("/api/contactus/", {
        ...contactMessage,
      })
      .then((res) => {
        setLoading(false);
        //console.log("result", res.data._id);
        //const result = res.data;
        //const newId = result._id;

        history.push(`/general?category=1&id=${res.data._id}`);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.msg);
      });
  };

  if (loading) {
    return (
      <div className="spinner-grow text-warning" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
  return (
    <div className="about-us-container section-container">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 about-us section-description wow fadeIn">
            <h2 style={{ marginTop: "93px" }}>
              <strong>聯絡</strong> 我們
            </h2>
            <div className="divider-1 wow fadeInUp">
              <span></span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <form
              className="contact_us_form row"
              id="contactForm"
              noValidate="noValidate"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div
                className="form-group col-sm-12 text"
                style={{ textAlign: "left" }}
              >
                <p>
                  若您有任何廣告、整合行銷、媒體採購、行銷活動等需求，歡迎於下方留下您的聯繫方式，Resound
                  呼聲將有專人為您服務。
                </p>
              </div>
              <div className="form-group col-sm-12">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder={errors.name?.message || "姓名"}
                  ref={register({
                    required: "*必填，請告訴我們該怎麼稱呼您",
                    maxLength: 20,
                  })}
                  className={classnames("form-control", {
                    "not-valid": errors.name,
                  })}
                />
              </div>
              <div className="form-group col-sm-12">
                <input
                  type="email"
                  className={classnames("form-control", {
                    "not-valid": errors.email,
                  })}
                  style={{ textTransform: "lowercase" }}
                  id="email"
                  name="email"
                  placeholder={errors.email?.message || "E-mail"}
                  ref={register({
                    required: "*必填，請輸入您的電子郵件",
                    pattern: {
                      value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                      message: "電子郵件格式不符合",
                    },
                  })}
                />{" "}
              </div>
              <div className="form-group col-sm-12">
                <input
                  type="text"
                  id="company"
                  name="company"
                  placeholder={errors.company?.message || "公司"}
                  ref={register({
                    required: "*必填，請輸入公司名稱",
                    maxLength: 30,
                  })}
                  className={classnames("form-control", {
                    "not-valid": errors.company,
                  })}
                />
              </div>
              <div className="form-group col-sm-12">
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder={errors.phone?.message || "電話"}
                  ref={register({
                    required: "*必填，請提供手機或電話",
                    maxLength: 30,
                  })}
                  className={classnames("form-control", {
                    "not-valid": errors.phone,
                  })}
                />
              </div>
              <div className="form-group col-sm-12">
                <textarea
                  name="message"
                  id="message"
                  rows="2"
                  placeholder={errors.message?.message || "Message"}
                  ref={register({
                    required: "*必填，您需要什麼樣的服務或是有任何建議呢？",
                  })}
                  className={classnames("form-control", {
                    "not-valid": errors.message,
                  })}
                ></textarea>
              </div>
              <div className="form-group" style={{ marginBottom: "60px" }}>
                <button
                  type="submit"
                  value="submit"
                  className="btn-sndout submit_btn"
                >
                  OK
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactIndex;
