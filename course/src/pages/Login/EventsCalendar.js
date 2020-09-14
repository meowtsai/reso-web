import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

const localizer = momentLocalizer(moment);
const EventsCalendar = () => {
  const myEventsList = [
    { title: "test1", start: "2020-09-15", end: "2020-09-16", allDay: false },
    { title: "test2", start: "2020-09-21", end: "2020-09-21", allDay: false },
  ];
  return (
    <div>
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default EventsCalendar;

// Event {
//     title: string,
//     start: Date,
//     end: Date,
//     allDay?: boolean
//     resource?: any,
//   }
