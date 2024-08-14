import React from "react";
import "../../styles/card.css";

const Card = () => {

    return (  <div className="custom-card text-bg-dark mt-4">
        <img 
            src="https://images.pexels.com/photos/860707/pexels-photo-860707.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            className="card-img" 
            alt="Background Image"
        />
             <div className="card-img-overlay d-flex flex-column justify-content-center align-items-center text-center">
                 <h5 className="card-title">Descubra y asista a emocionantes acontecimientos</h5>
                 <div className="button-group mt-3">
                     <a href="/register" className="btn btn-dark btn-lg mx-2">Regístrese</a>
                 </div>
             </div>
         </div>

    );
 };
export default Card;
