import CanchaCard from "../component/CanchaCard";
import React from "react";


const Canchas = () => {
    return (
        <>
        <div className="row">
            <div className="col"><CanchaCard/></div>
            <div className="col"><CanchaCard/></div>

        </div>
        <div className="row">
            <div className="col"><CanchaCard/></div>
            <div className="col"><CanchaCard/></div>

        </div>
        <div className="row">
            <div className="col"><CanchaCard/></div>
            <div className="col"><CanchaCard/></div>

        </div>
        </>
    );
};


export default Canchas