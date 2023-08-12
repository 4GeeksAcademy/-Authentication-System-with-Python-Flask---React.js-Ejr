import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
library.add(faHeart);

const FavoriteOffer = ({offerId}) => {
    const { store, actions } = useContext(Context);

    const handleAddToFavorite = async () => {
      await actions.addFavoriteOffer(offerId);
    };
  
    // const handleDeleteFavorite = async () => {
    //   await actions.deleteFavoriteReview(reviewId)
    // }
  
    return (
      <div>
        <span onClick={handleAddToFavorite}>
          <FontAwesomeIcon icon={faHeart} size="lg" />
        </span>
      </div>
    );
  };

export default FavoriteOffer