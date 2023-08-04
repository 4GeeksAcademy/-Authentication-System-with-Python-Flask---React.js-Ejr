import React from 'react'
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom'
import ScrollToTop from './component/scrollToTop'
import { BackendURL } from './component/backendURL'
import Login from './views/Login.jsx'
import Home from './views/Home.jsx'
import Signup from './views/SignUp.jsx'
import Cart from './views/Cart.jsx'
import Settings from './views/Settings.jsx'
import Admin from './views/Admin.jsx'
import Create from './views/Create.jsx'
import Footwear from './views/Footwear.jsx'
import Clothes from './views/Clothes.jsx'
import ProductDetails from './views/ProductDetails.jsx'
import Accessories from './views/Accessories.jsx'
import Footer from './component/Footer.jsx'
import PrivateRoute from './component/PrivateRoute.jsx'

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
            <Route path='/footwear' element={<Footwear />} />
            <Route path='/clothes' element={<Clothes />} />
            <Route path='/product/:id' element={<ProductDetails />} />
            <Route path='/accesories' element={<Accessories />} />
            <Route path='*' element={<h1>Not found!</h1>} />

            {/* Private routes */}
            <Route element={<PrivateRoute />}>
              <Route path='/cart' element={<Cart />} />
              <Route path='/admin' element={<Admin />} />
              <Route path='/settings' element={<Settings />} />
              <Route path='/create' element={<Create />} />
            </Route>
          </Routes>
          <Outlet />
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  )
}

export default injectContext(Layout)
