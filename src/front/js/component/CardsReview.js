import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";

const CardsReview = () => {
  const { store, actions } = useContext(Context);
  const [editContent, setEditContent] = useState(store.review ? store.review.comment_text : "");
  const [formData, setFormData] = useState({ title: "", comment_text: "" });
  const [editToggle, setEditToggle] = useState(false);

  const handleEdit = (e) => {
    e.preventDefault();
    setEditToggle(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    actions.create_review(formData);
  };

  const handleUpdate = (id) => {
    const reviewToUpdate = store.reviews.find((review) => review.id === id);
    if (reviewToUpdate) {
      setEditContent(reviewToUpdate.comment_text);
      setEditToggle(true);
    }
  };

  const handleSave = (id) => {
    const reviewToUpdate = store.reviews.find((review) => review.id === id);
    if (reviewToUpdate) {
      // Mettez à jour le contenu de la carte review avec le nouveau contenu édité
      reviewToUpdate.comment_text = editContent;
      setEditToggle(false); // Désactivez le mode édition
    }
  };

  const handleDelete = (id) => {
    actions.deleteReview(id);
    window.location.reload();
  };

  // const handleLike = (reviewId) => {
  //   actions.incrementLikes(reviewId);
  // };

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
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="comment_text">Comment:</label>
              <textarea
                id="comment_text"
                name="comment_text"
                value={formData.comment_text}
                onChange={handleChange}
              ></textarea>
            </div>
            <button type="submit">Submit Review</button>
          </form>
        </div>
      ) : null}

      {/* Publicar las cartas que ya existen */}
      {store.reviews.map((review) => (
  <div key={review.id} className="card card-review text-white mt-4 container" style={{ height: "16rem", width: "20rem" }}>
    <div className="card-img-overlay">
      {store.user.id === review.user.id ? (
        <div className="btn-options d-flex justify-content-end">
          <button onClick={() => handleUpdate(review.id)}>&#9998;</button>
          <button onClick={() => handleDelete(review.id)}>&#10008;</button>
        </div>
      ) : null}

      <h5 className="card-title">{review.title}</h5>
      
      {editToggle ? (
        <>
        <textarea
          autoFocus={true}
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          className="card-text"
          ></textarea>
        <button onClick={() => handleSave(review.id)}>Valider</button>
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
  );
};

export default CardsReview;
