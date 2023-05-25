import React, { useState } from "react";
import "../times/styles.css";

const time = ["08:00", "09:00", "10:00", "14:00", "15:00"];

const Times = (props) => {
  const [event, setEvent] = useState(null);
  const [info, setInfo] = useState(false);

  const displayInfo = (e) => {
    setInfo(true);
    setEvent(e.target.innerText);
  };

  return (
    <div className="time-slots-container">
      {time.map((times) => {
        return (
          <div>
            <button onClick={(e) => displayInfo(e)}>{times}</button>
          </div>
        );
      })}
      <div className="appointment">
        {info
          ? `Your appointment is set to: ${event} ${props.date.toDateString()}`
          : null}
      </div>
    </div>
  );
};

export default Times;
