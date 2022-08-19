import React, { useState } from "react";
import axios from "axios";

cloud_name = "wbpza7rq";
api_key = "366651217213899";
api_secret = "cAhOpTg6lEjCcUE1rcs0vcLeiSI";

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

  const handleOpenWidget = () => {
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "etolopez",
        uploadPreset: "wbpza7rq",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setImages[
            (prev) => [
              ...prev,
              { url: result.info.url, public_id: result.info.public_id },
            ]
          ];
        }
      }
    );
    myWidget.open();
  };

  return (
    <div className="row">
      <div className="col">
        <button className=" btn btn-primary cloudinary-button rounded-pill">
          <input
            type="file"
            id="upload-widget"
            onClick={() => handleOpenWidget()}
          />
        </button>
      </div>
    </div>
  );
};

export default UploadImage;
