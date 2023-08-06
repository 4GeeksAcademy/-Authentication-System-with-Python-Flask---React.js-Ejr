import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
library.add(faHeart);

const FavoriteReview = ({ reviewId }) => {
  const { store, actions } = useContext(Context);
  const [favorites, setFavorites] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      const favorites = await actions.getFavoriteReview();
      if (favorites !== null) {
        setFavorites(store.favorites.map((favorite) => favorite.review_id));
        setIsFavorite(store.favorites.some((favorite) => favorite.review_id === reviewId));
      }
    };
    checkFavoriteStatus();
  }, [reviewId]);

  const handleAddToFavorite = async () => {
    if (!isFavorite) {
      await actions.addFavoriteReview(reviewId);
      setIsFavorite(true);
      setFavorites([...favorites, reviewId]);
    }
  };

  return (
    <div>
      <span onClick={handleAddToFavorite}>
        <FontAwesomeIcon icon={faHeart} size="lg" color={isFavorite ? "red" : "black"} />
      </span>
    </div>
  );
};

export default FavoriteReview;

