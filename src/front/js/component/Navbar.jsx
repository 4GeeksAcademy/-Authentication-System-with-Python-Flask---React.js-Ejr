import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../store/appContext.js'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  // let navigate = useNavigate()

  
  

  const { actions, store } = useContext(Context)
  useEffect(() => {
    if (store.token) {
      actions.getFavorites();
    }
  }, [store.token]);

  function handleLogout() {
    actions.logout()
  }

  return (
    <nav className='navbar navbar-dark bg-black '>
      <div className='container-fluid'>
        <Link className='navbar-brand' to='/'>
          <img
            style={{ width: '100px', objectFit: '', border: 'none' }}
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5Kwl4gT7z8mc8Ug0BaVPrzvedTvuLAZ8VFQ&usqp=CAU</img'
            alt='logo'
          />
          {store.token && (
               
               <>
                
                   <span className='nav-item text-white p-2'>WELCOME, {store.user.first_name.toUpperCase()}</span>
                 
               </>
             )}
          
        </Link>
        
        <div className='d-flex  end'>
          
        {!store.user.is_admin && store.token && (
  <div className='d-flex  end align-items-center'>
    <Link className='nav-link text-white' to='/cart'>
      <i className='fa-solid fa-cart-shopping' />
    </Link>
    <div className='nav-item dropdown dropstart'>
      <a
        className='nav-link text-white'
        href='#'
        id='favoritesDropdown'
        role='button'
        data-bs-toggle='dropdown'
        aria-expanded='false'
      >
        <i className='fa-sharp text-white fa-solid fa-heart'></i>
      </a>
      <ul style={{ width: "250px" }} className='dropdown-menu bg-black text-white' aria-labelledby='favoritesDropdown'>
        <li className='p-3 text-center'>
          <span>FAVORITES</span>
        </li>
        {store.favorites.map(product => (
          <li key={product.id} className='d-flex justify-content-between p-3 align-items-center'>
            <Link className='text-white text-decoration-none d-flex align-items-center' to={`/product/${product.id}`}>
              <div style={{ width: '30px', height: '30px' }} className='rounded-circle m-1 overflow-hidden'>
                <img style={{ objectFit: "cover" }} className='w-100 h-100 img-cover' src={product.image_url} alt="" />
              </div>
              <span className="ms-2 flex-grow-1">{product.name}</span>
            </Link>
            <i onClick={() => actions.deleteFavorites(product.id)} className="fa-solid fa-xmark btn" style={{ color: "#eb000c" }}></i>
          </li>
        ))}
      </ul>
    </div>
  </div>
)}


          <div
            className='collapse navbar-collapse me-2'
            id='navbarSupportedContent'
          >
            <ul className='navbar-nav  text-end mb-2  '>
              {!store.token ? (
                <>
                  <li className='nav-item'>
                    <Link className='nav-link text-white' to='/login'>
                      LOGIN
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link className='nav-link text-white' to='/signup'>
                      SIGNUP
                    </Link>
                  </li>{' '}
                </>
              ) : (
                <>
                  
                  <li className='nav-item'>
                    <span
                      className='nav-link text-white'
                      onClick={handleLogout}
                      style={{ cursor: 'pointer' }}
                    >
                      LOGOUT
                    </span>
                  </li>
                  <li className='nav-item'>
                    <Link className='nav-link text-white' to='/settings'>
                      SETTINGS
                    </Link>
                  </li>
                  
                </>
              )}

              {store.user.is_admin && (<>
                <li className='nav-item'>
                  <Link className='nav-link text-white' to='/admin'>
                    EDIT USERS
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link text-white' to='/create'>
                    CREATE
                  </Link>
                </li>
              </>
              )}
              
            </ul>
          </div>
          <button
            style={{ color: 'black', border: 'none', alignSelf: 'center' }}
            className='navbar-toggler pt-2'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <i className='fa-solid fa-bars fs-4 text-white'></i>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
