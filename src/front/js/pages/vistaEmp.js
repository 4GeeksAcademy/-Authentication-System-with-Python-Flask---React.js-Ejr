import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const VistaEmp = () =>{
    return <>
        <div className="container-fluid">
            <div
                className="container img-principal"
                id="imgPerfil2"
                style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                borderRadius: "10px 80px",
                minHeight: "500px",
                }}
            >
                <img
                className="img2 rounded-circle"
                style={{ maxWidth: "250px", height:"250px" }}
                src={
                    "https://images.pexels.com/photos/3184430/pexels-photo-3184430.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                }
               
                />
            </div>
            <br></br>
            <br></br>

            <div className="headerVI" style={{ position: "relative" }}>
                <h1
                className="title1 text-center"
                style={{ color: "rgba(59, 102, 197, 0.952)" }}
                >
                Nombre de Empresa
                </h1>
                <h3 className="title2 text-center">SECTOR AL QUE PERTENECE</h3>
                <h5 className="textoBreve1 text-center" style={{ opacity: "40%" }}>
                Eslogan
                </h5>
                <br></br>
                <h5 className="textobreve2 text-center " style={{ opacity: "40%" }}>
                Breve descripción sobre el influencer, escrito por él mismo, puede
                introducir actitudes, aptitudes y logros.
                </h5>
                <h5 className="textobreve2 text-center " style={{ opacity: "40%" }}>
                Ubicación .... Provincia, ciudad             </h5>
            </div>
            <br></br>
            <br></br>
            <div
                className="publicaciones"
                style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                }}
            >
                <h2>INFLUENCERS FAVORITOS</h2>
            </div>
            <br></br>
            <br></br>



        </div>
    
    
    
    
    </>

}