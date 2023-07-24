import React, { useContext } from 'react'
import { Context } from '../store/appContext'
import { useNavigate } from 'react-router-dom'

const CarCards = ({cars}) => {
  const {actions} = useContext(Context)
  const navigate = useNavigate()

  const handleClick = (e, carId) => {
    actions.singleCar(carId)
    e.preventDefault()
    navigate("/about/" + carId)
  }

  return (
    <div>
    {cars.map((car, index) => {
        return (
            <div className="card bg bg-white">
            <img
              src={car.images[0].image_url}
              className="card-img-top"
              alt="..."
              style={{ width: "60%", height: "auto", borderRadius: "5px" }}
            />
            <div className="card-body">
                <div key={index}>     
                  <h5 className="card-title">Model: {car.car_name}</h5>
                  <p className="card-text">Make: {car.brand}</p>
                  <p className="card-text">Car Type: {car.car_type}</p>
                  <p className="card-text">Engine: {car.engine}</p>
                  <p className="card-text">Transmission: {car.transmission}</p>
                  <div className="buttonContainer">
                      <button href="#" className="btn btn-danger"
                      onClick={(e) => handleClick(e, car.id)}>
                        Detailed Specs
                      </button>
                    <button
                      className="favoritesCards">
                      <div style={{ marginLeft: "10px" }}>
                        Save<i className="fa-solid fa-star" style={{ color: "#ffd43b" }}></i>
                      </div>
                    </button>
                  </div>
                </div>
            </div>
          </div>
        )
    })}
    </div>
  )
}

export default CarCards