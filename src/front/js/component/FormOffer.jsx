import React, { useState } from "react";
import "../../styles/FormOffer.css"


export const FormOffer = () => {
    const [formData, setFormData] = useState({
        title: "",
        company: "",
        sector: "",
        technologies: "",
        modality: "Remote",
        location: "",
        requisits: "",
        salary: "",
        description: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("datos del formulario: ", formData);


    }

    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="">
                        <div className="form-header">
                            <h2 className="display-4 fw-bold">
                                ¡Bienvenido de nuevo!
                            </h2>
                            <span className="fw-bold">Crea tus ofertas y contacta con los mejores</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container form-box my-5">
                <form action="wwww.4geeks.com" method="post">
                    <div className="row my-3 text-secondary fw-bold">
                        <div className="col-12 col-md-12 col-lg-5 d-flex flex-column">
                            <label for="offer-title" className="form-label">Titulo de la oferta</label>
                            <input type="text" className="form-control" name="offer-title" id="offer-title" placeholder="Titulo de la oferta"
                                minlength="16" aria-describedby="cardHelpBlock" required/>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}