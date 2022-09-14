import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../store/appContext";
import swal from "sweetalert";
import "../../../styles/publicar.css";
import { useNavigate } from "react-router-dom";

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

            <div className="container rounded-bottom pt-0 pb-4 bg-white">
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
