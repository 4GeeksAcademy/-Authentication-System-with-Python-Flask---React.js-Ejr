import React from 'react'

const FilterOptions = ({filterCategory, options, selectedOptions, onOptionChange }) => {
  return (
    <div className={`col-3 ${filterCategory}Container`}>
        {{filterCategory}}
    </div>
  )
}

export default FilterOptions