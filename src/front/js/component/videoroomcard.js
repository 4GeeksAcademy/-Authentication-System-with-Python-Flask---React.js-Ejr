import React from "react";
import cocina from "../../img/cocina.jpeg";
import tertulias from "../../img/tertulias.jpeg";

export const VideoRoomCard = () => {
    return (
        <div id="carouselExampleDark" className="carousel carousel-dark slide d-flex align-items-center justify-content-center">
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
                                    Cocina con la Paca y sus amigos
                                </h1>
                            </div>
                            <img
                                src={cocina}
                                className="img-fluid mx-auto d-block"
                                alt="..."
                                style={{ height: "500px", width: "700px", margin: "20px" }}
                            />
                        </div>
                    </div>
                
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
                                Los tertulianos 
                            </h1>
                        </div>
                        <img
                            src={tertulias}
                            className="img-fluid mx-auto d-block"
                            alt="..."
                            style={{ height: "500px", width: "700px", margin: "20px" }}
                        />
                    </div>
                </div>
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
                                Cocina con Virtudes y sus disvertudes
                            </h1>
                            <p
                                style={{
                                    color: "white",
                                    backgroundColor: "black",
                                    padding: "10px",
                                    margin: "0",
                                }}
                            >
                                Some representative placeholder content for the first slide.
                            </p>
                        </div>
                        <img
                            src={cocina}
                            className="img-fluid mx-auto d-block"
                            alt="..."
                            style={{ height: "500px", width: "700px", margin: "20px" }}
                        />
                    </div>
                </div>
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
                                Cocina con la Paca y sus amigos
                            </h1>
                            <p
                                style={{
                                    color: "white",
                                    backgroundColor: "black",
                                    padding: "10px",
                                    margin: "0",
                                }}
                            >

                            </p>
                        </div>
                        <img
                            src={cocina}
                            className="img-fluid mx-auto d-block"
                            alt="..."
                            style={{ height: "500px", width: "700px", margin: "20px" }}
                        />
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
