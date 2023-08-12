import React, { useContext, useEffect, useLayoutEffect } from 'react';
import { Context } from '../store/appContext';
import useReviewManagement from "../hooks/useReviewManagement";
import Likes from './Likes';
import FavoriteReview from './FavoriteReview';

const AllFavoritesReviews = ({ searchQuery }) => {
  const { store, actions } = useContext(Context)
  const { handleUpdate, handleSave, handleDelete, favorites, reviews, editContent, editContentId, editTitle, handleEditContent } = useReviewManagement();
  useLayoutEffect(() => {
    actions.getFavoriteReview()
  }, [])
  return (
    <div>
      {/* Publicar las cartas que ya existen */}
      <div className="cards-review">
        {store.favorites && store.favorites.length >= 1 && store.favorites
          .filter(
            (favorite) =>
              favorite.reviews.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              favorite.reviews.comment_text
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
          )
          .sort((a, b) => b.id - a.id)
          .map((favorite) => (
            <div
              key={favorite.reviews.id}
              className="card card-review text-white mt-4 container"
              style={{ height: "16rem", width: "20rem" }}
            >
              <img src={review.review_image} className="card-img-top" alt="..."></img>
              <div className="div-title-review">
                {editContentId === favorite.reviews.id ? (
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => handleEditContent(e.target.value)}
                  />
                ) : (
                  <h5 className="card-title title-review">{favorite.reviews.title}</h5>
                )}
              </div>
              {editContentId === favorite.reviews.id ? (
                <>
                  <div className="comment-review">
                    <textarea
                      autoFocus={true}
                      value={editContent}
                      onChange={(e) => handleEditContent(e.target.value)}
                      rows="7"
                      cols="38"
                      maxLength="300"
                      style={{ resize: "none" }}
                    ></textarea>
                  </div>
                  <button onClick={() => handleSave(favorite.reviews.id)}>Validar</button>
                </>
              ) : (
                <p className="card-text">{favorite.reviews.comment_text}</p>
              )}
              {store.user.id === favorite.user_id && (
                <div className="btn-options d-flex justify-content-end">
                  <button
                    className="btn-up-review"
                    onClick={() => handleUpdate(favorite.reviews.id)}
                  >
                    &#9998;
                  </button>
                  <button
                    className="btn-delete-review"
                    onClick={() => handleDelete(favorite.reviews.id)}
                  >
                    &#10008;
                  </button>
                </div>
              )}
              <div className="likes card-likes">
                <span className="author-review">
                  Escrito por : <span>{favorite.reviews.user.username}</span>{" "}
                </span>
                <FavoriteReview reviewId={favorite.reviews.id} />
                <Likes reviewId={favorite.reviews.id} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default AllFavoritesReviews;