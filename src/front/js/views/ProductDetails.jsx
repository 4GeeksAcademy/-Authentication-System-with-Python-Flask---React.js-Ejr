import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Context } from '../store/appContext.js'

import Navbar from '../component/Navbar.jsx'
import Rating from '@mui/material/Rating'

import styles from './styles/ProductDetails.module.css'

const ProductDetails = () => {
  const { actions, store } = useContext(Context)
  const [product, setProduct] = useState(null)
  const [rating, setRating] = useState(0)
  const [selectedSize, setSelectedSize] = useState(null)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    actions
      .getProductDetails(id)
      .then((data) => setProduct(data))
      .catch((error) => {
        if (error.response.status === 404) navigate('/404')
      })
  }, [id])

  useEffect(() => {
    if (product) {
      setRating(product.rating)
    }
  }, [product])

  if (!product) return <h1>Loading...</h1>

  return (
    <>
      <Navbar />
      <div className='container p-3'>
        <div className='row py-3'>
          <h1 className='col-5 m-0'>{product.name}</h1>
          <div className='col-5 d-flex flex-column align-items-end'>
            <Rating
              name='product-rating'
              value={rating}
              onChange={(event, newValue) => setRating(newValue)}
              precision={0.5}
              readOnly={JSON.stringify(store.user) === '{}'}
            />
            <span className='me-1'><strong>{product.rating}</strong> ({product.rating_count})</span>
          </div>
        </div>
        {store.user.is_admin && (
            <div className='d-flex gap-2' style={{ marginLeft: '12px' }}>
              <button type='button' className='btn btn-outline-secondary'>
                <i className='fa-solid fa-pen-to-square'></i>
              </button>
              <button type='button' className='btn btn-danger'>
                <i className='fa-solid fa-trash'></i>
              </button>
            </div>
          )}
        {/* Carousel */}
        <div className='container-fluid mt-2' style={{ maxWidth: '800px' }}>
          <div
            id='carouselExampleFade'
            className='carousel slide carousel-fade carousel-dark border border-secondary'
            data-bs-ride='carousel'
            data-bs-interval='false'
            style={{ height: '400px' }}
          >
            <div className='carousel-indicators'>
              {product.images.map((image, index) => {
                return (
                  <button
                    key={image.id}
                    type='button'
                    data-bs-target='#carouselExampleFade'
                    data-bs-slide-to={index}
                    className={`${index === 0 ? 'active' : ''}`}
                    aria-current={`${index === 0 ? 'true' : ''}`}
                    aria-label={`Slide ${index + 1}`}
                  ></button>
                )
              })}
            </div>
            <div className='carousel-inner h-100'>
              {product.images.map((image, index) => {
                return (
                  <div
                    key={image.id}
                    className={`carousel-item h-100 ${
                      index === 0 ? 'active' : ''
                    }`}
                  >
                    <img
                      src={image.image_url}
                      className='d-block w-100 h-100'
                      style={{ objectFit: 'contain' }}
                      alt='...'
                    />
                  </div>
                )
              })}
            </div>
            <button
              className='carousel-control-prev'
              type='button'
              data-bs-target='#carouselExampleFade'
              data-bs-slide='prev'
            >
              <span
                className='carousel-control-prev-icon'
                aria-hidden='true'
              ></span>
              <span className='visually-hidden'>Previous</span>
            </button>
            <button
              className='carousel-control-next'
              type='button'
              data-bs-target='#carouselExampleFade'
              data-bs-slide='next'
            >
              <span
                className='carousel-control-next-icon'
                aria-hidden='true'
              ></span>
              <span className='visually-hidden'>Next</span>
            </button>
          </div>
        </div>
        {/* End carousel */}

        {/* Sizes */}
        <div className='container-fluid mt-2 p-0'>
          <h3 className='my-3'>Sizes</h3>
          <div className='row g-2'>
            {product.sizes_stock.map((size, index) => {
              return (
                <div
                  key={size.id}
                  className='col-6 col-md-4 col-lg-3'
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setSelectedSize(size.id)
                  }}
                >
                  <div
                    className={`overflow-hidden border border-secondary d-flex flex-column align-items-center p-2 ${
                      styles.hover
                    } ${selectedSize === size.id && styles.selected}`}
                  >
                    <span className='text-center fs-3 fw-bold'>
                      {size.size}
                    </span>
                    <span className='text-center'>
                      <strong>{size.stock}</strong> in stock
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        {/* End sizes */}

        <h3 className='my-3'>Description</h3>
        <p>{product.description}</p>

        {/* Price */}
        <h3 className='my-3'>${product.price.toLocaleString('en-US')}</h3>

        {/* Buttons */}
        <div className='d-flex flex-wrap gap-2'>
          {!store.user.is_admin && (
            <>
              <button type='button' className='btn btn-outline-primary'>
                Add to cart
              </button>
              <button type='button' className='btn btn-outline-primary'>
                Buy now
              </button>
              <button type='button' className='btn btn-danger'>
                <i className='fa-solid fa-heart'></i>
              </button>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default ProductDetails
