import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext.js';
import { useParams } from 'react-router-dom';

const SingleReviewView = () => {





    useEffect(() => {
        const loadData = async () => {
            setOffer(await actions.getReviewById(params.review_id));
        }
        loadData()
        console.log("Fetch for all reviews in single review view is working");
    }, []); 
  return (
    <div>
        

    </div>
  )
}

export default SingleReviewView