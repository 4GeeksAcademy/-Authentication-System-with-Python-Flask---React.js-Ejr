import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";

const CardsReview = () => {
  const { store, actions } = useContext(Context);
  const [formData, setFormData] = useState({
    title: "",
    comment_text: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    actions.create_review(formData);
  };

  const handleUpdate = (id) => {
    // Find the review in the store by its id
    const reviewToUpdate = store.reviews.find((review) => review.id === id);
    if (reviewToUpdate) {
      // Update the formData state with the review's data to populate the form
      setFormData({
        title: reviewToUpdate.title,
        comment_text: reviewToUpdate.comment_text,
      });
    }
    console.log('click up')
  };
  const handleDelete = (id) => {
    actions.deleteReview(id);
    console.log('click delete');
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
        <div
          key={review.id}
          className="card card-review text-white mt-4 container"
          style={{ height: "16rem", width: "20rem" }}
        >
          {store.user.id === review.user.id ? (
            <div className="btn-options d-flex justify-content-end">
              <button onClick={() => handleUpdate(review.id)}>&#9998;</button>
              <button onClick={() => handleDelete(review.id)}>&#10008;</button>
            </div>
          ) : null}
          <div className="card-img-overlay">
            <h5 className="card-title">{review.title}</h5>
            <p className="card-text">{review.comment_text}</p>
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
