import React, {useState, useEffect} from 'react';
import '/workspaces/Watacar_v2/src/front/styles/uploadproduct.css';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Dropzone from 'react-dropzone';
import e from 'cors';

export const UploadCar = () => {

  const [carBrands, setCarBrands] = useState([])
  const [carModels, setCarModels] = useState([])
  const [image, setImage] = useState({array : {}})
  const [loading, setLoading] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [data, setData] = useState("")
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [submitData, setSubmitData] = useState()
  const [selectedBrand, setSelectedBrand] = useState("");



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
      })
      .catch((err) => console.error(err))
  }
}




useEffect(() => {
  getBrands();
  //getModelsByBrand();
}, []);


  // const getModelsByBrand = (brand) => {
  //   fetch(process.env.BACKEND_URL + 'api/car-model?make=' + brand)
  //   .then(resp => resp.json())
  //   .then(data => setCarModels(data))
  //   .catch(err => console.error(err));
  // }




  const handleDrop = (files) => {
    const uploaders = files.map((file) => {
      const formData = new FormData();
      formData.append("file", file)
      formData.append("tags", `codeinfuse, medium, gist`)
      formData.append("upload_preset", "WhataCar")
      formData.append("api_key", process.env.API_KEY)
      formData.append("timestamp", (Date.now() / 1000 | 0))
      setLoading("true")
      setSubmitData(formData)

      setUploadedFiles((prevUploadedFiles) => [...prevUploadedFiles, file.name])

  

      
  })};

  const handleChange = (ev) => {
    
    getModelsByBrand(ev.target.value)
    setData({...data , [ev.target.name] : ev.target.value}) 
  }


  // const handleBrandChange = (ev) => {
  //   const brandId = ev.target.value;
  //   setSelectedBrand(brandId);
  //   getModelsByBrand(brandId);
  // };

  const handleModelChange = (ev) => {
    setData({...data , [ev.target.name] : ev.target.value}) 
  }
  
  
  
  

  const handleSubmit = (ev) => {
    ev.preventDefault();
    fetch("https://api.cloudinary.com/v1_1/djpzj47gu/image/upload", {
        method: 'POST',
        body: submitData
      })
        .then((resp) => resp.json()) 
        .then((data) => {
          const fileURL = data.secure_url;
          console.log(fileURL);
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        })

      
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
                <input className='select ' type='text' maxLength="100" name='title' placeholder='de la publicación' onChange={e => handleChange(e)}/>
              </div>
  
              <div className='col-3 me-5 ms-5'>
                <label htmlFor='select-middle'> <h6><strong>Marca</strong></h6> </label>
                  <select id='select-middle' name='brand' className='select' onChange={e => handleChange(e)}>
                    {carBrands.map((brand, index) => (
                      <option key={index} value={brand.id}>{brand.name}</option>
                    ))}
                  </select>
              </div>

              <div className='col-3 ms-3'>
                <label htmlFor='select-right'> <h6><strong>Modelo</strong></h6> </label>
                <select id='select-right' name='model' className='select' onChange={e => handleModelChange(e)} >
                    {carModels.map((model, index) => (
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
                  <option value='new'>Nuevo</option>
                  <option value='semi-new'  >Semi-nuevo</option>
                </select>
              </div>

              <div className='col-3 ms-3'>
                <label htmlFor='select-right'> <h6><strong>Kilómetros</strong></h6> </label>
                <select id='select-right' name='km' className='select ' onChange={e => handleChange(e)}>
                  <option value='practically new'>Cómo nuevo: de 0 a 1,000</option>
                  <option value='low mileage'  >Bajo kilometraje: de 1,000 a 50,000</option>
                  <option value='moderate mileage'>Kilometraje moderado: de 50,000 a 100,000</option>
                  <option value='high mileage'>Alto kilometraje: Más de 100,000</option>
                </select>
              </div>
            </div>

            <div className='row innerselect'>
              <div className='col-3 me-3'>
                <label htmlFor='name'> <h6><strong>Año de fabricación</strong></h6> </label>
                <input className='select ' type='number'  name='year' placeholder='2020' onChange={e => handleChange(e)}/>
              </div>

              <div className='col-3 ms-5 me-5'>
                <label htmlFor='select-middle'> <h6><strong>Tipo de coche</strong></h6> </label>
                <select id='select-middle' name='select' className='select ' onChange={e => handleChange(e)}>
                  <option value='value1'>Deportiva</option>
                  <option value='value2'  >Turismo</option>
                  <option value='value3'>Scooter</option>
                  <option value='value3'>Todoterreno</option>
                  <option value='value3'>Crucero</option>
                  <option value='value3'>Otro</option>
                </select>
              </div>


              <div className='col-3 ms-3'>
                <label htmlFor='select-right'> <h6><strong>Combustible</strong></h6> </label>
                <select id='select-right' name='select' className='select ' onChange={e => handleChange(e)}>
                  <option value='gasoline'  >Gasolina</option>
                  <option value='diesel'>Diesel</option>
                  <option value='electric'>Eléctrico</option>
                  <option value='hybrid'>Híbrido</option>

                </select>
              </div>
            </div>

              <div className='upload-product-description'>
                <div className='description-title'>
                  <h5><strong>Descripción:</strong></h5>
                </div>
                <textarea onChange={e => handleChange(e)} className='upload-textarea-description' name="description" rows="7" cols="132" placeholder='Te recomendamos encarecidamente incluir algunos detalles clave cómo el número de puertas, plazas disponibles y el tipo de cambio del vehículo. '></textarea>
              </div>


                    
              <div className='upload-product-images'>
              <div>
                  <h5><strong>Imágenes:</strong></h5>
                </div>
                <Dropzone 
                onDrop={handleDrop}
                className = "dropzone"
                onChange = {(ev) => setImage(ev.target.value)}
                value={image}
                
                >

                    {({getRootProps, getInputProps}) => (
                        <section>
                            <div {...getRootProps({className: "dropzone"})}>
                                <input {...getInputProps()} />
                                <span className='upload-images-icon'>📁</span>
                                <p>Arrastra tus imágenes o clickea para seleccionar</p>
                            </div>
                        </section>
                    )}

                </Dropzone>

                <div>
                    {uploadedFiles.map((file, index) => (
                        <p key={index}>{file}</p>
                    ))}
                </div>

                <div className='text-center mt-5'>
                    <button className='btn btn-primary'>¡Sube tu coche!</button>
                </div>



                {/* <div className='upload-product-images-center'>
                  <button className='btnupload-image'> <img src="data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20height%3D%222em%22%20viewBox%3D%220%200%20448%20512%22%3E%3C!--!%20Font%20Awesome%20Free%206.4.0%20by%20%40fontawesome%20-%20https%3A%2F%2Ffontawesome.com%20License%20-%20https%3A%2F%2Ffontawesome.com%2Flicense%20(Commercial%20License)%20Copyright%202023%20Fonticons%2C%20Inc.%20--%3E%3Cpath%20d%3D%22M256%2080c0-17.7-14.3-32-32-32s-32%2014.3-32%2032V224H48c-17.7%200-32%2014.3-32%2032s14.3%2032%2032%2032H192V432c0%2017.7%2014.3%2032%2032%2032s32-14.3%2032-32V288H400c17.7%200%2032-14.3%2032-32s-14.3-32-32-32H256V80z%22%2F%3E%3C%2Fsvg%3E"
                  alt="Icono del botón" />
                  </button>
                  <button className='btnupload-image'> <img src="data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20height%3D%222em%22%20viewBox%3D%220%200%20448%20512%22%3E%3C!--!%20Font%20Awesome%20Free%206.4.0%20by%20%40fontawesome%20-%20https%3A%2F%2Ffontawesome.com%20License%20-%20https%3A%2F%2Ffontawesome.com%2Flicense%20(Commercial%20License)%20Copyright%202023%20Fonticons%2C%20Inc.%20--%3E%3Cpath%20d%3D%22M256%2080c0-17.7-14.3-32-32-32s-32%2014.3-32%2032V224H48c-17.7%200-32%2014.3-32%2032s14.3%2032%2032%2032H192V432c0%2017.7%2014.3%2032%2032%2032s32-14.3%2032-32V288H400c17.7%200%2032-14.3%2032-32s-14.3-32-32-32H256V80z%22%2F%3E%3C%2Fsvg%3E"
                  alt="Icono del botón" />
                  </button>
                  <button className='btnupload-image'> <img src="data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20height%3D%222em%22%20viewBox%3D%220%200%20448%20512%22%3E%3C!--!%20Font%20Awesome%20Free%206.4.0%20by%20%40fontawesome%20-%20https%3A%2F%2Ffontawesome.com%20License%20-%20https%3A%2F%2Ffontawesome.com%2Flicense%20(Commercial%20License)%20Copyright%202023%20Fonticons%2C%20Inc.%20--%3E%3Cpath%20d%3D%22M256%2080c0-17.7-14.3-32-32-32s-32%2014.3-32%2032V224H48c-17.7%200-32%2014.3-32%2032s14.3%2032%2032%2032H192V432c0%2017.7%2014.3%2032%2032%2032s32-14.3%2032-32V288H400c17.7%200%2032-14.3%2032-32s-14.3-32-32-32H256V80z%22%2F%3E%3C%2Fsvg%3E"
                  alt="Icono del botón" />
                  </button>
                  <button className='btnupload-image'> <img src="data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20height%3D%222em%22%20viewBox%3D%220%200%20448%20512%22%3E%3C!--!%20Font%20Awesome%20Free%206.4.0%20by%20%40fontawesome%20-%20https%3A%2F%2Ffontawesome.com%20License%20-%20https%3A%2F%2Ffontawesome.com%2Flicense%20(Commercial%20License)%20Copyright%202023%20Fonticons%2C%20Inc.%20--%3E%3Cpath%20d%3D%22M256%2080c0-17.7-14.3-32-32-32s-32%2014.3-32%2032V224H48c-17.7%200-32%2014.3-32%2032s14.3%2032%2032%2032H192V432c0%2017.7%2014.3%2032%2032%2032s32-14.3%2032-32V288H400c17.7%200%2032-14.3%2032-32s-14.3-32-32-32H256V80z%22%2F%3E%3C%2Fsvg%3E"
                  alt="Icono del botón" />
                  </button>
                  <button className='btnupload-image'> <img src="data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20height%3D%222em%22%20viewBox%3D%220%200%20448%20512%22%3E%3C!--!%20Font%20Awesome%20Free%206.4.0%20by%20%40fontawesome%20-%20https%3A%2F%2Ffontawesome.com%20License%20-%20https%3A%2F%2Ffontawesome.com%2Flicense%20(Commercial%20License)%20Copyright%202023%20Fonticons%2C%20Inc.%20--%3E%3Cpath%20d%3D%22M256%2080c0-17.7-14.3-32-32-32s-32%2014.3-32%2032V224H48c-17.7%200-32%2014.3-32%2032s14.3%2032%2032%2032H192V432c0%2017.7%2014.3%2032%2032%2032s32-14.3%2032-32V288H400c17.7%200%2032-14.3%2032-32s-14.3-32-32-32H256V80z%22%2F%3E%3C%2Fsvg%3E"
                  alt="Icono del botón" />
                  </button>
                </div>  

                <div className='upload-product-images-center mt-5'>
                <button className='btnupload-image'> <img src="data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20height%3D%222em%22%20viewBox%3D%220%200%20448%20512%22%3E%3C!--!%20Font%20Awesome%20Free%206.4.0%20by%20%40fontawesome%20-%20https%3A%2F%2Ffontawesome.com%20License%20-%20https%3A%2F%2Ffontawesome.com%2Flicense%20(Commercial%20License)%20Copyright%202023%20Fonticons%2C%20Inc.%20--%3E%3Cpath%20d%3D%22M256%2080c0-17.7-14.3-32-32-32s-32%2014.3-32%2032V224H48c-17.7%200-32%2014.3-32%2032s14.3%2032%2032%2032H192V432c0%2017.7%2014.3%2032%2032%2032s32-14.3%2032-32V288H400c17.7%200%2032-14.3%2032-32s-14.3-32-32-32H256V80z%22%2F%3E%3C%2Fsvg%3E"
                  alt="Icono del botón" />
                  </button>
                  <button className='btnupload-image'> <img src="data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20height%3D%222em%22%20viewBox%3D%220%200%20448%20512%22%3E%3C!--!%20Font%20Awesome%20Free%206.4.0%20by%20%40fontawesome%20-%20https%3A%2F%2Ffontawesome.com%20License%20-%20https%3A%2F%2Ffontawesome.com%2Flicense%20(Commercial%20License)%20Copyright%202023%20Fonticons%2C%20Inc.%20--%3E%3Cpath%20d%3D%22M256%2080c0-17.7-14.3-32-32-32s-32%2014.3-32%2032V224H48c-17.7%200-32%2014.3-32%2032s14.3%2032%2032%2032H192V432c0%2017.7%2014.3%2032%2032%2032s32-14.3%2032-32V288H400c17.7%200%2032-14.3%2032-32s-14.3-32-32-32H256V80z%22%2F%3E%3C%2Fsvg%3E"
                  alt="Icono del botón" />
                  </button>
                  <button className='btnupload-image'> <img src="data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20height%3D%222em%22%20viewBox%3D%220%200%20448%20512%22%3E%3C!--!%20Font%20Awesome%20Free%206.4.0%20by%20%40fontawesome%20-%20https%3A%2F%2Ffontawesome.com%20License%20-%20https%3A%2F%2Ffontawesome.com%2Flicense%20(Commercial%20License)%20Copyright%202023%20Fonticons%2C%20Inc.%20--%3E%3Cpath%20d%3D%22M256%2080c0-17.7-14.3-32-32-32s-32%2014.3-32%2032V224H48c-17.7%200-32%2014.3-32%2032s14.3%2032%2032%2032H192V432c0%2017.7%2014.3%2032%2032%2032s32-14.3%2032-32V288H400c17.7%200%2032-14.3%2032-32s-14.3-32-32-32H256V80z%22%2F%3E%3C%2Fsvg%3E"
                  alt="Icono del botón" />
                  </button>
                  <button className='btnupload-image'> <img src="data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20height%3D%222em%22%20viewBox%3D%220%200%20448%20512%22%3E%3C!--!%20Font%20Awesome%20Free%206.4.0%20by%20%40fontawesome%20-%20https%3A%2F%2Ffontawesome.com%20License%20-%20https%3A%2F%2Ffontawesome.com%2Flicense%20(Commercial%20License)%20Copyright%202023%20Fonticons%2C%20Inc.%20--%3E%3Cpath%20d%3D%22M256%2080c0-17.7-14.3-32-32-32s-32%2014.3-32%2032V224H48c-17.7%200-32%2014.3-32%2032s14.3%2032%2032%2032H192V432c0%2017.7%2014.3%2032%2032%2032s32-14.3%2032-32V288H400c17.7%200%2032-14.3%2032-32s-14.3-32-32-32H256V80z%22%2F%3E%3C%2Fsvg%3E"
                  alt="Icono del botón" />
                  </button>
                  <button className='btnupload-image'> <img src="data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20height%3D%222em%22%20viewBox%3D%220%200%20448%20512%22%3E%3C!--!%20Font%20Awesome%20Free%206.4.0%20by%20%40fontawesome%20-%20https%3A%2F%2Ffontawesome.com%20License%20-%20https%3A%2F%2Ffontawesome.com%2Flicense%20(Commercial%20License)%20Copyright%202023%20Fonticons%2C%20Inc.%20--%3E%3Cpath%20d%3D%22M256%2080c0-17.7-14.3-32-32-32s-32%2014.3-32%2032V224H48c-17.7%200-32%2014.3-32%2032s14.3%2032%2032%2032H192V432c0%2017.7%2014.3%2032%2032%2032s32-14.3%2032-32V288H400c17.7%200%2032-14.3%2032-32s-14.3-32-32-32H256V80z%22%2F%3E%3C%2Fsvg%3E"
                  alt="Icono del botón" />
                  </button>
                </div>       */}
              </div>


            
          </div>
        </div>



        
      </form>
    </div>
  );
};