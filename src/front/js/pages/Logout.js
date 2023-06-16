import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";




export const Logout = () => {
  const { store, actions } = useContext(Context);
  useEffect(()=>{
    actions.userLogout()
  },[])

  return (
    <div className="custom-home pt-5">
      <div className="card mx-auto text-center" style={{ width: "18rem" }} >
        <img src="https://cdn-icons-png.flaticon.com/512/727/727399.png?w=826&t=st=1686358778~exp=1686359378~hmac=f84a1339da9e966863baaaa695a7da2268cb3f815bde80a01506c7777cf7cf50" className="card-img-top" alt="..." />
        <div className="card-body">
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
      </div>
      <h3 className="text-center p-5">The user has closed session</h3>
    </div>

  );
};






