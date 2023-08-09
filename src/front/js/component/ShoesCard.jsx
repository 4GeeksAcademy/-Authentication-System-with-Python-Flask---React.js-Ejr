import React, { useContext } from 'react'
import { useNavigate } from 'react-router'
import { Context } from '../store/appContext'

const ShoesCard = ({ shoe }) => {
  const { actions, store } = useContext(Context)

  const navigate = useNavigate()
  // const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    actions.postFavorites(shoe.id)
    // setClicked(true);
  };


  return (
    <div className='text-center mt-5'>
      <div className='card  m-2' style={{ width: '18rem' }}>
        <img
          src={shoe.image_url}
          className=''
          style={{ height: '18rem', objectFit: 'cover', borderRadius: '20px' }}
          alt='...'
        />
        <div
          className='card-body'
          style={{ height: '16rem'}}
        >
          <h5 className='card-title'> {shoe.name}</h5>

          <div>
            <p className='card-text'>
              <span>Description:</span>
              {shoe.description}{' '}
            </p>
            <p className='card-text'>
              <span>Color:</span>
              {shoe.color}{' '}
            </p>
            <p className='card-text'>
              <span>Price: U$S</span> {shoe.price}
            </p>
          </div>

          <button
            onClick={() => navigate(`/product/${shoe.id}`)}
            className='btn bg-black text-white m-3'
          >
            Details
          </button>

          <button
            href='#'
            onClick={() => handleClick()}
            className={`btn bg-black m-3 ${store.favorites.some(favorite => favorite.id === shoe.id) ? 'text-danger' : 'text-white'}`}
          >
            <strong>♥</strong>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ShoesCard
