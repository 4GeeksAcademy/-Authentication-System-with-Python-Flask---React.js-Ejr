import React, { useState, useEffect } from "react";

const UploadImage = () => {
  const { image, setImage } = useState("");
  const { loading, setLoading } = useState(false);

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "Doggerimages");
    setLoading(true);
    const res = await fetch("https://api/cloudinary.com/v1_1/etolopez/upload", {
      method: "POST",
      body: data,
    });
    const file = await res.json();
    setImage(file.secure_url);
    setLoading(false);
  };

  return (
    <div className="row">
      <div className="col">
        <input
          type="file"
          name="file"
          id="media"
          placeholder="Sube tu imagen aqui"
          onChange={uploadImage}
        />
        {loading ? (
          <h3>Cargando Imagenes...</h3>
        ) : (
          <img src={image} style={{ width: "300px" }} />
        )}
      </div>
    </div>
  );
};

export default UploadImage;
