import React, { useState } from "react";
import { Context, } from "../store/appContext";
import { ThemeContext } from "../layout";
import "../../styles/filters.css";




export const FilterBrands = () => {
  const [visibleBrands, setVisibleBrands] = useState(3);
  const totalBrands = 20;
  const [showMoreButton, setShowMoreButton] = useState(true);

  const handleShowMore = () => {
    setVisibleBrands(prevVisibleBrands => prevVisibleBrands + 3);
    if (visibleBrands + 3 >= totalBrands) {
      setShowMoreButton(false);
    }
  };

  const handleShowLess = () => {
    setVisibleBrands(3);
    setShowMoreButton(true);
  };

  const renderBrands = () => {
    const brands = [];
    for (let i = 1; i <= totalBrands; i++) {
      if (i <= visibleBrands) {
        brands.push(
          <li key={i}>
            <div className="form-check p-3">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id={`flexCheckDefault${i}`}
              />
              <label className="form-check-label" htmlFor={`flexCheckDefault${i}`}>
                Marca {i}
              </label>
            </div>
          </li>
        );
      }
    }
    return brands;
  };

  return (
    <div>
      <h4>Marcas</h4>
      <ul>{renderBrands()}</ul>
      {visibleBrands < totalBrands && (
        <>
          {showMoreButton ? (
            <button className="btn buttonShowMore" onClick={handleShowMore}>
              <i class="fa-solid fa-plus" style={{"color": "#ffffff"}}/>
            </button>
          ) : (
            visibleBrands > 3 && (
              <button className="btn buttonShowMore" onClick={handleShowLess}>
                <i class="fa-solid fa-window-minimize" style={{"color": "#ffffff"}} />
              </button>
            )
          )}
        </>
      )}
    </div>
  );
};
