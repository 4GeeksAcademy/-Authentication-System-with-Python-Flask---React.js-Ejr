import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import FormReview from "./FormReview";
import GooglePay from "./GooglePay";

const CardsReview = ({ searchQuery }) => {
  const { store, actions } = useContext(Context);
  const [editContentId, setEditContentId] = useState(null);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    actions.getReviews();
    console.log("test");
  }, []);

  const handleUpdate = (id) => {
    const reviewToUpdate = store.reviews.find((review) => review.id === id);
    if (reviewToUpdate) {
      setEditContent(reviewToUpdate.comment_text);
      setEditContentId(id);
    }
  };

  const handleSave = (id) => {
    const reviewToUpdate = store.reviews.find((review) => review.id === id);
    if (reviewToUpdate) {
      reviewToUpdate.comment_text = editContent;
      setEditContent("");
      setEditContentId(null);
    }
  };

  const handleDelete = (id) => {
    actions.deleteReview(id);
    window.location.reload();
  };

  return (
    <div>
      {/* Mostrar el form de creación de reseñas sólo si el usuario está logueado */}
      {store.auth ? (<FormReview />) : null}
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
              <div className="card-img-overlay">
                {store.user.id === review.user.id && (
                  <div className="btn-options d-flex justify-content-end">
                    <button onClick={() => handleUpdate(review.id)}>
                      &#9998;
                    </button>
                    <button onClick={() => handleDelete(review.id)}>
                      &#10008;
                    </button>
                  </div>
                )}
                <h5 className="card-title">{review.title}</h5>
                {editContentId === review.id ? (
                  <>
                    <textarea
                      autoFocus={true}
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="card-text"
                      rows="4"
                      cols="30"
                      maxLength="300"
                      style={{ resize: "none" }}
                    ></textarea>
                    <button onClick={() => handleSave(review.id)}>
                      Validar
                    </button>
                  </>
                ) : (
                  <p className="card-text">{review.comment_text}</p>
                )}
                <span>Mensaje escrito por: {review.user.username}</span>
                <GooglePay />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CardsReview;
