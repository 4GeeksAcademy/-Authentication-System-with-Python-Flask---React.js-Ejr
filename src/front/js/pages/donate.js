import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Donate = () => {
  const { store, actions } = useContext(Context);
  return (
    <div className="donate w-75" style={{ marginLeft: "12%" }}>
      <br></br>
      <h1>$Give us your money$</h1>
      <br></br>
      <p>
        Click this link to donate to your friendly neighborhood WordSword
        developers
      </p>
    </div>
  );
};
