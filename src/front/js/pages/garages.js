import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { NavLink, Link } from "react-router-dom";
import { Profile_navbar } from "../component/profile_navbar";


export const Garages = () => {
    const {actions, store} = useContext(Context);

    useEffect (() => {
        actions.getGarages()
    }, [])


    return (
        <>
           
  
    {store.garages.map((garage, index) => {
    return (

        <div className="card" key={index} style={{"width": "18rem"}}>
            <img src="..." className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{garage.name}</h5>
                <p className="card-text">
                    {garage.description}
                </p>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">An item</li>
                <li className="list-group-item">A second item</li>
                <li className="list-group-item">A third item</li>
            </ul>
            <div className="card-body">
            {/*}      <Link to={garage.email} className="btn btn-primary">Email</Link>
              <Link to={`tel: ${garage.phone}`} className="btn btn-success">Llamar</Link> */}
            </div>
        </div>
    )

    })}


        </>
    )
}