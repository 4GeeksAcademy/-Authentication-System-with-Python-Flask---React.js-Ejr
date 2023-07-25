import React, { useContext, useState } from 'react'
import { Context } from '../store/appContext'
import { useNavigate } from 'react-router-dom'
import "../../styles/cardata.css"

const CarCards = ({cars}) => {
  const {store, actions} = useContext(Context)
  const navigate = useNavigate()
  const [isLimit, setIsLimit] = useState(false)

  const handleClick = (e, carId) => {
    actions.singleCar(carId)
    e.preventDefault()
    navigate("/about/" + carId)
  }

  return (
    <div style={{"display": "flex", "justifyContent": "space-between"}}>
    {cars.map((car, index) => {
        return (
            <div className="card bg bg-white d-flex">
            <img
              src={car.images[0].image_url}
              className="card-img-top"
              alt="..."
              style={{ width: "60%", height: "auto", borderRadius: "5px" }}
            />
            <div className="card-body d-flex">
                <div key={index}>     
                  <h5 className="card-title carFormatted">Model: {car.car_name}</h5>
                  <p className="card-text carFormatted">Make: {car.brand}</p>
                  <p className="card-text carFormatted">Car Type: {car.car_type}</p>
                  <p className="card-text carFormatted">Engine: {car.engine}</p>
                  <p className="card-text carFormatted">Transmission: {car.transmission}</p>
                  <div className="buttonContainer">
                      <button href="#" className="btn btn-danger"
                      onClick={(e) => {handleClick(e, car.id)}}>
                        Detailed Specs
                      </button>
                    <button
                      className="favoritesCards">
                      <div
                      style={{ marginLeft: "10px" }}
                      onClick={() => actions.saveFavorites(car)}
                      >
                        Save<i className="fa-solid fa-star" style={{ color: "#ffd43b" }}></i>
                      </div>
                    </button>
                    <button>
                      <div 
                      onClick={() => {
                        if (store.compareCars.includes(car)) {
                          return alert("Car already added")
                        } else {
                          actions.addCarToCompare(car);
                        }
                        }}>
                        Add to compare
                      </div>
                    </button>
                    <button>
                        <div
                        onClick={() => {
                          if (store.compareCars.length < 1) {
                            return alert("No more cars to delete")
                          } else {
                            actions.deleteCarToCompare(car);
                          }
                          }}>
                          Delete from compare</div>
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