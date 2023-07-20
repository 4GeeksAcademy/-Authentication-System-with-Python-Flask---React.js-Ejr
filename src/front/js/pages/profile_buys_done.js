import React, {useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { NavLink } from "react-router-dom";
import { Profile_navbar } from "../component/profile_navbar";
import "/workspaces/Watacar_v2/src/front/styles/profile.css"
import { Purchase_navbar } from "../component/purchase_navbar";

export const Profile_buys_done = () => {
    const {actions, store} = useContext(Context);
    const soldCount = store.products.length;

useEffect (() => {
    actions.SoldChanged()
}, [])

const sendReview = (product) => {
    actions.addReview(current_user, product.id, stars, comment)
}

    return store.products ? (
        <>
            <Profile_navbar />
            <Purchase_navbar soldCount={soldCount} />
            {store.products.map((product, index) => (
                <>
                    <div className="sales_profile_box row" key={index}>
                        <div className="col-4">
                            <div className="product_img_profile_box_sales col-2">
                                <img src="https://www.motofichas.com/images/phocagallery/Honda/cb500f-2022/01-honda-cb500f-2022-estudio-rojo.jpg" alt="product" className="product_img_profile"/>
                            </div>
                        </div>
                        <div className="col-8 product_data_sales">
                            <h6>{product.name}</h6>
                            <h6>Usuario 1</h6>
                            <div className="row">
                                <h6 className="col-4">{product.brand}</h6>
                                <h6 className="col-8">{product.model}</h6>
                            </div>
                            {product.status === "sold" && (
                            <>
                                <button className="review_button" data-bs-target="#exampleModal2" data-bs-toggle="modal">Valorar venta</button>
                            </>
                            )}
                            <h6 className="price_sales_profile">{product.price}€</h6>
                        </div>
                    </div>
                    <div className="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content modal-review">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">¿Quieres valorar la venta de este vehículo?</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body-review row">
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
                                        <div>
                                           
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div class="input-group col-12 input_review">
                                        <textarea class="form-control" aria-label="With textarea" />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn_config cancel" data-bs-dismiss="modal">Cancelar</button>
                                    <button type="button" className="btn btn_config reservado" data-bs-dismiss="modal" onClick={() => sendReview(product)}>Aceptar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
             ))}
         </>
     ): "cargando...";
 }