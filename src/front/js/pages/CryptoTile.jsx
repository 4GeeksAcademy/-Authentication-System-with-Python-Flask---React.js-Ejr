import React from "react";

const CryptoTile = ({title, rate}) => {

    return(
        <div className="card">
           <div className="card-body">
            <img src="" alt="icon"/>
            <div>{title}</div>
            <div>{rate}</div>
            </div> 
        </div>
    )

}

export default CryptoTile;