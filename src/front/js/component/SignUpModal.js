import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const SignUpModal = props => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = async ()  => {
            let registrer = await  actions.register(name, email, password);
            if (registrer == true ){
             await actions.login(email,password)
             props.onClose()
            }
            else{
            // toast.error(`Email already exists`)
            setName("")
            setEmail("")
            setPassword("")
            }
    }


    return (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: props.show ? "inline-block" : "none", cursor: "pointer" }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header bg-100 d-flex flex-column px-5">
                        <div className="d-flex flex-row justify-content-end w-100">
                        <i className="fa-solid fa-xmark" onClick={() => props.onClose()}></i>
                        </div>
                        <h4 className="modal-title">Regístrate</h4>
                    </div>
                    <div className="modal-body w-100 px-5">
                        <form className="d-flex flex-column justify-content-center align-items-center w-100 row gy-3" onSubmit={handleSignUp}>
                            <div className="form-group d-flex flex-column justify-content-center align-items-center w-100">
                                <label className="d-flex justify-content-start w-100">Nombre</label>
                                <input
                                    value={name}
                                    className="w-100 rounded-3"
                                    type="text"
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group d-flex flex-column justify-content-center align-items-center w-100">
                                <label className="d-flex justify-content-start w-100">Correo electrónico</label>
                                <input
                                    value={email}
                                    className="w-100 rounded-3"
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group d-flex flex-column justify-content-center align-items-center w-100">
                                <label className="d-flex justify-content-start w-100">Contraseña</label>
                                <input
                                    value={password}
                                    className="w-100 rounded-3"
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn-300 to-be-hoved form-control w-50">
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
