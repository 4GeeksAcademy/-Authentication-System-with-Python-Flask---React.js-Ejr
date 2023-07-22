import React, { useContext, useNavigate, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { NavLink } from "react-router-dom";
import { Profile_navbar } from "../component/profile_navbar";
import "/workspaces/Watacar_v2/src/front/styles/profile.css"
import { Sales_navbar } from "../component/Sales_navbar";
import { Placeholder_onsale } from "./placeholder_onsale";


export const On_sale = () => {
    const {actions, store} = useContext(Context);
    const {status, setStatus} = useState([]);
    const onsaleCount = store.products.length;
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
          const response = await actions.getProductsOnSale();
          setProducts(response); 
        }
        fetchProducts();
      }, []);

      useEffect(() => {
        async function fetchProducts() {
          const response = await actions.getProductsPendingBlocked();
          setProducts(response); 
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
        })
        .catch(error => {
        console.error("Error:", error);
        });
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
        })
        .catch(error => {
        console.error("Error:", error);
        });
    window.location.reload();
};
    return store.products ? (
        <>
            <Profile_navbar />
            <Sales_navbar onsaleCount={onsaleCount}/>
            {store.products.map((product, index) => (
                <div className="justify-content-center d-flex">
                <div className="row row_product_profile container justify-content-around m-1" key={index}>
                    <div className="product_img_profile_box col-lg-5 col-3 col-sm-2 col-xs-2">
                        <img src="https://www.motofichas.com/images/phocagallery/Honda/cb500f-2022/01-honda-cb500f-2022-estudio-rojo.jpg" alt="product" className="product_img_profile"/>
                    </div>
                    <div className="price_name col-3 col-sm-2 text-start ">
                        <h4 className="price_product_profile">{product.price}€</h4>
                        <h5 className="name_product_profile">{product.name}</h5>
                    </div>
                    <div className="col-3 col-sm-2 state_product_profile_box text-start">
                        <h6 className="state_title_profile">Estado</h6>
                        <h5 className="state_product_profile h5State">{product.state}</h5>
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
                                    data-bs-target="#exampleModal"
                                >
                                    Ver solicitud de reserva
                                </button>
                            </>
                        )}

                    </div>
                    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content sold-product_profile">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Fulanito quiere bloquear este vehículo</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body-sale-process row">
                                    <div className="product_img_profile_box-sales-process col-4">
                                        <img src="https://www.motofichas.com/images/phocagallery/Honda/cb500f-2022/01-honda-cb500f-2022-estudio-rojo.jpg" alt="product" className="product_img_profile"/>
                                    </div>
                                    <div className="col-7 state_product_profile_sales_process">
                                        <div className="row">
                                            <h6 className=" col-12">{product.name}</h6>
                                        </div>
                                        <div className="row">
                                            <h6 className=" col-12">{product.description}</h6>
                                        </div>
                                        <div className="row">
                                            <h6 className=" col-6">{product.state}</h6>
                                            <h6 className=" col-6">{product.price}€</h6>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className="modal-footer">
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