import React, { Fragment } from 'react'
import './Cart.css'
import CartItems from './CartItems'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../../actions/cartActions'
import {Typography }from '@material-ui/core'
import {Link, useNavigate} from 'react-router-dom'
import RemoveShoppingCart from '@material-ui/icons/RemoveShoppingCart'
const Cart = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {cartItems}=useSelector(state=>state.cart)
   const increaseQnty=(id,quantity,Stock)=>{
        const newQty=quantity+1;
        if(Stock<=quantity){
            return
        }
        dispatch(addToCart(id,newQty))
   }
   const decreaseQnty=(id,quantity)=>{
    const newQty=quantity-1;
    if(1>=quantity){
        return
    }
    dispatch(addToCart(id,newQty))
}
const deleteCartItem=(id)=>
{
   dispatch(removeFromCart(id))
}
const checkOutHanlder=()=>{
    navigate("/login?redirect=shipping")
}
  return (
    <>
    {
        cartItems.length===0?
        (<div className="emptyCart">
            <RemoveShoppingCart/>
            <Typography>No Product In Cart</Typography>
            <Link to="/products">View Products</Link>
        </div>):
        <>
    <div className="CartPage">
        <div className="cartHeader">
            <p>Product</p>
            <p>Quantity</p>
            <p>Subtotal</p>
        </div>
            
             {
                 cartItems&& cartItems.map((item)=>(
                      <div className="cartContainer font-sign" key={item.product}>
                     <CartItems item={item} deleteCartItem={deleteCartItem}></CartItems>
                    <div className="cartInput">
                        <button onClick={()=>decreaseQnty(item.product,item.quantity)}>-</button>
                        <input type="number" className='text-black' readOnly value={item.quantity}/>
                        <button onClick={()=>increaseQnty(item.product,item.quantity,item.Stock)}>+</button>
                    </div>
                    <div className="cartSubtotal text-white">{`₹${item.price*item.quantity}`}</div>
                    </div>
                  ))
             }
           

        <div className="cartGrossTotal">
            <div></div>
            <div className="cartGrossTotalBox ">
                <p className='text-white'>Total</p>
                <p className='text-white'>{`₹${cartItems.reduce((acc,item)=>acc+item.quantity*item.price,0)}`}</p>
            </div>
            <div></div>
            <div className="checkOutbtn text-white">
                <button onClick={checkOutHanlder}>Check Out</button>
            </div>
        </div>
    </div>
    </>
    }
    </>
  )
}

export default Cart
