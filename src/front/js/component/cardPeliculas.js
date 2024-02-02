import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const CardPeliculas = ({ nombrePelicula, generoPelicula }) => {
    const { actions } = useContext(Context);
    const [paginaActual, setPaginaActual] = useState(1);
    const totalPaginas = 6; // Cambiar esto según el número total de páginas
    const cambiarPagina = (nuevaPagina) => {
        setPaginaActual(nuevaPagina);
    };

    const generarBotones = () => {
        const botones = [];
        for (let i = 1; i <= totalPaginas; i++) {
            const numeroClase = paginaActual === i ? "numero-de-color" : "numero-normal";
            botones.push(
                <button
                    key={i}
                    onClick={() => cambiarPagina(i)}
                    className={`btn btn-no-border btn-con-espacio btn-fondo-contenedor ${paginaActual === i ? "pagina-actual" : ""
                        }`}
                >
                    <span className={numeroClase}>{i}</span>
                </button>
            );
        }
        return botones;
    };

    return (
        <>
            <div className="card-title text-light" style={{ paddingLeft: "25px", fontFamily: "Poppins, Work Sans" }}>
                <h3>Explora Todas Las Peliculas Que Tenemos Para Vos</h3>
            </div>
            <div className="container-fliud d-flex" style={{ backgroundColor: "#3B3B3B" }}>
                <div className="row justify-content-evenly">
                    <div className="col-md-4 mb-4">
                        <div className="card text-light rounded-lg" style={{ width: "18rem", backgroundColor: "#2B2B2B", borderRadius: "15px", marginLeft: "20px" }}>
                            {/* Contenido de la tarjeta */}
                            <img
                                src={"https://images.pexels.com/photos/4065578/pexels-photo-4065578.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"} //#+ (id) + ".jpg"
                                className="card-img-top"
                                style={{ borderTopLeftRadius: "15px", borderTopRightRadius: "15px" }}
                                alt="..."
                            />
                            <div className="card-body">
                                <h5 className="card-title" style={{ fontFamily: "Poppins, Work Sans" }}>Título: {nombrePelicula}</h5>
                                <p className="card-title" style={{ fontFamily: "Poppins, Work Sans" }}> Género: {generoPelicula} </p>
                                {/*<Link to={"/pagesPeliculas/" + id} className="btn bg-dark text-white">Learn More!</Link>*/}
                                <div className="col-md d-flex justify-content-end">
                                    <Link to={"/pagesPeliculas/"} className="btn btn-dark btn-no-border mt-3" style={{ marginRight: "140px", width: "36px" }} title="Más información">
                                        <i class="fa-solid fa-arrow-down"></i>
                                    </Link>                                                                        {/*FLUX*/}
                                    <button className="btn btn-sm btn-custom-purple border-0 mt-3" onClick={() => actions.agregarMiLista(nombrePelicula)}>
                                        + Mi Lista
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fliud d-flex" style={{ backgroundColor: "#3B3B3B" }}>
                <div className="row justify-content-evenly">
                    <div className="col-md-4 mb-4">
                        <div className="card text-light rounded-lg" style={{ width: "18rem", backgroundColor: "#2B2B2B", borderRadius: "15px", marginLeft: "20px" }}>
                            {/* Contenido de la tarjeta */}
                            <img
                                src={"https://images.pexels.com/photos/4065578/pexels-photo-4065578.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"} //#+ (id) + ".jpg"
                                className="card-img-top"
                                style={{ borderTopLeftRadius: "15px", borderTopRightRadius: "15px" }}
                                alt="..."
                            />
                            <div className="card-body">
                                <h5 className="card-title" style={{ fontFamily: "Poppins, Work Sans" }}>Título: {nombrePelicula}</h5>
                                <p className="card-title" style={{ fontFamily: "Poppins, Work Sans" }}> Género: {generoPelicula} </p>
                                {/*<Link to={"/pagesPeliculas/" + id} className="btn bg-dark text-white">Learn More!</Link>*/}
                                <div className="col-md d-flex justify-content-end">
                                    <Link to={"/pagesPeliculas/"} className="btn btn-dark btn-no-border mt-3" style={{ marginRight: "140px", width: "36px" }} title="Más información">
                                        <i class="fa-solid fa-arrow-down"></i>
<<<<<<< HEAD
                                    </Link>                                                                        {/*FLUX*/}
                                    <button className="btn btn-sm btn-custom-purple border-0 mt-3" onClick={() => actions.agregarMiLista(nombrePelicula)}>
=======
                                    </Link>                                                                       {/*FLUX*/}
                                    <button className="btn btn-sm btn-custom-purple border-0 mt-3" style={{fontWeight:"bold"}} onClick={() => actions.agregarMiLista(nombrePelicula)}>
>>>>>>> ff68db7 ([Más de la Pag Inicial])
                                        + Mi Lista
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Contador de páginas */}
            <div className="d-flex justify-content-center mt-3">
                {generarBotones()}
            </div>
        </>
    );
};
