import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import PubSlide from "../component/PubSlide";
import HomeOfferCard from "../component/HomeOfferCard.jsx";
import HomeReviewCard from "../component/HomeReviewCard.jsx";

import AboutUs from "../component/AboutUs";
import Slogan from "../component/Slogan";

import FilterMenu from "../component/FilterMenu.js";
import LitlleSlide from "../component/LitlleSlide.jsx";


export const Home = () => {
  const { store, actions } = useContext(Context);
  console.log("User is auth:", store.auth);
  return (
    <>


      {/* <Slogan /> */}
      {/* <AboutUs /> */}


      <LitlleSlide />
      <FilterMenu />
      <PubSlide />
      <HomeOfferCard />
      <HomeReviewCard />
      {/* <AboutUs /> */}

    </>
  );
};
