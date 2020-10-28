const { DateTime, Duration } = require("luxon");

const periods = {
  startDate: "2020-10-23",
  endDate: "2020-12-31",
  weekdays: [0, 1, 2, 3, 4, 5, 6],
  timeSlots: ["18:00~19:00", "20:00~21:00", "21:30~22:30", "23:30~24:00"],
  excludedStartDate: null,
  excludedEndDate: null,
};

const myDate = "2020-11-11";

const dt = DateTime.fromFormat(myDate, "yyyy-MM-dd").toISO();
console.log(dt);

// 1. 日期有沒有在開始結束區間?
dt.
// 2. 日期有沒有在適合的指定周間日
// 3. 日期有沒有剛好在導師請假的區間

