import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import PubSlide from "../component/PubSlide";
import HomeOfferCard from "../component/HomeOfferCard.jsx";
import HomeReviewCard from "../component/HomeReviewCard.jsx";
import FilterMenu from "../component/FilterMenu";
import AboutUs from "../component/AboutUs";
import Slogan from "../component/Slogan";

export const Home = () => {
  const { store, actions } = useContext(Context);
  console.log("User is auth:", store.auth);
  return (
    <>
      <Slogan />
      <FilterMenu />
      <PubSlide />
      <HomeReviewCard />
      <HomeOfferCard />
      <AboutUs />
    </>
  );
};
