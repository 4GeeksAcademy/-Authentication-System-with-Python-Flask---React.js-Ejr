import React, { useContext , useState , useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Context } from '../store/appContext'



const CartProduct = ({ cartItem }) => {
    const { actions, store } = useContext(Context)

   
   

    const [quantity , setQuantity] = useState(cartItem.quantity)
    const [value , setValue] = useState(cartItem.product.price * cartItem.quantity)


    useEffect(() => {
        
        actions.changeTotalCart(value)
        
  }, [value]);

    const navigate = useNavigate()

    const handleDetails = () => {
        navigate(`/product/${cartItem.product.id}`)
    };

    const handleMinus = () => {
        
        quantity > 1 && setQuantity(quantity -1)
        setValue(cartItem.product.price * quantity)
        
    };
    const handlePlus = () => {

        quantity < cartItem.quantity && setQuantity(quantity + 1)
        setValue(cartItem.product.price * quantity)

    };
   




    // Objeto que llega de la api
    // cartItem:
    //   {product: , size , quantity}

    return (


        <div className="text-center mt-1 mx-auto  ">


            <div style={{ width: "50%" }} className="card ">

                <div className="card-body  mx-auto row" >
                    <h5 className="card-title"> {cartItem.product.name}</h5>
                    <div style={{ width: '200px'}} className='rounded-circle m-1 overflow-hidden d-flex justify-content-center p-1 col-2'>
                        <img style={{ objectFit: "scale-down",width: '200px', height: '350px' }} className='w-75 h-75 img-cover d-flex justify-content-center text-center rounded-circle' src={cartItem.product.image_url} alt="" />
                    </div>
                    <div className='col  align-center'>
                        <p className="card-text"><span>Size: {cartItem.size.name}</span> </p>
                        
                        <p className="card-text"><span></span><button onClick={()=>handleMinus()} className="btn btn-black m-3"><i className="fa-solid fa-minus" style={{ color: "#000000" }}></i></button>
                        {quantity}
                        <button onClick={()=>handlePlus()} className="btn btn-black m-3"><i className="fa-solid fa-plus" style={{ color: "#000000" }}></i></button> </p>

                        <p className="card-text"><span>Price: U$S</span> {cartItem.product.price}</p>
                        <p className="card-text"><span>Total: U$S</span> {value}</p>
                    </div>


                    <div className=' d-flex justify-content-center align-items-center'>
                        <button onClick={() => handleDetails()} className="btn btn-black m-3"><i className="fa-solid fa-eye" style={{ color: "#000000" }}></i></button>


                        <button href="#" onClick={() => actions.deleteShoppingCart(cartItem.product.id, cartItem.size.id)} className="btn btn-black m-3 " ><strong><i className="fa-solid fa-xmark" style={{ color: "black" }}></i></strong></button>
                    </div>


                </div>
            </div>





        </div>
    );
};

export default CartProduct;
