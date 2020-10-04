import React, { useState, Fragment, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useForm, FormProvider } from "react-hook-form";
import BirthdaySelect from "./BirthdaySelect";
import FileUploader from "../../components/FileUploader";
import MemberForm from "./MemberForm";

const RegisterForm = ({ setError, setHint, setLoading }) => {
  let history = useHistory();
  const [showTelCode, setShowTelCode] = useState(false);
  const [showMore, setShowMore] = useState(false);
  // const {
  //   register,
  //   handleSubmit,
  //   errors,
  //   setValue,
  //   methods.getValues,
  //   trigger,
  // } = useForm(); // initialise the hook
  const methods = useForm(); // initialise the hook
  //console.log(methods.getValues());
  methods.register({ name: "phone_code" }, { required: "請選擇手機區域碼" });
  methods.register({ name: "birthday" }, { required: "請正確選擇出生年月日" });
  methods.register({ name: "captain_upload1" }, { required: "請上傳正面圖檔" });
  methods.register({ name: "captain_upload2" }, { required: "請上傳反面圖檔" });
  const phoneCodeArray = ["+886", "+852", "+853"];
  useEffect(() => {
    //console.log("useEffect", methods.errors);
    if (methods.errors) {
      setError(methods.errors);
    }
  }, [methods.errors]);

  const onSubmit = (registerData) => {
    //console.log(registerData);

    let formData = new FormData();
    let roleHunter = 0;
    let roleSurvivor = 0;
    Object.keys(registerData).forEach((itemKey) => {
      if (itemKey.indexOf("role") > -1) {
        if (registerData[itemKey].toString() === "1") roleHunter++;
        if (registerData[itemKey].toString() === "2") roleSurvivor++;
      }
      formData.append(itemKey, registerData[itemKey]);
    });

    // console.log("roleHunter", roleHunter);
    // console.log("roleSurvivor", roleSurvivor);

    if (roleHunter < 1) {
      methods.setError("role", {
        type: "manual",
        message: "隊伍中必須至少有一位監管者",
      });
      return;
    }
    if (roleSurvivor < 4) {
      methods.setError("role", {
        type: "manual",
        message: "隊伍中必須至少有四位求生者",
      });
      return;
    }
    //console.log("formData", formData);
    setLoading(true);
    axios
      .post("/api/idvtwcampus/form_submit", formData)
      .then((res) => {
        setLoading(false);
        console.log("form_submit result", res.data);
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

  const setBirthdayValue = (birthday) => {
    methods.setValue("birthday", birthday);
  };

  const moreMember = () => {
    //console.log("clciked");
    setError(null);
    setShowMore(!showMore);
  };

  const Sendverify = async () => {
    //check email
    const result = await methods.trigger(["email"]);
    if (!result) {
      setError({
        email: { message: "請填寫正確的 email \r\n 我們將發送認證碼給您喔!" },
      });
      return;
    } else {
      //call api
      const email = methods.getValues("email");
      try {
        const sendCode = await axios.post("/api/idvtwcampus/getcode", {
          email: email,
        });
        if (sendCode) {
          //成功送出email, 提示玩家收信
          setError({
            email: {
              message: `已經將認證碼傳送到${email}，請在收到後將認證碼複製到對應欄位喔!`,
            },
          });
        }
        //console.log("getcode result", sendCode.data);
      } catch (error) {
        //console.log("error getcode result", error.response.data);
        setError({
          email: { message: error.response.data.email },
        });
      }
    }

    //console.log("Sendverify", result);
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <section className="sec2">
          <a name="form" href="!#">
            {" "}
          </a>
          <p className="sec-title"></p>
          <section id="captain" className="captain-box">
            <p className="captain-title"></p>
            <div>
              <label htmlFor="">隊伍名稱</label>
              <div>
                <input
                  type="text"
                  placeholder="請填寫隊伍隊名"
                  className="team_name"
                  name="team"
                  ref={methods.register({
                    required: "請填寫隊伍名稱．",

                    maxLength: {
                      value: 8,
                      message: "隊伍名稱字符不得大於8位．",
                    },
                  })}
                />
              </div>
            </div>
            <div>
              <label htmlFor="">隊長姓名</label>
              <div>
                <input
                  type="text"
                  placeholder="請填寫真實姓名"
                  className="name"
                  name="name"
                  ref={methods.register({
                    required: "請正確填寫您的真實姓名．",
                    maxLength: { value: 40, message: "真實姓名長度過長．" },
                    minLength: { value: 2, message: "真實姓名長度過短．" },
                  })}
                />
              </div>
            </div>
            <div>
              <label htmlFor="">性　　別</label>
              <div>
                <div
                  className="input-radio"
                  onClick={() => methods.setValue("gender", "1")}
                >
                  <input
                    type="radio"
                    name="gender"
                    ref={methods.register({
                      required: "請選擇性別",
                    })}
                    value="1"
                    defaultChecked="true"
                  />
                  男{" "}
                </div>
                <div
                  className="input-radio"
                  onClick={() => methods.setValue("gender", "2")}
                >
                  <input
                    type="radio"
                    name="gender"
                    ref={methods.register({
                      required: "請選擇性別",
                    })}
                    value="2"
                  />
                  女{" "}
                </div>
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
                    {methods.getValues("phone_code")}
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

                          methods.setValue("phone_code", code, {
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
                  ref={methods.register({
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
                  ref={methods.register({
                    required: "請正確填寫您的LINE ID",
                  })}
                />
              </div>
            </div>
            <div>
              <label htmlFor="">出生日期</label>
              <i className="old"> &lt;選手須年滿 15 歲&gt; </i>
              <div>
                <BirthdaySelect setBirthdayValue={setBirthdayValue} />
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
                  ref={methods.register({
                    required: "輸入您的電子郵件",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "電子郵件格式不符合",
                    },
                  })}
                />
                <span className="getCode" onClick={Sendverify}>
                  取得認證碼
                </span>{" "}
              </div>
            </div>
            <div>
              <label htmlFor="">認 證 碼</label>
              <div>
                <input
                  type="text"
                  placeholder="請填寫認證碼"
                  className="verify_code"
                  name="verify_code"
                  ref={methods.register({
                    required: "請正確填寫您的電子信箱認證碼",
                  })}
                />
              </div>
            </div>
            <div>
              <label htmlFor="">隊長 Game ID</label>
              <i onClick={() => setHint("wrap_game_id")}>
                {" "}
                &lt;如何查找 GAME ID&gt;{" "}
              </i>

              <div>
                <input
                  type="text"
                  placeholder="請填寫Game_ID"
                  className="game_id"
                  name="game_id"
                  ref={methods.register({
                    required: "請正確填寫隊長的Game_ID",
                  })}
                />
              </div>
            </div>
            <div>
              <label htmlFor="">隊長 Game Name</label>
              <i onClick={() => setHint("wrap_game_name")}>
                {" "}
                &lt;如何查找 GAME NAME&gt;{" "}
              </i>
              <div>
                <input
                  type="text"
                  placeholder="請填寫Game_Name"
                  className="game_name"
                  name="game_name"
                  ref={methods.register({
                    required: "請正確填寫您的Game_Name",
                  })}
                />
              </div>
            </div>
            <div>
              <label htmlFor="">角色</label>
              <div>
                <div
                  className="input-radio"
                  onClick={() => methods.setValue("role", "1")}
                >
                  <input
                    type="radio"
                    name="role"
                    ref={methods.register({
                      required: "請選擇角色",
                    })}
                    value="1"
                    defaultChecked={false}
                  />
                  監管者{" "}
                </div>
                <div
                  className="input-radio"
                  onClick={() => methods.setValue("role", "2")}
                >
                  <input
                    type="radio"
                    name="role"
                    ref={methods.register({
                      required: "請選擇角色",
                    })}
                    value="2"
                    defaultChecked={false}
                  />
                  求生者{" "}
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="">請上傳有效身分證</label>
              <div className="upload-text">
                {" "}
                規範與詳細描述請參考賽制規章 <br />
                可上傳兩張 JPG、PNG圖檔{" "}
              </div>
            </div>
            <div>
              <article>
                <div
                  className="captain-upload1 uploadImg"
                  filename="file1_1_1"
                  data-img="img1_1_1"
                >
                  {" "}
                  <FileUploader
                    message="點選上傳正面"
                    setFile={(name, value) => methods.setValue(name, value)}
                    filename={"captain_upload1"}
                  />
                </div>
              </article>
              <article>
                <div
                  className="captain-upload2 uploadImg"
                  filename="file1_1_2"
                  data-img="img1_1_2"
                >
                  {" "}
                  <FileUploader
                    message="點選上傳反面"
                    setFile={(name, value) => methods.setValue(name, value)}
                    filename={"captain_upload2"}
                  />
                </div>
              </article>
            </div>
          </section>
        </section>
        {/* 隊員報名 */}
        <section id="summoner" className="summoner-box">
          <div>
            <p className="summoner-title"></p>
            <MemberForm formLabel="隊員 1" sn={1} />
            <MemberForm formLabel="隊員 2" sn={2} />
            <MemberForm formLabel="隊員 3" sn={3} />
            <MemberForm
              formLabel="隊員 4"
              sn={4}
              showMore={showMore}
              moreMember={() => moreMember()}
            />
            {showMore === true && (
              <Fragment>
                <MemberForm
                  formLabel="隊員 5"
                  sn={5}
                  showMore={showMore}
                  moreMember={() => moreMember()}
                />
                <MemberForm
                  formLabel="隊員 6"
                  sn={6}
                  showMore={showMore}
                  moreMember={() => moreMember()}
                />
              </Fragment>
            )}
          </div>
        </section>

        <section className="sec4">
          <div className="agree-con">
            {" "}
            <div className="Policy">
              <input
                type="checkbox"
                name="agree_policy"
                id="Policy"
                className="chat-button-location-radio-inputradio-input"
                ref={methods.register({
                  required: "請勾選同意賽事規則",
                })}
                value="#f0544d"
              />
              <label htmlFor="Policy"></label>
              <em className="i18n_agree1" style={{ cursor: "pointer" }}>
                {" "}
                我已經閱讀
                <a
                  href="/idvtwcampus#rule"
                  target="_blank"
                  className="text-orange"
                >
                  賽事規章
                </a>
                並且同意{" "}
              </em>{" "}
            </div>
            <div style={{ clear: "both" }}></div>
          </div>
          <button type="submit" className="signUp"></button>{" "}
        </section>
      </form>
    </FormProvider>
  );
};

export default RegisterForm;
