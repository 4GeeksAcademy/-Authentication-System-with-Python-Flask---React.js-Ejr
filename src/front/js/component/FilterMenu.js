import React from "react";

const FilterMenu = () => {
  return (
    <div className="filter-content mt-5">
      <div className="filter-items">
        <div className="filter-country filter-item">
          <input type="text" id="country" placeholder="Country" />
        </div>
        <div className="filter-city filter-item">
          <input type="text" id="city" placeholder="City" />
        </div>
        <div className="filter-trip filter-item">
          <select name="Trip" id="type">
            <option value="">--Kind of trip--</option>
            <option value="relax">Relax</option>
            <option value="trek">Trek</option>
            <option value="cultural discovery">Cultural discovery</option>
          </select>
        </div>
        <div className=" filter-btn">
          <input type="submit" value="Search" />
        </div>
      </div>
    </div>
  );
};

export default FilterMenu;
