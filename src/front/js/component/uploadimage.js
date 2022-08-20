import React, { useState } from "react";
import axios from "axios";
import { image } from "@cloudinary/url-gen/qualifiers/source";

const cloud_name = "wbpza7rq";
const api_key = "366651217213899";
const api_secret = "cAhOpTg6lEjCcUE1rcs0vcLeiSI";

const UploadImage = () => {
  const { images, setImages } = useState([]);
  const { imageToRemove, setImageToRemove } = useState(null);

  const handleRemoveImg = (imgObj) => {
    setImageToRemove(imgObj.public_id);
    axios
      .delete(`https://dogger-web-app.herokuapp.com/${imgObj.public_id}`)
      .then(() => {
        setImageToRemove(null);
        setImages((prev) =>
          prev.filter((img) => img.public_id !== imgObj.public_id)
        );
      })
      .catch((e) => console.log(e));
  };

  const handleOpenWidget = (e) => {
    e.preventDefault();
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "etolopez",
        uploadPreset: "wbpza7rq",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setImages(result.info.url);
        }
      }
    );
    myWidget.open();
  };

  return (
    <div className="row">
      <div className="col">
        <button
          className=" btn btn-primary cloudinary-button rounded-pill"
          onClick={(e) => handleOpenWidget(e)}
        >
          Sube una foto de tu perrito!
        </button>
      </div>
    </div>
  );
};

export default UploadImage;
