import React, { useState, useContext } from "react";
import "../../styles/FormOffer.css";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { SectionRight } from "./SectionRight.jsx";

export const FormOffer = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: "",
        descripcion: "",
        salario: "",
        localidad: "",
        requisitos_minimos: "",
        estudios_minimos: "",
        tipo_contrato: "",
        idiomas: "",
        horario:"",
        plazo: "",
        modalidad: "",
        experiencia_minima: "",
        fecha_publicacion: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, descripcion, salario, localidad, plazo, modalidad, experiencia_minima } = formData;

        if (!name || !descripcion || !salario || !localidad || !plazo || !modalidad || !experiencia_minima) {
            setError('Por favor, completa todos los campos.');
        } else {
            const offerDate = new Date().toISOString();
            const updatedFormData = {
                ...formData,
                fecha_publicacion: offerDate.slice(0, 10),
                modalidad: formData.modalidad?.toLowerCase(),
                experiencia_minima: formData.experiencia_minima?.toUpperCase()

            };
            console.log(updatedFormData)

            try {
                const resp = await actions.createJobOffer(updatedFormData);
                console.log(resp);
                navigate('/timeline');
            } catch (error) {
                console.log(error)
                setError('Ocurrió un error al crear la oferta.');
            }


        }
    };

    return (
        <>
            <div className="form-container">
                <div className="mt-5">
                    <div className="row">
                        <div className="col-12">
                            <div className="form-header text-center">
                                <h2 className="display-4 fw-bold my-3">
                                    ¡Lleva Tu Equipo al Siguiente Nivel!
                                </h2>
                                <span className="fw-bold my-3">Completa el formulario para publicar tu oferta de empleo y conecta con profesionales cualificados.</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-box my-5 shadow-lg">
                    <form onSubmit={e => handleSubmit(e)}>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <div className="row my-3 text-secondary fw-bold">
                            <div className="col-4 d-flex flex-column">
                                <label htmlFor="name" className="form-label">Titulo de la oferta</label>
                                <input
                                    type="text"
                                    className="form-control mt-2"
                                    name="name"
                                    id="name"
                                    placeholder="Software ing full-stack"
                                    maxLength="30"
                                    required
                                    onChange={handleChange}
                                    value={formData.name}
                                />
                            </div>
                            <div className="col-4">
                                <label htmlFor="modalidad" className="form-label mb-3">Modalidad</label>
                                <select
                                    className="form-select"
                                    name="modalidad"
                                    id="modalidad"
                                    required
                                    onChange={handleChange}
                                    value={formData.modalidad}
                                >
                                    <option value="">Seleccione una opción</option>
                                    <option value="teletrabajo">Teletrabajo</option>
                                    <option value="presencial">Presencial</option>
                                    <option value="hybrido">Hybrido</option>
                                </select>
                            </div>
                            <div className="col-4">
                                <label htmlFor="experiencia_minima" className="form-label mb-3">Experiencia mínima</label>
                                <select
                                    className="form-select"
                                    name="experiencia_minima"
                                    id="experiencia_minima"
                                    required
                                    onChange={handleChange}
                                    value={formData.experiencia_minima}
                                >
                                    <option value="">Seleccione una opción</option>
                                    <option value="JUNIOR">JUNIOR</option>
                                    <option value="MID">MID</option>
                                    <option value="SENIOR">SENIOR</option>
                                </select>
                            </div>
                        </div>
                        <div className="row my-3">
                            <div className="col-4">
                                <label htmlFor="salario" className="form-label text-secondary fw-bold my-3">Salario base</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="30.000 - 45.000 brutos/año"
                                    name="salario"
                                    id="salario"
                                    required
                                    onChange={handleChange}
                                    value={formData.salario}
                                />
                            </div>
                            <div className="col-4">
                                <label htmlFor="plazo" className="form-label text-secondary fw-bold my-3">Plazo</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    placeholder="Introduzca el plazo límite"
                                    name="plazo"
                                    id="plazo"
                                    required
                                    onChange={handleChange}
                                    value={formData.plazo}
                                />
                            </div>
                            <div className="col-4 d-flex flex-column">
                                <label htmlFor="Localidad" className="form-label text-secondary fw-bold my-3">Localidad</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="localidad"
                                    id="localidad"
                                    placeholder="España, Italia, Alcorcón..."
                                    maxLength="30"
                                    required
                                    onChange={handleChange}
                                    value={formData.localidad}
                                />
                            </div>
                        </div>
                        <div className="row my-3">
                            <div className="col-4">
                                <label htmlFor="idiomas" className="form-label text-secondary fw-bold my-3">Idiomas</label>
                                <input 
                                    type="text" 
                                    name="idiomas" 
                                    id="idiomas" 
                                    className="form-control"
                                    placeholder="Ingles - Nivel intermedio..."
                                    onChange={handleChange}
                                    value={formData.idiomas}
                                />
                            </div>
                            <div className="col-4">
                                <label htmlFor="contrato" className="form-label text-secondary fw-bold my-3">Estudios Minimos</label>
                                <select 
                                    name="estudios_minimos" 
                                    id="estudios_minimos"
                                    className="form-select"
                                    onChange={handleChange}
                                    value={formData.estudios_minimos}
                                >
                                    <option value="opcion">Seleccione una opccion</option>
                                    <option value="Sin estudios">Sin estudios</option>
                                    <option value="Primaria">Educacion primaria</option>
                                    <option value="ESO">Educacion Secundaria Obligatoria</option>
                                    <option value="BACH">Bachillerato</option>
                                    <option value="CFGM">Ciclo Formativo de Grado Medio</option>
                                    <option value="CFGS">Ciclo Formativo de Grado Superior</option>
                                    <option value="Universidad">Grado Universitario</option>
                                    <option value="Licenciatura">Licenciatura</option>
                                    <option value="Doctorado">Doctorado</option>
                                </select>
                            </div>
                            <div className="col-4">
                                <label htmlFor="contrato" className="form-label text-secondary fw-bold my-3">Tipo de contrato</label>
                                <input 
                                    type="text" 
                                    name="contrato" 
                                    id="contrato"
                                    className="form-control"
                                    placeholder="Indefinido, fijo, no disponible..."
                                    onChange={handleChange}
                                    value={formData.tipo_contrato}    
                                />
                                
                            </div>
                        </div>
                        <div className="row my-3">
                            <div className="col-8 requisits-minim">
                                <label htmlFor="requisitos" className="form-label text-secondary fw-bold my-3">Requisitos minimos</label>
                                <input
                                    type="text"
                                    className="form-control input-requisits"
                                    name="requisitos"
                                    id="requisitos"
                                    placeholder="impresindible..."
                                    onChange={handleChange}
                                    value={formData.requisitos_minimos}
                                />
                            </div>
                            <div className="col-4">
                                <label htmlFor="horario" className="form-label text-secondary fw-bold my-3">Horarios</label>
                                <input 
                                type="text" 
                                name="horario" 
                                id="horario"
                                className="form-control"
                                placeholder="8:00 AM - 17:00 PM" 
                                onChange={handleChange}
                                value={formData.horario}
                            />
                            </div>
                        </div>
                        <div className="row last-row mt-3">
                            <div className="col-12 box-description">
                                <label htmlFor="descripcion" className="form-label text-secondary fw-bold my-3">Descripción</label>
                                <textarea
                                    className="form-control text-area mt-2"
                                    name="descripcion"
                                    id="descripcion"
                                    placeholder="Describe la oferta lo más detalladamente posible..."
                                    required
                                    onChange={handleChange}
                                    value={formData.descripcion}
                                />
                            </div>
                        </div>
                        <div className="d-flex justify-content-end me-3 button-box">
                            <button type="submit" className="btn btn-submit mx-3 my-3">
                                Enviar
                            </button>
                            <button type="reset" className="btn btn-reset my-3">
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="section">
                <SectionRight />
            </div>
        </>
    );
};
