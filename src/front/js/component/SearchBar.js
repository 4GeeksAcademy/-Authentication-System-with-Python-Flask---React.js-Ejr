import React, { useState, useContext, useEffect } from 'react'
import {Context} from "../store/appContext"
import "../../styles/searchbar.css"


const SearchBar = () => {
  const { store, actions } = useContext(Context)
  const [ inputValue, setInputValue ] = useState("")
  const [ check, setChecked] = useState([])
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

// FILTERING ITEMS 
  const filterSelection = (event) => {
    let updatedList = [...check]
    if (event.target.check) {
      updatedList = [...check, event.target.value]
    } else {
      setChecked(updatedList)
    }
  }
  console.log(showDropdown)
  return (
    <div className="parentDiv">
          <form>
            <div className='searchBarContainer'>
              <div>
                <input
                placeholder='Search for a Car'
                value={inputValue}
                onChange={(e) => handleSearch(e)}
                onFocus={() => setShowDropdown(true)}
                // onBlur={() => setShowDropdown(false)}
                className='searchBar'/>
              </div>                
              {showDropdown && filteredCars.length > 0 && (
              <div className='custom-dropdown'>
                {filteredCars.map((car, index) => (
                  <div className='carsDiv'>
                    <div className="carNames" key={index} value={car}>
                      {car}
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
        <div className="dropdown">
          <div className='filterButtonContainer'>
            <button className="btn btn-secondary dropdown-toggle filterButton" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Filters
            </button>
          </div>
          <div className="dropdown-menu">
              <div>
                <p>Price Range</p>
              </div>
              <div className='listGroupContainer'>
                  <p>Car Type</p>
                  {store.cars.map((item, index) => {
                    return (
                      <div key={index}>
                        <input
                        type='checkbox'
                        value={item.car_type}
                        onClick={(e) => filterSelection(e)}/>
                        {item.car_type}
                      </div>
                    )
                    })}
              </div>     
          </div>
       </div>
    </div>
  )
}

export default SearchBar