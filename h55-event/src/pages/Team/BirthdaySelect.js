import React, { Fragment, useState, useMemo, useEffect } from "react";
import { DateTime, Duration } from "luxon";

const BirthdaySelect = ({ birthday, setBirthdayValue }) => {
  const now = DateTime.local();
  const endYear = useMemo(
    () => now.minus(Duration.fromObject({ years: 15 })).year,
    [now]
  );

  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  useEffect(() => {
    if (year !== "" && month !== "" && day !== "") {
      const dt = DateTime.fromISO(
        `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
      );
      //const dt2 = DateTime.fromISO("2017-5-15");
      //console.log(`${year}-${month}-${day}`);
      //console.log(dt.isValid);
      if (!dt.isValid) {
        setDay("");
      } else {
        setBirthdayValue(
          `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
        );
      }
    }
  }, [year, month, day, setBirthdayValue]);

  const birthDayYYYY = [];

  //DateTime.fromISO("2017-05-15")
  for (let yyIndex = endYear; yyIndex > 1940; yyIndex--) {
    if (DateTime.fromISO(birthday).year === yyIndex) {
      birthDayYYYY.push(
        <option selected key={`yyyy-${yyIndex}`}>
          {yyIndex}
        </option>
      );
    } else {
      birthDayYYYY.push(<option key={`yyyy-${yyIndex}`}>{yyIndex}</option>);
    }
  }

  const birthDayMM = [];

  for (let mmIndex = 1; mmIndex < 13; mmIndex++) {
    if (DateTime.fromISO(birthday).month === mmIndex) {
      birthDayMM.push(
        <option selected key={`mm-${mmIndex}`}>
          {mmIndex}
        </option>
      );
    } else {
      birthDayMM.push(<option key={`mm-${mmIndex}`}>{mmIndex}</option>);
    }
  }

  const birthDayDD = [];

  for (let ddIndex = 1; ddIndex < 32; ddIndex++) {
    if (DateTime.fromISO(birthday).day === ddIndex) {
      birthDayDD.push(
        <option selected key={`dd-${ddIndex}`}>
          {ddIndex}
        </option>
      );
    } else {
      birthDayDD.push(<option key={`dd-${ddIndex}`}>{ddIndex}</option>);
    }
  }
  return (
    <Fragment>
      <select
        name={"birthDayYYYY"}
        value={year}
        onChange={(e) => setYear(e.target.value)}
      >
        <option value="">--選擇年--</option>
        {birthDayYYYY}
      </select>

      <select
        name={"birthdayMM"}
        value={month}
        onChange={(e) => setMonth(e.target.value)}
      >
        <option value="">--選擇月--</option>
        {birthDayMM}
      </select>

      <select
        name={"birthdayDD"}
        value={day}
        onChange={(e) => setDay(e.target.value)}
      >
        <option value="">--選擇日--</option>
        {birthDayDD}
      </select>
    </Fragment>
  );
};

export default BirthdaySelect;
