import React, { useState, useContext, useEffect } from 'react'
import {Context} from "../store/appContext"
import "../../styles/searchbar.css"


const SearchBar = () => {
  const { store, actions } = useContext(Context)
  const [ inputValue, setInputValue ] = useState("")
  const [ check, setChecked] = useState([])




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

  const checkedItems = check.length
  ? check.reduce((total, item) => {
      return total + ", " + item;
    })
  : "";

  console.log("CHECKED VARIABLE:",check)
  return (
    <div className="parentDiv">
       <div>
          <form>
            <div className='searchBarContainer'>
              <input
              placeholder='Search for a Car'
              value={inputValue}
              list='cars-list'
              onChange={(e) => handleSearch(e)}
              className='searchBar'/>
              <datalist id='cars-list'>
                {filteredCars.length > 0 && filteredCars.map((car, index) => (
                  <option key={index} value={car}>
                    {car}
                  </option>
                ))}
              </datalist>
            </div>
          </form>
        </div>
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
                <ul className="list-group">
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
                </ul>
              </div>     
          </div>
       </div>
    </div>
  )
}

export default SearchBar