import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Register } from "../component/register.jsx"
import "../../styles/registro-login.css"

const VistaRegister = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container-fluid d-flex align-items-center justify-content-center row mt-5" style={{ minHeight: '100vh' }}>
            {/* <div className="row w-100"> */}
                <div className="col-md-8 d-flex align-items-center justify-content-center rectangle-10">

                    <Register />

                </div>
            </div>

        // </div>
    );
};
export default VistaRegister;