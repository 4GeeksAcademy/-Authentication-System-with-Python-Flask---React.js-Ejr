import React, { useState, useContext, useEffect } from 'react'
import {Context} from "../store/appContext"


const SearchBar = () => {
  const { store, actions } = useContext(Context)
  const [ inputValue, setInputValue ] = useState("")




  const cars = store.cars
  
// MAPPING CARS ARRAY TO GET JUST THE NAMES
  const carNames = cars.map((car) => car.car_name)

// FILTERING CAR NAMES ARRAY TO FILTER THE ONE THAT MATCHES INPUTVALUE
  const filteredCars = carNames.filter((car) => car.toLowerCase().includes(inputValue.toLowerCase())
  );

// SETTING INPUT VALUE
  const handleSearch = (e) => {
    e.preventDefault()
    setInputValue(e.target.value)
  }


  
  return (
    <div>
        <form>
          <input
          placeholder='Search for a Car'
          value={inputValue}
          list='cars-list'
          onChange={(e) => handleSearch(e)}/>
          <datalist id='cars-list'>
            {filteredCars.length > 0 && filteredCars.map((car, index) => (
              <option key={index} value={car}>
                {car}
              </option>
            ))}
          </datalist>
        </form>
    </div>
  )
}

export default SearchBar