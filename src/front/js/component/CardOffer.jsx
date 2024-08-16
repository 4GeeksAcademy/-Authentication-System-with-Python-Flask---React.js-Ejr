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
                <h2 className="card-offer-title">{title}</h2>
                <p className="card-offer-company mb-1">{company} - {location}</p>
                <div className="card-offer-description text-muted">
                    {description}
                </div>
                <div className="card-offer-footer d-flex justify-content-between align-items-center mt-2">
                    <div className="card-offer-details text-muted">
                        <span>{modality}</span>
                        <span className="mx-2">|</span>
                        <span>{salary}</span>
                    </div>
                    <div className="card-offer-actions">
                        <Link to={`/singleoffer/${id}`} className="btn btn-link text-decoration-none">View Details</Link>
                        <button className="btn btn-primary btn-sm">Inscribirse</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
