import React,{useEffect} from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import { clearError, orderDetails } from '../../actions/orderAction';
import { useParams } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData';
import { Typography } from '@material-ui/core';
import {Link} from 'react-router-dom'
import './orderDetails.css'
const OrderDetails = () => {
    const {order,loading,error}=useSelector(state=>state.orderDetails);
    const dispatch=useDispatch();
    const alert=useAlert();
    const {id}=useParams()
    useEffect(() => {
      if(error){
        alert.error(error);
        dispatch(clearError())
      }
      dispatch(orderDetails(id))
    }, [alert,error,dispatch,id])
    // const address=`${shippingInfo.address},${shippingInfo.city},${shippingInfo.state},${shippingInfo.pinCode},${shippingInfo.country}`

  return (
   <>
    {
        loading?<Loader/>:
        <>
          <MetaData title={"Order Details -Vee shop"}/>
          <div className="orderDetailsPage">
            <div className="orderDetContainer">
                <Typography component={"h1"}>
                    Order #{order && order._id}
                </Typography>
                <div className="orderContainerBox">
                    <div>
                        <p>Name :</p>
                        <span>{order.user && order.user.name}</span>
                    </div>
                    <div>
                        <p>Phone No. :</p>
                        <span>{order.shippingInfo && order.shippingInfo.phoneNo}</span>
                    </div>
                    <div>
                        <p>Address :</p>
                        <span>
                            {
                                order.shippingInfo &&
                                `${order.shippingInfo.address},${order.shippingInfo.city},${order.shippingInfo.state},${order.shippingInfo.pinCode},${order.shippingInfo.country}`
                            }
                        </span>
                    </div>
                </div>
                <Typography>Payment</Typography>
                <div className="orderContainerBox">
                    <div>
                        <p className={order.paymentInfo&&
                        order.paymentInfo.status==="succeeded"
                        ?'greenColor'
                        :'redcolor'}>
                            {order.paymentInfo&&
                        order.paymentInfo.status==="succeeded"
                        ?'PAID'
                        :'NOT PAID'}
                        </p>
                    </div>
                    <div>
                        <p>Amount</p>
                        <span>{order.totalPrice&&order.totalPrice}</span>
                    </div>
                </div>
                <Typography >Order Status</Typography>
                <div className="orderContainerBox">
                    <div>
                    <p className={order.orderStatus&&
                        order.orderStatus==="Delivered"
                        ?'greenColor'
                        :'redcolor'}>
                            {order.orderStatus&&
                        order.orderStatus}
                        </p>
                    </div>
                </div>
                <div className="orderDetailsCartItems">
                    <Typography>Order Items:</Typography>
                    <div className="orderDetailsCartItemContainer">
                        {
                            order.orderItems&&order.orderItems.map((item)=>(
                                <div key={item.product}>
                                    <img src={item.image} alt="" />
                                    <Link to={`/product/${item.product}`}>
                                        {item.name}  </Link>
                                    <span>
                                          { item.quantity} X {item.price}=
                                        <b>₹{item.price*item.quantity}</b>
                                    </span>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
          </div>
        </>
    }
   </>
  )
}

export default OrderDetails
