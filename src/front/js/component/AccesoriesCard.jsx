import React, { useContext } from 'react'
import { useNavigate } from 'react-router'
import { Context } from '../store/appContext'

const AccessoriesCard = ({ accessorie }) => {
  const { actions, store } = useContext(Context)
  const navigate = useNavigate()

  return (
    <div className='text-center mt-5'>
      <div className='card  m-2' style={{ width: '18rem' }}>
        <img
          src={accessorie.image_url}
          className=''
          style={{ height: '18rem', objectFit: 'cover', borderRadius: '20px' }}
          alt='...'
        />
        <div
          className='card-body'
          style={{ height: '16rem'}}
        >
          <h5 className='card-title'> {accessorie.name}</h5>

          <div>
            <p className='card-text'>
              <span>Description:</span>
              {accessorie.description}{' '}
            </p>
            <p className='card-text'>
              <span>Color:</span>
              {accessorie.color}{' '}
            </p>
            <p className='card-text'>
              <span>Price:U$S</span> {accessorie.price}
            </p>
          </div>

          <button
            onClick={() => navigate(`/product/${accessorie.id}`)}
            className='btn bg-black text-white m-3'
          >
            Details
          </button>

          <button
            href='#'
            onClick={() => actions.postFavorites(accessorie.id)}
            className={`btn bg-black m-3 ${store.favorites.some(favorite => favorite.id === accessorie.id) ? 'text-danger' : 'text-white'}`}
          >
            <strong>♥</strong>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AccessoriesCard
