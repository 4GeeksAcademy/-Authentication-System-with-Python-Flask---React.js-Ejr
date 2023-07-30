import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../store/appContext.js'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  let navigate = useNavigate()
 

  const { actions, store } = useContext(Context)

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
        </Link>
        <div className='d-flex'>
          <Link className='nav-link text-white' to='/cart'>
            {' '}
            <i className='fa-solid fa-cart-shopping' />
          </Link>
          <div className='nav-item dropdown dropstart '>
            <a
              className='nav-link  text-white'
              href='#'
              id='favoritesDropdown'
              role='button'
              data-bs-toggle='dropdown'
              aria-expanded='false'
            >
              <i className='fa-sharp text-white fa-solid fa-heart'></i>
            </a>
            <ul className='dropdown-menu bg-black text-white' aria-labelledby='favoritesDropdown'>
              <li>
                <span>FAVORITES</span>
              </li>
            </ul>
          </div>

          <div
            className='collapse navbar-collapse me-2'
            id='navbarSupportedContent'
          >
            <ul className='navbar-nav me-auto text-end mb-2 mb-lg-0 '>
              {!store.token ? (
                <>
                  <li className='nav-item'>
                    <Link className='nav-link text-white' to='/login'>
                      LOGIN
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link className='nav-link text-white' to='/signup'>
                      REGISTER
                    </Link>
                  </li>{' '}
                </>
              ) : (
                <>
                <li className='nav-item text-white'>
                   <span>WELCOME {store.user.firstName.toUpperCase()}</span>
                  </li>
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

              {store.user.isAdmin && (<>
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
            style={{ color: 'black', border: 'none', alignSelf: 'start' }}
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
