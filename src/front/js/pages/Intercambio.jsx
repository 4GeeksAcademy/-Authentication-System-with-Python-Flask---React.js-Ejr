import React from 'react'
import '../styles/Intercambio.css'
import Banner from '../components/intercambio/Banner'
import BannerInverso from '../components/intercambio/BannerInverso'

const Intercambio = () => {
  return (
    <div className="div container-fluid">
      <div className="div row">
        <Banner />
      </div>
      <div className="div row">
        <BannerInverso />
      </div>
    </div>
  )
}

export default Intercambio