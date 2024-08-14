import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import "/workspaces/hablemos-uy-api/src/front/styles/modalProfile.css";


const ModalProfile = ({ show, onClose, imageSrc, onEdit, onAdd, onDelete }) => {
    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Gestiona tu foto de perfil</h2>
                    <button className="close-button" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className="modal-body">
                    <div className="image-container">
                        <img
                            src={imageSrc || "https://via.placeholder.com/150"}
                            alt="Perfil"
                            className="profile-image"
                        />
                    </div>
                    <div className="modal-actions">
                        <button onClick={onEdit} className="btn btn-light d-flex flex-column align-items-center">
                            <i className="far fa-edit"></i>
                            <span>Editar</span>
                        </button>
                        <button onClick={onAdd} className="btn btn-light d-flex flex-column align-items-center">
                            <i className="fas fa-camera"></i>
                            <span>Añadir foto</span>
                        </button>

                        <button onClick={onDelete} className="btn btn-light d-flex flex-column align-items-center">
                            <i className="far fa-trash-alt"></i>
                            <span>Eliminar</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProfilePage = () => {
    const [showModal, setShowModal] = useState(false);
    const [profileImage, setProfileImage] = useState("");

    const handleEdit = () => {
        alert("Editar imagen");
    };

    const handleAdd = () => {
        alert("Añadir nueva imagen");
    };

    const handleDelete = () => {
        setProfileImage("");
        alert("Imagen eliminada");
    };

    return (
        <div>
            <button onClick={() => setShowModal(true)}>Gestionar foto de perfil</button>
            <ModalProfile
                show={showModal}
                onClose={() => setShowModal(false)}
                imageSrc={profileImage}
                onEdit={handleEdit}
                onAdd={handleAdd}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default ProfilePage;