import React, { useState } from "react";
import axios from "axios";
import { fetcher } from "./lib/api";
import { getIdFromLocalCookie, getTokenFromServerCookie } from "./lib/auth";

const cloud_name = "wbpza7rq";
const api_key = "366651217213899";
const api_secret = "cAhOpTg6lEjCcUE1rcs0vcLeiSI";

const pageUrl = "https://dogger-web-app.herokuapp.com";

const UploadImage = ({ avatar }) => {
  const { images, setImages } = useState([]);
  const { imageToRemove, setImageToRemove } = useState(null);
  const [image, setImage] = useState(null);

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

  const uploadToCLient = (event) => {
    event.preventDefault();
    if (event.target.files && event.target.files[0]) {
      const tmpImage = event.target.files[0];
      setImage(tmpImage);
    }
  };

  const uploadToServer = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const file = image;
    formData.append("inputFile", file);
    formData.append("walker_id", await getIdFromLocalCookie());
    try {
    } catch (error) {
      console.error(JSON.stringify(error));
    }
  };

  return (
    <div className="row">
      <div className="col">
        <div>
          <button
            className=" btn btn-primary cloudinary-button rounded-pill"
            onClick={(e) => handleOpenWidget(e)}
            onChange={uploadToCLient}
          >
            Sube una foto de perfil
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadImage;

export async function getServerSideProps({ req }) {
  const jwt = getTokenFromServerCookie(req);
  if (!jwt) {
    return {
      redirect: {
        destination: "/",
      },
    };
  } else {
    const responseData = await fetcher(
      `${process.env.pageUrl}/walkers/${walker_id}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    const avatar = responseData.avatar ? responseData.avatar : "default_avatar";

    return {
      props: {
        avatar,
      },
    };
  }
}
