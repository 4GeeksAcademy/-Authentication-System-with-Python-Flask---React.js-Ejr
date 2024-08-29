import React, {useContext, useEffect} from 'react';
import { Context } from '../store/appContext';
import { Link } from 'react-router-dom';
import '../../styles/professionals.css';
import ImgProN from "../../../../public/images/img-profesional-n.png";

const NutricionistCard = ({ id, name, calendly_name }) => {
    const {actions, store} = useContext(Context)

    let image_url = "";
    let profession = "";

    useEffect(() => {
        actions.getUserById(id);
    },[])
    
    return (
        <div className='prof-card-container n-card-container'>
            <div className='top-bg-effect'></div>
            <div className="image-container">
                <img src={image_url || ImgProN} className="card-img-top" />
            </div>
            <div className="card-body">
                <h4 className="card-title">{name || "Nombre"}</h4>
                <h5 className="card-text">{profession || `Acerca de ${name}...`}</h5>
            </div>
            <div className='card-footer'>
                <Link to={`professional/${id}`} className="more-link" >
                    <h5>
                        Ver perfil
                    </h5>
                </Link>
                <Link to={`/agenda/${calendly_name}`} className="more-link" >
                    <h5>
                        Ver agenda
                    </h5>
                </Link>
            </div>
        </div>
    )
}

export default NutricionistCard;