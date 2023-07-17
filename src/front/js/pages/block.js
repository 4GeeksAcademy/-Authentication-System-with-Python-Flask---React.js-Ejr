import React, { useContext, useNavigate, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { NavLink } from "react-router-dom";
import { Profile_navbar } from "../component/profile_navbar";
import "/workspaces/Watacar_v2/src/front/styles/profile.css"
import { Sales_navbar } from "../component/Sales_navbar";

export const Block = () => {
    const {actions, store} = useContext(Context);
    const blockedCount = store.products.length;
    

    useEffect (() => {
        actions.getProductsBlocked(),
        actions.getProductsPendingSale()
    }, [])
    
    return store.products ? (
        <>
            <Profile_navbar />
            <Sales_navbar blockedCount={blockedCount} />
            {store.products.map((product, index) => (
                <div className="row row_product_profile" key={index}>
                    <div className="product_img_profile_box col-2">
                        <img src="https://www.motofichas.com/images/phocagallery/Honda/cb500f-2022/01-honda-cb500f-2022-estudio-rojo.jpg" alt="product" className="product_img_profile"/>
                    </div>
                    <div className="price_name col-6">
                        <h4 className="price_product_profile">{product.price}€</h4>
                        <h5 className="name_product_profile">{product.name}</h5>
                    </div>
                    <div className="col-2 state_product_profile_box">
                        <h6 className="state_title_profile">Estado</h6>
                        <h4 className="state_product_profile">{product.state}</h4>
                    </div>
                    <div className="col-2 product_profile_buttons">
                        {product.status === "blocked" && (
                            <>
                                <button className="product_profile_button edit">Cancelar reserva</button>
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
                                    Ver solicitud de compra
                                </button>
                            </>
                        )}
                    </div>
                    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content sold-product_profile">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Fulanito quiere comprar este vehículo</h5>
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
                                    <button type="button" className="btn btn_config cancel" data-bs-dismiss="modal">Rechazar</button>
                                    <button type="button" className="btn btn_config reservado">Aceptar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    ): "cargando...";
}