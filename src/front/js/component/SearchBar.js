import React, { useState, useContext, useEffect } from 'react'
import {Context} from "../store/appContext"
import "../../styles/searchbar.css"
import Filters from './FilterModal/Filters'

const SearchBar = () => {
  const { store, actions } = useContext(Context)
  const [ inputValue, setInputValue ] = useState("")
  const [ showDropdown, setShowDropdown] = useState(false)
  


  const cars = store.cars
  

// FILTERING CAR NAMES ARRAY TO FILTER THE ONE THAT MATCHES INPUTVALUE
  const filteredCars = cars.filter((car) => car.car_name.toLowerCase().includes(inputValue.toLowerCase())
  );

// SETTING INPUT VALUE
  const handleSearch = (e) => {
    e.preventDefault()
    setInputValue(e.target.value)
  }



  return (
    <div className="parentDiv">
          <form>
            <div className='searchBarContainer'>
              <div className='inputContainer'>
                <input
                placeholder='       Search for a Car'
                value={inputValue}
                onChange={(e) => handleSearch(e)}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setShowDropdown(false)}
                className='searchBar'/>
              </div>                
              {showDropdown && filteredCars.length > 0 && (
              <div className='custom-dropdown'>
                {filteredCars.map((car, index) =>
                (
                  <div className='carsDiv'>
                    <div className="carNames" key={index} value={car.car_name}>
                      <h4 key={index}>{car.car_name}</h4>
                    </div>
                    <div className='imagesDiv' style={{"width": "44rem", "height": "auto"}}>

                      <img className="rounded w-100" src={car.images[0].image_url }/>
                  </div>
                  </div>
                ))}
              </div>
             )}
            </div>
          </form> 
    </div>
  )
}

export default SearchBar;