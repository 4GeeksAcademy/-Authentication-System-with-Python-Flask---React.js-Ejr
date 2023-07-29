import React, {useContext, useEffect, useState} from 'react';
import { Context } from '../store/appContext';

const ReviewCard = () => {
    const {store, actions} = useContext(Context);

    

    return (
        <div className="card bg-dark text-white mt-4 container" style={{ height: "16rem", width: "20rem" }}>
            <img src="..." className="card-img" alt="..."></img>
            <div className="card-img-overlay">
                <h5 className="card-title">{}</h5>
                <p className="card-text">{}</p>
                <p className="card-text">Last updated 3 mins ago</p>
            </div>
        </div>
    )
}

export default ReviewCard