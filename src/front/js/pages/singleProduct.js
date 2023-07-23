import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from "../store/appContext";
import { Link } from 'react-router-dom';
import UserInfo from './userinfo';
import "/workspaces/Watacar_v2/src/front/styles/uploadproduct.css"
// import "/workspaces/Watacar_v2/src/front/js/pages/singleProduct.js";
import rigo from "../../img/rigo-baby.jpg" 

export const SingleProduct = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  const StatusTopendingBlocked = (product) => {
    const token = localStorage.getItem("token");
    const requestOptions = {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    };
    fetch(process.env.BACKEND_URL + `api/profile/products/${product.id}/PENDING_BLOCKED`, requestOptions)
        .then(response => response.json())
        .then(response => {
        console.log(response);
        })
        .catch(error => {
        console.error("Error:", error);
        });
};

  useEffect(() => {
    actions.getProduct(params.productid);
    actions.getUser()
  }, []);


  // const openModal = () => {

  // }

  return (
    <div className="container w-70">
      <div className='single-prioduct-box'>
        {store.productlist.length > 0 ? (
          <div className='sp-box '>
            {store.productlist.map((product, index) => (
              <div key={index} className='row'>
                
                <div className='col-4 '>

                </div>
                

                <div className='col-12 text-center mt-2'>
                  <h1><strong> {product.name} </strong></h1>
                </div>

              <div className='carousel-container'>
              <div id="carouselExampleIndicators" className="carousel slide " data-bs-ride="carousel">
                  <div className="carousel-indicators">
                    {product.images.map((image, index) => (
                      <button
                        key={image.id}
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to={index}
                        className={index === 0 ? "active" : ""}
                        aria-current={index === 0 ? "true" : "false"}
                        aria-label={`Slide ${index + 1}`}
                      ></button>
                    ))}
                  </div>
                  <div className="carousel-inner">
                    {product.images.map((image, index) => (
                      <div key={image.id} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                        <img src={image.image} className="d-block w-100" alt={`Slide ${index + 1}`} />
                      </div>
                    ))}
                  </div>
                  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
                
                
                <div className=' container single-pr-information text-start mt-3 mx-2'>

                  {/* <div className='row'> 
                    <div className='col-12 text-center mt-3'>
                      <p><strong>Price: {product.price}€</strong></p>
                    </div>
                  </div> */}

                    <div className='row '>
                        <div className='col-lg-4'>
                          <p><strong>Precio: <span className='single-price'>
                            {product.price}€
                            </span></strong></p>

                        </div>
                        <div className='col-lg-4'>
                          <p><strong>Tipo de vehículo: </strong> {product.product_type} </p>
                        </div>
                  
                        <div className='col-lg-4'>
                          <p><strong> Marca: </strong> {product.brand.name}</p>  
                        </div>

                    </div>
                        
                    <div className='row'>
                        <div className='col-lg-4'>
                          <p><strong> Modelo: </strong> {product.model.model}</p>
                        </div>
                        <div className='col-lg-4'>
                          <p><strong> Estado: </strong> {product.state}</p>
                        </div>

                        <div className='col-lg-4'>
                          <p><strong> Combustible: </strong> {product.fuel}</p>
                        </div>
                    </div>


                    <div className='row'>
                        <div className='col-lg-4'>
                          <p><strong> Año de fabricación: </strong> {product.year}</p>
                        </div>

                        <div className='col-lg-4'>
                          <p><strong> Kilómetros: </strong> {product.km}</p>
                        </div>  
                      
                    </div>

                      <div className='row d-flex justify-content center m-auto my-4'>
                        <div className='col-lg-12 justify-content-center m-auto d-flex'>
                          
                          <UserInfo userName={product.user.full_name} email={product.user.email} address={product.user.address} phone={product.user.phone} />

                          {/* <p><strong>Vendedor: <a onClick={}>{product.user.full_name}</a> </strong></p> */}

                        </div>
                        </div>

                  
                    
                 
                      <div className='col-lg-4 text-center '>
                        <p><strong> Descripción: </strong> <br></br></p>
                        <div className=' desc-container'>
                          <p className=' single-description mx-auto d-flex justify-content-flex-start'>{product.description}</p>

                        </div>

                      </div>
                    <div className='row'>
                      <div className='col-12 userinfo mt-4'></div>
                    </div>

                    </div>
                    <div className='row'>
                      <div className=''>
                      {store.user && store.user.id && product.user_id && store.user.id === product.user_id ? (
                          <Link to={`/edit-product/${product.id}`} className='btn btn-primary btn-success'>Editar</Link>) : 
                        (
                          <Link to={'/profile/onsale'} onClick={() => StatusTopendingBlocked(product)} className='btn btn-primary'>Reservar</Link>
                        )}


                      </div>

                    </div>

                    </div>

               

                
            ))}
          </div>
        ) : (
          <div class="spinner-border text-primary m-auto d-flex justify-content-center" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        )}
      </div>
    </div>
  );
};
