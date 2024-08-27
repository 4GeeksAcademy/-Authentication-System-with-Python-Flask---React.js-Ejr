import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/professionaldetail.css";
import ImgProN from "../../../../public/images/img-profesional-n.png";

const ProfessionalDetailCard = ({ id, name, description, calendly_url }) => {
    const { actions, store } = useContext(Context);

    let image_url = "https://raw.githubusercontent.com/OlgaKoplik/CodePen/master/profile.jpg";
    let calendly_generico = "https://calendly.com/nutriagend"

    return (
        <>
            <div className="image-container">
                <img src={image_url || ImgProN} className="card-img-top" />
            </div>
            <div>
                <h1 className="m-5">{name}</h1>
                <a href={calendly_url || calendly_generico}>Calendly</a>
                <p>{description}</p>
                <button className='prof-det-btn m-2' >
                    Agendarme
                </button>
            </div>
        </>
    )
}
export default ProfessionalDetailCard;