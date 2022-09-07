import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/dashboard.css";

export const Aside = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.createRequest();
  }, []);

  const handleClick = async () => {
    await actions.fillLocalStorage();
    await actions.clearResponse();
    await actions.createRequest();
    await actions.getProperties();
  };

  return (
    <div className="container col-12 col-lg-3 pb-0 mb-0 px-0">
      <div className="formulario container rounded-3 px-0 mt-0 pb-3">
        <div className="titulo container px-3 pt-3 pb-2 text-center">
          <h4>Tus Preferencias</h4>
        </div>
        {/* boton */}
        <div className="mx-3 my-2 text-center">
          <button
            onClick={handleClick}
            type="button"
            className="btn btn-primary mb-3"
          >
            Actualizar
          </button>
        </div>
        {/*contenedor aside*/}
        <div className="filtros-aside container pt-0 pb-4">
          {/* comunidad */}
          <div className="selector mx-3 mb-3">
            <div className="pb-2">
              <span className="">Comun. Autónoma</span>
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
          <div className="selector mx-3 mb-3">
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
          <div className="selector mx-3 mb-3">
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
                  value={store.preciomax == 999999999 ? "Máx" : store.preciomax}
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
                  className="form-select me-1"
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
                  className="form-select ms-1"
                  aria-label="Default select example"
                  value={store.preciomax == 999999999 ? "Máx" : store.preciomax}
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
          <div className="selector mx-3 mb-3">
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
          <div className="selector mx-3 mb-3">
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
          <div className="selector mx-3 mb-3">
            <div className="pb-2">
              <span className="">Habitaciones</span>
            </div>
            <select
              onChange={actions.updateHabitacion}
              className="form-select"
              aria-label="Default select example"
              value={store.habitaciones}
            >
              <option className="">cualquiera</option>
              {["1", "2", "3 a más"].map((item) => (
                <option key={item} className="">
                  {item}
                </option>
              ))}
            </select>
          </div>
          {/* baños */}
          <div className="selector mx-3 mb-3">
            <div className="pb-2">
              <span className="">Baños</span>
            </div>
            <select
              onChange={actions.updateBaño}
              className="form-select"
              aria-label="Default select example"
              value={store.baños}
            >
              <option className="">cualquiera</option>
              {["1", "2", "3 a más"].map((item) => (
                <option key={item} className="">
                  {item}
                </option>
              ))}
            </select>
          </div>
          {/* boton */}
          {/* <div className="selector mx-3 my-0 pt-2 text-center">
            <button
              onClick={handleClick}
              type="button"
              className="btn btn-primary mb-3"
            >
              Filtrar Resultados
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};
