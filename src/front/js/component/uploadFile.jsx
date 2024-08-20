import React from "react";
import { useState } from "react";
import "../../styles/uploadFile.css";

const UploadFile = () => {
  const [file, setFile] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(e.target[0].value);
    console.log(file);

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
    console.log(data.url);
  };
  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };
  return (
    <div className="col-4 upload-file my-5 mx-5 justify-content-center">
      <img
        src="http://via.placeholder.com/750x450"
        alt=""
        width={"750px"}
        height={"450px"}
      />
      <form className="d-flex mt-3 w-75" onSubmit={handleSubmit}>
        <input
          className="form-control w-75 h-50 "
          type="file"
          accept=".jpg, .jpeg, .png, .heif, .webp"
          onChange={handleFile}
          multiple
        />
        <button className="send rounded-pill px-3 py-2 mx-3">
          <i className="fa-solid fa-upload"></i>
        </button>
      </form>

      {/* Necesitaremos algo para ver las imágenes que se han subido 
        (Un puto modal vamos) y desde ahi se podrán eliminar  
        las imágenes y futurible que sea drag and drop para ordenarlas */}
    </div>
  );
};

export default UploadFile;