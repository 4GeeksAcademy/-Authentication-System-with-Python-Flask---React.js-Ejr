import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const VistaEmp = () => {
    return <>
        <div className="container- fluid">
            <div className="headerEmp container border" id="imgPerfil" style={{ display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "10px 80px" }}>
            </div>
            {/* ------------------------ */}
            <br></br>
            <br></br>
            {/* ------------------------ */}
            <div className="container" style={{ maxWidth: "1000px" }}>
                <div className="row container">
                    <div className="col-md-6" style = {{paddingLeft: "15px",  textAlign: "right"}}>
                        <h2
                            className="title1"
                            style={{ color: "rgba(59, 102, 197, 0.952)" }}
                        >
                            Nombre de la Empresa
                        </h2>
                        <h5 className="title2 ">Sector al que pertenece</h5>
                        <h6 className="textoBreve1 " style={{ opacity: "40%" }}>
                            Eslogan
                        </h6>
                        <h7 className="textoBreve1 " style={{ opacity: "40%" }}>
                            Provincia (Ciudad)
                        </h7>
                        <br></br>
                        <br></br>
                        <h5 className="textobreve2 " style={{ opacity: "40%", maxWidth: "100%",  }}>
                            Breve descripción sobre la empresa, escrito por ella misma, puede
                            introducir actitudes, aptitudes y logros.
                        </h5>

                    </div>
                    <div className="col-md-6" style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                        <img src={"https://cdn-icons-png.flaticon.com/512/1087/1087815.png"} style={{ maxWidth: "180px", opacity: "80%", transform: "revert" }} />
                    </div>


                </div>
                <br></br>
                <br></br>
                <div className="row container " style={{background: "#708fda", borderRadius: "10px 80px", paddingTop: "5px", color: "white"}}>
                    <h5 className="title2 text-center">INFLUENCERS FAVORITOS</h5>

                </div>
                <br></br>
                <br></br>
                <div className="row container">

                        AGREGAR LISTA O IMÁGENES DE PERFIL DE USUARIOS INFLUENCERS

                </div>



            </div>




            {/* <div className="headerEmp" style={{ maxWidth: "1440px", border: "1px solid lightgrey", borderRadius: "10px 80px" }}>

             
                <div className="col-8" >
                    <div className="headerVI" style={{ position: "relative", marginTop: "100px" }}>
                       
                        
                    </div>
                    <br></br>
                    <br></br>



                </div>
            </div> */}

        </div>




    </>

}