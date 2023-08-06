import React, { useContext, useState } from 'react'
import CardsReview from '../component/CardsReview.js'
import SearchReview from '../component/SearchReview.js'
import FormReview from '../component/FormReview.js'
import { Context } from '../store/appContext.js'
import MenuReviews from '../component/MenuReviews.js'

const Reviews = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { store, actions } = useContext(Context)

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div>
      <SearchReview handleSearch={handleSearch} />
      {store.user.username && <FormReview />}
      <MenuReviews searchQuery={searchQuery} />
    </div>
  );
}

export default Reviews