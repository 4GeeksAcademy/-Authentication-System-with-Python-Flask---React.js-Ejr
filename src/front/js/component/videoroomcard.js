import React from "react";
import cocina from "../../img/cocina.jpeg";
import tertulias from "../../img/tertulias.jpeg";
import rap from "../../img/rap.jpeg";
import ravera from "../../img/ravera.jpeg";
import abueloarquitecto from  "../../img/abueloarquitecto.jpeg";
import abuelosgamers from "../../img/abuelosgamers.jpeg";
import abueloviajero from "../../img/abueloviajero.jpeg";


export const VideoRoomCard = () => {
    return (
        <div
            id="carouselExampleDark"
            className="carousel carousel-dark slide d-flex align-items-center justify-content-center"
        >
            <div className="carousel-inner">
                <div className="carousel-item active" data-bs-interval={10000}>
                    <div style={{ position: "relative" }}>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "flex-end",
                                position: "absolute",
                                bottom: "20px",
                                left: "20px",
                                right: "20px",
                                backgroundColor: "rgba(0, 0, 0, 0)",
                                padding: "20px",
                                color: "white",
                            }}
                        >
                            <h1
                                style={{
                                    color: "white",
                                    backgroundColor: "black",
                                    padding: "10px",
                                    margin: "0",
                                }}
                            >
                                Cocina con la abuela
                            </h1>
                        </div>
                        <a href="roomcocina">
                            <img
                                className="img-fluid mx-auto d-block"
                                src={cocina}
                                alt="Cocina con la abuela"
                                style={{
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    height: "500px",
                                    width: "700px",
                                    margin: "20px",
                                    border: "none",
                                    outline: "none",
                                }}
                            />
                        </a>
                    </div>
                </div>

                <div className="carousel-item" data-bs-interval={10000}>
                    <div style={{ position: "relative" }}>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "flex-end",
                                position: "absolute",
                                bottom: "20px",
                                left: "20px",
                                right: "20px",
                                backgroundColor: "rgba(0, 0, 0, 0)",
                                padding: "20px",
                                color: "white",
                            }}
                        >
                            <h1
                                style={{
                                    color: "white",
                                    backgroundColor: "black",
                                    padding: "10px",
                                    margin: "0",
                                }}
                            >
                                Los tertulianos del barrio
                            </h1>
                        </div>
                        <a href="roomtertulias">
                            <img
                                className="img-fluid mx-auto d-block"
                                src={tertulias}
                                alt="Tertulias de barrio "
                                style={{
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    height: "500px",
                                    width: "700px",
                                    margin: "20px",
                                    border: "none",
                                    outline: "none",
                                }}
                            />
                        </a>
                    </div>
                </div>

                <div className="carousel-item" data-bs-interval={10000}>
                    <div style={{ position: "relative" }}>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "flex-end",
                                position: "absolute",
                                bottom: "20px",
                                left: "20px",
                                right: "20px",
                                backgroundColor: "rgba(0, 0, 0, 0)",
                                padding: "20px",
                                color: "white",
                            }}
                        >
                            <h1
                                style={{
                                    color: "white",
                                    backgroundColor: "black",
                                    padding: "10px",
                                    margin: "0",
                                }}
                            >
                                Historias fiesteras
                            </h1>
                        </div>
                        <a href="roomfiestera">
                            <img
                                className="img-fluid mx-auto d-block"
                                src={ravera}
                                alt="Abuela fiestera "
                                style={{
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    height: "500px",
                                    width: "700px",
                                    margin: "20px",
                                    border: "none",
                                    outline: "none",
                                }}
                            />
                        </a>
                    </div>
                </div>

                <div className="carousel-item" data-bs-interval={10000}>
                    <div style={{ position: "relative" }}>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "flex-end",
                                position: "absolute",
                                bottom: "20px",
                                left: "20px",
                                right: "20px",
                                backgroundColor: "rgba(0, 0, 0, 0)",
                                padding: "20px",
                                color: "white",
                            }}
                        >
                            <h1
                                style={{
                                    color: "white",
                                    backgroundColor: "black",
                                    padding: "10px",
                                    margin: "0",
                                }}
                            >
                                Abuelo arquitecto
                            </h1>
                        </div>
                        <a href="roomarquitecto">
                            <img
                                className="img-fluid mx-auto d-block"
                                src={abueloarquitecto}
                                alt="Abuelo arquitecto "
                                style={{
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    height: "500px",
                                    width: "700px",
                                    margin: "20px",
                                    border: "none",
                                    outline: "none",
                                }}
                            />
                        </a>
                    </div>
                </div>
                <div className="carousel-item" data-bs-interval={10000}>
                    <div style={{ position: "relative" }}>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "flex-end",
                                position: "absolute",
                                bottom: "20px",
                                left: "20px",
                                right: "20px",
                                backgroundColor: "rgba(0, 0, 0, 0)",
                                padding: "20px",
                                color: "white",
                            }}
                        >
                            <h1
                                style={{
                                    color: "white",
                                    backgroundColor: "black",
                                    padding: "10px",
                                    margin: "0",
                                }}
                            >
                                Abuelos Gamers
                            </h1>
                        </div>
                        <a href="roomgamers">
                            <img
                                className="img-fluid mx-auto d-block"
                                src={abuelosgamers}
                                alt="Abuelas gamers "
                                style={{
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    height: "500px",
                                    width: "700px",
                                    margin: "20px",
                                    border: "none",
                                    outline: "none",
                                }}
                            />
                        </a>
                    </div>
                </div>
                <div className="carousel-item" data-bs-interval={10000}>
                    <div style={{ position: "relative" }}>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "flex-end",
                                position: "absolute",
                                bottom: "20px",
                                left: "20px",
                                right: "20px",
                                backgroundColor: "rgba(0, 0, 0, 0)",
                                padding: "20px",
                                color: "white",
                            }}
                        >
                            <h1
                                style={{
                                    color: "white",
                                    backgroundColor: "black",
                                    padding: "10px",
                                    margin: "0",
                                }}
                            >
                                Abuelos Viajeros
                            </h1>
                        </div>
                        <a href="roomviajero">
                            <img
                                className="img-fluid mx-auto d-block"
                                src={abueloviajero}
                                alt="Abuela fiestera "
                                style={{
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    height: "500px",
                                    width: "700px",
                                    margin: "20px",
                                    border: "none",
                                    outline: "none",
                                }}
                            />
                        </a>
                    </div>
                </div>
                
            </div>
            <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide="prev"
                style={{ transform: "scale(2)" }} // Increase the size of the arrow icon using scale
            >
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="visually-hidden">Previous</span>
            </button>
            <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide="next"
                style={{ transform: "scale(2)" }} // Increase the size of the arrow icon using scale
            >
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};
