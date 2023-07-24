import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Profile_navbar } from "../component/profile_navbar";
import "/workspaces/Watacar_v2/src/front/styles/profile.css"
import { Purchase_navbar } from "../component/purchase_navbar";
import { Toaster, toast } from 'sonner'


export const Profile_buys = () => {
    const {actions, store} = useContext(Context);
    const blockedCount = store.products.length;
    const [products, setProducts] = useState([]);


useEffect(() => {
    async function fetchProducts() {
      const response = await actions.PendingBlockedChanged();
      setProducts(response); 
    }
    fetchProducts();
  }, []);
  useEffect(() => {
    async function fetchProducts() {
      const response = await actions.BlockedChanged();
      setProducts(response); 
    }
    fetchProducts();
  }, []);
  useEffect(() => {
    async function fetchProducts() {
      const response = await actions.PendingSaleChanged();
      setProducts(response); 
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
        toast('¡Enhorabuena por adquirir tu nuevo vehículo!');
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
        
        })
        .catch(error => {
        console.error("Error:", error);
        });
        setTimeout(() => {
            window.location.reload();
        }, 1000);
};

    return (
        <>
            <Profile_navbar />
            <Purchase_navbar blockedCount={blockedCount}/>
            {store.products.map((product, index) => (
                <div className="justify-content-center d-flex" key={index}>
                <div className="row row_product_profile container justify-content-around m-1" key={index}>
                    <div className="product_img_profile_box col-lg-5 col-3 col-sm-2 col-xs-2">
                    {product.images.length > 0 ? (
                        <img src={product.images[0].image} className="card-img-top imgCarousel" alt="..." />
                    ) : (
                        <img src={carImage} className="card-img-top imgCarousel" alt="..." />
                    )}
                    </div>
                    <div className="price_name col-3 col-sm-2 text-start ">
                        <h4 className="price_product_profile">{product.price}€</h4>
                        <h5 className="name_product_profile">{product.name}</h5>
                    </div>
                    <div className="col-3 col-sm-2 state_product_profile_box text-start">
                        <h6 className="state_title_profile">Estado</h6>
                        <h4 className="state_product_profile ">{product.state}</h4>
                    </div>
                    <div className="col-2 product_profile_buttons">
                        {product.status === "pending blocked" && (
                            <>
                                <button
                                    className="product_profile_button sold"
                                    type="button"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
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
                                    data-bs-target="#exampleModal2"
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
                                    data-bs-target="#exampleModal3"
                                >
                                    <i class="fa-solid fa-ban m-auto" style={{"color": "#b50808"}}/>
                                </button>
                            </>
                        )}
                    </div>
                    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content sold-product_profile">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Tu reserva está pendiente de aprobación por parte del vendedor ¿Estás seguro de que quieres cancelar la solicitud de reserva del siguiente vehículo?</h5>
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
                    <div className="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                            <h6 className=" col-12">{product.description}</h6>
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
                    <div className="modal fade" id="exampleModal3" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                            <h6 className=" col-12">{product.description}</h6>
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
    <Toaster richColors position="top-center" />
    </>
    )
    }