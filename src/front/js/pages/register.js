import React from "react";
function Register() {
    return (
        <div className='container mt-5'>
            <h1 className='text-success'>Registrarse</h1>
            <div className='border border-5 border-success mt-5 mb-5 shadow-lg p-3 mb-5 bg-white rounded'>
                <form class="row g-3 needs-validation" novalidate>
                    <div class="col-md-4">
                        <label for="validationCustom01" class="form-label">Nombre</label>
                        <input type="text" class="form-control" id="validationCustom01" required />
                        <div class="valid-feedback">
                            ¡Bien!
                        </div>
                    </div>
                    <div class="col-md-4">
                        <label for="validationCustom02" class="form-label">Apellido</label>
                        <input type="text" class="form-control" id="validationCustom02" required />
                        <div class="valid-feedback">
                            ¡Bien!
                        </div>
                    </div>
                    <div class="col-md-4">
                        <label for="validationCustomUsername" class="form-label">Correo</label>
                        <div class="input-group has-validation">
                            <span class="input-group-text" id="inputGroupPrepend">@</span>
                            <input type="text" class="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required />
                            <div class="invalid-feedback">
                                Por favor, ingrese su correo.
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <label for="validationCustom03" class="form-label">Dirección</label>
                        <input type="text" class="form-control" id="validationCustom03" required />
                        <div class="invalid-feedback">
                            Por favor, ingrese su dirección.
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required />
                            <label class="form-check-label" for="invalidCheck">
                                Mis datos son correctos.
                            </label>
                            <div class="invalid-feedback">
                                ¿Sus datos son correctos?
                            </div>
                        </div>
                    </div>
                    <div class="col-12">
                        <button class="btn btn-success" type="submit">Registrarse</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register