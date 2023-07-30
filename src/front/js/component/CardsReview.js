import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";

const CardsReview = ({ searchQuery }) => {
  const { store, actions } = useContext(Context);
  const [editContentId, setEditContentId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [formData, setFormData] = useState({ title: "", comment_text: "" });

  const filteredReviews = store.reviews.filter(
    (review) =>
      review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.comment_text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    actions.create_review(formData);
    setFormData({ title: "", comment_text: "" });
  };

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

  useEffect(() => {
    actions.getReviews();
    console.log("test");
  }, []);

  return (
    <div>
      {store.auth ? (
        <div className="form-review-content">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title">Titutlo:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="comment_text">Commentario:</label>
              <textarea
                id="comment_text"
                name="comment_text"
                value={formData.comment_text}
                onChange={handleChange}
              ></textarea>
            </div>
            <button type="submit">Enviar reseña</button>
          </form>
        </div>
      ) : null}

      {/* Publicar las cartas que ya existen */}
      <div className="cards-review">
        {filteredReviews
          .sort((a, b) => b.id - a.id)
          .map((review) => (
            <div key={review.id} className="card card-review text-white mt-4 container" style={{ height: "16rem", width: "20rem" }}>
            <div className="card-img-overlay">
              {store.user.id === review.user.id ? (
                <div className="btn-options d-flex justify-content-end">
                  <button onClick={() => handleUpdate(review.id)}>&#9998;</button>
                  <button onClick={() => handleDelete(review.id)}>&#10008;</button>
                </div>
              ) : null}
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
                    maxLength="150"
                    style={{ resize: "none" }}
                  ></textarea>
                  <button onClick={() => handleSave(review.id)}>Validar</button>
                </>
              ) : (
                <p className="card-text">{review.comment_text}</p>
              )}
              <span>Mensaje escrito por: {review.user.username}</span>
              {/* <p className="card-text">Likes: {review.likes}</p>
              <button onClick={() => handleLike(review.id)}>Like</button> */}
            </div>
          </div>
      ))}
      </div>
    </div>
  );
};

export default CardsReview;