import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/dashboard.css";

export const Dashboard = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.syncLocalStorageToStore();
    console.log("los datos del store han sido restituidos");
  }, []);

  return (
    <div className="container d-flex px-0">
      {/* ----------------------------------------- */}
      {/* A partir de aqui el lateral de filtros    */}
      {/* ----------------------------------------- */}
      <div className="col-4 col-lg-3">
        <div className="formulario container rounded-3 px-0 mt-0">
          <div className="titulo container ps-4 pt-3 pb-2">
            <h3>Tus Preferencias</h3>
          </div>
          {/*contenedor aside*/}
          <div className="filtros container pt-3 pb-4">
            {/* comunidad */}
            <div className="selector mx-3 mb-4">
              <div className="pb-2">
                <span className="">Comunidad Autónoma</span>
              </div>
              <select
                onChange={actions.updateComunidad}
                className="form-select"
                aria-label="Default select example"
                value={store.comunidad}
              >
                <option className="">todas</option>
                {store.listacomunidades.map((item) => {
                  let comunidad = Object.keys(item);
                  return (
                    <option key={comunidad} className="">
                      {comunidad}
                    </option>
                  );
                })}
              </select>
            </div>
            {/* provincia */}
            <div className="selector mx-3 mb-4">
              <div className="pb-2">
                <span className="">Provincia</span>
              </div>
              <select
                onChange={actions.updateProvincia}
                className="form-select"
                aria-label="Default select example"
                value={store.provincia}
              >
                <option className="">todas</option>
                {store.listaprovincias.map((elem) => (
                  <option key={elem} className="">
                    {elem}
                  </option>
                ))}
              </select>
            </div>
            {/* rango de precio */}
            <div className="selector mx-3 mb-4">
              <div className="pb-2">
                <span className="">Rango de Precio</span>
              </div>
              {store.operacion == "todas" || store.operacion == "alquiler" ? (
                <div className="d-flex">
                  <select
                    onChange={actions.updatePreciomin}
                    className="form-select me-1"
                    aria-label="Default select example"
                    value={store.preciomin == 0 ? "Mín" : store.preciomin}
                  >
                    <option className="">Mín</option>
                    <option className="">1000</option>
                    <option className="">2000</option>
                    <option className="">3000</option>
                    <option className="">4000</option>
                    <option className="">5000</option>
                  </select>
                  <select
                    onChange={actions.updatePreciomax}
                    className="form-select ms-1"
                    aria-label="Default select example"
                    value={
                      store.preciomax == 999999999 ? "Máx" : store.preciomax
                    }
                  >
                    <option className="">Máx</option>
                    <option className="">1000</option>
                    <option className="">2000</option>
                    <option className="">3000</option>
                    <option className="">4000</option>
                    <option className="">5000</option>
                  </select>
                </div>
              ) : (
                <div className="d-flex">
                  <select
                    onChange={actions.updatePreciomin}
                    className="form-select me-1 mb-5"
                    aria-label="Default select example"
                    value={store.preciomin == 0 ? "Mín" : store.preciomin}
                  >
                    <option className="">Mín</option>
                    <option className="">100000</option>
                    <option className="">200000</option>
                    <option className="">500000</option>
                    <option className="">750000</option>
                    <option className="">1000000</option>
                  </select>
                  <select
                    onChange={actions.updatePreciomax}
                    className="form-select ms-1 mb-5"
                    aria-label="Default select example"
                    value={
                      store.preciomax == 999999999 ? "Máx" : store.preciomax
                    }
                  >
                    <option className="">Máx</option>
                    <option className="">100000</option>
                    <option className="">200000</option>
                    <option className="">500000</option>
                    <option className="">750000</option>
                    <option className="">1000000</option>
                  </select>
                </div>
              )}
            </div>
            {/* tipo de vivienda */}
            <div className="selector mx-3 mb-4">
              <div className="pb-2">
                <span className="">Tipo de Vivienda</span>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  onChange={actions.updateViviendaPiso}
                />
                <label className="form-check-label">Piso</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  onChange={actions.updateViviendaChalet}
                />
                <label className="form-check-label">Chalet</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  onChange={actions.updateViviendaVilla}
                />
                <label className="form-check-label">Villa</label>
              </div>
            </div>
            {/* caracteristicas */}
            <div className="selector mx-3 mb-4">
              <div className="pb-2">
                <span className="">Características</span>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  onChange={actions.updateCaracteristicaPet}
                />
                <label className="form-check-label">Admite mascotas</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  onChange={actions.updateCaracteristicaGarage}
                />
                <label className="form-check-label">Garage</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  onChange={actions.updateCaracteristicaPiscina}
                />
                <label className="form-check-label">Piscina</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  onChange={actions.updateCaracteristicaTerraza}
                />
                <label className="form-check-label">Terraza</label>
              </div>
            </div>
            {/* habitaciones */}
            <div className="selector mx-3 mb-4">
              <div className="pb-2">
                <span className="">Habitaciones</span>
              </div>
              <select
                onChange={actions.updateHabitacion}
                className="form-select"
                aria-label="Default select example"
                value={store.habitaciones}
              >
                <option className="">1</option>
                <option className="">2</option>
                <option className="">3</option>
              </select>
            </div>
            {/* baños */}
            <div className="selector mx-3 mb-4">
              <div className="pb-2">
                <span className="">Baños</span>
              </div>
              <select
                onChange={actions.updateBaño}
                className="form-select"
                aria-label="Default select example"
                value={store.baños}
              >
                <option className="">1</option>
                <option className="">2</option>
                <option className="">3</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      {/* ----------------------------------------- */}
      {/* A partir de aqui el tablero de resultados */}
      {/* ----------------------------------------- */}
      <div className="col-8 col-lg-9">
        <nav className="d-flex justify-content-between">
          {/* Botones Alquiler y Compra */}
          {store.operacion == "alquiler" || store.operacion == "" ? (
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              <button
                className="nav-link active"
                type="button"
                onClick={actions.updateOperacionAlquiler}
              >
                Alquiler
              </button>
              <button
                className="nav-link"
                type="button"
                onClick={actions.updateOperacionCompra}
              >
                Compra
              </button>
            </div>
          ) : (
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              <button
                className="nav-link"
                type="button"
                onClick={actions.updateOperacionAlquiler}
              >
                Alquiler
              </button>
              <button
                className="nav-link active"
                type="button"
                onClick={actions.updateOperacionCompra}
              >
                Compra
              </button>
            </div>
          )}
          {/* Botones Listado y Mapa */}
          {store.vista == "listado" ? (
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              <button
                className="nav-link active"
                type="button"
                onClick={actions.updateVistaListado}
              >
                Listado
              </button>
              <button
                className="nav-link"
                type="button"
                onClick={actions.updateVistaMapa}
              >
                Mapa
              </button>
            </div>
          ) : (
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              <button
                className="nav-link"
                type="button"
                onClick={actions.updateVistaListado}
              >
                Listado
              </button>
              <button
                className="nav-link active"
                type="button"
                onClick={actions.updateVistaMapa}
              >
                Mapa
              </button>
            </div>
          )}
        </nav>
        {/* Renderizacion de contenido de páginas */}
        <div className="tab-content" id="nav-tabContent">
          {store.vista == "listado" &&
          (store.operacion == "alquiler" || store.operacion == "") ? (
            <div className="p-5 h1">Alquiler en Listado</div>
          ) : store.vista == "listado" && store.operacion == "compra" ? (
            <div className="p-5 h1">Compra en Listado</div>
          ) : store.vista == "mapa" && store.operacion == "compra" ? (
            <div className="p-5 h1">Compra en Mapa</div>
          ) : store.vista == "mapa" && store.operacion == "alquiler" ? (
            <div className="p-5 h1">Alquiler en Mapa</div>
          ) : (
            <div className="p-5 h1">"Elija la operacion"</div>
          )}
        </div>
      </div>
    </div>
  );
};
