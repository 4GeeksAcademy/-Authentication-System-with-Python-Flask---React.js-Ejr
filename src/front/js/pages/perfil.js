import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/perfil.css"


const Perfil = () => {
    const { store, actions } = useContext(Context)

    useEffect(() => {
        
      // Inicializar los popovers (sin guardar en una variable)
        document.querySelectorAll('[data-bs-toggle="popover"]').forEach(popoverTriggerEl => {
            new bootstrap.Popover(popoverTriggerEl);
        //Llamamos a función de ruta protegida
        actions.getPerfilUsuario()
        });
    }, []);

    return (
        <div className="container mt-4 col-md-8">
            <div className="row align-items-center user-profile">
                <div className="col-md-4 text-center position-relative">
                    <img src="https://th.bing.com/th/id/OIP.hmLglIuAaL31MXNFuTGBgAHaHa?rs=1&pid=ImgDetMain"
                        alt="User Image"
                        className="img-fluid rounded-circle profile-image"
                    />
                    <button className="btn btn-light position-absolute align-items-center d-flex"
                        style={{
                            borderRadius: "50%",
                            height: "40px",
                            width: "40px",
                            top: "15%",
                            left: "85%",
                            transform: "translate(-50%, -50%)",
                            backgroundColor: "#afb4b8"
                        }}
                        onClick={() => alert("Edit image clicked!")}>
                        <i className="fa-regular fa-pen-to-square"></i>
                    </button>
                </div>
                <div className="col-md-8 text-md-start text-center mt-3 mt-md-0 profile-info">
                    <h2>Nombre del Usuario</h2>
                </div>
                <div className="accordion mt-3" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Información personal
                            </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <div className="container mt-4">
                                    <div className="row align-items-center">
                                        <div className="col-md-8">
                                            <p><strong>Nombre:</strong> Juan Pérez</p>
                                            <p><strong>Email:</strong> juan.perez@example.com</p>
                                            <p><strong>Teléfono:</strong> +598 1234 5678</p>
                                        </div>
                                        <div className="col-md-4 text-end align-self-start d-flex justify-content-end">
                                            <span className="d-inline-block" tabindex="0" data-bs-placement="left" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-content="Esta información solo está disponible para tí y para los profesionales con los que agendes cita, nadie más puede acceder a ella.">
                                                <button className="btn btn-outline-secondary me-2" type="button" ><i className="fa-regular fa-circle-question"></i></button>
                                            </span>
                                            <button className="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i className="fa-regular fa-pen-to-square"></i></button>
                                            
                                            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                                <div className="modal-dialog">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                                                        </div>
                                                        <div className="modal-body">
                                                            ...
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                            <button type="button" className="btn btn-primary">Understood</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                Mis agendas
                            </button>
                        </h2>
                        <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classNamees that we use to style each element. These classNamees control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                Metodos de pago
                            </button>
                        </h2>
                        <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classNamees that we use to style each element. These classNamees control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Perfil