import React, { useContext, useState, useEffect } from "react";


export const AddCanchas = () => {

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [
        "https://uploads-ssl.webflow.com/632871e15b53a0140af28aeb/633b061d864ce251bb36073e_pexels-markus-spiske-1752757.jpg",
        "https://journey.app/blog/wp-content/uploads/2021/11/reglas-deportivas_Tenis_.jpg",
        "https://thephysiocompany.co.uk/wp-content/uploads/football.jpg",

    ];
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const currentImage = images[currentImageIndex];
    return (
        <>
            <h1>Agrega tu Cancha</h1>



            <form >

                <div className="mb-3">
                    <div style={{ width: "24.5%", height: "20%", marginLeft: "25px" }}>
                        <label for="nombreCancha" className="form-label">Nombre del club</label>
                        <input type="nombre" className="form-control" id="nombreCancha" aria-describedby="emailHelp" />
                    </div>
                </div>
                <div className="mb-3">
                    <div style={{ width: "24.5%", height: "20%", marginLeft: "25px" }}>
                        <label for="direccionCancha" className="form-label">Ubicación del club</label>
                        <input type="location" className="form-control" id="locationCancha" />
                    </div>
                </div>
                <div className="mb-3 form-check">
                    <div style={{ width: "25%", height: "20%", marginLeft: "0px" }}>
                        <select className="form-select" aria-label="Default select example">
                            <option selected>Deporte</option>
                            <option value="1">Tenis</option>
                            <option value="2">Paddle</option>
                            <option value="3">Fútbol</option>
                            <option value="4">Basquetbol</option>
                            <option value="5">Baby Futbol</option>
                        </select>
                    </div>
                </div>
                <div className="mb-3 form-check">
                    <div style={{ width: "25%", height: "20%", marginLeft: "0px" }}>
                        <select className="form-select" aria-label="Default select example">
                            <option selected>Cantidad de Canchas</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                    </div>
                </div>
                <div className="boton">
                    <div style={{ width: "25%", height: "20%", marginLeft: "20px" }}>
                        <button type="submit" class="btn btn-primary">Agregar Cancha</button>
                    </div>
                </div>


            </form >

            <img src="`url(${currentImage})`" class="rounded float-end" alt="..." />

        </>
    );
};