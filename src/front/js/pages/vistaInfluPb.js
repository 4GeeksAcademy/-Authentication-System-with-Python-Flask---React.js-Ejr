import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { IframeInstagram } from "../component/iFrameInsta";

export const VistaInfluPb = () => {
    const { store, actions } = useContext(Context);
    const [url, setUrl] = useState("");
    // const [lista, setLista] = useState([]);
   
    // useEffect(() => {
	// 	console.log(lista);
	// }, [lista]);

    return (
        <div className="container" >
            <div className="headerInflu container-fluid " id="imgPerfil2" style={{ display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "10px 80px" }}></div>
            {/* ------------------------ */}
            <br></br>
            {/* ------------------------ */}
            <div className="container" style={{ maxWidth: "100%" }}>
                <div className="row container">
                    <div className="col-md-7" style={{ paddingLeft: "15px", textAlign: "right" }}>
                        <h2
                            className="title1"
                            style={{ color: "#458fff" }}
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
                {/* --------DOBLE ESPACIO----------------- */}
                <br></br>
                <br></br>
                {/* ------------------------ */}
                <div className="row container " style={{ background: "#458fff", borderRadius: "10px 80px", paddingTop: "5px", color: "white" }}>
                    <h5 className="title2 text-center">PUBLICACIONES</h5>

                </div>
                {/* --------------------ESPACIO DONDE SE AGREGARÁN LOS POST --------------------------------------------------------*/}

                <div className="row ">
                    {store.posts?.map((e, i) => {
                        return (
                            <div key={i} className="col-4">
                                <IframeInstagram url={e} />
                            </div>
                        );
                    })}
                </div>


            </div>





        </div>
    );
};
