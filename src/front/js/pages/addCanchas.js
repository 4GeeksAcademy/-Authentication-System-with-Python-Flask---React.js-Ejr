import React from "react";

export const AddCanchas = () => {
    return (
        <>
            <h1>Agrega tu Cancha</h1>
            <form>
                <div className="mb-3">
                    <label for="nombreCancha" className="form-label">Nombre del club</label>
                    <input type="nombre" className="form-control" id="nombreCancha" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label for="direccionCancha" className="form-label">Ubicación del club</label>
                    <input type="location" className="form-control" id="locationCancha" />
                </div>
                <div className="mb-3 form-check">
                    <select className="form-select" aria-label="Default select example">
                        <option selected>Deporte</option>
                        <option value="1">Tenis</option>
                        <option value="2">Paddle</option>
                        <option value="3">Fútbol</option>
                        <option value="4">Basquetbol</option>
                        <option value="5">Baby Futbol</option>
                    </select>
                </div>
                <div className="mb-3 form-check">
                    <select className="form-select" aria-label="Default select example">
                        <option selected>Cantidad de Canchas</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>
                <button type="submit" class="btn btn-primary">Agregar Cancha</button>
            </form>
        </>
    );
};