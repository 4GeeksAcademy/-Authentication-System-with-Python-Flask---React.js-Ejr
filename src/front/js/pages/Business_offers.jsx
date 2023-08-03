import React from 'react'
import BusinessOfferCard from '../component/BusinessOfferCard.jsx'
import FormOffers from '../component/FormOffers.jsx'

const Business_offers = () => {
  return (
    <>
      {store.business_user.business_name && <FormOffers />}
      <BusinessOfferCard />
    </>


  )
}

export default Business_offers