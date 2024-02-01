import React, {useState,useRef,useEffect}from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../layout/MetaData'
import './Payment.css'
import {CardNumberElement,CardCvcElement,CardExpiryElement,useStripe,useElements} from '@stripe/react-stripe-js'
import CreditCardIcon from '@material-ui/icons/CreditCard'
import EventIcon from '@material-ui/icons/Event'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import CheckOutStep from './CheckOutStep'
import { Typography } from '@mui/material'
import {Elements} from '@stripe/react-stripe-js'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { clearError, newOrder } from '../../actions/orderAction'
const Payment = () => {
    // const [state, setstate] = useState()
    const navigate=useNavigate()
    const {shippingInfo,cartItems}=useSelector(state=>state.cart);
    const {user}=useSelector(state=>state.user);
    const {error}=useSelector(state=>state.newOrder);
    const orderInfo=JSON.parse(sessionStorage.getItem("orderInfo"))

    const paymentData={
        amount:Math.round(orderInfo.totalPrice *100),

    }
    const order={
        shippingInfo,
        orderItems:cartItems,
        itemPrice:orderInfo.subtotal,
        taxPrice:orderInfo.gst,
        shippingPrice:orderInfo.shippingCharges,
        totalPrice:orderInfo.totalPrice
    }
    
    const dispatch=useDispatch()
    const alert=useAlert()
    const stripe=useStripe()
    const elements=useElements()
    const payBtn=useRef(null);

    const submitHandler=async(e)=>{
        e.preventDefault();
        payBtn.current.disabled=true;
        try {
            const config={
                headers:{
                    "Content-Type":"application/json",
                },
            }
            const {data}= await axios.post(`/api/v1/process/payment`,paymentData,config)
            const client_secret=data.client_secret;
            console.log(client_secret);
            
            if(!stripe || !elements) {return;}

            const result=await stripe.confirmCardPayment(client_secret,{
                payment_method:{
                    card:elements.getElement(CardNumberElement),
                    billing_details:{
                        name:user.name,
                        email:user.email,
                        address:{
                            line1:shippingInfo.address,
                            city:shippingInfo.city,
                            state:shippingInfo.state,
                            postal_code:shippingInfo.pinCode,
                            country:shippingInfo.country,
                        }
                    }
                }
            })
            if(result.error){
                payBtn.current.disabled=false;
                alert.error(result.error.message)
            }
            else{
                if(result.paymentIntent.status==='succeeded'){
                    order.paymentInfo={
                        id:result.paymentIntent.id,
                        status:result.paymentIntent.status,

                    }
                    dispatch(newOrder(order))
                    navigate('/success')
                }
                else{
                    alert.error("There is issue while doing Payment")
                }
            }
        } catch (error) {
            payBtn.current.disabled=false;
            alert.error(`Errorr${error.response.data.message}`)
        }
    }
    
    useEffect(() => {
      if(error){
        alert.error(error)
        dispatch(clearError())
      }

    }, [dispatch,error,alert])
    
  return (

    <>
    <MetaData title={"Payment"}/>
    <CheckOutStep activeStep={2}/>
    
    <div className="paymentContainer">
        <form action="" className="paymentForm" onSubmit={(e)=>submitHandler(e)}>
            <Typography>Card Info</Typography>
            <div>
                <CreditCardIcon/>
                <CardNumberElement className='paymentInput'/>

            </div>
            <div>
                <EventIcon/>
                <CardExpiryElement className='paymentInput'/>
            </div>
            <div>
                <VpnKeyIcon/>
                <CardCvcElement className='paymentInput'/>
            </div>
            <input type="submit" 
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className='paymentBtn'/>
        </form>
    </div>
    </>
  )
}

export default Payment
