import React from 'react'
import NavbarUser from './navbarUser'
import NavNoUser from './navbarNoUser'

const Navbar = () => {

    const user = null

  return (
    <div>
        {
            user ? <NavbarUser /> : <NavNoUser />
        }
    </div>
  )
}

export default Navbar