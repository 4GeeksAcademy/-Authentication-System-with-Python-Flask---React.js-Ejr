
import React, {useContext, useState, useEffect  } from "react";
import { Context, } from "../store/appContext";
import { ThemeContext } from "../layout";
import "../../styles/index.css";

import "../../styles/filters.css"
import { Range, getTrackBackground } from "react-range";

export const FilterYear = () => {
  const [rangeValues, setRangeValues] = useState([1980, 2023]);

  const handleRangeChange = (newValues) => {
    setRangeValues(newValues);

  }




    return (




 <div className="p-5">
      <h4>Año de fabricación</h4>
      <Range
        values={rangeValues}
        min={1980}
        max={2023}
        step={1}
        onChange={handleRangeChange}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: "6px",
              display: "flex",
              width: "100%"
            }}
          >
            <div 
              className="py-2"
              ref={props.ref}
              style={{
                height: "6px",
                width: "100%",
                borderRadius: "4px",
                background: getTrackBackground({
                  values: rangeValues,
                  colors: ["#ccc", "#548BF4", "#ccc"],
                  min: 1980,
                  max: 2023
                }),
                alignSelf: "center"
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "16px",
              width: "16px",
              borderRadius: "50%",
              backgroundColor: "#FFF",
              boxShadow: "0px 2px 6px #AAA"
            }}
          />
        )}
      />
      <p className="py-3">
       Fabricación entre {rangeValues[0]} y {rangeValues[1]} 
      </p>
    </div>

    )}