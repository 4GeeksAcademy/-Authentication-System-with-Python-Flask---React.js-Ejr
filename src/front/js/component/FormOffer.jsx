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
            <div className="container form-box my-5 shadow-lg">
                <form action="wwww.4geeks.com" method="post">
                    <div className="row my-3 text-secondary fw-bold">
                        <div className="col-6 d-flex flex-column">
                            <label for="offer-title" className="form-label">Titulo de la oferta</label>
                            <input type="text" className="form-control mt-2" name="offer-title" id="offer-title" placeholder="Software ing full-stack"
                                maxlength="16" aria-describedby="cardHelpBlock" required />
                        </div>
                        <div className="col-6">
                            <label for="offer-modality" className="form-label mb-3">Modalidad</label>
                            <select className="form-select" name="offer-modality" id="offer-modality" required>
                                <option value="">Seleccione una opción</option>
                                <option value="remote">Remoto</option>
                                <option value="onsite">On-Site</option>
                                <option value="hybrid">Hybrid</option>
                            </select>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-6">
                            <label for="offer-studies" className="form-label my-3 text-secondary fw-bold">Estudios minimos</label>
                            <select className="form-select" name="offer-studies" id="offer-studies" required>
                                <option value="">Seleccione una opción</option>
                                <option value="eso">ESO</option>
                                <option value="bach">Bachillerato</option>
                                <option value="ciclo">Ciclo Formativo</option>
                                <option value="uni">Titulo Universitario</option>
                                <option value="otros">Otros...</option>
                            </select>
                        </div>
                        <div className="col-6">
                            <label for="offer-salary" className="form-label text-secondary fw-bold my-3">Salario base</label>
                            <input type="text" className="form-control" placeholder="30.000 - 45.000 brutos/año" name="offer-salary" id="offer-salary" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <label for="offer-location" className="form-label text-secondary fw-bold my-3">Localidad</label>
                            <input type="text" className="form-control" placeholder="Madrid, España, Italia, Netherlans..." name="offer-location" id="offer-location" 
                            maxLength="15" required/>
                        </div>
                        <div className="col-6">
                            <label htmlFor="" className="form-label text-secondary fw-bold my-3"></label>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}