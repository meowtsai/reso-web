import React, { Fragment, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";

import subDays from "date-fns/addDays";
import ReactDatePicker from "react-datepicker";
import classnames from "classnames";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
const RegisterForm = ({ setRegisterResult, setError, game, course_id }) => {
  const { register, handleSubmit, errors, watch, control, setValue } = useForm({
    defaultValues: {
      mentor: game.mentors?.length === 1 ? game.mentors[0]._id : "",
      course: course_id,
    },
  }); // initialise

  const [loading, setLoading] = useState(false);
  const [timeSlotList, setTimeSlotList] = useState([]);
  //const [selectedMentor, setSelectedMentor] = useState(null);
  const [availableDays, setAvailableDays] = useState([0, 1, 2, 3, 4, 5, 6]);

  //console.log("selectedMentor", selectedMentor);
  const watchMentor = watch("mentor", "");
  const watchCourse = watch("course", "");
  //console.log("watchMentor", watchMentor);
  //console.log("watchCourse", watchCourse);
  //變更導師 設定可選日期
  useEffect(() => {
    if (watchMentor !== "" && watchMentor) {
      const selMentor = game.mentors.filter((m) => m._id === watchMentor)[0];
      //setSelectedMentor(selMentor);
      setValue("date", false);
      setValue("timeSlot", false);

      // const input_date = document.getElementsByName("date")[0];
      // console.log("selMentor", selMentor);
      // input_date.setAttribute(
      //   "min",
      //   DateTime.fromISO(selMentor.periods?.startDate).toFormat("yyyy-MM-dd")
      // );

      setAvailableDays(selMentor.periods.weekdays);
    } else {
      //setSelectedMentor(null);
    }
  }, [watchMentor, setValue, game.mentors]);

  useEffect(() => {
    setValue("date", false);
    setValue("timeSlot", false);
  }, [watchCourse, setValue]);

  const watchDateChange = watch("date", false);
  useEffect(() => {
    if (watchDateChange) {
      axios
        .post("/api/mentor/seatsByDate", {
          date: watchDateChange,
          courseId: watchCourse,
          mentorId: watchMentor,
        })
        .then((res) => {
          setTimeSlotList(res.data.seatsAvailable);
        });
    }
  }, [watchDateChange, watchCourse, watchMentor]);
  // const onSubmit = (registerData) => {
  //   console.log(JSON.stringify(registerData));
  // };

  const onSubmit = (registerData) => {
    //console.log(registerData);
    setLoading(true);
    axios
      .post("/api/mentor/register", registerData)
      .then((res) => {
        setLoading(false);

        setRegisterResult(res.data.CourseRegister);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response.data);
      });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="modal-body">
        <h6>請確認您要預約的講師及課程</h6>
        <select
          className="custom-select form-control"
          name="mentor"
          ref={register({
            required: "請選擇導師．",
          })}
        >
          <option value="">請選擇預約的講師</option>
          {game.mentors?.map((mentor) => (
            <option key={mentor._id} value={mentor._id}>
              {mentor.name}
            </option>
          ))}
        </select>
        <select
          className="custom-select form-control"
          name="course"
          ref={register({
            required: "請選擇課程．",
          })}
        >
          <option value="">請選擇課程</option>
          {game.courses?.map((course) => (
            <option key={course._id} value={course._id}>
              {course.title} - {course.desc}
            </option>
          ))}
        </select>
        <div className="form-group row">
          <div className="col-lg-12">
            {" "}
            {watchMentor !== "" && watchCourse !== "" ? (
              <h6>請選擇您要預約的課程日期與時段</h6>
            ) : (
              <h6 className="text-danger">請先選擇導師和課程</h6>
            )}{" "}
            <Controller
              control={control}
              name="date"
              render={({ onChange, onBlur, value }) => (
                <ReactDatePicker
                  className="form-control"
                  filterDate={(date) => {
                    const day = date.getDay();
                    //return day !== 0 && day !== 6;
                    return availableDays.indexOf(day) > -1;
                  }}
                  onChange={onChange}
                  onBlur={onBlur}
                  selected={value}
                  dateFormat="yyyy-MM-dd"
                  disabled={
                    watchMentor !== "" && watchCourse !== "" ? false : true
                  }
                  minDate={subDays(new Date(), 9)}
                />
              )}
            />
          </div>
        </div>
        <select
          className="custom-select form-control"
          name="timeSlot"
          ref={register({
            required: "請選擇時段．",
          })}
        >
          <option value="">請選擇預約時段</option>
          {timeSlotList.length > 0 &&
            timeSlotList.map((ts) => (
              <option
                key={`tsopt-${ts.timeSlot}`}
                value={ts.timeSlot}
                disabled={ts.available === 0 ? true : false}
              >
                {ts.timeSlot}
                (尚有名額:{ts.available} {ts.reason})
              </option>
            ))}
        </select>
        <span
          className={classnames("", {
            "text-orange": errors.timeSlot,
          })}
        >
          {errors.timeSlot?.message}
        </span>{" "}
        <br />
        <span>
          ✦提醒您，每個時段會與導師組隊進行一局遊戲，一局結束後，將針對該局進行分析與教學
        </span>
        <h6>
          請填寫您的
          <i
            className="fab fa-discord"
            style={{ color: "rgb(138,156,254)" }}
          ></i>
          Discord帳號
        </h6>
        <input
          type="text"
          id="discordAccount"
          name="discordAccount"
          placeholder="xxxxxxxxx"
          ref={register({
            required: "Discord帳號必填．",
            maxLength: 20,
          })}
          className={classnames("form-control", {
            "not-valid": errors.discordAccount,
          })}
        />
        <span
          className={classnames("", {
            "text-orange": errors.discordAccount,
          })}
        >
          ✦ {errors.discordAccount?.message}
          我們將於您預約與付款成功後，加入教學群組{" "}
        </span>
        <h6>請填寫您的基本資料</h6>
        <div className="form-group row">
          <div className="col-lg-12">
            <input
              type="name"
              className="form-control"
              id="inputname"
              name="name"
              placeholder="姓名"
              ref={register({
                required: "姓名必填．",
                maxLength: 20,
              })}
            />
            <span
              className={classnames("", {
                "text-orange": errors.name,
              })}
            >
              {errors.name?.message}
            </span>
            <input
              type="phone"
              className="form-control"
              id="inputphone"
              name="phone"
              placeholder="電話"
              ref={register({
                required: "電話必填．",
                maxLength: 20,
              })}
            />
            <span
              className={classnames("", {
                "text-orange": errors.phone,
              })}
            >
              {errors.phone?.message}
            </span>
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              name="email"
              placeholder="信箱"
              ref={register({
                required: "輸入您的電子郵件",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "電子郵件格式不符合",
                },
              })}
            />
            <span
              className={classnames("", {
                "text-orange": errors.email,
              })}
            >
              {errors.email?.message}
            </span>
            <input
              type="number"
              className="form-control"
              id="inputgrade"
              name="roleData1"
              placeholder={game.rolefield}
              ref={register({
                required: "必填．",
              })}
            />
            <span
              className={classnames("", {
                "text-orange": errors.roleData1,
              })}
            >
              {errors.roleData1?.message}
            </span>
            {game.gameId === "id5" && (
              <Fragment>
                <select
                  className="custom-select form-control"
                  name="roleData2"
                  ref={register({
                    required: "請選擇位階．",
                  })}
                >
                  <option value="">請選擇位階</option>
                  <option value="1">一階</option>
                  <option value="2">二階</option>
                  <option value="3">三階</option>
                  <option value="4">四階</option>
                  <option value="5">五階</option>
                  <option value="6">六階</option>
                  <option value="7">七階</option>
                </select>
                <span
                  className={classnames("", {
                    "text-orange": errors.roleData2,
                  })}
                >
                  {errors.roleData2?.message}
                </span>
              </Fragment>
            )}
          </div>
        </div>
        {loading === false ? (
          <button type="submit" className="btn btn-primary">
            確認預約
          </button>
        ) : (
          <button type="button" className="btn btn-secondary" disabled>
            傳送資料中...
          </button>
        )}
      </div>
    </form>
  );
};

export default RegisterForm;
