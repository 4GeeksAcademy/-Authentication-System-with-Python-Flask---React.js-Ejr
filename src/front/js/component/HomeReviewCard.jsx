import React, { useContext, useEffect } from 'react';
import { Context } from '../store/appContext';
import { Link } from 'react-router-dom';
import FavoriteReview from './FavoriteReview';

const HomeReviewCard = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getReviews();
        console.log("Fetch for all reviews is working")
    }, []);

    return (
        <div>
            {/* <div>
                <h1><strong>Lo que más gustó a otros clientes:</strong> revisa las últimas reseñas</h1>
            </div> */}

            <div className='homeReviewCard'>

                {store.reviews
                    .slice(0, 10)
                    .map((review) =>
                        <div key={review.id} className="card-home-review"  >
                            <div className='nothing'></div>
                            <div>
                                <span className='fav-home-review'>
                                    <FavoriteReview />
                                </span>
                            </div>
                            <div className='content-link'>
                                <Link to={`/review/${review.id}`} >
                                    <div className="card img-home-review d-flex" >
                                        <img src={review.review_image} className="card-img" alt="..." ></img>
                                    </div>
                                    <div className="title-home-review">
                                        <div>
                                            <h5 className="card-title break-word">"{review.title}"</h5>
                                        </div>
                                        <p className='author-review'>por <span>
                                            {review.user.username}</span> </p>
                                    </div>

                                </Link>
                            </div>
                        </div>
                    )}
            </div>

        </div >

    );
};

export default HomeReviewCard;

