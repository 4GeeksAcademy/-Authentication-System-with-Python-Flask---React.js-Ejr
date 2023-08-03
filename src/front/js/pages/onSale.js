import React, { useContext, useNavigate, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { NavLink } from "react-router-dom";
import { Profile_navbar } from "../component/profile_navbar";
import "/workspaces/Watacar_v2/src/front/styles/profile.css"
import { Sales_navbar } from "../component/Sales_navbar";
import { Placeholder_onsale } from "./placeholder_onsale";


export const On_Sale = () => {
    const {actions, store} = useContext(Context);
    const {status, setStatus} = useState([]);
    const [productsOnsale, setProductsOnsale] = useState([]);
    const [productsPendBlock, setProductsPendBlock] = useState([]);
    const carImage = "https://images.coches.com/_vn_/kia/Sportage/c399cf1d98a95d24f8e8715dd0b13fb2.jpg?p=cc_vn_high"

    useEffect(() => {
        async function fetchProducts() {
          const response = await actions.getProductsOnSale();
          setProductsOnsale(response);
        }
        fetchProducts();
      }, []);

      useEffect(() => {
        async function fetchProducts() {
          const response = await actions.getProductsPendingBlocked();
          setProductsPendBlock(response); 
        }
        fetchProducts();
      }, []);

const StatusToBlocked = (product) => {
    const token = localStorage.getItem("token");
    const requestOptions = {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    };
    
    fetch(process.env.BACKEND_URL + `api/profile/products/${product.id}/BLOCKED`, requestOptions)
        .then(response => response.json())
        .then(response => {
        console.log(response);
        Swal.fire({
            title: 'Has aceptado la reserva del vehículo',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
        })
        .catch(error => {
        console.error("Error:", error);
        });
        setTimeout(() => {
            window.location.reload();
          }, 1000);
};

const StatusToOnSale = (product) => {
    const token = localStorage.getItem("token");
    const requestOptions = {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    };
    
    fetch(process.env.BACKEND_URL + `api/profile/products/${product.id}/ONSALE`, requestOptions)
        .then(response => response.json())
        .then(response => {
        console.log(response);
        Swal.fire({
            title: 'Has rechazado la venta del vehículo',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
        })
        .catch(error => {
        console.error("Error:", error);
        });
    window.location.reload();
};
    return productsOnsale || productsPendBlock ? (
        <>
            <Profile_navbar />
            <Sales_navbar onsaleCount={productsOnsale.length + productsPendBlock.length}/>
            {[...productsOnsale, ...productsPendBlock].map((product, index) => (
                <div className="justify-content-center d-flex" key={index}>
                <div className="row row_product_profile container justify-content-around m-1" key={index}>
                    <div className="product_img_profile_box col-lg-5 col-3 col-sm-2 col-xs-2">
                        <NavLink to={`/product/${product.id}`}  style={{ color: 'white', textDecoration: 'none' }} className="link-hover">
                        {product.images.length > 0 ? (
                        <img src={product.images[0].image} className="card-img-top imgCarousel" alt="..." />
                         ) : (
                        <img src={carImage} className="card-img-top imgCarousel" alt="..." />
                        )}
                        </NavLink>
                    </div>
                    <div className="price_name col-3 col-sm-2 text-start p-0">
                        <NavLink to={`/product/${product.id}`}  style={{ color: 'white', textDecoration: 'none' }} className="link-hover">
                            <h4 className="price_product_profile">{product.price}€</h4>
                            <h5 className="name_product_profile">{product.name.length >= 25 ? 
                            product.name.slice(0,24) + "..." 
                            : product.name}</h5>
                        </NavLink>
                    </div>
                    <div className="col-3 col-sm-2 state_product_profile_box text-start">
                        <NavLink to={`/product/${product.id}`}  style={{ color: 'white', textDecoration: 'none' }} className="link-hover">
                            <h6 className="state_title_profile">Estado</h6>
                            <h4 className="state_product_profile ">{product.state}</h4>
                        </NavLink>
                    </div>

  {/*
                    <div className="col-3 col-sm-1 product_profile_buttons ">
                        <button className="product_profile_button edit">
                            <i className="fas fa-pencil"/>
                            </button>
                        <button className="product_profile_button sold" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            <i class="fa-regular fa-handshake"/>
                        </button>
                        
                        */}

                    <div className="col-3 col-sm-1 product_profile_buttons">
                        {product.status === "pending blocked" && (
                            <>
                                <button
                                    className="product_profile_button sold"
                                    type="button"
                                    data-bs-toggle="modal"
                                    data-bs-target={`#exampleModal${index}`}
                                >
                                   <i class="fa-solid fa-eye "/>
                                </button>
                            </>
                        )}

                    </div>


                    {/* AQUI EMPIEZA EL MODAL */}

                    <div className="modal fade" id={`exampleModal${index}`} tabIndex="-1" aria-labelledby={`exampleModalLabel${index}`} aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content sold-product_profile">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">
                                       <strong>Se ha solicitado reservar este vehículo ¿Estás de acuerdo?</strong>
                                    </h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body-sale-process row">
                                    <div className="product_img_profile_box-sales-process m-auto col-4">
                                    {product.images.length > 0 ? (
                                        <img src={product.images[0].image} className="card-img-top imgCarousel" alt="..." />
                                    ) : (
                                        <img src={carImage} className="card-img-top imgCarousel" alt="..." />
                                    )}
                                    </div>
                                    <div className="col-7 state_product_profile_sales_process m-auto">
                                        <div className="row ">
                                            <h6 className=" col-12 ">{product.name}</h6>
                                        </div>
                                        <div className="row m-auto">
                                            <h6 className=" col-6">{product.state}</h6>
                                            <h6 className=" col-6">{product.price}€</h6>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className="modal-footer">
                                        <div>
                                            <br></br>
                                            <p>Ten en cuenta que una vez aceptado el comprador bloqueará este vehículo</p>
                                        </div>
                                    <button type="button" className="btn btn_config cancel" data-bs-dismiss="modal" onClick={() => StatusToOnSale(product)}>Rechazar</button>
                                    <button type="button" className="btn btn_config reservado" data-bs-dismiss="modal" onClick={() => StatusToBlocked(product)}>Aceptar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            ))}
        </>
    ): <Placeholder_onsale/>
}