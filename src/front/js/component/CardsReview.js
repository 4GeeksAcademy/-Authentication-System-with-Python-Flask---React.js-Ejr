import React, { useContext } from "react";
import { Context } from "../store/appContext";
import Likes from "./Likes";
import useReviewManagement from "../hooks/useReviewManagement";
import FavoriteReview from "./FavoriteReview";

const CardsReview = ({ searchQuery }) => {
  const { store, actions } = useContext(Context)
  const { handleUpdate, handleSave, handleDelete, reviews, editContent, editContentId, editTitle, handleEditContent } = useReviewManagement();


  return (
    <div>
      {/* Publicar las cartas que ya existen */}
      <div className="cards-review">
        {store.reviews
          .filter(
            (review) =>
              review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              review.comment_text
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
          )
          .sort((a, b) => b.id - a.id)
          .map((review) => (
            <div
              key={review.id}
              className="card card-review text-white mt-4 container"
              style={{ height: "16rem", width: "20rem" }}
            >
              <div className="div-title-review">
                {editContentId === review.id ? (
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => handleEditContent(e.target.value)}
                  />
                ) : (
                  <h5 className="card-title title-review">{review.title}</h5>
                )}
              </div>
              {editContentId === review.id ? (
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
                  <button onClick={() => handleSave(review.id)}>Validar</button>
                </>
              ) : (
                <p className="card-text">{review.comment_text}</p>
              )}

              {store.user.id === review.user.id && (
         
                <div className="btn-options d-flex justify-content-end">
                  <button
                    className="btn-up-review"
                    onClick={() => handleUpdate(review.id)}
                  >
                    &#9998;
                  </button>
                  <button
                    className="btn-delete-review"
                    onClick={() => handleDelete(review.id)}
                  >
                    &#10008;
                  </button>
                </div>
              )}
              <div className="likes card-likes">
                <span className="author-review">
                  Escrito por : <span>{review.user.username}</span>{" "}
                </span>
                <FavoriteReview reviewId={review.id} />
                <Likes reviewId={review.id} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CardsReview;
