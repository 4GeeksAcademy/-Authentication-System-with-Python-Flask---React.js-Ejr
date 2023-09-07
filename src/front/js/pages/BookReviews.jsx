import React from 'react'
import Testimonio from '../components/reviews/Testimonio'
import '../styles/bookReviews.css'
import Card from '../components/reviews/Card'

const BookReviews = () => {
  return (
    <div className="div row m-3 mt-4">
      <div className="col-md-6 d-flex justify-content-center text-center">
        <Card />
      </div>
      <div className="col-md-6 d-flex justify-content-start text-center">
        <div className="row pe-5">
          <Testimonio />
          <Testimonio />
          <Testimonio />
          <Testimonio />
        </div>
      </div>
    </div>
  )
}

export default BookReviews