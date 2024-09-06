import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css'; 

export const EditExperienceUserAccordion = () => {
    const [showModal, setShowModal] = useState(false);
    const [companyName, setCompanyName] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [role, setRole] = useState('');
    const [projects, setProjects] = useState('');
    const [file, setFile] = useState(null);
    const [experiences, setExperiences] = useState([]);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleSave = (e) => {
        e.preventDefault();
        const newExperience = {
            companyName,
            startDate,
            endDate,
            role,
            projects,
            file
        };
        setExperiences([...experiences, newExperience]);
       
        setCompanyName('');
        setStartDate(new Date());
        setEndDate(new Date());
        setRole('');
        setProjects('');
        setFile(null);
        handleClose();
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <>
            <div className="d-flex align-items-center flex-wrap">
                <p className="mb-0" style={{  color: 'white',fontFamily: 'Arial, sans-serif', 
    fontWeight: 'bold', }}>Experiencia Profesional</p>
                <button
                    type="button"
                    className="btn btn-outline-light rounded-circle d-flex align-items-center justify-content-center ms-2 border-none"
                    style={{ width: 30, height: 30, backgroundColor: 'rgba(112, 135, 156, 1)', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)' }}
                    onClick={handleShow}
                >
                    <FontAwesomeIcon icon={faEdit} />
                </button>
            </div>

            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Experiencia Laboral</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSave}>
                        <Form.Group controlId="formCompanyName">
                            <Form.Label>Nombre de la Empresa</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nombre de la empresa"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formStartDate">
                            <Form.Label>Fecha de Inicio</Form.Label>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                className="form-control"
                                dateFormat="yyyy/MM/dd"
                            />
                        </Form.Group>

                        <Form.Group controlId="formEndDate">
                            <Form.Label>Fecha de Fin</Form.Label>
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                className="form-control"
                                dateFormat="yyyy/MM/dd"
                            />
                        </Form.Group>

                        <Form.Group controlId="formRole">
                            <Form.Label>Cargo Desempeñado</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Cargo desempeñado"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formProjects">
                            <Form.Label>Cantidad de Proyectos Realizados</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Cantidad de proyectos"
                                value={projects}
                                onChange={(e) => setProjects(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formFile">
                            <Form.Label>Subir Certificado (Opcional)</Form.Label>
                            <Form.Control
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={handleFileChange}
                            />
                        </Form.Group>
                        
                        <Button variant="primary" type="submit">
                            Guardar
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="d-flex flex-wrap" >
                {experiences.map((exp, index) => (
                    <div key={index} className="card m-2" style={{ width: '18rem', backgroundColor: '#D9D9D9' }}>
                        
                        <div className="card-body" >
                            <h5 className="card-title">{exp.companyName}</h5>
                            <p className="card-text">
                                <strong>Cargo:</strong> {exp.role}<br />
                                <strong>Fecha de Inicio:</strong> {exp.startDate.toLocaleDateString()}<br />
                                <strong>Fecha de Fin:</strong> {exp.endDate.toLocaleDateString()}<br />
                                <strong>Cantidad de Proyectos:</strong> {exp.projects}
                            </p>
                            {exp.file && (
                                <a href={URL.createObjectURL(exp.file)} download={exp.file.name} className="btn btn-secondary">
                                    Ver Proyecto
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};
