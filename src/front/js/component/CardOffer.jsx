import React, {useState} from "react";
import "../../styles/CardOffer.css"
import {Link} from "react-router-dom"



export const CardOffer = ({ title, company, modality, location, salary, description,id }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };




    return (
        <div className="container mt-5">
            <div className="card m-auto" style={{ width: "55rem" }}>
                <div className="card-body d-flex align-items-center">
                    <img
                        className="img-fluid me-3"
                        src="https://img.freepik.com/vector-premium/concepto-pequena-empresa-fachada-cafeteria-tiendas-ventas_654623-1161.jpg"
                        alt="Job Offer"
                        style={{ width: "180px", height: "180px", objectFit: "cover" }}
                    />
                    <div>
                        <h5 className="card-title">{title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{company}</h6>
                        <p className="card-text lh-1">
                            <strong>Location:</strong> {location}
                        </p>
                        <p className="card-text lh-1">
                            <strong>Modality:</strong> {modality}
                        </p>
                        <p className="card-text lh-1">
                            <strong>Salary:</strong> {salary}
                        </p>
                        <p className="card-text">
                            <strong>Description:</strong> {isExpanded ? description : `${description.substring(0, 100)}...`}
                            <button onClick={toggleDescription} className="btn btn-link text-muted p-0 ms-2">
                                {isExpanded ? "Leer menos" : "Leer más"}
                            </button>
                        </p>
                        <Link to={`/singleoffer/${id}`} className="btn btn-card">
                            Ver Oferta
                        </Link>
                        <Link to = {`/`} href="#" className="btn btn-success ms-2">
                            Inscribirse
                        </Link>
                        <a href="#" className="ms-2">
                            <i className="bi bi-heart"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>

    )
}