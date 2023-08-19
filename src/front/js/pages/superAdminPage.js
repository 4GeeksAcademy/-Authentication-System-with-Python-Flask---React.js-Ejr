import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

import "../../styles/superAdminPage.css";

export const SuperAdminPage = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center mt-5">
      <h1>SUPERADMINPAGE</h1>
    </div>
  );
};
