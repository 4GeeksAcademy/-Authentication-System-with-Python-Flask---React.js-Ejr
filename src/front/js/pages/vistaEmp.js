import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const VistaEmp = () => {
    return <>
        <div className="container">
            <div className="headerEmp container border" id="imgPerfil" style={{ display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "5px 5px 80px 80px"}}>
            </div>
            {/* ------------------------ */}
            <br></br>
            {/* ------------------------ */}
            <div className="row container" style={{ display: "flex", justifyContent: "right", alignItems:"right", marginTop: "5px" }}>
                
                <div class="btn-group" style={{height: "40px", width: "40px",  marginRight:"100px" }}>
                    {/* <button type="button" class="btn btn-light"><i class="fas fa-home"><a class="dropdown-item" href={"/vistaInflu"}></a></i></button> */}
                    <button type="button" class="btn btn-light dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" >
                        <i class="fas fa-user-edit"></i>
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href={"/formulario-empresas"}>Editar Perfil</a></li>
                        {/* <li><a class="dropdown-item" href="/">Another action</a></li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li> */}
                        <li><hr class="dropdown-divider"/></li>
                        <li><a class="dropdown-item" href="#">Cerrar Sesión</a></li>
                    </ul>
                </div>
            </div>
            {/* ----------------------------------------------------------------------------------- */}
            <div className="container" style={{ maxWidth: "1000px" }}>
                <div className="row container">
                    <div className="col-md-7" style={{ paddingLeft: "15px", textAlign: "right" }}>
                        <h1
                            className="title1"
                            style={{ color: "#458fff"}}
                        >
                            Nombre de la Empresa
                        </h1>
                        <h4 className="title2 ">Sector al que pertenece</h4>
                        <h6 className="textoBreve1 " style={{ opacity: "40%" }}>
                            Eslogan
                        </h6>
                        <h5 className="textoBreve1 " style={{ opacity: "40%" }}>
                            Provincia (Ciudad)
                        </h5>
                        <br></br>
                        <br></br>
                        <h6 className="textobreve2 " style={{ opacity: "40%", maxWidth: "100%", }}>
                            Breve descripción sobre la empresa, escrito por ella misma, puede
                            introducir actitudes, aptitudes y logros.
                        </h6>

                    </div>
                    <div className="col-md-5" style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                        <img src={"https://cdn-icons-png.flaticon.com/512/1087/1087815.png"} style={{ maxWidth: "180px", opacity: "80%", transform: "revert" }} />
                    </div>

                </div>
                {/* ------------------------ */}
                <br></br>
                <br></br>
                {/* ------------------------ */}
                <div className="row container " style={{ background: "#458fff", borderRadius: "10px 80px", paddingTop: "5px", color: "white", maxWidth:"100%" }}>
                    <h5 className="title2 text-center">INFLUENCERS FAVORITOS</h5>

                </div>
                {/* ------------------------ */}
                <br></br>
                <br></br>
                {/* ------------------------ */}
                <div className="row container">

                    AGREGAR LISTA O IMÁGENES DE PERFIL DE USUARIOS INFLUENCERS

                </div>



            </div>

        </div>




    </>

}