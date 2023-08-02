import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Profile_navbar } from "../component/profile_navbar";
import { Placeholder_profile } from "./placeholder_profile";
import "/workspaces/Watacar_v2/src/front/styles/profile.css";
export const Profile_configuration = () => {
  const { actions, store } = useContext(Context);
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [eye1, setEye1] = useState(true);
  const [eye2, setEye2] = useState(true);
  const [data, setData] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  /*useEffect(() => {
    actions.getUser();
    // Add event listener for "Enter" key when the modal is shown
    const modal = document.getElementById("exampleModal");
    modal.addEventListener("shown.bs.modal", handleModalShown);
    // Remove event listener when the component unmounts
    return () => {
      modal.removeEventListener("shown.bs.modal", handleModalShown);
    };
  }, []);
  const handleModalShown = () => {
    // Add event listener for "Enter" key
    document.addEventListener("keydown", handleEnterKey);
  };
  */
  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (validatePasswords()) {
        handlePasswordChange();
      }
    }
  };
  const validatePasswords = () => {
    if (password1 !== password2) {
      Swal.fire({
        icon: 'error',
        title: 'Las contraseñas no coinciden',
        text: 'vuelve a intentarlo',
       
      });
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
      password: password1,
    };
    const putConfig = {
      method: "PUT",
      body: JSON.stringify({
        password: updatedData.password,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
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
        Swal.fire({
          icon: 'success',
          title: 'Nueva contraseña guardada'
         
        });
        setTimeout(() => {
          closeModal();
        }, 1000);
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
      <div className="container_profile mx-4">
        <div className="mx-5 px-5 box w-100">
        <div className="d-lg-flex justify-content-start my-5">
          <img
            className="avatar_image"
            src="https://appsdejoseluis.com/wp-content/uploads/2020/04/face_co.png"
            alt="Avatar"
          />
        </div>
        <div className="profile_info m-auto pb-5">
          <div className="row_profile_configuration mx-1 justify-content-around text-center mx-1 justify-content-around text-center">
            <h4 className="text-wrap badge label col-10 col-sm-10 col-md-10 col-lg-12 ">
              Nombre y apellidos:
            </h4>
            <h4 className="user_data text-start">{store.user.full_name}</h4>
          </div>
          <div className="row_profile_configuration mx-1 justify-content-around text-center">
            <h4 className="text-wrap badge label col-10 col-sm-10 col-md-10 col-lg-12 ">
              Email:
            </h4>
            <h4 className="col-8 user_data text-start">{store.user.email}</h4>
          </div>
          <div className="row_profile_configuration mx-1 justify-content-around text-center">
            <h4 className="text-wrap badge label col-10 col-sm-10 col-md-10 col-lg-12  ">
              Tipo de documento:
            </h4>
            <h4 className="user_data text-start">{store.user.document_type}</h4>
          </div>
          <div className="row_profile_configuration">
            <h4 className="text-wrap badge label col-10 col-sm-10 col-md-10 col-lg-12 ">
              Nº del documento:
            </h4>
            <h4 className="user_data text-start">{store.user.document_number}</h4>
          </div>
          <div className="row_profile_configuration mx-1 justify-content-around text-center">
            <h4 className="text-wrap badge label col-10 col-sm-10 col-md-10 col-lg-12 ">
              Teléfono:
            </h4>
            <h4 className="user_data text-start">{store.user.phone}</h4>
          </div>
          <div className="row_profile_configuration mx-1 justify-content-around text-center">
            <h4 className="text-wrap badge label  col-10 col-sm-10 col-md-10 col-lg-12 ">
              Dirección:
            </h4>
            <h4 className="user_data text-start">{store.user.address}</h4>
          </div>
          <hr className="mb-4"></hr>
          <div className="mt-5 justify-content-lg-end justify-content-md-end justify-content-md-start justify-content-xs-end d-lg-flex d-md-flex d-sm-flex">
            <button
              className="change_password my-2 col-lg-8 col-md-6 me-2"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Cambiar contraseña
            </button>
            <Link
              to="/configuration"
              className="edit_profile col-lg-4 col-md-4 mt-2 label"
            >
              Editar
            </Link>
            {/* AQUÍ EMPIEZA EL MODAL */}
            <div
              className="modal fade m-auto"
              id="exampleModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog m-auto">
                <div className="modal-content sold-product_profile m-auto">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      <strong>Vas a cambiar tu contraseña</strong>
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body m-auto">
                    <div className="input-with-icon2 m-auto">
                      <label htmlFor="contraseña" className="password_label row">
                        <strong>Nueva contraseña</strong>
                      </label>
                      <input
                        type={eye1 ? "password" : "text"}
                        className="change_password_input"
                        id="password1"
                        placeholder="Nueva Contraseña"
                        value={password1}
                        onChange={handlePasswordChange1}
                      />
                      <label htmlFor="password1" className="input-with-icon2">
                        <i
                          className={
                            !eye1
                              ? "iconAux fa-solid fa-eye icon"
                              : "iconAux fa-solid fa-eye-slash icon"
                          }
                          onClick={handleEye1}
                        ></i>
                      </label>
                    </div>
                    <div className="input-with-icon2 m-auto">
                      <label htmlFor="contraseña" className="password_label row ">
                        <strong>Repetir contraseña</strong>
                      </label>
                      <input
                        type={eye2 ? "password" : "text"}
                        className="change_password_input"
                        id="password2"
                        placeholder="Repetir Contraseña"
                        value={password2}
                        onChange={handlePasswordChange2}
                      />
                      <label htmlFor="password2" className="input-with-icon2">
                        <i
                          className={
                            !eye2
                              ? "fa-solid fa-eye icon iconAux"
                              : "iconAux fa-solid fa-eye-slash icon"
                          }
                          onClick={handleEye2}
                        ></i>
                      </label>
                    </div>
                    <div className="success-message">{successMessage}</div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn_config cancel text-danger"
                      data-bs-dismiss="modal"
                    >
                      Cancelar
                    </button>
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
      </div>
    </>
  ) : (
    <Placeholder_profile />
  );
};