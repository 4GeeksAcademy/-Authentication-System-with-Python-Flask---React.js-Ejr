import React from "react";
import errorImage from "../../img/404.png";

const ErrorPage = () => {
  const style = {
    width: "500px",
    height: "auto",
  };
  return (
    <div className="container align-items-center  mt-5 mb-5">
      <div className="row mt-5 mb-5 align-items-center text-center">
        <div className="col align-items-center mt-5 mb-5">
          <img src={errorImage} style={style} />
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
