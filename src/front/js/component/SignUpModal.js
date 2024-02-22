import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const SignUpModal = props => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isOpen, setOpen] = useState(true);

    function handleSignUp(e) {987621``
        e.preventDefault();
        let registered = actions.register(name, email, password);

        if (registered) {
            navigate("/demo");
        } else {
           
        }
    }

    function closeModal() {
        setOpen(false);
    }

    return (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: isOpen ? "inline-block" : "none", cursor: "pointer" }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header bg-100 d-flex flex-column px-5">
                        <div className="d-flex flex-row justify-content-end w-100">
                            <i className="fa-solid fa-xmark" onClick={closeModal}></i>
                        </div>
                        <h4 className="modal-title">Regístrate</h4>
                    </div>
                    <div className="modal-body w-100 px-5">
                        <form className="d-flex flex-column justify-content-center align-items-center w-100 row gy-3" onSubmit={handleSignUp}>
                            <div className="form-group d-flex flex-column justify-content-center align-items-center w-100">
                                <label className="d-flex justify-content-start w-100">Nombre</label>
                                <input
                                    className="w-100 rounded-3"
                                    type="text"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="form-group d-flex flex-column justify-content-center align-items-center w-100">
                                <label className="d-flex justify-content-start w-100">Correo electrónico</label>
                                <input
                                    className="w-100 rounded-3"
                                    type="text"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-group d-flex flex-column justify-content-center align-items-center w-100">
                                <label className="d-flex justify-content-start w-100">Contraseña</label>
                                <input
                                    className="w-100 rounded-3"
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="btn-300 to-be-hoved form-control">
                                ¡REGÍSTRATE!
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

SignUpModal.propTypes = {
    
};

SignUpModal.defaultProps = {
    
};
