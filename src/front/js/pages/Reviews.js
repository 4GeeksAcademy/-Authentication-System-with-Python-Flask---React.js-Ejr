import React, {useState} from 'react'
import CardsReview from '../component/CardsReview.js'
import SearchReview from '../component/SearchReview.js'

const Reviews = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div>
      <SearchReview handleSearch={handleSearch} />
      <CardsReview searchQuery={searchQuery} />
    </div>
  );
}

export default Reviews