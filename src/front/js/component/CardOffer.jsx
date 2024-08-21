import React from "react";
import "../../styles/CardOffer.css";
import { Link } from "react-router-dom";

export const CardOffer = ({ title, company, modality, location, salary, description, id }) => {
    return (
        <div className="card-offer my-2 p-3 d-flex align-items-center">
            <div className="card-offer-logo me-3">
                <img 
                    className="card-offer-logo"
                    src="https://img.freepik.com/vector-premium/concepto-pequena-empresa-fachada-cafeteria-tiendas-ventas_654623-1161.jpg" 
                    alt="Company Logo" 
                />
            </div>
            <div className="card-offer-body">
                <div className="title-box">
                    <h2 className="card-offer-title">{title}</h2>
                    <span className="card-offer-company mb-1">{company} - {location}</span>
                </div>
                <div className="card-offer-description text-muted">
                    <p>
                        {description}
                    </p>
                </div>
                <div className="card-offer-footer d-flex justify-content-between align-items-center mt-2">
                    <div className="card-offer-details text-muted">
                        <span>{modality}</span>
                        <span className="mx-2">|</span>
                        <span>{salary}</span>
                        <span className="mx-2">|</span>
                        <span>{modality}</span>
                    </div>
                    <div className="card-offer-actions">
                        <Link to={`/singleoffer/${id}`} className="btn btn-details  btn-sm text-decoration-none me-2">View Details</Link>
                        <button className="btn btn-inscribirse btn-sm">Inscribirse</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
