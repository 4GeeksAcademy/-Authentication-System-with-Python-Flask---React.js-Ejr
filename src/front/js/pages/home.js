import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Card } from "../component/card";

import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center mt-5" id="home">
      <h1 id="heading">Game Library</h1>
      <div className="container d-flex gap-5 ">
        <Card />
        
      </div>
    </div>
  );
};
