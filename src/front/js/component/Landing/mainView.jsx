import React from "react";

import "./../../../styles/Landing-styles/mainView.css";

const MainView = () => {
  return (
    <div className="text-container">
      <div classname="left-text-container">
        <h2>
          <span className="green-text">FREE</span> YOUR BODY
        </h2>
      </div>
      <div classname="right-text-container">
        <h2>
          GET FIT WITH <span className="green-text">MKJ</span>
        </h2>
      </div>
    </div>
  );
};

export default MainView;
