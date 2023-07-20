import React, { useState, useContext, useEffect } from 'react'
import {Context} from "../store/appContext"
import "../../styles/searchbar.css"
import Filters from './Filters'

const SearchBar = () => {
  const { store, actions } = useContext(Context)
  const [ inputValue, setInputValue ] = useState("")
  const [ showDropdown, setShowDropdown] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);


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

  const handleOpenModal = (e) => {
    e.preventDefault();
    console.log('Opening the modal...');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    console.log('Closing the modal...');
    setIsModalOpen(false);
  };
  const handleApplyFilters = (selectedFilters, priceRange) => {
    // Handle the selected filters and price range here (e.g., perform search based on filters)
    console.log('Selected Filters:', selectedFilters);
    console.log('Price Range:', priceRange);
    handleCloseModal();
  };

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
                onBlur={() => setShowDropdown(false)}
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
              <button onClick={(e) => handleOpenModal(e)}>Open Filter Modal</button>
              <Filters isOpen={isModalOpen} onClose={ handleCloseModal} onApplyFilters={handleApplyFilters}>
                {/* Your filter options go here */}
                {/* For example: */}
                {/* <p>Filter by Model, Type, Engine, Transmission, and Price</p>
                <p>price</p>
                {/* Add checkboxes, range input, etc. for filter options */}
                <button onClick={ handleCloseModal}>Close</button>
                <button onClick={ handleApplyFilters}>Apply Filters</button>
              </Filters>     
            </div>
          </form>
    </div>
  )
}

export default SearchBar;