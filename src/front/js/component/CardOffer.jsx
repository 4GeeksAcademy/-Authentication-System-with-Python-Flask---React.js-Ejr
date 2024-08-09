import React from "react";
import "../../styles/CardOffer.css"
import {Link} from "react-router-dom"



export const CardOffer = ({ title, company, location, salary, description,id }) => {



    return (
        <div className="container mt-5">
            <div className="card m-auto" style={{ width: "55rem" }}>
                <div className="card-body d-flex align-items-center">
                    <img
                        className="img-fluid me-3"
                        src="https://img.freepik.com/vector-premium/concepto-pequena-empresa-fachada-cafeteria-tiendas-ventas_654623-1161.jpg"
                        alt="Job Offer"
                        style={{ width: "150px", height: "150px", objectFit: "cover" }}
                    />
                    <div>
                        <h5 className="card-title">{title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{company}</h6>
                        <p className="card-text lh-1">
                            <strong>Location:</strong> {location}
                        </p>
                        <p className="card-text lh-1">
                            <strong>Salary:</strong> {salary}
                        </p>
                        <p className="card-text lh-1">
                            <strong>Description:</strong> {description} 
                        </p>
                        <Link to={`/singleoffer/${id}`} className="btn btn-primary">
                            Ver Oferta
                        </Link>
                        <a href="#" className="btn btn-success ms-2">
                            Inscribirse
                        </a>
                        <a href="#" className="ms-2">
                            <i className="bi bi-heart"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>

    )
}