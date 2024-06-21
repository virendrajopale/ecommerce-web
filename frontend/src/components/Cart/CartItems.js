import React from 'react'
import './Cart.css'
import {Link} from 'react-router-dom'
const CartItems = ({item,deleteCartItem}) => {
  return (
   <div className="CartItem">
    <img src={item.image} alt="cartImage" />
    <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
    <span className='text-white'>{`Price: ₹${item.price}`}</span>
    <p onClick={()=>deleteCartItem(item.product)}>Remove</p>
    </div>
   </div>
  )
}

export default CartItems
