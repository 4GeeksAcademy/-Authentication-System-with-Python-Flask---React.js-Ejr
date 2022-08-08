import React from "react";

const AdminCasino = () => {
  return (
    <div className="container border border-5 border-success mt-5 shadow-lg p-3 mb-5 bg-white rounded">
      <h3 className="mt-3">Lunes</h3>
      <div className="row">
        <div className="col-xs-12 col-6">
          <div className="form-group mt-4 w-100">
            <label for="exampleFormControlTextarea1">Ensalada</label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </div>
        </div>
        <div className="col-xs-12 col-6">
          <div className="form-group mt-4 w-100">
            <label for="exampleFormControlTextarea1">Entrada</label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </div>
        </div>
      </div>
      <div className="row mb-5">
        <div className="col-xs-12 col-6">
          <div className="form-group mt-4 w-100">
            <label for="exampleFormControlTextarea1">Postre</label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </div>
        </div>
        <div className="col-xs-12 col-6">
          <div className="form-group mt-4 w-100">
            <label for="exampleFormControlTextarea1">Jugo / Otros</label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-end">
        <button type="button" className="btn btn-success btn-lg m-2">
          Editar
        </button>
        <button type="button" className="btn btn-success btn-lg m-2">
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default AdminCasino;
