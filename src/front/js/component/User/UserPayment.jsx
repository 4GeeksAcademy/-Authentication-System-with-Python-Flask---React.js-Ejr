import React from 'react'

export const UserPayment = () => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">Payment History</p>
                <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
      </div>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_K-zeDxFGt2zBMneewpcC11klFh8_LTb-jfNqOW_sqoY3vtZWmrL1NXj0MkwCcOkntQk&usqp=CAU" className="card-img-bottom" alt="My payments" />
    </div>
  )
}

