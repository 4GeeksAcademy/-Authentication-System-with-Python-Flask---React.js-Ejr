import React, {useState, useEffect} from 'react';
import '/workspaces/Watacar_v2/src/front/styles/uploadproduct.css';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Dropzone from 'react-dropzone';
import { useNavigate } from "react-router-dom";
import e from 'cors';
export const UploadMoto = () => {
  const navigate = useNavigate();
  const [selectedImages, setSelectedImages] = useState([]);
  const [hasSelectedImages, setHasSelectedImages] = useState(false); 
  const [motoBrands, setMotoBrands] = useState([])
  const [motoModels, setMotoModels] = useState([])
  const [selectedModel, setSelectedModel] = useState("");
 
  
  const [image, setImage] = useState({array : {}})
  const [loading, setLoading] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [data, setData] = useState({ product_type: 'MOTO',  });
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [submitData, setSubmitData] = useState()
  const [selectedBrand, setSelectedBrand] = useState("");
const getBrands = () => {
  fetch(process.env.BACKEND_URL + 'api/moto-brands')
  .then(resp => resp.json())
  .then(data => {
    setMotoBrands(data)
  })
  .catch(err => console.error(err))
}
const getModelsByBrand = (brandId) => {
  if (brandId !== selectedBrand) {
    fetch(process.env.BACKEND_URL + `api/car-models?brandId=${brandId}`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data)
        setMotoModels(data)
        setSelectedBrand(brandId)
        setSelectedModel("")
        //setCarTypes([]) // Reiniciar el tipo cuando cambie el modelo 
      })
      .catch((err) => console.error(err))
  }
}
useEffect(() => {
  //getModelsByBrand();
  
  getBrands();
}, []);
  // const getModelsByBrand = (brand) => {
  //   fetch(process.env.BACKEND_URL + 'api/car-model?make=' + brand)
  //   .then(resp => resp.json())
  //   .then(data => setMotoModels(data))
  //   .catch(err => console.error(err));
  // }
  const handleDrop = (files) => {
    setSelectedImages((prevSelectedImages) => [
      ...prevSelectedImages,
      ...files.map((file) => ({ file, url: URL.createObjectURL(file) })),
    ]);
  
    setUploadedFiles((prevUploadedFiles) => [
      ...prevUploadedFiles,
      ...files.map((file) => file.name),
    ]);
  
    const uploaders = files.map((file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tags", "codeinfuse, medium, gist");
      formData.append("upload_preset", "WhataCar");
      formData.append("api_key", process.env.API_KEY);
      formData.append("timestamp", Math.floor(Date.now() / 1000));
      setLoading(true);
      return formData;
    });
  
    setSubmitData(uploaders);
    setHasSelectedImages(true); 
  };
  const handleDeleteImage = (index, e) => {
    e.preventDefault();
  
    setSelectedImages((prevSelectedImages) =>
      prevSelectedImages.filter((_, i) => index !== i)
    );
  
    setUploadedFiles((prevUploadedFiles) =>
      prevUploadedFiles.filter((_, i) => index !== i)
    );
    const dropzone = e.target.closest('.dropzone');
    const input = dropzone.querySelector('input');
    if (selectedImages.length < MAX_IMAGES) {
      input.disabled = false;
    if (selectedImages.length === 0) {
      setHasSelectedImages(false);
    }
  };
}
  
 
   const handleChange = (ev) => {
    
    
    setData({...data , [ev.target.name] : ev.target.value}) 
  }
  // const handleBrandChange = (ev) => {
  //   const brandId = ev.target.value;
  //   setSelectedBrand(brandId);
  //   getModelsByBrand(brandId);
  // };
  const handleModelChange = (ev) => {
    setSelectedModel(ev.target.value);
    setData({ ...data, model: ev.target.value });
  };
  
  
  
  // const getTypesByModel = (modelId) => {
  //   fetch(process.env.BACKEND_URL + `api/car-types/${modelId}`)
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //       console.log(data);
  //       if (data.type) {
  //         setSelectedType(data.type);
  //       } else {
  //         setSelectedType("");
  //       }
  //     })
  //     .catch((err) => console.error(err));
  // };
  
  
  
  
  
  
  // useEffect(() => {
  //   if (selectedModel) {
  //     getTypesByModel(selectedModel)
  //   }
  // }, [selectedModel])
  
  
  
  
  const handleSubmit = (ev) => {
    ev.preventDefault();
  
    const filesToUpload = uploadedFiles.filter((fileName) =>
    selectedImages.some((image) => image.file.name === fileName)
    );
    Promise.all(
      filesToUpload.map((fileName) => {
        const file = selectedImages.find((image) => image.file.name === fileName);
        if (file) {
          const formData = new FormData();
          formData.append("file", file.file);
          formData.append("tags", "codeinfuse, medium, gist");
          formData.append("upload_preset", "WhataCar");
          formData.append("api_key", process.env.API_KEY);
          formData.append("timestamp", Math.floor(Date.now() / 1000));
          setLoading(true);
          return fetch(
            "https://api.cloudinary.com/v1_1/djpzj47gu/image/upload",
            {
              method: "POST",
              body: formData,
            }
          )
            .then((resp) => resp.json())
            .then((data) => {
              //console.log("Uploaded image data:", data);
              return data.secure_url;
            });
        }
      })
    )
      .then((fileURLs) => {
        const config = {
          method: "POST",
          body: JSON.stringify({ ...data, images: fileURLs }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
  
        fetch(process.env.BACKEND_URL + "api/upload-car", config)
          .then((resp) => resp.json())
          .then((resp) => {
            setData(resp);
            navigate("/");
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };
    //setIsSubmitClicked(true);
  
  return (
    <div className='upload-container'>
      <form onSubmit={handleSubmit}>
        <div className='upload-box'>
          <div className='upload-innerbox'>
            <div className='upload-title'>
              <h3><strong>¿Qué vas a vender?</strong></h3>
            </div>
            <div className='row innerselect'>
              
              <div className='col-3 me-3'>
                <label htmlFor='name'> <h6><strong>Título</strong></h6> </label>
                <input className='select ' type='text' maxLength="100" name='name' placeholder='de la publicación' onChange={e => handleChange(e)}/>
              </div>
  
              <div className='col-3 me-5 ms-5'>
                <label htmlFor='select-middle'> <h6><strong>Marca</strong></h6> </label>
                  <select id='select-middle' name='brand' className='select' onChange={e => {handleChange(e); getModelsByBrand(e.target.value)}}>
                    <option >Selecciona otro</option>
                    {motoBrands.map((brand, index) => (
                      <option key={index} value={brand.id}>{brand.name}</option>
                    ))}
                  </select>
              </div>
              <div className='col-3 ms-3'>
                <label htmlFor='select-right'> <h6><strong>Modelo</strong></h6> </label>
                <select id='select-right' name='model' className='select' onChange={e => handleModelChange(e)} >
                  <option >Selecciona otro</option>
                    {motoModels.map((model, index) => (
                      <option key={index} value={model.id}>{model.model}</option>
                    ))}
                  </select>
              </div>
            </div>
            <div className='row innerselect'>
              <div className='col-3 me-3'>
                <label htmlFor='name'> <h6><strong>Precio</strong></h6></label>
                <input className='select ' type='number'  name='price' placeholder='2400€' onChange={e => handleChange(e)}/>
              </div>
              <div className='col-3 me-5 ms-5'>
                <label htmlFor='select-middle'> <h6><strong>Estado del vehículo</strong></h6> </label>
                <select id='select-middle' name='state' className='select ' onChange={e => handleChange(e)}>
                  <option >Selecciona otro</option>
                  <option value='NUEVO'>Nuevo</option>
                  <option value='SEMINUEVO'  >Semi-nuevo</option>
                </select>
              </div>
              <div className='col-3 ms-3'>
                <label htmlFor='select-right'> <h6><strong>Kilómetros</strong></h6> </label>
                <select id='select-right' name='km' className='select ' onChange={e => handleChange(e)}>
                  <option >Selecciona otro</option>
                  <option value='1000'>Cómo nuevo: de 0 a 1,000</option>
                  <option value='50000'  >Bajo kilometraje: de 1,000 a 50,000</option>
                  <option value='100000'>Kilometraje moderado: de 50,000 a 100,000</option>
                  <option value='100000'>Alto kilometraje: Más de 100,000</option>
                </select>
              </div>
            </div>
            <div className='row innerselect'>
              <div className='col-3 me-3'>
                <label htmlFor='name'> <h6><strong>Año de fabricación</strong></h6> </label>
                <input className='select ' type='number'  name='year' placeholder='2020' onChange={e => handleChange(e)}/>
              </div>
              {/* <div className='col-3 ms-5 me-5'>
                <label htmlFor='select-middle'> <h6><strong>Tipo de coche</strong></h6> </label>
                <select id='select-middle' name='model' className='select' onChange={e => handleModelChange(e)}>
                  <option value={selectedType}>{selectedType}</option>
                </select>
              </div> */}
              <div className='col-3 ms-3'>
                <label htmlFor='select-right'> <h6><strong>Combustible</strong></h6> </label>
                  <select id='select-right' name='fuel' className='select ' onChange={e => handleChange(e)}>
                    <option >Selecciona otro</option>
                    <option value='GASOLINA'  >Gasolina</option>
                    <option value='DIESEL'>Diesel</option>
                    <option value='ELECTRICO'>Eléctrico</option>
                    <option value='HIBRIDO'>Híbrido</option>
                  </select>
              </div>
            </div>
              <div className='upload-product-description'>
                <div className='description-title'>
                  <h5><strong>Descripción:</strong></h5>
                </div>
                <textarea onChange={e => handleChange(e)} className='upload-textarea-description' name="description" rows="7" cols="132" placeholder='Te recomendamos encarecidamente incluir algunos detalles clave cómo el número de puertas, plazas disponibles y el tipo de cambio del vehículo. '></textarea>
              </div>
                    
              <div className='upload-innerbox'>
              
                <div className='upload-product-images'>
                  <div>
                    <h5><strong>Imágenes:</strong></h5>
                  </div>
                  <Dropzone 
                    onDrop={handleDrop}
                    className=""
                    onChange={(ev) => setImage(ev.target.value)}
                    value={image}
                  >
                    {({ getRootProps, getInputProps }) => (
                      
                  <section>
                    <div {...getRootProps({ className: "" })}>
                      <div >
                        <a className='btn btn-info btnadd'>Agrega tus imágenes</a>
                        {/* <p></p>
                        <p>Cliquea</p> */}
                      </div>
                    </div>
                  </section>
                    
                    )}
                  </Dropzone>
                  <div className='mb-5 d-flex'>
                    <div className={`dropzone image-preview ${hasSelectedImages ? "" : "d-none"}`}>
                    {selectedImages.map((selectedImage, index) => (
                            <div key={index} className="me-3">
                              <img style={{width:'11rem', height:'8rem', border:'.1rem solid black', borderRadius:'.2rem'}} src={selectedImage.url} alt={selectedImage.file.name} />
                              <button onClick={(e) => handleDeleteImage(index, e)}>🗑️</button>
                            </div>
                          ))}
                    </div>
                          
                        </div>
             
              </div>
                <div className='text-center mt-5'>
                    <button className='btn btn-primary'>¡Sube tu moto!</button>
                </div>
       
              </div>
            
          </div>
        </div>
        
      </form>
    </div>
  );
};