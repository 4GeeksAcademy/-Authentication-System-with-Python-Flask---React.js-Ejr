import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

import "../../styles/contact.css";

export const Contact = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center mt-5">
      <h1>CONTACT</h1>
    </div>
  );
};
