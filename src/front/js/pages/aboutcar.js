import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../store/appContext'
import "../../styles/cardata.css"
<<<<<<< HEAD

=======
>>>>>>> 58ec331ca2fb036e34ce956e37f931c108dc1321


const AboutCar = () => {
    const [rating, setRating] = useState('')
    const [reviewText, setReviewText] = useState('')
    const {store, actions} = useContext(Context)
    const token = localStorage.getItem("token")
    const actualCar = store.singleCar
    let counter = 0


    useEffect(() => {
      actions.getCarReviews(actualCar.id)
    }, [actualCar, reviewText])

    const handleSubmit = (e) => {
      if (token) {
        e.preventDefault()
        actions.createReview(rating, reviewText, actualCar.id)
        console.log('Rating:', rating, 'Review Text: ',reviewText, "car id: ", actualCar.id)
        setRating('')
        setReviewText('')
        } else alert("Log in to create a review")
    }


  return (
    <div className='bg bg-secondary'>
        <div className="container">
          <div className="row mb-4 justify-content-between">
            <div className="col-5 carFormatted">
              <section className='bg-dark text-light mt-2 p-2 rounded'>
                <h3 style={{ color: "rgb(108,117,125)" }}>Model</h3>
                <h5>{actualCar && actualCar.car_name}</h5>
              </section>
              <section className='bg-dark text-light mt-2 p-2 rounded'>
                <h3 style={{ color: "rgb(108,117,125)" }}>Make</h3>
                <h5>{actualCar && actualCar.brand}</h5>
              </section>
              <section className='bg-dark text-light mt-2 p-2 rounded'>
                <h3 style={{ color: "rgb(108,117,125)" }}>Car Type</h3>
                <h5>{actualCar && actualCar.car_type}</h5>
              </section>
              <section className='bg-dark text-light mt-2 p-2 rounded'>
                <h3 style={{ color: "rgb(108,117,125)" }}>Transmission</h3>
                <h5>{actualCar && actualCar.transmission}</h5>
              </section>
              <section className='bg-dark text-light my-2 p-2 rounded'>
                <h3 style={{ color: "rgb(108,117,125)" }}>MSRP</h3>
                <h5>{actualCar && actualCar.price}</h5>
              </section>          
          </div>
            {actualCar && actualCar.images && actualCar.images.length > 0 ? (
              
              actualCar.images.map(({ index, image_url }) => {
                counter++;

                return (
                    <img
                      key={index}
                      className="border border-opacity-50 mt-2 rounded"
                      src={image_url}
                      alt="Car"
                      style={{width: counter === 1 ? "57%" : "100%", height: "auto", objectFit: "fill", padding: "0" }}
                    />
                );
              })
              ) : (
              <h1>Loading</h1>
              )}
        </div>
        <div className='reviewContainer' style={{background: '#212529', width: "101%"}}>
          <div className='border text-center border-light-subtle'>
            <h1 style={{color: '#60757d'}}>Car Reviews</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input
                placeholder='Rating from 1 to 5'
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                />
                <input
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder='Review Text'
                />
                <button className="btn btn-success" type="submit">Submit Review</button>
            </form>
          </div>
          <div>
            {store.carReviews.map((car, index) => {
              return (
                <div className="ps-4 pt-3 border border-top-0" key={index} style={{color: '#60757d'}}>
                  <h4>User: {car.user}</h4>
                  <div className='d-flex' key={index}>
                    <p className='me-4'><strong>{car.rating}</strong><i className="fa-solid fa-star" style={{ color: "#ffd43b" }}></i></p>
                    <p>{car.review_text}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>      
    </div>
  );
};
export default AboutCar;