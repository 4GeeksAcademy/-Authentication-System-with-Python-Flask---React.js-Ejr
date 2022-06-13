import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import InstagramEmbed from "react-instagram-embed";

export const VistaInflu = () => {
    return (
        <div className="container" >
            <div className="row" style={{ maxWidth: "1440px", border: "1px solid lightgrey", borderRadius: "10px 80px" }}>

                <div className=" col-4 img-principal"
                    id="imgPerfil"
                    style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
                    <img
                        className="img img-fluid"
                        style={{ maxWidth: "400px", maxHeight: "350px" }}
                        src={
                            "https://modernadepueblo.com/wp-content/uploads/2019/05/Protas-01-1024x1024.png"
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


                <div
                    className=" row publicaciones"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <h2>PUBLICACIONES</h2>
                </div>
                <br></br>
                <br></br>

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
