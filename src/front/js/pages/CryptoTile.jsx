import React from "react";
import "../../styles/cryptotile.css";
const CryptoTile = ({data, selected, onClick}) => {
    const{name, rate, icon}= data;
    const handleClick = () => onClick(data);
    return(
        <div className={`card ${selected && 'selected'}`} onClick={handleClick}>
           <div className="card-body">
            <img className="iconos" src={icon} alt="icon"/>
            <div>{name}</div>
            <div>{rate}</div>
            </div> 
        </div>
    )

}

export default CryptoTile;