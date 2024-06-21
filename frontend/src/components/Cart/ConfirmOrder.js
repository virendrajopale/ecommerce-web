import React from 'react'
import CheckOutStep from './CheckOutStep'
import MetaData from '../layout/MetaData'
import './ConfirmOrder.css'
import { useSelector } from 'react-redux'
import { Typography } from '@material-ui/core'
import {Link, useNavigate} from 'react-router-dom'
const ConfirmOrder = () => {
    const navigate=useNavigate()
    const {shippingInfo,cartItems}=useSelector(state=>state.cart);
    const {user}=useSelector(state=>state.user);

    const address=`${shippingInfo.address},${shippingInfo.city},${shippingInfo.state},${shippingInfo.pinCode},${shippingInfo.country}`

    const subtotal=cartItems.reduce(
        (acc,item)=>Math.round(acc+item.quantity*item.price),
        0
    )
    const shippingCharges=subtotal>1000?0:200;
    const gst=Math.round(subtotal*0.18);
    const totalPrice=subtotal+gst+shippingCharges;
    const proceedToPay=()=>{
      const data={
        subtotal,
        shippingCharges,
        gst,
        totalPrice
      };
      sessionStorage.setItem('orderInfo',JSON.stringify(data));
      navigate('/process/payment')
    }
  return (
   <>
   <MetaData title={"Confirm Order -Vee shop"}></MetaData>
   <CheckOutStep activeStep={1}></CheckOutStep>
   <div className="confirmOrderPage">
    <div className='confirmShipArea'>
     <Typography>Shipping Info</Typography>
     <div className="confirmShipAreaBox">
        <div>
            <p>Name: </p>
            <span>{user.name}</span>
        </div>
        <div>
            <p>Phone No: </p>
            <span>{shippingInfo.phoneNo}</span>
        </div>
        <div>
            <p>Address: </p>
            <span>{address}</span>
        </div>
     </div>
     <div className="confirmCartItem">
        <Typography>Your Cart Item</Typography>
        <div className="confirmCartItemContainer">
            {
                cartItems&&
                cartItems.map((item)=>(
                    <div key={item.product}>
                        <img src={item.image} alt="" />
                        <Link to={`/product/${item.product}`}>
                            {item.name}
                        </Link>
                        <span>
                            {item.quantity} X {item.price}=
                            <b>₹{item.price*item.quantity}</b>
                        </span>
                    </div>
                ))
            }
        </div>
     </div>
    </div>
    {/*  */}
    <div>
    <div className="orderSummary">
        <Typography>Order Summary</Typography>
        <div>
            <div>
                <p>SubTotal : </p>
                <span>₹ {subtotal}</span>
            </div>
            <div>
                <p>Shipping Charges : </p>
                <span>₹ {shippingCharges}</span>
            </div>
            <div>
                <p>GST : </p>
                <span>₹{gst}</span>
            </div>
        </div>
        <div className="orderSummaryTotal">
            <p>
                <b>Total :</b>
            </p>
            <span>₹{totalPrice}</span>
        </div>
        <button onClick={proceedToPay}>Proceed To Payment</button>
    </div>
    </div>
   </div>
   </>
  )
}

export default ConfirmOrder
