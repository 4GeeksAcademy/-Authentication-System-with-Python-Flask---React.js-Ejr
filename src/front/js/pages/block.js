import React, { useContext, useNavigate, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { NavLink } from "react-router-dom";
import { Profile_navbar } from "../component/profile_navbar";
import "/workspaces/Watacar_v2/src/front/styles/profile.css"
import { Sales_navbar } from "../component/Sales_navbar";

export const Block = () => {
    const {actions, store} = useContext(Context);
    const blockedCount = store.products.length;
    
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

const StatusToSold = (product) => {
    const token = localStorage.getItem("token");
    const requestOptions = {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    };
    
    fetch(process.env.BACKEND_URL + `api/profile/products/${product.id}/SOLD`, requestOptions)
        .then(response => response.json())
        .then(response => {
        console.log(response);
        })
        .catch(error => {
        console.error("Error:", error);
        });
    window.location.reload();
};
    useEffect (() => {
        actions.getProductsBlocked(),
        actions.getProductsPendingSale()
    }, [])
    
    return store.products ? (
        <>
            <Profile_navbar />
            <Sales_navbar blockedCount={blockedCount} />
            {store.products.map((product, index) => (
                <div className="justify-content-center d-flex" key={index}>
                    <div className="row row_product_profile container justify-content-around m-1">
                    <div className="product_img_profile_box col-lg-5 col-3 col-sm-2 col-xs-2">
                        <img src="https://www.motofichas.com/images/phocagallery/Honda/cb500f-2022/01-honda-cb500f-2022-estudio-rojo.jpg" alt="product" className="product_img_profile"/>
                    </div>
                    <div className="price_name col-3 col-sm-2 text-start ">
                        <h4 className="price_product_profile">{product.price}€</h4>
                        <h5 className="name_product_profile">{product.name}</h5>
                    </div>
                    <div className="col-3 col-sm-2 state_product_profile_box text-start">
                        <h6 className="state_title_profile">Estado</h6>
                        <h4 className="state_product_profile">{product.state}</h4>
                    </div>
                    <div className="col-2 product_profile_buttons">
                        </div>
                        {product.status === "blocked" && (
                            <>
                                <button className="product_profile_button edit justify-content-center d-flex" data-bs-target="#exampleModal2" data-bs-toggle="modal">
                                    <i class="fa-solid fa-ban m-auto" style={{"color": "#b50808"}}/>
                                </button>
                            </>
                        )}
                        {product.status === "pending sale" && (
                            <>
                                <button
                                    className="product_profile_button sold"
                                    type="button"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                >
                                   <i class="fa-solid fa-eye "/>
                                </button>
                            </>
                        )}
                    </div>



                    {/* AQUI EMPIEZA EL MODAL */}



                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content sold-product_profile">
                                <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                       <strong>Fulanito quiere bloquear este vehículo
                                        </strong></h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body-sale-process ">
                                    <div className="  product_img_profile_box-sales-process m-auto col-4">    
                                        <img src="https://www.motofichas.com/images/phocagallery/Honda/cb500f-2022/01-honda-cb500f-2022-estudio-rojo.jpg" alt="product" className="product_img_profile"/>
                                    </div>
                                    <div className="col-7 state_product_profile_sales_process m-auto">
                                        <div className="row m-auto">
                                            <h6 className=" col-12 name_product_profile m-auto ">{product.name}</h6>
                                        </div>
                                        <div className="row">
                                            <h6 className=" col-12 ">{product.description}</h6>
                                        </div>
                                        <div className="row m-auto">
                                            <h6 className=" col-6 state_product_profile">{product.state}</h6>
                                            <h6 className=" col-6 price_product_profile" >{product.price}€</h6>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className="modal-footer">
                                <div>
                                            <br></br>
                                            <br></br>
                                            <br></br>
                                            <p>Tenga en cuenta que una vez cancelada la reserva el comprador podrá vender a otro usuario el producto</p>
                                        </div>
                                    <button type="button" className="btn btn_config cancel" data-bs-dismiss="modal" onClick={() => StatusToOnSale(product)}>Rechazar</button>
                                    <button type="button" className="btn btn_config reservado" data-bs-dismiss="modal" onClick={() => StatusToSold(product)}>Aceptar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content sold-product_profile">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">¿Quieres cancelar el proceso de reserva?</h5>
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
                                    <button type="button" className="btn btn_config cancel" data-bs-dismiss="modal">Cancelar</button>
                                    <button type="button" className="btn btn_config reservado" data-bs-dismiss="modal" onClick={() => StatusToOnSale(product)}>Aceptar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    ): "cargando...";
}