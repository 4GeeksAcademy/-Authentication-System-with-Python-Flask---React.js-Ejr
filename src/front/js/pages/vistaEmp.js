import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const VistaEmp = () => {
    return <>
        <div className="container">
            <div className="row" style={{ maxWidth: "1440px", border: "1px solid lightgrey", borderRadius: "10px 80px" }}>

                <div className=" col-4 img-principal"
                    id="imgPerfil"
                    style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
                    <img
                        className="img img-fluid"
                        style={{ maxWidth: "400px", maxHeight: "350px" }}
                        src={
                            ""
                        }
                        alt={"imgPefil"}
                    />
                </div>
                <br></br>
                <br></br>
                <div className="col-8" >
                    <div className="headerVI" style={{ position: "relative", marginTop: "100px" }}>
                        <h1
                            className="title1"
                            style={{ color: "rgba(59, 102, 197, 0.952)" }}
                        >
                            Moderna de Pueblo
                        </h1>
                        <h3 className="title2 ">SECTOR AL QUE PERTENECE</h3>
                        <h5 className="textoBreve1 " style={{ pacity: "40%" }}>
                            Eslogan
                        </h5>
                        <br></br>
                        <h5 className="textobreve2 " style={{ opacity: "40%", maxWidth: "80%" }}>
                            Breve descripción sobre el influencer, escrito por él mismo, puede
                            introducir actitudes, aptitudes y logros.
                        </h5>
                    </div>
                    <br></br>
                    <br></br>



                </div>
            </div>

        </div>




    </>

}