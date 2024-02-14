import React, { useContext, useState, useCallback } from "react";
import { Context } from "../store/appContext";
import debounce from "lodash.debounce";

export const InsertLocationLiters = () => {
    const { store, actions } = useContext(Context);
       
    const handleLocation = (e) => {
        actions.setLocation(e.target.value);
    };
    
    const handleLiters = (e) => {
        actions.setLiters (e.target.value); 
    };

    return (
        

            <div className="card container-fluid col-sm-8 col-md-8 col-lg-8 bg-body-tertiary text-center p-1">
            <form className="form-floating">
            <label htmlFor="location">Location:</label>
                        <input
                            id="location"
                            type="text"
                            value={store.location}
                            onChange={(e) => handleLocation(e)}
                           
                        />
            </form>
            <form className="form-floating">
            <label htmlFor="liters">Liters:</label>
                        <input
                            id="liters"
                            type="number"
                            value={store.liters}
                            onChange={(e) => handleLiters(e)}
                         
                        />
            </form>
            </div>
            );
    
};
