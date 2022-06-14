import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import InstagramEmbed from "react-instagram-embed";

export const VistaInflu = () => {
    return (
        <div className="container" >
            <div className="headerInflu container " id="imgPerfil2" style={{ display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "10px 80px" }}></div>
            {/* ------------------------ */}
            <br></br>
            {/* ------------------------ */}
            <div className="container" style={{ maxWidth: "1000px" }}>
                <div className="row container">
                    <div className="col-md-7" style={{ paddingLeft: "15px", textAlign: "right" }}>
                        <h2
                            className="title1"
                            style={{ color: "rgba(59, 102, 197, 0.952)" }}
                        >
                            Nombre del Usuario
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
                        <h6 className="textobreve2 " style={{ opacity: "40%", maxWidth: "100%" }}>
                            Breve descripción sobre el influencer, escrito por él mismo, puede
                            introducir actitudes, aptitudes y logros, etc etc.
                        </h6>

                    </div>
                    <div className="col-md-5 rounded-circle " style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                        <img src={"https://modernadepueblo.com/wp-content/uploads/2019/05/Protas-01-1024x1024.png"} style={{ maxWidth: "300px", opacity: "80%", transform: "revert" }} />
                    </div>


                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <button type="button" className="btn btn-light" style={{ marginRight: "50px" }}>
                        Enviar mensaje
                    </button>
                    <button type="button" className="btn btn-primary">
                        Seguir
                    </button>
                </div>
                {/* ------------------------ */}
                <br></br>
                <br></br>
                {/* ------------------------ */}
                <div className="row container " style={{ background: "#708fda", borderRadius: "10px 80px", paddingTop: "5px", color: "white" }}>
                    <h5 className="title2 text-center">PUBLICACIONES</h5>

                </div>
                {/* ------------------------ */}
                <br></br>
                <br></br>
                {/* ------------------------ */}
                <div className="row container">

                    AGREGAR LISTA O IMÁGENES DE PERFIL DE USUARIOS INFLUENCERS

                </div>



            </div>
            {/* ------------------------ */}
            <br></br>
            <br></br>
            {/* ------------------------ */}


            {/* --------------------------Primer POST------------------------------------------------------ */}
            {/* <img src="..." className="d-block w-100" alt="..." /> */}
            <div className="row" style={{ maxHeight: "850px" }}>
                <div
                    className="card"
                // style={{ width: "18rem", margin: "10px 40px 10px 10px" }}
                >
                    <InstagramEmbed
                        url="https://www.instagram.com/p/CelMWgKNM-T/?utm_source=ig_embed&amp%3Butm_campaign=loading"
                        clientAccessToken="123|456"
                        maxWidth={450}
                        hideCaption={false}
                        containerTagName="div"
                        protocol=""
                        injectScript
                        onLoading={() => { }}
                        onSuccess={() => { }}
                        onAfterRender={() => { }}
                        onFailure={() => { }}
                    />
                </div>
                {/* ------------------------SEGUNDO POST DE LA PRIMERA CARA DEL CARRUSEL---------------------------- */}
                <div
                    className=""
                // style={{ width: "18rem", margin: "10px 40px 10px 10px" }}
                >
                    <InstagramEmbed
                        url="https://www.instagram.com/p/Cd21f4tgO_u/"
                        clientAccessToken="123|456"
                        maxWidth={450}
                        hideCaption={false}
                        containerTagName="div"
                        protocol=""
                        injectScript
                        onLoading={() => { }}
                        onSuccess={() => { }}
                        onAfterRender={() => { }}
                        onFailure={() => { }}
                    />
                </div>
                {/* ------------tercer post del 1º cara del carrusel--------------------------------------------------------------------------- */}
                <div
                    className=""
                // style={{ width: "18rem", margin: "10px 40px 10px 10px" }}
                >
                    <InstagramEmbed
                        url="https://www.instagram.com/p/CeilXtetxx2/"
                        clientAccessToken="123|456"
                        maxWidth={450}
                        hideCaption={false}
                        containerTagName="div"
                        protocol=""
                        injectScript
                        onLoading={() => { }}
                        onSuccess={() => { }}
                        onAfterRender={() => { }}
                        onFailure={() => { }}
                    />
                </div>

                {/* ------------------------------------------------------------------------------------ */}
                {/* ----------------cuarto post ---------------------------------------------------------- */}
                <div
                    className=""
                // style={{ width: "18rem", margin: "10px 40px 10px 10px" }}
                >
                    <InstagramEmbed
                        url="https://www.instagram.com/p/CeilXtetxx2/"
                        clientAccessToken="123|456"
                        maxWidth={450}
                        hideCaption={false}
                        containerTagName="div"
                        protocol=""
                        injectScript
                        onLoading={() => { }}
                        onSuccess={() => { }}
                        onAfterRender={() => { }}
                        onFailure={() => { }}
                    />



                </div>
            </div>

            {/* ------------------------------------------------------------------------------------ */}

        </div>
    );
};
