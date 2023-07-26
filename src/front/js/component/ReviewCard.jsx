import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../store/appContext";

const ReviewCard = () => {
    const { store, actions } = useContext(Context);
    const [formData, setFormData] = useState({
        title: "",
        comment_text: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        actions.create_review(formData);
    };

    const handleLike = (reviewId) => {
        actions.incrementLikes(reviewId);
    };

    useEffect(() => {
        actions.getReviews();
    }, [actions]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="comment_text">Comment:</label>
                    <textarea id="comment_text" name="comment_text" value={formData.comment_text} onChange={handleChange}></textarea>
                </div>
                <button type="submit">Submit Review</button>
            </form>

            {/* Publicar las cartas que ya existen */}
            {store.reviews.map((review) => (
                <div key={review.id} className="card bg-dark text-white mt-4 container" style={{ height: "16rem", width: "20rem" }}>
                    <div className="card-img-overlay">
                        <h5 className="card-title">{review.title}</h5>
                        <p className="card-text">{review.comment_text}</p>
                        <p className="card-text">Likes: {review.likes}</p>
                        <button onClick={() => handleLike(review.id)}>Like</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ReviewCard;
