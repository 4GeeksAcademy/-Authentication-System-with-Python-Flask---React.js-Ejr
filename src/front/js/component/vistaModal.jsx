import React, { useEffect, useState, useContext, useRef } from "react";
import { Context } from "../store/appContext";
import "/workspaces/hablemos-uy-api/src/front/styles/modalProfile.css";



const VistaModal = ({ show, onClose, imageSrc, onDelete }) => {
    const { actions, store } = useContext(Context);

    const defaultFile = 'https://static.vecteezy.com/system/resources/thumbnails/000/495/460/small/22_Profile.jpg';
    const fileInputRef = useRef(null);
    const imgRef = useRef(null);

    const [showModal, setShowModal] = useState(show);
    const [profileImage, setProfileImage] = useState(imageSrc || defaultFile);

    useEffect(() => {
        if (show) {
            const fileInput = fileInputRef.current;
            const imgElement = imgRef.current;

            const handleFileChange = async (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        imgElement.src = e.target.result;
                    };
                    reader.readAsDataURL(file);

                    // Llamada a la acción para manejar la subida de la imagen
                    const preset_name = "hablemosuy";  // Preset de Cloudinary.
                    const cloud_name = "dooy3klb6";
                    const data = new FormData();
                    data.append('file', file);  // Usa el archivo directamente.
                    data.append('upload_preset', preset_name);
                    
                    await actions.uploadImage(data,cloud_name,preset_name);
                    console.log(store.imagenURL);
                    
                } else {
                    imgElement.src = defaultFile;
                }
            };

            fileInput.addEventListener('change', handleFileChange);

            return () => {
                fileInput.removeEventListener('change', handleFileChange);
            };
        }
    }, [show, actions]);

    const handleDeleteClick = () => {
        imgRef.current.src = defaultFile; // Restablece la imagen al valor predeterminado.
        setProfileImage(defaultFile); // Actualiza el estado local.
        onDelete(); // Llama a la función onDelete para manejar la eliminación de la imagen.
    };

    if (!show) return null; // Si el modal no se debe mostrar, retorna null.

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
                        src={profileImage}
                        alt="avatar"
                        id="img"
                        ref={imgRef}
                    />
                    <input
                        type="file"
                        name="foto"
                        id="foto"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                    />
                </div>
                <div className="modal-actions d-flex flex-row gap-3">
                    <button
                        className="btn btn-light d-flex flex-column align-items-center"
                        onClick={() => fileInputRef.current.click()}
                    >
                        <i className="fas fa-camera"></i>
                        <span>Añadir foto</span>
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