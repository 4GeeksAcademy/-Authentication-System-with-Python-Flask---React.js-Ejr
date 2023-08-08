import React, { useContext, useEffect, useState, useMemo } from 'react'
import { Context } from '../store/appContext.js'

import Navbar from '../component/Navbar.jsx'
import ClothesCard from '../component/ClothesCard.jsx'

const Clothes = () => {
  const { actions, store } = useContext(Context)
  const [search, setSearch] = useState('')
  const [selectedTypes, setSelectedTypes] = useState([])
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(0)

  useEffect(() => {
    actions.getClothes()
  }, [])

  const filteredClothes = useMemo(
    () =>
      store.clothes.filter((clothe) => {
        let inputFilter = clothe.name
          .toLowerCase()
          .includes(search.toLowerCase())

        let typeFilter = selectedTypes.includes(clothe.type)
        if (selectedTypes.length === 0) typeFilter = true

        let minFilter = clothe.price >= minPrice
        let maxFilter = clothe.price <= maxPrice
        let priceFilter = (minPrice == 0 ? true : minFilter) && (maxFilter ? true : maxPrice == 0)
        if (minPrice === 0 && maxPrice === 0) priceFilter = true

        return inputFilter && typeFilter && priceFilter
      }),
    [store.clothes, search, selectedTypes, minPrice, maxPrice]
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    setMinPrice(e.target[0].value || 0)
    setMaxPrice(e.target[1].value || 0)
  }

  return (
    <>
      <Navbar />

      <div className='container'>
        <h1>Clothes</h1>
        <div className='d-flex gap-2 flex-wrap'>
          <div className='dropdown'>
            <button
              className='btn btn-secondary dropdown-toggle bg-black text-white'
              type='button'
              id='dropdownMenuButton1'
              data-bs-toggle='dropdown'
              aria-expanded='false'
            >
              Filter by type
            </button>
            <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
              {store.clothes_types.map((type) => (
                <li className='dropdown-item d-flex gap-2' key={type}>
                  <input
                    className=' form-check-input'
                    type='checkbox'
                    value={type}
                    onChange={(e) => {
                      if (e.target.checked)
                        setSelectedTypes([...selectedTypes, type])
                      else
                        setSelectedTypes(
                          selectedTypes.filter(
                            (selectedType) => selectedType !== type
                          )
                        )
                    }}
                    id={type}
                  />
                  <label
                    className='form-check-label text-capitalize'
                    htmlFor={type}
                  >
                    {type}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Price filter */}
          <form
            className='d-flex gap-1 align-items-center'
            onSubmit={handleSubmit}
          >
            <div className='input-group' style={{ width: '100px' }}>
              <input
                type='number'
                className='form-control'
                placeholder='Min price'
                aria-label='Min price'
                aria-describedby='button-addon2'
              />
            </div>
            <i className='fa-solid fa-minus'></i>
            <div className='input-group' style={{ width: '100px' }}>
              <input
                type='number'
                className='form-control'
                placeholder='Max price'
                aria-label='Max price'
                aria-describedby='button-addon2'
              />
            </div>
            <button type='submit' className='btn btn-dark'>
              $
            </button>
          </form>
          {/* End price filter */}
        </div>

        <div className='input-group my-3'>
          <input
            type='text'
            className='form-control'
            placeholder="Search a product by it's name"
            aria-label="Search a product by it's name"
            aria-describedby='button-addon2'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className='d-flex gap-4 flex-wrap'>
          {store.clothes && store.clothes.length > 0 ? (
            filteredClothes.map((clothe) => (
              <ClothesCard key={clothe.id} index={clothe.id} clothe={clothe} />
            ))
          ) : (
            <h1>Cargando!!!</h1>
          )}
        </div>
      </div>
    </>
  )
}

export default Clothes
