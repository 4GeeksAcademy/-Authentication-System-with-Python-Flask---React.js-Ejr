import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../store/appContext";
import swal from "sweetalert";
import "../../../styles/publicar.css";
import { Navigate } from "react-router-dom";

export const Publicar = () => {
  const { store, actions } = useContext(Context);
  const [listaProvincias, setListaProvincias] = useState([]);
  const [pub_operacion, setPub_operacion] = useState("");
  const [pub_comunidad, setPub_comunidad] = useState("");
  const [pub_provincia, setPub_provincia] = useState("");
  const [pub_municipio, setPub_municipio] = useState("");
  const [pub_direccion, setPub_direccion] = useState("");
  const [pub_descripcion, setPub_descripcion] = useState("");
  const [pub_precio, setPub_precio] = useState(0);
  const [pub_tipo_vivienda, setPub_tipo_vivienda] = useState("");
  const [pub_habitaciones, setPub_habitaciones] = useState(0);
  const [pub_baños, setPub_baños] = useState(0);
  const [pub_pet, setPub_pet] = useState(false);
  const [pub_piscina, setPub_piscina] = useState(false);
  const [pub_terraza, setPub_terraza] = useState(false);
  const [pub_garage, setPub_garage] = useState(false);
  const [pub_latitud, setPub_latitud] = useState(0);
  const [pub_longitud, setPub_longitud] = useState(0);
  const [pub_pago, setPub_pago] = useState(false);

  let itemsLocalStorage = [
    "pub_operacion",
    "pub_comunidad",
    "pub_provincia",
    "pub_municipio",
    "pub_direccion",
    "pub_descripcion",
    "pub_precio",
    "pub_tipo_vivienda",
    "pub_habitaciones",
    "pub_baños",
    "pub_pet",
    "pub_piscina",
    "pub_terraza",
    "pub_garage",
    "pub_fotos",
    "pub_latitud",
    "pub_longitud",
    "pub_pago",
  ];

  const clearPubFromLocalStorage = () => {
    for (let x of itemsLocalStorage) {
      localStorage.removeItem(x);
    }
  };

  const updateListaProvincias = () => {
    let comunidad = localStorage.getItem("pub_comunidad");
    let provincias = [];
    for (let x of store.listacomunidades) {
      if (x[comunidad]) {
        provincias = x[comunidad];
      }
    }
    setListaProvincias(provincias);
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
                  onChange={(e) => {
                    localStorage.setItem("pub_operacion", e.target.value);
                    setPub_operacion(e.target.value);
                  }}
                  value={pub_operacion}
                >
                  <option selected disabled>
                    {"<Elija la operación>"}
                  </option>
                  <option value="alquiler">alquiler</option>
                  <option value="compra">venta</option>
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
                  onChange={(e) => {
                    localStorage.setItem("pub_comunidad", e.target.value);
                    updateListaProvincias();
                  }}
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
                  className="form-select"
                  aria-label="Default select example"
                  onChange={(e) => {
                    localStorage.setItem("pub_provincia", e.target.value);
                  }}
                >
                  <option className="">todas</option>
                  {listaProvincias.length == 0
                    ? "elija comunidad"
                    : listaProvincias.map((elem) => (
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
                  onClick={() => {
                    actions.uploadImagesToCloudinary();
                    actions.clearSelectedImages();
                    clearPubFromLocalStorage();
                    swal("Publicación realizada con éxito");
                    Navigate("/user");
                  }}
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

// auxiliarFotos = Object.values(e.target.files);
// setFotos(auxiliarFotos.length);
// let pics = [];

// for (let i in auxiliarFotos) {
//   const formData = new FormData();
//   formData.append("file", auxiliarFotos[i]);
//   formData.append("upload_preset", config.upload_preset);

//   fetch(apiUrl, {
//     method: "POST",
//     body: formData,
//   })
//     .then((response) => response.json())
//     .then((jsonResponse) => {
//       pics.push(jsonResponse.url);
//       setCloudImageUrl(pics);
//       console.log(cloudImageUrl);
//     })
//     .catch((error) => {
//       console.log("The fetch has failed: ", error);
//     });
// }
// }}

// const uploadImage = () => {
//   const apiUrl = `https://api.cloudinary.com/v1_1/${config.cloudName}/${config.resource_type}/upload`;
// const formData = new FormData();
// formData.append("file", imageSelected);
// formData.append("upload_preset", config.upload_preset);

//   fetch(apiUrl, {
//     method: "POST",
//     body: formData,
//   })
//     .then((response) => response.json())
//     .then((jsonResponse) => {
//       console.log(jsonResponse.url);
//       setCloudImageUrl(jsonResponse.url);
//     })
//     .catch((error) => {
//       console.log("The fetch has failed: ", error);
//     });
// };
