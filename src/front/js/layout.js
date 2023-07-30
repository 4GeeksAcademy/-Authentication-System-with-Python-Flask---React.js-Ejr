import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ScrollToTop from './component/scrollToTop'
import { BackendURL } from './component/backendURL'
import Login from './views/Login.jsx'
import Home from './views/Home.jsx'
import Signup from './views/SignUp.jsx'
import Details from './views/Details.jsx'
import Cart from './views/Cart.jsx'
import Settings from './views/Settings.jsx'
import Admin from './views/Admin.jsx'
// import Navbar from "./component/Navbar.jsx";
import Footwear from './views/Footwear.jsx'
import Clothes from './views/Clothes.jsx'
import Accesories from './views/Accesories.jsx'
import Footer from './component/Footer.jsx'

import injectContext from './store/appContext'

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || ''

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == '')
    return <BackendURL />

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/details' element={<Details />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/footwear' element={<Footwear />} />
            <Route path='/clothes' element={<Clothes />} />
            <Route path='/accesories' element={<Accesories />} />

            <Route path='*' element={<h1>Not found!</h1>} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  )
}

export default injectContext(Layout)
