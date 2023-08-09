import React, { useContext } from 'react'
import { useNavigate } from 'react-router'
import { Context } from '../store/appContext'

const ClothesCard = ({ clothe }) => {
  const { actions, store } = useContext(Context)

  const navigate = useNavigate()

  return (
    <div className='text-center'>
      <div className='card m-2' style={{ width: '18rem', height: '500px', borderRadius: '20px'  }}>
        <img
          src={clothe.images[0].image_url}
          className=''
          style={{ height: '18rem', objectFit: 'contain', borderRadius: '20px' }}
          alt='...'
        />
        <div className='card-body' >
          <h5 className='card-title'> {clothe.name}</h5>

          <div>
            <p className='card-text'>
              <span>Color:</span>
              {clothe.color}{' '}
            </p>
            <p className='card-text'>
              <span>Price:U$S</span> {clothe.price}
            </p>
          </div>

          <button
            onClick={() =>
              navigate(`/product/${clothe.id}`)
            }
            className='btn bg-black text-white me-3 mt-3'
          >
            Details
          </button>

          <button
            href='#'
            onClick={() => actions.postFavorites(clothe.id)}
            className={`btn bg-black ${store.favorites.some(favorite => favorite.id === clothe.id) ? 'text-danger' : 'text-white'}  me-3 mt-3`}
          >
            <strong>♥</strong>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ClothesCard
