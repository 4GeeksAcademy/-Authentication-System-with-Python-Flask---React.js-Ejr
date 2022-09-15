import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../store/appContext";
import swal from "sweetalert";
import "../../../styles/publicar.css";
import { useNavigate } from "react-router-dom";
import { AddressInput } from "../addressInput.js";

export const Publicar = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const handleClick1 = () => {
    // actions.switchOnCharging();
    // await actions.uploadImagesToCloudinary();
    actions.createInmueblesBodyRequest();
    // aqui comienza el fetch publicar:
    // const request = store.inmueblesBodyRequest;
    // let opts = {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(request),
    // };
    // try {
    //   const resp = await fetch(process.env.BACKEND_URL + "/api/publicar", opts);
    //   if (resp.status != 200) {
    //     throw new Error("The fetch has failed");
    //   }
    //   const respAsJson = await resp.json();
    //   console.log("confirmacion de la publicación: ", respAsJson);
    // } catch (error) {
    //   console.log("The fetch has failed: ", error);
    // }
    // aqui termina el fetch publicar
    // swal("Publicación realizada con éxito");
    // await actions.switchOffCharging();
    // await actions.resetStoreVariables();
    // await actions.clearLocalStorageNoUser();
    // const user = JSON.parse(localStorage.getItem("user_info"));
    // navigate(`/user/${user.id}`);
  };

  const handleClick2 = () => {
    actions.clearLocalStorageNoUser();
    actions.resetStoreVariables();
  };

  useEffect(() => {
    actions.resetStoreVariables();
  }, []);

  return (
    <>
      {localStorage.getItem("token") ? (
        <div
          className="caja_publicar d-flex justify-content-center col-6"
          style={{ height: "90vh", width: "100vh" }}
        >
          <div className="container col-8 px-0 mt-0 pb-3">
            <div className="container rounded-3 py-4 px-0 bg-white">
              <h4 className="text-center my-4">Tu Publicación</h4>
              <div className="caja_selectores container pt-0 pb-2 bg-white">
                {/* operación */}
                <div className="selector mx-3 mb-3">
                  <div className="pb-2">
                    <span className="">Operación</span>
                  </div>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(e) => {
                      actions.updatePublicarOperacion(e);
                      localStorage.setItem("pub_pet", store.caracteristica_pet);
                      localStorage.setItem(
                        "pub_garage",
                        store.caracteristica_garage
                      );
                      localStorage.setItem(
                        "pub_piscina",
                        store.caracteristica_piscina
                      );
                      localStorage.setItem(
                        "pub_terraza",
                        store.caracteristica_terraza
                      );
                      localStorage.setItem("pub_premium", false);
                    }}
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
                  <div>
                    <AddressInput />
                  </div>
                  {/* <input
                      onChange={actions.updatePublicarDireccion}
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="<Escribe la dirección>"
                      value={store.direccion}
                    /> */}
                </div>

                {/* descripción */}
                <div className="mb-3  mx-3">
                  <label
                    for="exampleFormControlTextarea1"
                    className="form-label"
                  >
                    Descripción de la propiedad
                  </label>
                  <textarea
                    onChange={actions.updatePublicarDescripcion}
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="5"
                    placeholder="<Describe aquí las características de la propiedad>"
                    value={store.descripcion}
                  ></textarea>
                </div>

                {/* precio */}
                <div className="mb-3 mx-3">
                  <label for="exampleFormControlInput1" className="form-label">
                    Precio (Euros)
                  </label>
                  <input
                    onChange={actions.updatePublicarPrecio}
                    type="number"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="<Escribe el precio>"
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
                    <option className="">
                      {"<Elige el tipo de vivienda>"}
                    </option>
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
                      checked={store.caracteristica_pet}
                    />
                    <label className="form-check-label">Admite mascotas</label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      onChange={actions.updatePublicarCaracteristicaGarage}
                      checked={store.caracteristica_garage}
                    />
                    <label className="form-check-label">Garage</label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      onChange={actions.updatePublicarCaracteristicaPiscina}
                      checked={store.caracteristica_piscina}
                    />
                    <label className="form-check-label">Piscina</label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      onChange={actions.updatePublicarCaracteristicaTerraza}
                      checked={store.caracteristica_terraza}
                    />
                    <label className="form-check-label">Terraza</label>
                  </div>
                </div>

                {/* habitaciones */}
                <div className="selector mx-3 mb-3">
                  <div className="pb-2">
                    <span className="">Cantidad de habitaciones</span>
                  </div>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={actions.updatePublicarHabitaciones}
                    value={store.habitaciones}
                  >
                    <option className="">
                      {"<Elige la cantidad de habitaciones>"}
                    </option>
                    <option className="">1</option>
                    <option className="">2</option>
                    <option className="">3</option>
                    <option className="">4</option>
                    <option className="">5</option>
                    <option className="">6</option>
                    <option className="">7</option>
                    <option className="">8</option>
                    <option className="">9</option>
                    <option className="">10</option>
                  </select>
                </div>

                {/* baños */}
                <div className="selector mx-3 mb-3">
                  <div className="pb-2">
                    <span className="">Cantidad de baños</span>
                  </div>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={actions.updatePublicarBaños}
                    value={store.baños}
                  >
                    <option className="">
                      {"<Elige la cantidad de baños>"}
                    </option>
                    <option className="">1</option>
                    <option className="">2</option>
                    <option className="">3</option>
                    <option className="">4</option>
                    <option className="">5</option>
                    <option className="">6</option>
                    <option className="">7</option>
                    <option className="">8</option>
                    <option className="">9</option>
                    <option className="">10</option>
                  </select>
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
                          className="btn btn-outline-secondary btn-sm me-3"
                        >
                          Borrar Fotos
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {store.charging == true ? (
                  <div className="pb-5">
                    <div className="text-center d-flex justify-content-center">
                      <div
                        className="spinner-border text-center d-flex justify-content-center"
                        role="status"
                      >
                        <span className="visually-hidden text-center d-flex justify-content-center">
                          Loading...
                        </span>
                      </div>
                    </div>
                    <div className="text-center">
                      ...cargando tu publicación...
                    </div>
                  </div>
                ) : (
                  <div className="botones-contenedor mx-3 px-0 d-flex justify-content-evenly">
                    <div className="text-center">
                      <button
                        onClick={handleClick1}
                        type="button"
                        className="btn btn-primary mb-3 mt-3"
                      >
                        Publicar
                      </button>
                    </div>

                    <div className="text-center">
                      <button
                        onClick={handleClick2}
                        type="button"
                        className="btn btn-danger mb-3 mt-3"
                      >
                        Reiniciar
                      </button>
                    </div>
                  </div>
                )}
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
