import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Profile_navbar } from "../component/profile_navbar";
import "/workspaces/Watacar_v2/src/front/styles/profile.css"
import { Purchase_navbar } from "../component/purchase_navbar";
import { NavLink } from "react-router-dom";


export const Profile_buys = () => {
    const {actions, store} = useContext(Context);
    const [productsPendingBlockedChanged, setProductsPendingBlockedChanged] = useState([]);
    const [productsBlockedChanged, setProductsBlockedChanged] = useState([]);
    const [productsPendingSaleChanged, setProductsPendingSaleChanged] = useState([]);
    const carImage = "https://images.coches.com/_vn_/kia/Sportage/c399cf1d98a95d24f8e8715dd0b13fb2.jpg?p=cc_vn_high"


useEffect(() => {
    async function fetchProducts() {
      const response = await actions.PendingBlockedChanged();
      setProductsPendingBlockedChanged(response); 
      console.log(response)
    }
    fetchProducts();
  }, []);
  useEffect(() => {
    async function fetchProducts() {
      const response = await actions.BlockedChanged();
      setProductsBlockedChanged(response); 
    }
    fetchProducts();
  }, []);
  useEffect(() => {
    async function fetchProducts() {
      const response = await actions.PendingSaleChanged();
      setProductsPendingSaleChanged(response); 
    }
    fetchProducts();
  }, []);

const StatusToPendingSale = (product) => {
    const token = localStorage.getItem("token");
    const requestOptions = {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    };
    
    fetch(process.env.BACKEND_URL + `api/profile/products/${product.id}/PENDING_SALE`, requestOptions)
        .then(response => response.json())
        .then(response => {
        console.log(response);
        Swal.fire({
            icon: 'success',
            title: '¡Enhorabuena por tu compra!',
         
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
        Swal.fire('Has cancelado el proceso de compra')
        
        })
        .catch(error => {
        console.error("Error:", error);
        });
        setTimeout(() => {
            window.location.reload();
        }, 1000);
};

    return productsPendingBlockedChanged || productsBlockedChanged || productsPendingSaleChanged ? (
        <>
            <Profile_navbar />
            <Purchase_navbar blockedCount={productsPendingBlockedChanged.length + productsBlockedChanged.length + productsPendingSaleChanged.length}/>
            {[...productsPendingBlockedChanged, ...productsBlockedChanged, ...productsPendingSaleChanged].map((product, index) => (
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
                    <div className="price_name col-3 col-sm-2 text-start ">
                        <NavLink to={`/product/${product.id}`}  style={{ color: 'white', textDecoration: 'none' }} className="link-hover">
                            <h4 className="price_product_profile">{product.price}€</h4>
                            <h5 className="name_product_profile">{product.name}</h5>
                        </NavLink>
                    </div>
                    <div className="col-3 col-sm-2 state_product_profile_box text-start">
                        <NavLink to={`/product/${product.id}`}  style={{ color: 'white', textDecoration: 'none' }} className="link-hover">
                            <h6 className="state_title_profile">Estado</h6>
                            <h4 className="state_product_profile ">{product.state}</h4>
                        </NavLink>
                    </div>
                    <div className="col-2 product_profile_buttons">
                        {product.status === "pending blocked" && (
                            <>
                                <button
                                    className="product_profile_button sold"
                                    type="button"
                                    data-bs-toggle="modal"
                                    data-bs-target={`#exampleModal${index}`}
                                >
                                    <i class="fa-solid fa-ban m-auto" style={{"color": "#b50808"}}/>
                                </button>
                            </>
                        )}
                        {product.status === "blocked" && (
                            <>
                                <button
                                    className="product_profile_button sold"
                                    type="button"
                                    data-bs-toggle="modal"
                                    data-bs-target={`#exampleModal2${index}`}
                                >
                                     <i class="fa-solid fa-ticket"></i>
                                </button>
                            </>
                        )}
                        {product.status === "pending sale" && (
                            <>
                                <button
                                    className="product_profile_button sold"
                                    type="button"
                                    data-bs-toggle="modal"
                                    data-bs-target={`#exampleModal3${index}`}
                                >
                                    <i class="fa-solid fa-ban m-auto" style={{"color": "#b50808"}}/>
                                </button>
                            </>
                        )}
                    </div>
                    <div className="modal fade" id={`exampleModal${index}`} tabindex="-1" aria-labelledby={`exampleModalLabel${index}`} aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content sold-product_profile">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Tu reserva está pendiente de aprobación por parte del vendedor ¿Estás seguro de que quieres cancelar la solicitud de reserva del siguiente vehículo?</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body-sale-process row mt-2rem ml-0rem">
                                    <div className="product_img_profile_box-sales-process col-4">
                                    {product.images.length > 0 ? (
                                        <img src={product.images[0].image} className="card-img-top imgCarousel" alt="..." />
                                    ) : (
                                        <img src={carImage} className="card-img-top imgCarousel" alt="..." />
                                    )}
                                    </div>
                                    <div className="col-7 state_product_profile_sales_process">
                                        <div className="row">
                                            <h6 className=" col-12">{product.name}</h6>
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
                    <div className="modal fade" id={`exampleModal2${index}`} tabindex="-1" aria-labelledby={`exampleModalLabel2${index}`} aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content sold-product_profile">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel mx-5">Enhorabuena, el vendedor ha aceptado tu reserva. Ahora podrás solicitar la compra del vehículo o cancelar la reserva</h5>
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
                                        <div className="row">
                                            <h6 className=" col-12">{product.name}</h6>
                                        </div>
                                        <div className="row">
                                            <h6 className=" col-6">{product.state}</h6>
                                            <h6 className=" col-6">{product.price}€</h6>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn_config cancel-buy py-4" data-bs-dismiss="modal" onClick={() => StatusToOnSale(product)}>Cancelar reserva</button>
                                    <button type="button" className="btn btn_config Ask-buy py-4" data-bs-dismiss="modal" onClick={() => StatusToPendingSale(product)}>Solicitar compra</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade" id={`exampleModal3${index}`} tabindex="-1" aria-labelledby={`exampleModalLabel3${index}`} aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content sold-product_profile">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">¿Seguro que quieres cancelar la solicitud de compra de este vehículo?</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body-sale-process row">
                                    <div className="product_img_profile_box-sales-process col-4">
                                    {product.images.length > 0 ? (
                                        <img src={product.images[0].image} className="card-img-top imgCarousel" alt="..." />
                                    ) : (
                                        <img src={carImage} className="card-img-top imgCarousel" alt="..." />
                                    )}
                                    </div>
                                    <div className="col-7 state_product_profile_sales_process">
                                        <div className="row">
                                            <h6 className=" col-12">{product.name}</h6>
                                        </div>
                                        <div className="row">
                                            <h6 className=" col-6">{product.state}</h6>
                                            <h6 className=" col-6">{product.price}€</h6>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn_config cancel-buy" data-bs-dismiss="modal" onClick={() => StatusToOnSale(product)}>Cancelar</button>
                                    <button type="button" className="btn btn_config Ask-buy" data-bs-dismiss="modal">No, manetener solicitud</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
    ))}
    </>
    ) : "cargando...";
    }