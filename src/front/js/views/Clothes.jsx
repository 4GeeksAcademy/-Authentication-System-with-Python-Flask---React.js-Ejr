import React, { useContext, useEffect, useState, useMemo } from 'react'
import { Context } from '../store/appContext.js'

import Navbar from '../component/Navbar.jsx'
import ClothesCard from '../component/ClothesCard.jsx'

const Clothes = () => {
  const { actions, store } = useContext(Context)
  const [search, setSearch] = useState('')
  const [selectedTypes, setSelectedTypes] = useState([])
  useEffect(() => {
    actions.getClothes()
  }, [])

  const filteredClothes = useMemo(
    () =>
      store.clothes.filter((clothe) => {
        const inputFilter = clothe.name
          .toLowerCase()
          .includes(search.toLowerCase())
        if (selectedTypes.length === 0) return inputFilter

        const typeFilter = selectedTypes.includes(clothe.type)
        return inputFilter && typeFilter
      }),
    [store.clothes, search, selectedTypes]
  )

  return (
    <>
      <Navbar />

      <div className='container'>
        <h1>Clothes</h1>
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

        <div className='input-group my-3'>
          <input
            type='text'
            className='form-control'
            placeholder="Search a product by it's name"
            aria-label="Recipient's username"
            aria-describedby='button-addon2'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className='d-flex gap-4'>
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
