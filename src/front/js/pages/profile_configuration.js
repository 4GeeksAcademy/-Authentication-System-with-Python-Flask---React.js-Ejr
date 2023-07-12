import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Profile_navbar } from "../component/profile_navbar";
import "/workspaces/Watacar_v2/src/front/styles/profile.css"

export const Profile_configuration = () => {
    const {actions, store} = useContext(Context);
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [eye1, setEye1] = useState(true); 
    const [eye2, setEye2] = useState(true);
    const [data, setData] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");

    

useEffect (() => {
    actions.getUser()
}, [])

const validatePasswords = () => {
    if (password1 !== password2) {
      alert("Las contraseñas no coinciden");
      return false;
    }
    handlePasswordChange();
    //Aquí se añadirá la función para que se guarde en BD o lo que Marcos nos diga que tenemos que hacer con las contraseñas

    return true;
  };

const handleEye1 = () => {
    setEye1(!eye1);
};

const handleEye2 = () => {
    setEye2(!eye2);
};

const handlePasswordChange1 = (e) => {
    setPassword1(e.target.value);
};

const handlePasswordChange2 = (e) => {
    setPassword2(e.target.value);
};

const handlePasswordChange = () => {
    const updatedData = {
      ...store.user,
      password: password1
    };

    const putConfig = {
      method: "PUT",
      body: JSON.stringify({
        password: updatedData.password
      }),
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    };

    fetch(process.env.BACKEND_URL + "api/configuration/password", putConfig)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error al guardar la contraseña");
      })
      .then((responseData) => {
        setData({ ...data, response: responseData });
        setPassword1("");
        setPassword2("");
        setTimeout(() => {
          closeModal();
        }, 1000);
        setSuccessMessage("Contraseña guardada correctamente");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const closeModal = () => {
    const modal = document.getElementById("exampleModal");
    const modalInstance = bootstrap.Modal.getInstance(modal);
    modalInstance.hide();
  };

    return store.user ? (
        <>
            <Profile_navbar />
            <div className="container_profile">
                <div className="avatar_container">
                    <img src="https://appsdejoseluis.com/wp-content/uploads/2020/04/face_co.png" alt="Avatar" className="avatar_image" />
                </div>
                <div className="profile_info">
                    <div className="row row_profile_configuration">
                        <h4 className="col-3 label">Nombre y apellidos:</h4>
                        <h4 className="col-8 user_data">{store.user.full_name}</h4>
                    </div>
                    <div className="row row_profile_configuration">
                        <h4 className="col-3 label">Email:</h4>
                        <h4 className="col-8 user_data">{store.user.email}</h4>
                    </div>
                    <div className="row row_profile_configuration">
                        <h4 className="col-3 label">Tipo de documento:</h4>
                        <h4 className="col-8 user_data">{store.user.document_type}</h4>
                    </div>
                    <div className="row row_profile_configuration">
                        <h4 className="col-3 label">Número del documento:</h4>
                        <h4 className="col-8 user_data">{store.user.document_number}</h4>
                    </div>
                    <div className="row row_profile_configuration">
                        <h4 className="col-3 label">Teléfono:</h4>
                        <h4 className="col-8 user_data">{store.user.phone}</h4>
                    </div>
                    <div className="row row_profile_configuration">
                        <h4 className="col-3 label">Dirección:</h4>
                        <h4 className="col-8 user_data">{store.user.address}</h4>
                    </div>
                    <div className="row row_edit_profile">
                        <button className="change_password" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Cambiar contraseña</button>
                        <Link to="/configuration" className="edit_profile col-3 label">
                            Editar 
                        </Link>
                        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content sold-product_profile">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Vas a cambiar tu contraseña</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <div>
                                            <label htmlFor="contraseña" className="password_label row">Nueva contraseña </label>
                                            <input type={eye1 ? "password" : "text"} className="change_password_input" id="password1" placeholder="Nueva Contraseña" value={password1} onChange={handlePasswordChange1} />
                                            <i
                                                className={!eye1 ? "fa-solid fa-eye icon" : "fa-solid fa-eye-slash icon"}
                                                onClick={handleEye1}
                                            ></i>
                                        </div>
                                        <div>
                                            <label htmlFor="contraseña" className="password_label row">Repetir contraseña </label>
                                            <input type={eye2 ? "password" : "text"} className="change_password_input" id="password2" placeholder="Repetir Contraseña" value={password2} onChange={handlePasswordChange2} />
                                            <i
                                                className={!eye2 ? "fa-solid fa-eye icon" : "fa-solid fa-eye-slash icon"}
                                                onClick={handleEye2}
                                            ></i>
                                        </div>
                                        <div className="success-message">{successMessage}</div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn_config cancel" data-bs-dismiss="modal">Cancelar</button>
                                        <button
                                            type="button"
                                            className="btn btn_config reservado"
                                            onClick={() => {
                                                if (validatePasswords()) {
                                                handlePasswordChange();
                                                }
                                            }}
                                            >
                                            Guardar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    ): "cargando...";
}