import React from "react"

export const Register = () => {

    return(
        <div>
             componente de formulario registro
            <div className="mb-3">
                <label for="name" className="form-label">Nombre</label>
                <input type="text" className="form-control" id="name" placeholder="Escriba el nombre.."/>
            </div>
            <div className="mb-3">
                <label for="username" className="form-label">Apellidos</label>
                <input type="text" className="form-control" id="username" placeholder="Escriba el apellido.."/>
            </div>
            <div className="mb-3">
                <label for="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" placeholder="Escriba el email.."/>
            </div>
            <div className="mb-3">
                <label for="password" className="form-label">Contraseña</label>
                <input type="password" className="form-control" id="password" placeholder="Escriba la contraseña.."/>
            </div>
            <div className="mb-3">
                <label for="cif" className="form-label">CIF</label>
                <input type="text" className="form-control" id="cif" placeholder="Escriba el CIF.."/>
            </div>

           
        </div>
    )
}
