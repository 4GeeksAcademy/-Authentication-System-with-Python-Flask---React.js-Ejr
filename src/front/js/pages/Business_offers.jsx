import React, { useContext, useState } from 'react'
import BusinessOfferCard from '../component/BusinessOfferCard.jsx'
import FormOffers from '../component/FormOffers.jsx'
import { Context } from '../store/appContext.js'
import SearchReview from '../component/SearchReview.js'

const Business_offers = () => {
  const { store, actions } = useContext(Context)
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  return (
    <>
      <SearchReview handleSearch={handleSearch} />
      {store.business_user.business_name || store.user.is_admin && <FormOffers />}
      <BusinessOfferCard searchQuery={searchQuery} />
    </>


  )
}

export default Business_offers