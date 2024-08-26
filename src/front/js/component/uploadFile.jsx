import React, { useContext } from "react";
import { useState } from "react";
import "../../styles/uploadFile.css";
import { Context } from "../store/appContext";
import { InputRutas } from "./inputRutas.jsx";

const UploadFile = () => {
  const { store, actions } = useContext(Context);
  const [file, setFile] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "dlfq7smx");
    formData.append("api_key", "853636263856715");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dlfq7smx/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    if (res.ok) {
      actions.addImg(data.url);
      console.log(store.newItineraryData);
    }
  };
  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };
  return (
    <div className="col-5 upload-file my-5 mx-5 justify-content-center">
      <div id="rutaDestacada1" className="carousel slide mt-3">
        <div className="carousel-inner uploaded">
          <div className="carousel-item active">
            <img
              src={
                store.newItineraryData.images.img.length > 0
                  ? store.newItineraryData.images.img[0]
                  : "http://via.placeholder.com/750x450"
              }
              className="d-block uploaded"
              alt="Imagen añadida"
            />
          </div>
          {store.newItineraryData.images.img.length > 1
            ? store.newItineraryData.images.img.slice(1).map((url, index) => (
                <div key={index} className="carousel-item uploaded">
                  <img
                    src={url}
                    className="d-block uploaded"
                    alt="Imagen añadida"
                  />
                </div>
              ))
            : ""}
          {store.newItineraryData.images.img.length > 1 ? (
            <>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#rutaDestacada1"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#rutaDestacada1"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      <form className="d-flex mt-3 w-75 mb-5" onSubmit={handleSubmit}>
        <input
          className="form-control w-75 h-50 "
          type="file"
          accept=".jpg, .jpeg, .png, .heif, .webp"
          onChange={handleFile}
          required
        />
        <button className="send rounded-pill px-3 py-2 mx-3">
          <i className="fa-solid fa-upload"></i>
        </button>
      </form>
      <InputRutas />
    </div>
  );
};

export default UploadFile;
