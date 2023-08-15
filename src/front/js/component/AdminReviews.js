import React, { useContext, useEffect } from 'react';
import { Context } from '../store/appContext';

const AdminReviews = () => {
  const { store, actions } = useContext(Context)


  const handleDeleteReview = (reviewId) => {
    actions.deleteReview(reviewId);
    window.location.reload()
  };
  return (
    <div className='admin-review-content'>
      <h2 className='text-center'>Lista de reseñas:</h2>
      <div className='d-flex content-infos'>
        {store.reviews.map(review => (
          <div key={review.id} className="infos-users">
            <button onClick={() => handleDeleteReview(review.id)}>&#10008;</button>
            <p>ID reseña: <span>{review.id}</span> </p>
            <p>Título de la reseña: <span>{review.title}</span></p>
            <p>Comentario: <span>{review.comment_text}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminReviews;