import { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
const { store, actions } = useContext(Context);


import "../../styles/ratingform.css";

const RatingForm = () => {
  const [rating, setRating] = useState(0);
  const [opinion, setOpinion] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();

    // Assuming you have access to the bookId from the page or via props
    const bookId = props.bookId;

    actions.submitReview(bookId, rating, opinion);
  };

  return (
    <form onSubmit={handleSubmit} className="rating-form">
      <RatingForm bookId={someBookId} />
      <div className="star-rating mb-3">
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;
          return (
            <label key={i} className="btn btn-outline-primary">
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                className="form-check-input me-2"
                onClick={() => setRating(ratingValue)}
              />
              <i className={`fa${ratingValue <= rating ? 's' : 'r'} fa-star`}></i>
            </label>
          );
        })}
      </div>
      <div className="mb-3">
        <textarea
          className="form-control"
          rows="4"
          placeholder="Write your opinion here..."
          value={opinion}
          onChange={(e) => setOpinion(e.target.value)}
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
};

export default RatingForm;