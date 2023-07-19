import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const EditProduct = () => {
  const { productid } = useParams();
  const navigate = useNavigate();
  const { store } = useContext(Context);

  const [carBrands, setCarBrands] = useState([]);
  const [carModels, setCarModels] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
//   const [data, setData] = useState({
//     name: "",
//     brand: "",
//     model: "",
//     price: 0,
//     state: "",
//     km: "",
//     year: 0,
//     fuel: "",
//     description: "",
//   });



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
    images: []
  })

  useEffect(() => {
    getBrands();
  
    fetch(process.env.BACKEND_URL + `api/product/${productid}`)
      .then(resp => resp.json())
      .then((data) => {
        setSelectedData(data);
      });
  }, [productid]);

  const handleDeleteImage = (imageId) => {
    //console.log(imageId)

    const updatedImages = selectedData.images.filter((image) => image.id !== imageId);
    setSelectedData({ ...selectedData, images: updatedImages });
  
    const deleteConfig = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    };
  
    fetch(process.env.BACKEND_URL + `/api/delete-image/${imageId}`, deleteConfig)
      .then((resp) => {
        if (!resp.ok) {
          throw new Error('Error al eliminar la imagen del servidor');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  
  
  const handleFileChange = (ev) => {
    const files = ev.target.files;
    if (files && files.length > 0) {
      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("upload_preset", "your_cloudinary_preset"); 
  
      fetch("https:/api.cloudinary.com/v1_1/djpzj47gu/image/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          setSelectedData({
            ...selectedData,
            images: [...selectedData.images, { id: data.public_id, image: data.secure_url }],
          });
        })
        .catch((error) => {
          console.error("Error uploading image: ", error);
        });
    }
  };
  
  const handleUpload = () => {
    const files = document.querySelector("input[type='file']").files;
    if (files && files.length > 0) {
      handleFileChange({ target: { files } });
    }
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

    // Obtener los datos del formulario, excluyendo las imágenes
    const { images, ...dataToSend } = selectedData;

    const putConfig = {
        method: "PUT",
        body: JSON.stringify(dataToSend),
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
            console.log(responseData);
            setSelectedData({ ...selectedData, response: responseData });
            navigate("/");
        })
        .catch((error) => {
            console.error("El error es: ", error);
        });
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

              <div>
                {selectedData.images.map((image) => (
                  <div key={image.id}>
                    <img style={{ width: '4rem', height: '5rem' }} src={image.image} alt={`Image ${image.id}`} />
                    <button onClick={() => handleDeleteImage(image.id)}>Delete</button>
                  </div>
                ))}
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleUpload}>Upload</button>
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
