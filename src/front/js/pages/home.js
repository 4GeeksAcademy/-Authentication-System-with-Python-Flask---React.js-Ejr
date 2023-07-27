import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import PubSlide from "../component/PubSlide";
import OfferCard from "../component/OfferCard.jsx";
import ReviewCard from "../component/ReviewCard.jsx";
import FilterMenu from "../component/FilterMenu";

export const Home = () => {
  const { store, actions } = useContext(Context);
  console.log(store.auth);
  return (
    <>
      <FilterMenu />
        <PubSlide />
        <ReviewCard />
        <OfferCard />
      
    </>
  );
};
