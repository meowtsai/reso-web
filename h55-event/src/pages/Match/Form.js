import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import axios from "axios";
import BirthdaySelect from "../Team/BirthdaySelect";
const Form = ({ setHint, setWrapError, setLoading }) => {
  let history = useHistory();
  const [showTelCode, setShowTelCode] = useState(false);
  const {
    register,
    handleSubmit,
    errors,
    setError,
    setValue,
    getValues,
    watch,
  } = useForm(); // initialise the hook
  useEffect(() => {
    if (errors) {
      setWrapError(errors);
    }
  }, [errors]);
  //console.log("errors", errors);
  register({ name: "phone_code" }, { required: "請選擇手機區域碼" });
  register({ name: "birthday" }, { required: "請正確選擇出生年月日" });
  const phoneCodeArray = ["+886", "+852", "+853"];
  const watchFields = watch([
    "own_hunter",
    "need_hunter",
    "own_survivor",
    "need_survivor",
  ]);
  //console.log("watchFields", watchFields);
  const onSubmit = (registerData) => {
    if (
      Number.parseInt(registerData.need_hunter) === 0 &&
      Number.parseInt(registerData.need_survivor) === 0
    ) {
      setError("need_hunter", {
        type: "manual",
        message: "你的隊伍似乎不需要媒合?",
      });
      return;
    }
    if (
      (Number.parseInt(registerData.need_hunter) === 1 &&
        Number.parseInt(registerData.need_survivor) === 4) ||
      (Number.parseInt(registerData.own_hunter) === 0 &&
        Number.parseInt(registerData.own_survivor) === 0)
    ) {
      setError("need_hunter", {
        type: "manual",
        message: "你的隊伍至少應該有一名成員?",
      });
      return;
    }

    setLoading(true);
    axios
      .post("/api/idvtwcampus/match_form_submit", registerData)
      .then((res) => {
        setLoading(false);
        console.log("match_form_submit result", res.data);
        history.push("/idvtwcampus/team/result");
        //setRegisterResult(res.data.CourseRegister);
      })
      .catch((err) => {
        setLoading(false);
        const sse = err.response.data;
        if (Object.keys(sse).length > 0) {
          const firstKey = Object.keys(sse)[0];
          const firstContent = sse[firstKey];
          setError({
            [firstKey]: { message: firstContent },
          });
        }
      });
  };

  useEffect(() => {
    if (watchFields.own_hunter >= 1) {
      setValue("own_hunter", 1);
      setValue("need_hunter", 0);
    }
  }, [watchFields.own_hunter, setValue]);
  useEffect(() => {
    if (watchFields.need_hunter >= 1) {
      setValue("need_hunter", 1);
      setValue("own_hunter", 0);
    }
  }, [watchFields.need_hunter, setValue]);
  useEffect(() => {
    if (watchFields.own_survivor !== "") {
      if (watchFields.own_survivor >= 4) {
        setValue("own_survivor", 4);
        setValue("need_survivor", 0);
      } else if (Number.parseInt(watchFields.own_survivor)) {
        setValue(
          "need_survivor",
          Number.parseInt(4 - watchFields.own_survivor)
        );
      }
    }
  }, [watchFields.own_survivor, setValue]);
  useEffect(() => {
    if (watchFields.need_survivor !== "") {
      if (watchFields.need_survivor >= 4) {
        setValue("own_survivor", 0);
        setValue("need_survivor", 4);
      } else {
        setValue(
          "own_survivor",
          Number.parseInt(4 - watchFields.need_survivor)
        );
      }
    }
  }, [watchFields.need_survivor, setValue]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section className="sec4">
        <p className="sec-title"></p>
        <a name="form" href="!#">
          {" "}
        </a>
        <p className="sec-title2">(未滿五人) </p>
        <div className="userSign-box">
          <p className="userSign-title"></p>
          <div>
            <label htmlFor="">我們已經有</label>
            <div>
              <div className="form1-con1">
                <label htmlFor="">監管者</label>
                <input
                  type="number"
                  id="own_hunter"
                  name="own_hunter"
                  ref={register({
                    required: "請填寫隊伍已有監管者隊員數．",

                    max: {
                      value: 1,
                      message: "監管者有1位就夠了喔．",
                    },
                    min: {
                      value: 0,
                      message: "監管者不得為負數．",
                    },
                  })}
                />
                <label htmlFor="">位</label>
              </div>
              <div className="form1-con2">
                <label htmlFor="">求生者</label>
                <input
                  type="number"
                  id="own_survivor"
                  name="own_survivor"
                  ref={register({
                    required: "請填寫隊伍已有求生者隊員數．",

                    max: {
                      value: 4,
                      message: "求生者有4位就夠了喔．",
                    },
                    min: {
                      value: 0,
                      message: "求生者不得為負數．",
                    },
                  })}
                />
                <label htmlFor="">位</label>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="">我們需要</label>
            <div>
              <div className="form1-con1">
                <label htmlFor="">監管者</label>
                <input
                  type="number"
                  id="need_hunter"
                  name="need_hunter"
                  ref={register({
                    required: "請填寫需求的監管者隊員數．",

                    max: {
                      value: 1,
                      message: "監管者有1位就夠了喔．",
                    },
                    min: {
                      value: 0,
                      message: "監管者不得為負數．",
                    },
                  })}
                />
                <label htmlFor="">位</label>
              </div>
              <div className="form1-con2">
                <label htmlFor="">求生者</label>
                <input
                  type="number"
                  id="need_survivor"
                  name="need_survivor"
                  ref={register({
                    required: "請填寫需求的求生者隊員數．",

                    max: {
                      value: 4,
                      message: "求生者有4位就夠了喔．",
                    },
                    min: {
                      value: 0,
                      message: "求生者不得為負數．",
                    },
                  })}
                />
                <label htmlFor="">位</label>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="">聯絡人姓名</label>
            <div>
              <input
                type="text"
                placeholder="請填寫真實姓名"
                name="name"
                ref={register({
                  required: "請正確填寫您的真實姓名．",
                  maxLength: { value: 40, message: "真實姓名長度過長．" },
                  minLength: { value: 2, message: "真實姓名長度過短．" },
                })}
              />
            </div>
          </div>
          <div>
            <label htmlFor="">手機號碼</label>
            <div>
              <div className="regionCode" style={{ cursor: "pointer" }}>
                {" "}
                <span
                  className="phone_code"
                  onClick={() => setShowTelCode(!showTelCode)}
                  id="phone_code"
                >
                  {getValues("phone_code")}
                </span>{" "}
                <i onClick={() => setShowTelCode(!showTelCode)}></i>
                <ul
                  style={{ display: `${showTelCode === true ? "" : "none"}` }}
                  className="phone-code"
                >
                  {phoneCodeArray.map((code) => (
                    <li
                      key={`phone-${code}`}
                      onClick={() => {
                        setShowTelCode(!showTelCode);

                        setValue("phone_code", code, {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                      }}
                    >
                      {code}
                    </li>
                  ))}
                </ul>
              </div>
              <input
                type="text"
                placeholder="請填寫你的手機號碼"
                className="phone"
                name="phone"
                ref={register({
                  required: "請正確填寫您的手機號碼",
                  maxLength: { value: 10, message: "請正確填寫您的手機號碼" },
                  minLength: { value: 8, message: "請正確填寫您的手機號碼" },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "手機號碼必須是全數字",
                  },
                })}
              />
            </div>
          </div>
          <div>
            <label htmlFor="">LINE ID</label>
            <i onClick={() => setHint("wrap_line_id")}>
              {" "}
              &lt;如何查找 LINE ID&gt;{" "}
            </i>
            <div>
              <input
                type="text"
                placeholder="請填寫你的Line_ID"
                className="line_id"
                name="line_id"
                ref={register({
                  required: "請正確填寫您的LINE ID",
                })}
              />
            </div>
          </div>
          <div>
            <label htmlFor="">出生日期</label>
            <i className="old"> &lt;選手須年滿 15 歲&gt; </i>
            <div>
              <BirthdaySelect
                setBirthdayValue={(birthday) => setValue("birthday", birthday)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="">電子信箱</label>
            <div>
              <input
                type="text"
                placeholder="請填寫E-Mail"
                className="email"
                name="email"
                ref={register({
                  required: "輸入您的電子郵件",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "電子郵件格式不符合",
                  },
                })}
              />
            </div>
          </div>
          <div>
            <label htmlFor="">聯絡人 Game ID</label>
            <i onClick={() => setHint("wrap_game_id")}>
              {" "}
              &lt;什麼是 Game ID&gt;{" "}
            </i>
            <div>
              <input
                type="text"
                placeholder="請填寫Game_ID"
                className="game_id"
                name="game_id"
                ref={register({
                  required: "請正確填寫隊長的Game_ID",
                })}
              />
            </div>
          </div>
          <div>
            <label htmlFor="">聯絡人 Game Name</label>
            <i onClick={() => setHint("wrap_game_name")}>
              {" "}
              &lt;什麼是 Game Name&gt;{" "}
            </i>
            <div>
              <input
                type="text"
                placeholder="請填寫Game_Name"
                className="game_name"
                name="game_name"
                ref={register({
                  required: "請正確填寫您的Game_Name",
                })}
              />
            </div>
          </div>
        </div>
        <button type="submit"></button>
      </section>
    </form>
  );
};

export default Form;
