import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

import { Banner } from "../component/banner.jsx";
import { Joingaming } from "../component/joingaming.jsx";
import { MatchGamers } from "../component/matchgamers.jsx";
import { Gamesrecomended } from "../component/gamesrecomended.jsx";
import { NewsletterSection } from "../component/newsletter.jsx";

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
