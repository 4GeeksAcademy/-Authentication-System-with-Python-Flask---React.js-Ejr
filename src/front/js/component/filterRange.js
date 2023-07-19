
import React, {useContext, useState, useEffect  } from "react";
import { Context, } from "../store/appContext";
import { ThemeContext } from "../layout";
import "../../styles/index.css";

import "../../styles/filters.css"
import { Range, getTrackBackground } from "react-range";

export const FilterRange = () => {
  const [rangeValues, setRangeValues] = useState([0, 50000]);

  const handleRangeChange = (newValues) => {
    setRangeValues(newValues);

  }




    return (




 <div className="p-5">
      <h4>Precio</h4>
      <Range
        values={rangeValues}
        min={0}
        max={50000}
        step={100}
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
                  min: 0,
                  max: 50000
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
        Rango de precio entre {rangeValues[0]} y {rangeValues[1]}
      </p>
    </div>

    )}