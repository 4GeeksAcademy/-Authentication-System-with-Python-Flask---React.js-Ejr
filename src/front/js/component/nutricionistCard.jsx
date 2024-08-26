import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/professionals.css';
import ImgProN from "../../../../public/images/img-profesional-n.png";

const NutricionistCard = ({ id, name }) => {

    let image_url = "";
    let profession = "";
    let age = "";

    return (
        <div className='prof-card-container n-card-container'>
            <div className='top-bg-effect'></div>
            <div className="image-container">
                <img src={image_url || ImgProN} className="card-img-top" />
            </div>
            <div className="card-body">
                <h4 className="card-title">{name || "Nombre"}</h4>
                <h5 className="card-text">{age || "Edad"}</h5>
                <h5 className="card-text">{profession || `Acerca de ${name}...`}</h5>
            </div>
            <div className='card-footer'>
                <Link to={`nutricionist/${id}`} className="more-link" >
                    <h5>
                        Ver perfil
                    </h5>
                </Link>
                <button className='agenda-btn'>
                    <h5>
                        Agendarme
                    </h5>
                </button>
            </div>
        </div>
    )
}

export default NutricionistCard;