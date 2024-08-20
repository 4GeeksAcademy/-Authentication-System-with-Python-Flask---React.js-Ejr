import React, { useEffect, useState, useContext, useRef } from "react";
import { Context } from "../store/appContext";
import "/workspaces/hablemos-uy-api/src/front/styles/modalProfile.css";
import defaultAvatar from "../../img/avatar.jpg"


const VistaModal = ({ show, onClose, imageSrc }) => {
    const { actions, store } = useContext(Context);

    const [file, setFile] = useState()
    const [profileImage, setProfileImage] = useState(imageSrc || null);

    const handleDeleteClick = () => {

        setProfileImage(defaultAvatar);
        actions.saveProfileImg(null)
    };
    const handleSave = async () => {
        const cloud_name = 'dooy3klb6'; // Reemplaza con tu nombre de cloud
        if (profileImage) {

            if (store.dataUser && store.dataUser.correo) {
                const response = await actions.uploadImage(file, cloud_name);
                if (response) {
                    setProfileImage(response)
                }
            } else {
                console.error("User Correo is undefined or null.");
            }
        } else {
            console.error("No hay una imagen seleccionada para guardar.");
        }
    };
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
                            src={profileImage == null ? defaultAvatar : profileImage}
                            alt="avatar"

                        />

                    </div>
                    <div className="modal-actions d-flex flex-row gap-3">
                        <div>
                            <label
                                className="btn btn-light d-flex flex-column align-items-center"
                                htmlFor="fileInput"
                            >
                                <i className="fas fa-camera"></i>
                                <span>Añadir foto</span>
                            </label>
                            <input id="fileInput"
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    setFile(e.target.files[0])
                                    setProfileImage(URL.createObjectURL(e.target.files[0]))
                                }}
                            />

                        </div>
                        <button
                            onClick={handleSave}
                            className="btn btn-light d-flex flex-column align-items-center"
                        >
                            <i className="far fa-save"></i>
                            <span>Guardar</span>
                        </button>
                        <button
                            onClick={handleDeleteClick}
                            className="btn btn-light d-flex flex-column align-items-center"
                        >
                            <i className="far fa-trash-alt"></i>
                            <span>Eliminar</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VistaModal;
