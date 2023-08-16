import React, { useContext, useEffect } from 'react';
import { Context } from '../store/appContext';
import { Link } from 'react-router-dom';

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
                        <div key={review.id} className="card-home-review" style={{ maxWidth: "400px", maxHeight: "500px" }} >
                            <Link to={`/review/${review.id}`} >

                                <div className="card bg-dark text-white my-4" style={{ height: "16rem", width: "20rem" }}>
                                    <img src={review.review_image} className="card-img" alt="..." style={{ maxWidth: "400px", maxHeight: "200px" }}></img>
                                    <div className="card-img-overlay">
                                        <h5 className="card-title">"{review.title}"</h5>
                                        <p className="card-text">{review.comment_text}</p>
                                        <p>By {review.user.username}</p>
                                        {/* <p className="card-text">Last updated 3 mins ago</p> */}
                                    </div>
                                    </div>
                            </Link>
                        </div>
                )}
            </div>

        </div >

    );
};

export default HomeReviewCard;

