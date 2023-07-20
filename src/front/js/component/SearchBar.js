import React, { useState, useContext, useEffect } from 'react'
import {Context} from "../store/appContext"
import "../../styles/searchbar.css"
import Filters from './FilterModal/Filters'

const SearchBar = () => {
  const { store, actions } = useContext(Context)
  const [ inputValue, setInputValue ] = useState("")
  const [ showDropdown, setShowDropdown] = useState(false)
  


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
                {filteredCars.map((car, index) => (
                  <div className='carsDiv'>
                    <div className="carNames" key={index} value={car}>
                      <h4 key={index}>{car}</h4>
                    </div>
                    <div className='imagesDiv'>

                      {/* NEED TO IMPLEMENT THE LOGIC TO GET THE IMAGES FROM DATABASE */}

                      <img className="carImage" src='https://hips.hearstapps.com/hmg-prod/images/2023-nissan-altima-113-1654783718.jpg?crop=0.712xw:0.535xh;0.132xw,0.347xh&resize=1200:*'/>
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