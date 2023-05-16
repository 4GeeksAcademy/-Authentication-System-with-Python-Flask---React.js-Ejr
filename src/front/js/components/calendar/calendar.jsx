import React from "react";
import ReactCalendar from "react-calendar";
import "../../components/calendar/styles.css";

const Calendar = ({ onChange, value, onClickDay }) => {
  return (
    <div>
      <ReactCalendar
        onChange={onChange}
        value={value}
        onClickDay={onClickDay}
      />
    </div>
  );
};

export default Calendar;
