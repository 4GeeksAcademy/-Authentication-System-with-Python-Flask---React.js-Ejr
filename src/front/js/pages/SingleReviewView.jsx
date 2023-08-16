import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext.js';
import { useParams } from 'react-router-dom';

const SingleReviewView = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const [review, setReview] = useState({})





  useEffect(() => {
    const loadData = async () => {
      setReview(await actions.getReviewById(params.review_id));
    }
    loadData()
    console.log("Fetch for all reviews in single review view is working");
  }, []);
  return (
    <div>
      <h1>{review?.title}</h1>
      <p>{review?.comment_text}</p>
      <img src={review?.review_image} alt="" />

    </div>
  )
}

export default SingleReviewView