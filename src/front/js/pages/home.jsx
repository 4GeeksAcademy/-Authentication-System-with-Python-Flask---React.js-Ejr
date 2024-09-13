import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

import { Banner } from "./banner.jsx";
import { Joingaming } from "./joingaming.jsx";
import { MatchGamers } from "./matchGamers.jsx";
import { Gamesrecomended } from "./gamesrecomended.jsx";
import { NewsletterSection } from "./newsletter.jsx";

export const Home = () => {
  return (
    <div>
      <Banner />
      <Joingaming />
      <MatchGamers />
      <Gamesrecomended />
      <NewsletterSection />
    </div>
  );
};
