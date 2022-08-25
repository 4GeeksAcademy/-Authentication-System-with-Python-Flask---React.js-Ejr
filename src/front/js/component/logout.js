import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const Logout = () => {
  const { store, actions } = useContext(Context);
  const handleClick = () => {
    actions.logout();
  };
  return (
    <a href="#" onClick={handleClick} className="btn btn-danger">
      Logout
    </a>
  );
};
