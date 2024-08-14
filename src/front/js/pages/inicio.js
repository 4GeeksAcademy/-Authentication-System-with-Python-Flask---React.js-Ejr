import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Inicio = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="inicio-container container mt-5">
            <div className="row align-items-center">
                <div className="col-md-6 text-center text-md-start">
                    <h1 className="display-4 fw-bold">
                        Conoce <span className="titulo" style={{ backgroundColor: 'white', borderColor: 'white', color: '#6793AE' }}>Loopy: Freelance Code Connect</span>
                    </h1>
                    <p className="lead text-muted">
                        Ofrecemos las mejores oportunidades para impulsar tu carrera o encontrar el talento ideal que necesitas.
                    </p>
                    <div className="mt-4">
                        <button type="button" className="btn btn-primary btn-lg me-2 mb-2 shadow">
                            Inscribirse a Ofertas
                        </button>
                        <button type="button" className="btn btn-outline-secondary btn-lg mb-2 shadow">
                            Contratar Freelancers
                        </button>
                    </div>
                </div>
                <div className="col-md-6 text-center">
                    <img
                        src="https://www.shutterstock.com/image-vector/backend-development-coding-software-engineering-600nw-2378388687.jpg"
                        alt="Desarrollo de Software"
                        className="img-fluid rounded shadow-lg"
                    />
                </div>
            </div>
        </div>
    );
};