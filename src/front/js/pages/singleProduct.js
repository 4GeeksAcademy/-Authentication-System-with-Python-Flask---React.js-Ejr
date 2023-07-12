import React, {useEffect, useContext, useState, } from 'react'
import { useParams } from 'react-router-dom'
import { Context } from "../store/appContext";
import { ProductCarousel } from '../component/productCarousel';
import Slider from 'react-slick';



export const SingleProduct = () => {
  const {store, actions} = useContext(Context)
  const params = useParams()

  useEffect(() => {
    actions.getProduct(params.productid)
  }, [])
  return (
    <div className="container">
      {store.productlist.length > 0 ? (
        <div>

          

          <h1>{store.productlist[0].name}</h1>
          <p>State: {store.productlist[0].state}</p>
          <p>Price: {store.productlist[0].price}</p>
          <p>Description: {store.productlist[0].description}</p>

          {/* <ProductCarousel images={store.productlist[0].images} /> */}

          <img src={store.productlist[0].images[0].image} alt="Product Image" style={{ width: '200px', height: 'auto' }}/>
          


        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

