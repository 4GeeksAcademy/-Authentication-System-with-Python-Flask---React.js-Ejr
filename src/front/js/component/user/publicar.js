import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../store/appContext";
import swal from "sweetalert";
import "../../../styles/publicar.css";
import { useNavigate } from "react-router-dom";
import { AddressInput } from "../addressInput.js";

export const Publicar = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const handleClick = async () => {
    await actions.uploadImagesToCloudinary();
    await actions.clearSelectedImages();
    await actions.clearPubFromLocalStorage();
    swal("Publicación realizada con éxito");
    await actions.resetStoreSelectors();
    navigate("/user/null");
  };

  useEffect(() => {
    actions.resetStoreSelectors();
  }, []);

  return (
    <>
      {localStorage.getItem("token") ? (
        <div
          className="caja_publicar d-flex justify-content-center col-6"
          style={{ height: "90vh", width: "100vh" }}
        >
          <div className="container col-8 rounded-3 px-0 mt-0 pb-3">
            <div className="container rounded-top px-3 pt-3 pb-2 text-center bg-white">
              <h4>Tu Publicación</h4>
            </div>

            <div className="caja_selectores container rounded-bottom pt-0 pb-4 bg-white">
              {/* operación */}
              <div className="selector mx-3 mb-3">
                <div className="pb-2">
                  <span className="">Operación</span>
                </div>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={actions.updatePublicarOperacion}
                  value={store.operacion}
                >
                  <option className="">{"<Elige la operación>"}</option>
                  <option className="">alquiler</option>
                  <option className="">compra</option>
                </select>
              </div>

              {/* comunidad autónoma */}
              <div className="selector mx-3 mb-3">
                <div className="pb-2">
                  <span className="">Comunidad Autónoma</span>
                </div>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={actions.updatePublicarComunidad}
                  value={store.comunidad}
                >
                  <option className="">
                    {"<Elige la comunidad autónoma>"}
                  </option>
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
                  className="form-select"
                  aria-label="Default select example"
                  onChange={actions.updatePublicarProvincia}
                  value={store.provincia}
                >
                  <option className="">{"<Elige la provincia>"}</option>
                  {store.listaprovincias.map((elem) => (
                    <option key={elem} className="">
                      {elem}
                    </option>
                  ))}
                </select>
              </div>

              {/* municipio */}
              <div className="mb-3 mx-3">
                <label for="exampleFormControlInput1" className="form-label">
                  Municipio
                </label>
                <input
                  onChange={actions.updatePublicarMunicipio}
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="<Escribe el municipio>"
                  value={store.municipio}
                />
              </div>

              {/* direccion */}
              <div className="mb-3 mx-3">
                <label for="exampleFormControlInput1" className="form-label">
                  Dirección
                </label>
                {/* <div>
                  <AddressInput />
                </div> */}
                <input
                  onChange={actions.updatePublicarDireccion}
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="<Escribe la dirección>"
                  value={store.direccion}
                />
              </div>

              {/* descripción */}
              <div className="mb-3  mx-3">
                <label for="exampleFormControlTextarea1" className="form-label">
                  Descripción de la propiedad
                </label>
                <textarea
                  onChange={actions.updatePublicarDescripcion}
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="5"
                  placeholder="describa aquí las características de la propiedad"
                  value={store.descripcion}
                ></textarea>
              </div>

              {/* precio */}
              <div className="mb-3 mx-3">
                <label for="exampleFormControlInput1" className="form-label">
                  Precio
                </label>
                <input
                  onChange={actions.updatePublicarPrecio}
                  type="number"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="escriba el precio"
                  value={store.precio}
                />
              </div>

              {/* tipo vivienda */}
              <div className="selector mx-3 mb-3">
                <div className="pb-2">
                  <span className="">Tipo de Vivienda</span>
                </div>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={actions.updatePublicarTipoVivienda}
                  value={store.tipo_vivienda}
                >
                  <option className="">{"<Elige el tipo de vivienda>"}</option>
                  <option className="">Piso</option>
                  <option className="">Chalet</option>
                  <option className="">Villa</option>
                </select>
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
                    onChange={actions.updatePublicarCaracteristicaPet}
                  />
                  <label className="form-check-label">Admite mascotas</label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    onChange={actions.updatePublicarCaracteristicaGarage}
                  />
                  <label className="form-check-label">Garage</label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    onChange={actions.updatePublicarCaracteristicaPiscina}
                  />
                  <label className="form-check-label">Piscina</label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    onChange={actions.updatePublicarCaracteristicaTerraza}
                  />
                  <label className="form-check-label">Terraza</label>
                </div>
              </div>

              {/* habitaciones */}
              <div className="mb-3 mx-3">
                <label for="exampleFormControlInput1" className="form-label">
                  Cantidad de habitaciones
                </label>
                <input
                  onChange={actions.updatePublicarHabitaciones}
                  type="number"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="escriba el precio"
                  value={store.habitaciones}
                />
              </div>

              {/* baños */}
              <div className="mb-3 mx-3">
                <label for="exampleFormControlInput1" className="form-label">
                  Cantidad de baños
                </label>
                <input
                  onChange={actions.updatePublicarBaños}
                  type="number"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="escriba el precio"
                  value={store.baños}
                />
              </div>

              {/* fotos */}
              {store.selectedImages.length == 0 ? (
                <div className="fotos_input mx-3 mb-3">
                  <label for="formFileMultiple" className="form-label pb-2">
                    Fotos de la propiedad
                  </label>
                  <input
                    className="form-control"
                    id="formFileMultiple"
                    multiple
                    type="file"
                    onChange={actions.uploadImagesToStore}
                  />
                </div>
              ) : (
                <div className="fotos_input mx-3 mb-3">
                  <label for="formFileMultiple" className="form-label pb-2">
                    Fotos de la propiedad
                  </label>
                  <div className="caja-reemplazo d-flex justify-content-between">
                    <div className="ps-3">{`>> Carga realizada: ${store.selectedImages.length} foto(s)`}</div>
                    <div>
                      <button
                        onClick={actions.clearSelectedImages}
                        type="button"
                        className="btn btn-secondary btn-sm me-3"
                      >
                        Borrar Fotos
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="mx-3 text-center">
                <button
                  onClick={handleClick}
                  type="button"
                  className="btn btn-primary mb-3 mt-3"
                  style={{ width: "50%" }}
                >
                  Publicar
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="d-flex justify-content-center"
          style={{ height: "90vh", width: "100vh" }}
        >
          <h5>Unauthorized...</h5>
        </div>
      )}
      ;
    </>
  );
};
