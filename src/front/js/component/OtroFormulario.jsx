import React from "react";
import { Link } from "react-router-dom";

export const OtroFormulario= () => {
	return (
    <div className="container">
        <h1 class="my-4">Haro 3 Regresar</h1>
        <form>
            <div className="mb-3">
                <label for="nombre" className="form-label">Nombre</label>
                <input type="text" className="form-control" id="nombre" required/>
            </div>
            <div classNAme="mb-3">
                <label for="apellido" className="form-label">Apellido</label>
                <input type="text" className="form-control" id="apellido" required/>
            </div>
            <div className="mb-3">
                <label for="rut" className="form-label">Rut</label>
                <input type="text" className="form-control" id="rut" required/>
            </div>
            <div className="mb-3">
                <label for="email" className="form-label">Correo electronico</label>
                <input type="email" className="form-control" id="email" required/>
            </div>
            <div className="mb-3">
                <label for="telefono" className="form-label">Teléfono</label>
                <input type="text" className="form-control" id="telefono" required/>
            </div>
            <div className="mb-3">
                <label for="fecha_nacimiento" className="form-label">Fecha de nacimiento</label>
                <input type="date" className="form-control" id="fecha_nacimiento" required/>
            </div>
            <div className="mb-3">
                <label for="rubro" className="form-label">Rubro</label>
                <select className="form-select" id="rubro" required>
                    <option value="">Seleccione un rubro</option>
                    <option value="carpinteria">Carpinteria</option>
                    <option value="electricista">Electricista</option>
                    <option value="gasfiteria">Gasfitería</option>
                    <option value="pintor">Pintor</option>
                    <option value="aseo">Aseo</option>
                </select>
            </div>
            <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="terms_conditions" required/>
                <label className="form-check-label" for="terms_conditions">Acepto los Términos y Condiciones</label>
            </div>
            <button type="submit" className="btn btn-primary">Enviar</button>
        </form>
    </div>
	);
};
