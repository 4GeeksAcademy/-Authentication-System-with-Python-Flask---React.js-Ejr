import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button, Form } from 'react-bootstrap';
import Select from 'react-select'; 


const languageOptions = [
    { value: 'en', label: 'Inglés', flag: '🇬🇧' },
    { value: 'es', label: 'Español', flag: '🇪🇸' },
    { value: 'fr', label: 'Francés', flag: '🇫🇷' },
   
];

const levelOptions = [
    { value: 'beginner', label: 'Principiante' },
    { value: 'intermediate', label: 'Intermedio' },
    { value: 'advanced', label: 'Avanzado' },
];

export const EditLanguageUserAccordion = () => {
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const [selectedLevel, setSelectedLevel] = useState(null);
    const [certificate, setCertificate] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [languages, setLanguages] = useState([]);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleSave = (e) => {
        e.preventDefault();
        if (selectedLanguage && selectedLevel) {
            setLanguages([...languages, { ...selectedLanguage, level: selectedLevel, certificate }]);
            setSelectedLanguage(null);
            setSelectedLevel(null);
            setCertificate(null);
        }
        handleClose();
    };

    const handleFileChange = (e) => {
        setCertificate(e.target.files[0]);
    };

    return (
        <>
            <div className="d-flex flex-column align-items-start" style={{ color: 'black',fontFamily: 'Arial, sans-serif', 
    fontWeight: 'bold', }}>
                <p className="mb-0" style={{  color: 'black',fontFamily: 'Arial, sans-serif', 
    fontWeight: 'bold', }}>Idiomas y Certificados</p>
                <button
                    type="button"
                    className="btn btn-outline-light rounded-circle d-flex align-items-center justify-content-center mt-2 border-none"
                    style={{ width: 30, height: 30, backgroundColor: 'rgba(112, 135, 156, 1)', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)' }}
                    onClick={handleShow}
                >
                    <FontAwesomeIcon icon={faEdit} />
                </button>
                <div className="d-flex flex-wrap">
                    {languages.map((lang, index) => (
                        <div className="card d-flex flex-row m-2" key={index} style={{ width: '300px', border: '1px solid #ddd', borderRadius: '10px' }}>
                            <div className="card-body d-flex align-items-center">
                                <span className="fs-3 me-3">{lang.flag}</span>
                                <div>
                                    <h6 className="card-title mb-0">{lang.label}</h6>
                                    <p className="card-text mb-1">Nivel: {lang.level.label}</p>
                                    {lang.certificate && (
                                        <p className="card-text mb-0">Certificado: {lang.certificate.name}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
            </div>

            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Idioma y Certificado</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSave}>
                        <Form.Group controlId="formLanguageSelector">
                            <Form.Label>Idioma</Form.Label>
                            <Select
                                value={selectedLanguage}
                                onChange={setSelectedLanguage}
                                options={languageOptions}
                                placeholder="Selecciona un idioma..."
                            />
                        </Form.Group>
                        <Form.Group controlId="formLevelSelector" className="mt-3">
                            <Form.Label>Nivel</Form.Label>
                            <Select
                                value={selectedLevel}
                                onChange={setSelectedLevel}
                                options={levelOptions}
                                placeholder="Selecciona un nivel..."
                            />
                        </Form.Group>
                        <Form.Group controlId="formFileUpload" className="mt-3">
                            <Form.Label>Certificado (opcional)</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={handleFileChange}
                            />
                        </Form.Group>
                        <Button type="submit" className="mt-3" variant="primary">Guardar</Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
