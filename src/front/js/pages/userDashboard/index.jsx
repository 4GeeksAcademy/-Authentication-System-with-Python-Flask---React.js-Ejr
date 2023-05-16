import React, { useState } from "react";
import Calendar from "../../components/calendar/calendar.jsx";
import "../../pages/userDashboard/styles.css";
import Time from "../../components/time/time.jsx";

const UserDashboard = () => {
  const [date, setDate] = useState(new Date());
  const [showTime, setShowTime] = useState(false);

  return (
    <div>
      <div className="services-box">
        <div className="bg">
          <div className="d-flex align-items-center">
            <img src="https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U"></img>
            <h1>Worker</h1>
          </div>
          <div>
            <h2>Next Services:</h2>
          </div>
          <div></div>
        </div>
        <div className="calendar">
          <Calendar
            onChange={setDate}
            value={date}
            onClickDay={() => setShowTime(true)}
          />
          <div className="selected-date text-center">
            Selected Date: {date.toDateString()}
          </div>
        </div>
      </div>
      <div>
        <Time className="selected-time" showTime={showTime} date={date} />
      </div>
    </div>
  );
};

export default UserDashboard;
