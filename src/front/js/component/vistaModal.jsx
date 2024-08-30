import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import "/workspaces/hablemos-uy-api/src/front/styles/modalProfile.css";
import defaultAvatar from "../../img/avatar.jpg";
import TrashButton from "../component/trashButton.jsx";
import SaveButton from "../component/saveButton.jsx";
import CameraButton from "../component/cameraButton.jsx";

const VistaModal = ({ show, onClose, imageSrc }) => {
    const { actions, store } = useContext(Context);

    const [file, setFile] = useState();
    const [profileImage, setProfileImage] = useState(imageSrc || null);

    const handleDeleteClick = () => {
        setProfileImage(defaultAvatar);
        actions.saveProfileImg(null);
    };

    const handleSave = async () => {
        const cloud_name = 'dooy3klb6'; // Reemplaza con tu nombre de cloud
        if (profileImage) {
            if (store.dataUser && store.dataUser.correo) {
                const response = await actions.uploadImage(file, cloud_name);
                if (response) {
                    setProfileImage(response);
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
                            className="modal-image"
                        />
                    </div>
                    <div className="modal-actions d-flex flex-row gap-3">
                        <div>
                            <label
                                className="d-flex flex-column align-items-center"
                                htmlFor="fileInput"
                                style={{ cursor: "pointer" }}
                            >
                                <span onClick={() => document.getElementById("fileInput").click()}>
                                    <CameraButton />
                                </span>
                                <span onClick={() => document.getElementById("fileInput").click()}>
                                    Añadir foto
                                </span>
                            </label>
                            <input
                                id="fileInput"
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    setFile(e.target.files[0]);
                                    setProfileImage(URL.createObjectURL(e.target.files[0]));
                                }}
                            />
                        </div>
                        <div
                            onClick={handleSave}
                            className="d-flex flex-column align-items-center"
                        >
                            <SaveButton />
                            <span>Guardar</span>
                        </div>
                        <div
                            onClick={handleDeleteClick}
                            className="d-flex flex-column align-items-center"
                        >
                            <TrashButton />
                            <span>Eliminar</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VistaModal;
