import React, { useState, useEffect, useContext } from "react";

import { Context } from "../store/appContext";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container">
      <h1>Aqui va el home</h1>
    </div>
  );
};
