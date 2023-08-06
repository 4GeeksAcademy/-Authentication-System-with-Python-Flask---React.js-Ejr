import React from 'react';
import CardsReview from './CardsReview';
import FavoritesReviews from './FavoritesReviews';
import MyReviews from './MyReviews';


const MenuReviews = ({ searchQuery }) => {
  return (
    <div className='container mt-5'>
      <ul className="nav nav-tabs justify-content-center" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Todas las reseñas</button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Mis reseñas</button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Reseñas favoritas</button>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab"><CardsReview searchQuery={searchQuery} /></div>
        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab"><MyReviews /></div>
        <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab"><FavoritesReviews /></div>
      </div>

    </div>
  );
};

export default MenuReviews;