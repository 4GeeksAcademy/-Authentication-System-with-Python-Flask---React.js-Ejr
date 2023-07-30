import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../store/appContext.js'
import { useNavigate } from 'react-router-dom'

const NewProduct = () => {
  // let navigate = useNavigate()
  // const userString = localStorage.getItem('user')
  // const user = JSON.parse(userString);

  const { actions, store } = useContext(Context)


  // Get the input values (You can replace these with actual data from your model)
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('');
  const [type, setType] = useState('');
  const [category_id, setCategory] = useState('');
  // const [sizes , setSizes] = useState({S:"" , M:"" , L:"" , XL:""});
  const [imageUrl , setImageUrl] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Aquí puedes llamar a la función actions.SendCreateProduct con los datos del formulario
    // const newForm = {
    //   name,
    //   price,
    //   description,
    //   color,
    //   type,
    //   category_id,
    //   // sizes: sizes.split(',').map((size) => size.trim()), // Convertir el string de tallas a un arreglo
    //   imageUrl,
    // };

   
    // Llama a la función para manejar el envío del formulario con los datos del formData
    
      actions.addNewProduct( name,
        price,
        description,
        color,
        type,
        category_id,
        imageUrl)
 
    // Restablecer los campos del formulario a su estado inicial
    setName('');
    setPrice('');
    setDescription('');
    setColor('');
    setType('');
    setCategory('');
    // setSizes('');
    setImageUrl('');
  };

  const handleCancel = () => {
    setName('');
    setPrice('');
    setDescription('');
    setColor('');
    setType('');
    setCategory('');
    // setSizes('');
    setImgageUrl('');
  };




  return (
    <div>
      <form
      style={{ borderRadius: '15px' }}
      className='card w-75 mx-auto m-5 text-white bg-black'
      id='dataCard'
      onSubmit={handleSubmit}
    >
      <div className='row p-5'>
        <div className='col'>
          <div className='m-1'>
            <span>NAME</span>
            <input
            className='m-1 text-center'
              type='text'
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='m-1'>
            <span>PRICE</span>
            <input
            className='m-1 text-center'
              type='text'
              id='price'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className='m-1'>
            <span>DESCRIPTION</span>
            <input
            className='m-1 text-center'
              type='text'
              id='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className='m-1'>
            <span>COLOR</span>
            <input
            className='m-1 text-center'
              type='text'
              id='color'
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
          <div className='m-1'>
            <span>TYPE</span>
            <input
            className='m-1 text-center'
              type='text'
              id='type'
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </div>
          <div className='m-1'>
            <span>CATEGORY</span>
            <input
            className='m-1 text-center'
              type='text'
              id='category'
              value={category_id}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          {/* <div className='m-1'>
            <span>SIZES</span>
            <input
            className='m-1 text-center'
              type='text'
              id='sizes'
              value={sizes}
              onChange={(e) => setSizes(e.target.value)}
            />
          </div> */}
        </div>

        <div className='col'>
          <div className='m-1 text-center'>
            <span className='row'>PHOTO</span>
            <input
            className='m-1 text-center'
              type='text'
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder='URL de la imagen'
            />
            <img
              className='row'
              style={{ objectFit: 'cover', width: '400px', borderRadius: '15px' }}
              src={imageUrl}
              alt=''
            />
          </div>
        </div>
      </div>

      <button type='submit' className='btn btn-success m-3'>
        CREATE
      </button>
      <button type='button' className='btn btn-danger m-3' onClick={handleCancel}>
        CANCEL
      </button>
    </form>

    </div>
  )
}

export default NewProduct
