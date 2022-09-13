import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../store/appContext";
import swal from "sweetalert";
import "../../../styles/publicar.css";

export const Publicar = () => {
  const { store, actions } = useContext(Context);
  const [cloudImageUrl, setCloudImageUrl] = useState("");
  const [qSelectedImages, setQSelectedImages] = useState(0);

  let auxiliarFotos = "";
  // let formData = new FormData();

  const config = {
    cloudName: "dsobw5vfl",
    resource_type: "image",
    upload_preset: "imagenes",
  };

  const apiUrl = `https://api.cloudinary.com/v1_1/${config.cloudName}/${config.resource_type}/upload`;

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
              {/* comunidad */}
              <div className="selector mx-3 mb-3">
                <div className="pb-2">
                  <span className="">Comunidad Autónoma</span>
                </div>
                <select
                  onChange={(e) => {
                    actions.updateComunidad(e);
                    localStorage.setItem("pub_comunidad", store.comunidad);
                  }}
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
                  onChange={(e) => {
                    actions.updateProvincia(e);
                    localStorage.setItem("pub_provincia", store.provincia);
                  }}
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

              {/* fotos */}
              <div className="selector mx-3 mb-3">
                <label for="formFileMultiple" className="form-label pb-2">
                  Fotos de la propiedad
                </label>
                <input
                  className="form-control"
                  id="formFileMultiple"
                  multiple
                  type="file"
                  onChange={(e) => {
                    auxiliarFotos = Object.values(e.target.files);
                    setQSelectedImages(auxiliarFotos.length);

                    for (let i in auxiliarFotos) {
                      const formData = new FormData();
                      formData.append("file", auxiliarFotos[i]);
                      formData.append("upload_preset", config.upload_preset);

                      fetch(apiUrl, {
                        method: "POST",
                        body: formData,
                      })
                        .then((response) => response.json())
                        .then((jsonResponse) => {
                          console.log(jsonResponse.url);
                          setCloudImageUrl([
                            ...cloudImageUrl,
                            jsonResponse.url,
                          ]);
                        })
                        .catch((error) => {
                          console.log("The fetch has failed: ", error);
                        });
                    }
                  }}
                />
              </div>

              <div className="mx-3 text-center">
                <button
                  // onClick={uploadImage}
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
