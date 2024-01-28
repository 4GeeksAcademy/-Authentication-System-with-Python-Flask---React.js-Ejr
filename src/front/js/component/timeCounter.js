import React, { useState, useEffect } from "react";

export const TimeCounter = () => {
  const [timer, setTime] = useState(0)
  const [active, setActive] = useState(false)

  useEffect(() => {
    let intervalId;

    if (active) {
      intervalId = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [active, setTime]);


  const startStop = () => setActive(value => !value)
  const submitTime = () => { e = actions.sendTime(time) }

  const hours = Math.floor(timer / 3600);
  const minutes = Math.floor(timer % 3600 / 60);
  const seconds = Math.floor(timer % 60);

  return (
    <div className="card container-fluid col-sm-8 col-md-8 col-lg-8 bg-body-tertiary text-center p-1">
      <div className="card-header"></div>
      <div className="card-body d-flex flex-row justify-content-center bg-info bg-opacity-25 fs-1 text-light" style={{ height: "8rem" }}>
        <div className="Watcher col-sm-1 col-md-1 col-lg-1 bg-dark rounded border border-info-subtle position-relative py-3 px-6 ">
          <i className="fa-brands fa-watchman-monitoring fa-spin" style={{ color: "#4cddbf4" }}></i>
        </div>
        <div className="digitThree col-sm-1 col-md-1 col-lg-1 bg-dark rounded border border-info-subtle position-relative py-3 px-3 ">
          {Math.floor(hours / 10)}
        </div>
        <div className="digitTwo col-sm-1 col-md-1 col-lg-1 bg-dark rounded border border-info-subtle position-relative py-3 px-3 ">
          {Math.floor(minutes / 10)}
        </div>
        <div className="digitOne col-sm-1 col-md-1 col-lg-1 bg-dark rounded border border-info-subtle position-relative py-3 px-3 ">
          {seconds % 10}
        </div>
      </div>
      <div className="card-footer text-light-emphasis fw-lighter">
        <div className="buttons text-light-emphasis fw-lighter">
          <button type="buttonStart" className="btn btn-info btn-sm me-2" disabled={active} onClick={startStop}>
            Start
          </button>
          <button type="buttonComplete" className="btn btn-info btn-sm me-2" disabled={!active} onClick={submitTime}>
            Completed
          </button>
        </div>
      </div>
    </div>
  );
};