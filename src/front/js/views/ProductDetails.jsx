import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../component/Navbar.jsx'
import { Context } from '../store/appContext.js'

const ProductDetails = () => {
  const { actions } = useContext(Context)
  const [product, setProduct] = useState(null)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    actions
      .getProductDetails(id)
      .then((data) => setProduct(data))
      .catch((error) => {
        navigate('/404')
      })
  }, [])

  if (!product) return (<h1>Loading...</h1>)

  return (
    <div>
      <Navbar />
      <h1>Product Details</h1>
      <div className='text-center mt-5'>
        <div className='card  m-2' style={{ width: '18rem' }}>
          <img
            src={product.image_url}
            className=''
            style={{
              height: '18rem',
              objectFit: 'cover',
              borderRadius: '20px',
            }}
            alt='...'
          />
          <div className='card-body' style={{ height: '16rem' }}>
            <h5 className='card-title'> {product.name}</h5>

            <div>
              <p className='card-text'>
                <span>Description:</span>
                {product.description}{' '}
              </p>
              <p className='card-text'>
                <span>Color:</span>
                {product.color}{' '}
              </p>
              <p className='card-text'>
                <span>Price:</span> {product.price}
              </p>
            </div>

            <button className='btn btn-warning m-3'>Details</button>

            <button
              href='#'
              onClick={() => actions.postFavorites(product.id)}
              className='btn btn-danger m-3 '
            >
              <strong>♥</strong>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
