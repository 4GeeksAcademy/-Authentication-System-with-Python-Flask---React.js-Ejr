import React from "react";
const FormReporte = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <br />
          <br />
          <br />
          <br />
          <p>Por favor llena este formulario para poder contactarte</p>
          
          <div className="col-md-6">
             <label className="form-label">Nombre completo: *</label>
             <input type="text" className="form-control" placeholder="" aria-label="First name" value=""/>
          </div>
          <div className="col-md-6">
             <label className="form-label">RUT: *</label>
             <input type="text" className="form-control" placeholder="" aria-label="First name" value=""/>
          </div>
          <div className="col-md-6">
             <label className="form-label">Empresa: *</label>
             <input type="text" className="form-control" placeholder="" aria-label="First name" value=""/>
          </div>
          <div className="col-md-6">
             <label className="form-label">E - mail: *</label>
             <input type="text" className="form-control" placeholder="" aria-label="First name" value=""/>
          </div>
          <div className="col-md-6">
             <label className="form-label">Teléfono:</label>
             <input type="text" className="form-control" placeholder="" aria-label="First name" value=""/>
          </div>
          <br />
          <div className="gap-3 d-md-flex justify-content-md-end text-center mb-5">
              <button type="button" className="btn btn-danger btn-lg">
                Eliminar Perfil Empresa
              </button>
              <button type="button" className="btn btn-primary btn-lg">
                Actualizar Perfil Empresa
            </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default FormReporte;