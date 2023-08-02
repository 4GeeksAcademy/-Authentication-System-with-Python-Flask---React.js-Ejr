import React, { useContext } from 'react'
import { Context } from '../store/appContext'
import "../../styles/cardata.css"
import { useParams } from 'react-router-dom'
const AboutCar = () => {
  let{theid}= useParams()
    const {store} = useContext(Context)
    const actualCar = store.cars[parseInt(theid)-1]
    console.log(actualCar)
  return (
    <div>
        <div className="container">
        <div className="row mb-4">
          <div className="col-5 carFormatted">
          <h1>{actualCar && actualCar.car_name}</h1>
          <h1>{actualCar && actualCar.car_type}</h1>
          <h1>{actualCar && actualCar.brand}</h1>
          <h1>{actualCar && actualCar.transmission}</h1>
          {actualCar && actualCar.images && actualCar.images.length > 0 ? (
              <img
                className="border border-warning border-4 border-opacity-50 w-50"
                src={actualCar.images[0].image_url}
                alt="Car"
              />
            ) : (
              <h1>Loading</h1>
            )}
          </div>
          </div>
          </div>      
    </div>
  

        )}
export default AboutCar;