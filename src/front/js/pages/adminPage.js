import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

import "../../styles/adminPage.css";

export const Adminpage = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center mt-5">
      <h1>ADMINPAGE</h1>
    </div>
  );
};
