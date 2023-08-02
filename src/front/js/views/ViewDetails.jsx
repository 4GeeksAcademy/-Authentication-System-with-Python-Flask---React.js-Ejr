import React, { useContext, useEffect } from "react";
import Navbar from "../component/Navbar.jsx";
import { Context } from '../store/appContext.js';


const ViewDetails = () => {
  const { actions, store } = useContext(Context);
  const handleaddFavorites = ()=>{
    actions.postFavorites(store.details.id)
  }


  

  return (
    <div>
      <Navbar />
      <h1>Product Details</h1>
      <div className="text-center mt-5">


            <div className="card  m-2"
                style={{ width: "18rem" }} >
                <img src={store.details.image_url} className="" style={{ height: "18rem", objectFit: "cover", borderRadius: "20px" }} alt="..." />
                <div className="card-body" style={{ height: "16rem"}}>
                    <h5 className="card-title"> {store.details.name}</h5>

                    <div>
                        <p className="card-text"><span>Description:</span>{store.details.description} </p>
                        <p className="card-text"><span>Color:</span>{store.details.color} </p>
                        <p className="card-text"><span>Price:</span> {store.details.price}</p>
                    </div>



                    <button  className="btn btn-warning m-3">Details</button>


                    <button href="#" onClick={()=>handleaddFavorites()} className="btn btn-danger m-3 " ><strong>♥</strong></button>
                </div>
            </div>

    </div>
    </div>
  );
}

export default ViewDetails;

  