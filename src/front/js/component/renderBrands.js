
import React, {useContext, useState, useEffect  } from "react";
import { Context, } from "../store/appContext";
import { ThemeContext } from "../layout";
import "../../styles/index.css";
import { Link } from "react-router-dom";
import "../../styles/filters.css";


export const RenderBrands = () => {
    const {store, actions} = useContext(Context)
    useEffect(()=>{
        actions.getAllBrands();
      
      },[])
      

    return(
      <ul> 
      {store.allBrands.map((brand, index) => {
      return (
        <li key={index}>
            <div className="form-check p-3">
                <input
                    className="form-check-input"
                    type="checkbox"
                    value={brand.name}
                    id={`flexCheckDefault${index}`}
                />
                <label className="form-check-label text-start" htmlFor={`flexCheckDefault${index}`}>
                    {brand.name}
                </label>
            </div>
        </li>
      )})
        }
        </ul>
    );
};

