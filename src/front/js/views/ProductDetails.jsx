import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../component/Navbar.jsx'
import { Context } from '../store/appContext.js'

const ProductDetails = () => {
  const { actions , store } = useContext(Context)
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [size_id, SetSizeId] = useState(1)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    actions
      .getProductDetails(id)
      .then((data) => setProduct(data))
      .catch((error) => {
        navigate('/404')
      })
  }, [id])



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
              <label htmlFor="quantity">Quantity</label>
              <input onChange={(e) => setQuantity(e.target.value)} type="text" />
            </div>

            <button onClick={() => actions.postShoppingCart(product.id, Number(quantity), size_id)} className={`btn bg-black m-3 ${store.shopping_cart.some(item => item.product.id === product.id) ? 'text-success' : 'text-white'}`}><i className="fa-solid fa-cart-plus"></i></button>


            <button
              href='#'
              onClick={() => actions.postFavorites(product.id)}
              className={`btn bg-black m-3 ${store.favorites.some(favorite => favorite.id === product.id) ? 'text-danger' : 'text-white'}`}
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
