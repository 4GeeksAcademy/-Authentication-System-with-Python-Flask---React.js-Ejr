import React from "react";
import Times from "../times/index.jsx";

const Time = ({ showTime, date }) => {
  return <div>{showTime ? <Times date={date} /> : null}</div>;
};

export default Time;
