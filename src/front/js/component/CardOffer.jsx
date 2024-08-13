import React from "react";
import "../../styles/CardOffer.css"


export const CardOffer = ({ title, company, location, salary, description }) => {



    return (
        <div className="container mt-3">
            <div className="card" style={{ width: "60rem" }}>
                <div className="card-body d-flex align-items-center">
                    <img
                        className="img-fluid me-3"
                        src="https://img.freepik.com/vector-premium/concepto-pequena-empresa-fachada-cafeteria-tiendas-ventas_654623-1161.jpg"
                        alt="Job Offer"
                        style={{ width: "150px", height: "150px", objectFit: "cover" }}
                    />
                    <div>
                        <h5 className="card-title">{title}Frontend Developer</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{company}Tech Company S.L</h6>
                        <p className="card-text lh-1">
                            <strong>Location:</strong> {location} Remote
                        </p>
                        <p className="card-text lh-1">
                            <strong>Salary:</strong> {salary} $40,000 - $60,000/year
                        </p>
                        <p className="card-text lh-1">
                            <strong>Description:</strong> {description} We are looking for a
                            skilled Frontend Developer to...
                        </p>
                        <a href="#" className="btn btn-primary">
                            Ver Oferta
                        </a>
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