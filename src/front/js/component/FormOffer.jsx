import React, { useState, useContext } from "react";
import "../../styles/FormOffer.css";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js"; 

export const FormOffer = () => {
    const { actions } = useContext(Context); 
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        photo: null,
        title: "",
        sector: "",
        technologies: [],
        contract: "",
        plazo: "",
        modality: "Teletrabajo",
        modality: "Teletrabajo",
        location: "",
        salary: "",
        experience: "",
        fecha_publicacion: null,
        description: "",
    });
    const [selectedFile, setSelectedFile] = useState(null);

    const technologiesList = [
        "HTML", "CSS", "Bootstrap",
        "Tailwind", "Figma", "Slack",
        "Python", "JavaScript", "SQL",
        "MongoDB", "React", "Angular",
        "Java", "C#", "Ruby", "BBDD",
        "Springboot", "React-Native",
        "Flask", "Node.js", "API",
        "RESTfullapi", "Scrum", "SOLID",
        "CRUD", "Arquitectura de servicios",
        "Maquetación", "Microservicios", "Git",
        "Github", "Testing"];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === "checkbox") {
            setFormData((prevData) => {
                if (checked) {
                    return { ...prevData, technologies: [...prevData.technologies, value] };
                } else {
                    return { ...prevData, technologies: prevData.technologies.filter((tech) => tech !== value) };
                }
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedFile(reader.result);
                setFormData(prevData => ({ ...prevData, photo: file }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { title, contract, modality, location, salary, technologies } = formData;

        if (!title || !contract || !modality || !location || !salary || technologies.length === 0) {
            setError('Por favor, completa todos los campos y selecciona al menos una tecnología.');
        } else {
            setError('');
            const offerDate = new Date().toLocaleDateString();
            const updatedFormData = {
                ...formData,
                fecha_publicacion: offerDate
            };

            try {
                await actions.CreateJobOffers(updatedFormData); 
                navigate('/timeline'); 
            } catch (error) {
                setError('Ocurrió un error al crear la oferta.');
            }

            setFormData({
                photo: null,
                title: "",
                sector: "",
                technologies: [],
                contract: "",
                plazo: "",
                modality: "Teletrabajo",
                location: "",
                salary: "",
                experience: "",
                fecha_publicacion: null,
                description: "",
            });
            setSelectedFile(null);
        }
    };

    return (
        <>
            <div className="container">
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-12">
                            <div className="form-header text-center">
                                <h2 className="display-4 fw-bold">
                                    ¡Lleva Tu Equipo al Siguiente Nivel!
                                </h2>
                                <span className="fw-bold">Completa el formulario para publicar tu oferta de empleo y conecta con profesionales calificados.</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container form-box my-5 shadow-lg">
                    <form onSubmit={handleSubmit}>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <div className="row my-3 text-secondary fw-bold">
                            <div className="col-4 d-flex flex-column">
                                <label htmlFor="title" className="form-label">Titulo de la oferta</label>
                                <input
                                    type="text"
                                    className="form-control mt-2"
                                    name="title"
                                    id="title"
                                    placeholder="Software ing full-stack"
                                    maxLength="30"
                                    aria-describedby="cardHelpBlock"
                                    required
                                    onChange={handleChange}
                                    value={formData.title}
                                />
                            </div>
                            <div className="col-4">
                                <label htmlFor="modality" className="form-label mb-3">Modalidad</label>
                                <select
                                    className="form-select"
                                    name="modality"
                                    id="modality"
                                    required
                                    onChange={handleChange}
                                    value={formData.modality}
                                >
                                    <option value="">Seleccione una opción</option>
                                    <option value="Remoto">Teletrabajo</option>
                                    <option value="Presencial">Presencial</option>
                                </select>
                            </div>
                            <div className="col-4">
                                <label htmlFor="experience" className="form-label mb-3">Experiencia mínima</label>
                                <select
                                    className="form-select"
                                    name="experience"
                                    id="experience"
                                    required
                                    onChange={handleChange}
                                    value={formData.experience}
                                >
                                    <option value="">Seleccione una opción</option>
                                    <option value="Sin experiencia">Sin experiencia</option>
                                    <option value="Junior">Junior</option>
                                    <option value="Mid-senior">Mid-senior</option>
                                    <option value="Senior">Senior</option>
                                </select>
                            </div>
                        </div>
                        <div className="row my-3">
                            <div className="col-6">
                                <label htmlFor="sector" className="form-label my-3 text-secondary fw-bold">Estudios mínimos</label>
                                <select
                                    className="form-select"
                                    name="sector"
                                    id="sector"
                                    required
                                    onChange={handleChange}
                                    value={formData.sector}
                                >
                                    <option value="">Seleccione una opción</option>
                                    <option value="Sin estudios">Sin estudios</option>
                                    <option value="ESO">ESO</option>
                                    <option value="Bachillerato">Bachillerato</option>
                                    <option value="Ciclo Formativo">Ciclo Formativo</option>
                                    <option value="Título Universitario">Título Universitario</option>
                                    <option value="Otros">Otros...</option>
                                </select>
                            </div>
                            <div className="col-6">
                                <label htmlFor="salary" className="form-label text-secondary fw-bold my-3">Salario base</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="30.000 - 45.000 brutos/año"
                                    name="salary"
                                    id="salary"
                                    onChange={handleChange}
                                    value={formData.salary}
                                />
                            </div>
                        </div>
                        <div className="row my-3">
                            <div className="col-4">
                                <label htmlFor="location" className="form-label text-secondary fw-bold my-3">Localidad</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Madrid, Barcelona, Valencia..."
                                    name="location"
                                    id="location"
                                    maxLength="15"
                                    required
                                    onChange={handleChange}
                                    value={formData.location}
                                />
                            </div>
                            <div className="col-4">
                                <label htmlFor="contract" className="form-label text-secondary fw-bold my-3">Tipo de contrato</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Jornada completa, Jornada Parcial..."
                                    name="contract"
                                    id="contract"
                                    maxLength="20"
                                    required
                                    onChange={handleChange}
                                    value={formData.contract}
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
                        </div>
                        <div className="row my-3">
                            <div className="col-12">
                                <div className="form-group">
                                    <label className="form-label text-secondary fw-bold">Tecnologías</label>
                                    <div className="form-check check-box-grid">
                                        {technologiesList.map((tech) => (
                                            <div key={tech} className="form-check">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    id={tech}
                                                    name="technologies"
                                                    value={tech}
                                                    checked={formData.technologies.includes(tech)}
                                                    onChange={handleChange}
                                                />
                                                <label className="form-check-label" htmlFor={tech}>
                                                    {tech}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row last-row">
                            <div className="col-6 box-description">
                                <label htmlFor="description" className="form-label text-muted fw-bold">Descripción</label>
                                <textarea
                                    className="form-control mt-2"
                                    name="description"
                                    id="description"
                                    placeholder="Describe lo más detalladamente posible la oferta..."
                                    aria-describedby="cardHelpBlock"
                                    required
                                    onChange={handleChange}
                                    value={formData.description}
                                />
                            </div>
                            <div className="col-6 my-4">
                                <div className="img-container">
                                    {selectedFile && (
                                        <div className="img-preview mt-3">
                                            <img
                                                src={selectedFile}
                                                alt="Your picture here"
                                                className="img-thumbnail"
                                            />
                                        </div>
                                    )}
                                </div>
                                <label htmlFor="file-upload" className="form-label text-muted fw-bold mt-2">Sube una imagen</label>
                                <input
                                    type="file"
                                    id="file-upload"
                                    className="form-control"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                        <div className="d-flex justify-content-end me-3 button-box">
                            <button type="submit" className="btn btn-primary mx-3 my-3">
                                Enviar
                            </button>
                            <button type="reset" className="btn btn-danger my-3">
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
