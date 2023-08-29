import React, { useState, useEffect, useContext } from "react";
import { Footer } from "../component/footer";
import { Navbar } from "../component/navbar";

import { Context } from "../store/appContext";

export const Landing = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Nuestra Landing Page</h1>
      </div>
      <Footer />
    </>
  );
};
