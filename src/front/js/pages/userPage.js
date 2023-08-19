import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

import "../../styles/userPage.css";

export const UserPage = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center mt-5">
      <h1>USERPAGE</h1>
    </div>
  );
};
