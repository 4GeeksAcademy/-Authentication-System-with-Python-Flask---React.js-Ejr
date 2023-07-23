import React, {useState, useEffect} from 'react';
import '/workspaces/Watacar_v2/src/front/styles/uploadproduct.css';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Dropzone from 'react-dropzone';
import { useNavigate } from "react-router-dom";
import e from 'cors';

export const UploadCar = () => {
  const navigate = useNavigate();

  const [carBrands, setCarBrands] = useState([])
  const [carModels, setCarModels] = useState([])
  const [selectedModel, setSelectedModel] = useState("");
  
  const [hasSelectedImages, setHasSelectedImages] = useState(false); 

  
  const [image, setImage] = useState({array : {}})
  const [loading, setLoading] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [data, setData] = useState({ product_type: 'COCHE',  });
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [submitData, setSubmitData] = useState([]);

  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);


const MAX_IMAGES = 5;

const getBrands = () => {
  fetch(process.env.BACKEND_URL + 'api/car-brands')
  .then(resp => resp.json())
  .then(data => {
    setCarBrands(data)
  })
  .catch(err => console.error(err))
}

const getModelsByBrand = (brandId) => {
  if (brandId !== selectedBrand) {
    fetch(process.env.BACKEND_URL + `api/car-models?brandId=${brandId}`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data)
        setCarModels(data)

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
  
  const handleRemoveImage = (index) => {
    // Eliminar la imagen de uploadedFiles
    const newUploadedFiles = uploadedFiles.filter((file, i) => index !== i);
    setUploadedFiles(newUploadedFiles);
  
    // Eliminar el archivo correspondiente de submitData
    const newSubmitData = submitData.filter((formData, i) => index !== i);
    setSubmitData(newSubmitData);

    const newSelectedImages = selectedImages.filter((_, i) => index !== i);
    setSelectedImages(newSelectedImages);
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
    <div className="container col-12 my-5 justify-content-center ">
      <form onSubmit={handleSubmit}>
        <div className="box my-5">
      <div className='upload-title'>
        <h3 className='text-center mt-2 pt-3'>
          <strong>¿Qué vas a vender?</strong>
        </h3>
      </div>
          <div className=''>

          {/* <div className="row me-1 justify-content-around text-center">
              <div className="col-xs-10 col-sm-10 col-md-10 col-lg-6 ">
                <div className="input-box">
                  <label className="form-floating" htmlFor="full_name">Nombre y apellidos</label>
                 <div>
                  <input type="text" placeholder="Ramon Gutierrez" name="full_name" onChange={handleChange}/>
                </div>
                </div>
              </div> */}


            <div className='row me-1 justify-content-around text-center p-4'>
              
              <div className='col-xs-10 col-sm-10 col-md-10 col-lg-6 '>
                <div>
                <label htmlFor='name'> <h6><strong>Título</strong></h6> </label>
               </div> 
               <input className='select ' type='text' maxLength="100" name='name' placeholder='de la publicación' onChange={e => handleChange(e)}/>
              </div>


  
              <div className='col-xs-10 col-sm-10 col-md-10 col-lg-6 '>
                <div>
                <label htmlFor='select-middle'> <h6><strong>Marca</strong></h6> </label>
                  </div>
                  <select id='select-middle' name='brand' className='select' onChange={e => {handleChange(e); getModelsByBrand(e.target.value)}}>
                    <option >Selecciona otro</option>
                    {carBrands.map((brand, index) => (
                      <option key={index} value={brand.id}>{brand.name}</option>
                    ))}
                  </select>
              </div>


              </div>




            <div className='row me-1 justify-content-around text-center p-4'>
              
            <div className='col-xs-10 col-sm-10 col-md-10 col-lg-6 '>
                <div>
                <label htmlFor='select-right'> <h6><strong>Modelo</strong></h6> </label>
                </div>
                <select id='select-right' name='model' className='select' onChange={e => handleModelChange(e)} >
                  <option >Selecciona otro</option>
                    {carModels.map((model, index) => (
                      <option key={index} value={model.id}>{model.model}</option>
                    ))}
                  </select>
              </div>

            
              <div className='col-xs-10 col-sm-10 col-md-10 col-lg-6 '>
                <div>
                <label htmlFor='name'> <h6><strong>Precio</strong></h6></label>
                </div>
                <input className='select ' type='number'  name='price' placeholder='2400€' onChange={e => handleChange(e)}/>
              </div>

            </div>


         <div className='row me-1 justify-content-around text-center p-4'>
          
              <div className='col-xs-10 col-sm-10 col-md-10 col-lg-6'>
                <div>
                <label htmlFor='select-middle'> <h6><strong>Estado del vehículo</strong></h6> </label>
                </div>
                <select id='select-middle' name='state' className='select ' onChange={e => handleChange(e)}>
                  <option >Selecciona otro</option>
                  <option value='NUEVO'>Nuevo</option>
                  <option value='SEMINUEVO'  >Semi-nuevo</option>
                </select>
              </div>

              <div className='col-xs-10 col-sm-10 col-md-10 col-lg-6'>
                <div>
                <label htmlFor='select-right'> <h6><strong>Kilómetros</strong></h6> </label>
               </div>
               <select id='select-right' name='km' className='select ' onChange={e => handleChange(e)}>
                  <option >Selecciona otro</option>
                  <option value='1000'>Cómo nuevo: de 0 a 1,000</option>
                  <option value='50000'  >Bajo kilometraje: de 1,000 a 50,000</option>
                  <option value='100000'>Kilometraje moderado: de 50,000 a 100,000</option>
                  <option value='100000'>Alto kilometraje: Más de 100,000</option>
                </select>
              </div>
            </div>
           



            <div className='row me-1 justify-content-around text-center p-4'>
            <div className='row me-1 justify-content-around text-center'>
              <div className='col-xs-10 col-sm-10 col-md-10 col-lg-6'>
                <div>
                <label htmlFor='name'> <h6><strong>Año de fabricación</strong></h6> </label>
                </div>
                <input className='select ' type='number'  name='year' placeholder='2020' onChange={e => handleChange(e)}/>
              </div>

              {/* <div className='col-3 ms-5 me-5'>
                <label htmlFor='select-middle'> <h6><strong>Tipo de coche</strong></h6> </label>
                <select id='select-middle' name='model' className='select' onChange={e => handleModelChange(e)}>
                  <option value={selectedType}>{selectedType}</option>
                </select>
              </div> */}



              <div className='col-xs-10 col-sm-10 col-md-10 col-lg-6'>
                <div>
                <label htmlFor='select-right'> <h6><strong>Combustible</strong></h6> </label>
                 </div>
                  <select id='select-right' name='fuel' className='select ' onChange={e => handleChange(e)}>
                    <option >Selecciona otro</option>
                    <option value='GASOLINA'  >Gasolina</option>
                    <option value='DIESEL'>Diesel</option>
                    <option value='ELECTRICO'>Eléctrico</option>
                    <option value='HIBRIDO'>Híbrido</option>

                  </select>
              </div>
            </div>
            </div>


            <div className=' specialBox row me-1 justify-content-around text-center p-4'>
              <div className=' col-xs-10 col-sm-10 col-md-10 col-lg-6 justify-content-center ms-5 mt-5 '>
                <div className='description-title text-center justify-content-center d-flex'>
                  <h4><strong>Descripción:</strong></h4>
                </div>
                <div className="  justify-content-center d-flex text-center align-items-center m-auto">
                <textarea 
                onChange={e => handleChange(e)} 
                className='container p-3' 
                name="description" 
                rows="7" 
                cols="40" 
                placeholder='Te recomendamos encarecidamente incluir 
                algunos detalles clave cómo el número de puertas, 
                plazas disponibles y el tipo de cambio del vehículo. '
                >

                </textarea>
                </div>
              </div>

              </div>
                    
              <div className='upload-innerbox'>
              
                <div className=''>
                  <div className="container d-flex justify-content-center mt-3">
                    <h6><strong>Imágenes:</strong></h6>
                  </div>
                  <Dropzone 
                    onDrop={handleDrop}
                    className=""
                    onChange={(ev) => setImage(ev.target.value)}
                    value={image}
                  >
                    {({ getRootProps, getInputProps }) => (
                      

            
        <div className='row me-1 justify-content-around text-center '>    
                  <section >
                    <div {...getRootProps({ className: "" })}>
                      <div  className='container m-auto '>

                        <a className='btn btn-info btnadd'>Agrega tus imágenes</a>
                        {/* <p></p>
                        <p>Cliquea</p> */}
                      </div>
                    </div>
                  </section>

                    </div>
                    )}
                  </Dropzone>
                  <div className='mb-5 d-flex'>
                    <div className={`dropzone image-preview ${hasSelectedImages ? "" : "d-none"}`}>
                    {selectedImages.map((selectedImage, index) => (
                            <div key={index} className="me-3">
                              <img 
                              style={{width:'11rem', height:'8rem'}} 
                              src={selectedImage.url} 
                              alt={selectedImage.file.name} />
                              <button onClick={(e) => handleDeleteImage(index, e)}>
                              <i class="fa-solid fa-trash-can"></i>
                                </button>
                            </div>
                          ))}
                    </div>
                          
                    
                        </div>
             
              </div>

                <div className='text-center pb-5'>
                    <button className='btn btn-primary'>¡Sube tu coche!</button>
                </div>


              </div>


            
          </div>
        </div>



        
      </form>
    </div>
  );
};