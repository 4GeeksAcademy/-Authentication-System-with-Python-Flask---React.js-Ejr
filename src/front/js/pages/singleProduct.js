import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from "../store/appContext";
import { Link } from 'react-router-dom';
// import "/workspaces/Watacar_v2/src/front/js/pages/singleProduct.js";
import rigo from "../../img/rigo-baby.jpg" 

export const SingleProduct = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  useEffect(() => {
    actions.getProduct(params.productid);
    actions.getUser()
  }, []);

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
                
                
                <div className='single-pr-information text-center mt-3'>

                  {/* <div className='row'> 
                    <div className='col-12 text-center mt-3'>
                      <p><strong>Price: {product.price}€</strong></p>
                    </div>
                  </div> */}

                    <div className='row '>
                        <div className='col-6'>
                          <p><strong>Precio: <span className='single-price'>{product.price}€</span></strong></p>

                        </div>
                        <div className='col-6'>
                          <p><strong>Tipo de vehículo: </strong> {product.product_type} </p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-6'>
                          <p><strong> Marca: </strong> {product.brand.name}</p>
                        </div>
                        
                        <div className='col-6'>
                          <p><strong> Modelo: </strong> {product.model.model}</p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-6'>
                          <p><strong> Estado: </strong> {product.state}</p>

                        </div>
                        <div className='col-6'>
                          <p><strong> Combustible: </strong> {product.fuel}</p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-6'>
                          <p><strong> Año de fabricación: </strong> {product.year}</p>
                        </div>
                        <div className='col-6'>
                          <p><strong>Vendedor: {product.user.full_name} </strong></p>

                        </div>
                    </div>
                    
                    <div className='row'>
                      <div className='col-12 text-center '>
                        <p><strong> Descripción: </strong> <br></br></p>
                        <p className='single-description mx-auto'>{product.description}</p>

                      </div>

                    </div>
                    <div className='row'>
                      <div className=''>
                      {store.user && store.user.id === product.user_id && (
                      <Link to={`/edit-product/${product.id}`} className='btn btn-primary btn-edit'>Editar</Link>
                      )}
                        <button className='btn btn-success btn-pay'>Pagar</button>

                      </div>

                    </div>

                    </div>

                </div>

                
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};
