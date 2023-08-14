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
import DonationForm from "../component/DonationForm";
import GeneralInfoDiv from "../component/GeneralInfoDiv.jsx";
import { Link } from "react-router-dom";



export const Home = () => {
  const { store, actions } = useContext(Context);
  console.log("User is auth:", store.auth);
  return (
    <>


      {/* <Slogan /> */}
      <LitlleSlide />
      <FilterMenu />
      <PubSlide />
      <HomeOfferCard />
      <HomeReviewCard />
      <GeneralInfoDiv />
      <DonationForm />
      {/* <AboutUs /> */}

    </>
  );
};
