import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import e from "cors";
export const EditProduct = () => {
  const { productid } = useParams();
  const navigate = useNavigate();
  const { store } = useContext(Context);
  const [selectedImageId, setSelectedImageId] = useState(null); 
  const [selectedImageIds, setSelectedImageIds] = useState([]); 
  const [carBrands, setCarBrands] = useState([]);
  const [carModels, setCarModels] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedData, setSelectedData] = useState({
    name: "",
    brand: "",
    model: "",
    price: 0,
    state: "",
    km: "",
    year: 0,
    fuel: "",
    description: "",
    images: [],
  });
  useEffect(() => {
    getBrands();
    fetch(process.env.BACKEND_URL + `api/product/${productid}`)
      .then((resp) => resp.json())
      .then((data) => {
        setSelectedData(data);
      });
  }, [productid]);
  const handleDeleteImage = (imageId, e) => {
    e.preventDefault();
    const isSelected = selectedImageIds.includes(imageId);
    if (isSelected) {
      setSelectedImageIds(selectedImageIds.filter((id) => id !== imageId));
    } else {
      setSelectedImageIds([...selectedImageIds, imageId]);
    }
  };
  const handleFileChange = (ev) => {
    const files = ev.target.files;
    if (files && files.length > 0) {
      setSelectedImages([...selectedImages, ...files]);
    }
    // console.log(selectedImages); 
  };
   
  const handleChange = (ev) => {
    setSelectedData({ ...selectedData, [ev.target.name]: ev.target.value });
  };
  const handleModelChange = (ev) => {
    setSelectedModel(ev.target.value);
    setSelectedData({ ...selectedData, model: ev.target.value });
  };
  const getBrands = () => {
    fetch(process.env.BACKEND_URL + "api/car-brands")
      .then((resp) => resp.json())
      .then((data) => {
        setCarBrands(data);
      })
      .catch((err) => console.error(err));
  };
  const getModelsByBrand = (brandId) => {
    if (brandId !== selectedBrand) {
      fetch(process.env.BACKEND_URL + `api/car-models?brandId=${brandId}`)
        .then((resp) => resp.json())
        .then((data) => {
          setCarModels(data);
          setSelectedBrand(brandId);
          setSelectedModel("");
        })
        .catch((err) => console.error(err));
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  
    Promise.all(
      selectedImages.map((file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("tags", "codeinfuse, medium, gist");
      formData.append("upload_preset", "WhataCar");
      formData.append("api_key", process.env.API_KEY);
      formData.append("timestamp", Math.floor(Date.now() / 1000));
  
        return fetch("https://api.cloudinary.com/v1_1/djpzj47gu/image/upload", {
          method: "POST",
          body: formData,
        })
          .then((resp) => resp.json())
          .then((data) => {
            console.log("Uploaded image data:", data);
            return data.secure_url;
          })
          .catch((error) => {
            console.error("Error uploading image:", error);
            return null;
          });
      })
    )
      .then((fileURLs) => {
        // Remove null values from fileURLs in case of any upload errors
        const filteredFileURLs = fileURLs.filter((url) => url !== null);
  
        const updatedData = {
          ...selectedData,
          brand_id: selectedBrand,
          model_id: selectedModel,
          images: filteredFileURLs,
        };
  
        const putConfig = {
          method: "PUT",
          body: JSON.stringify(updatedData),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
  
        fetch(process.env.BACKEND_URL + `api/product/${productid}/edit`, putConfig)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Error al guardar los datos");
            }
            return response.json();
          })
          .then((responseData) => {
            setSelectedData({ ...selectedData, response: responseData });
            console.log(selectedData)
            setSelectedImages([]);
            navigate("/");
          })
          .catch((error) => {
            console.error("El error es: ", error);
          });
      })
      .catch((error) => {
        console.error("Error uploading images to Cloudinary:", error);
      });
       selectedImageIds.forEach((imageId) => {
    const deleteConfig = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    fetch(process.env.BACKEND_URL + `api/delete-image/${imageId}`, deleteConfig)
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Error al eliminar la imagen del servidor");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  });
};
  
  
  
  
const handleAdd = (e) => {
  e.preventDefault();
  const newImages = selectedImages.map((file) => ({ image: file }));
  setSelectedData((prevState) => ({
    ...prevState,
    images: [...prevState.images, ...newImages],
  }));
  console.log(selectedImages);
};
  
  
  return (
    <>
      <div className="upload-container">
        <form onSubmit={handleSubmit}>
          <div className="upload-box">
            <div className="upload-innerbox">
              <div className="upload-title">
                <h3>
                  <strong>Actualiza tu producto</strong>
                </h3>
              </div>
              <div className="row innerselect">
                <div className="col-3 me-3">
                  <label htmlFor="name">
                    <h6>
                      <strong>Título</strong>
                    </h6>{" "}
                  </label>
                  <input className="select" type="text" maxLength="100" name="name" value={selectedData.name} placeholder="de la publicación" onChange={handleChange}/>
                </div>
                <div className="col-3 me-5 ms-5">
                  <label htmlFor="select-middle">
                    <h6>
                      <strong>Marca</strong>
                    </h6>{" "}
                  </label>
                  <select id="select-middle" name="brand"  className="select" onChange={(e) => {handleChange(e) ; getModelsByBrand(e.target.value);}}
                  >
                    <option >Selecciona otro</option>
                    {carBrands.map((brand) => (
                      <option key={brand.id} value={brand.id}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-3 ms-3">
                  <label htmlFor="select-right">
                    <h6>
                      <strong>Modelo</strong>
                    </h6>{" "}
                  </label>
                  <select id="select-right" name="model"  className="select" onChange={handleModelChange}>
                    <option>Selecciona otro</option>
                    {carModels.map((model) => (
                      <option key={model.id} value={model.id}>
                        {model.model}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="row innerselect">
                <div className="col-3 me-3">
                  <label htmlFor="name">
                    <h6>
                      <strong>Precio</strong>
                    </h6>
                  </label>
                  <input className="select" type="number"name="price" value={selectedData.price} placeholder="2400€" onChange={handleChange}/>
                </div>
                <div className="col-3 me-5 ms-5">
                  <label htmlFor="select-middle">
                    <h6>
                      <strong>Estado del vehículo</strong>
                    </h6>{" "}
                  </label>
                  <select id="select-middle" name="state" value={selectedData} className="select" onChange={handleChange}>
                    <option>Selecciona otro</option>
                    <option value="NUEVO">Nuevo</option>
                    <option value="SEMINUEVO">Semi-nuevo</option>
                  </select>
                </div>
                <div className="col-3 ms-3">
                  <label htmlFor="select-right">
                    <h6>
                      <strong>Kilómetros</strong>
                    </h6>{" "}
                  </label>
                  <select id="select-right" name="km" value={selectedData.km} className="select" onChange={handleChange}>
                    <option>Selecciona otro</option>
                    <option value="1000">Cómo nuevo: de 0 a 1,000</option>
                    <option value="50000">Bajo kilometraje: de 1,000 a 50,000</option>
                    <option value="100000">Kilometraje moderado: de 50,000 a 100,000</option>
                    <option value="100000">Alto kilometraje: Más de 100,000</option>
                  </select>
                </div>
              </div>
              <div className="row innerselect">
                <div className="col-3 me-3">
                  <label htmlFor="name">
                    <h6>
                      <strong>Año de fabricación</strong>
                    </h6>{" "}
                  </label>
                  <input className="select" type="number" name="year" value={selectedData.year}   placeholder="2020" onChange={handleChange} /> 
                </div>
                <div className="col-3 ms-3">
                  <label htmlFor="select-right">
                    <h6>
                      <strong>Combustible</strong>
                    </h6>{" "}
                  </label>
                  <select id="select-right "name="fuel" value={selectedData.fuel} className="select" onChange={handleChange}>
                    <option>Selecciona otro</option>
                    <option value="GASOLINA">Gasolina</option>
                    <option value="DIESEL">Diesel</option>
                    <option value="ELECTRICO">Eléctrico</option>
                    <option value="HÍBRIDO">Híbrido</option>
                  </select>
                </div>
              </div>
              <div className="upload-product-description">
                <div className="description-title">
                  <h5>
                    <strong>Descripción:</strong>
                  </h5>
                </div>
                <textarea value={selectedData.description} onChange={handleChange}  className="upload-textarea-description" name="description" rows="7" cols="132"
                  placeholder="Te recomendamos encarecidamente incluir algunos detalles clave cómo el número de puertas, plazas disponibles y el tipo de cambio del vehículo."
                ></textarea>
              </div>
              <div className="dropzone d-flex">
              {selectedData.images.map((image, index) => (
                !selectedImageIds.includes(image.id) && (
                  <div key={image.id}>
                    <img style={{width:'11rem', height:'8rem', border:'.1rem solid black', borderRadius:'.2rem'}} src={image.image} alt={`Image ${image.id}`} />
                    <button className="btn" onClick={(e) => handleDeleteImage(image.id, e)}><i class="fa-solid fa-trash-can" style={{"color": "red"}}></i></button>
                  </div>
                )
              ))}
              
              
            </div>
            <div className="input_edit_images">
              <input type="file" onChange={handleFileChange} multiple />
              <button onClick={handleAdd}>Upload</button>
            </div>
              <div className="text-center mt-5">
                <button className="btn btn-primary" type="submit" >¡Actualiza tu vehículo!</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};