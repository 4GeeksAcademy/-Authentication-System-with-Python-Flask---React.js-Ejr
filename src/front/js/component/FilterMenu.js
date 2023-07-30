import React, { useState } from "react";

const FilterMenu = ({ handleSearch }) => {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [tripType, setTripType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(country, city, tripType);
  };

  return (
    <div className="filter-content mt-5">
      <div className="filter-items">
        <div className="filter-country filter-item">
          <input
            type="text"
            id="country"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div className="filter-city filter-item">
          <input
            type="text"
            id="city"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="filter-trip filter-item">
          <select
            name="Trip"
            id="type"
            value={tripType}
            onChange={(e) => setTripType(e.target.value)}
          >
            <option value="">--Kind of trip--</option>
            <option value="relax">Relax</option>
            <option value="trek">Trek</option>
            <option value="cultural discovery">Cultural discovery</option>
          </select>
        </div>
        <div className="filter-btn">
          <button className='btn-search' type="submit" onClick={handleSubmit}>
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterMenu;
