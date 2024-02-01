import React, { useEffect, useState } from "react";
import CheckOutStep from "../Cart/CheckOutStep";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import { Link, useNavigate, useParams } from "react-router-dom";
import AccountTreeIcon from '@material-ui/icons/AccountTree'
import {Button} from '@material-ui/core'

import Sidebar from "./Sidebar";
import {
  clearError,

  orderDetails,
  updateOrder,
} from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
const ProcessOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { id } = useParams();
  const [status,setstatus]=useState("");
  const processOrderHandler = (e) => {
e.preventDefault();
const myForm=new FormData();
myForm.set("status",status);
dispatch(updateOrder(id,myForm))
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    dispatch(orderDetails(id));
  }, [error, dispatch, alert, id]);
  return (
    <>
      <MetaData title={"Process Order"}></MetaData>
      <div className="dashboard">
        <Sidebar></Sidebar>
       {
        loading ?<Loader/>:(
            <div className="newProductContainer">
            <div className="confirmOrderPage">
              <div className="">
                <div className="confirmShipArea">
  
                  <div className="orderDetContainer">
                
                  <Typography>Shipping Info</Typography>
                    <div className="orderContainerBox">
                      <div>
                        <p>Name :</p>
                        <span>{order.user && order.user.name}</span>
                      </div>
                      <div>
                        <p>Phone No. :</p>
                        <span>
                          {order.shippingInfo && order.shippingInfo.phoneNo}
                        </span>
                      </div>
                      <div>
                        <p>Address :</p>
                        <span>
                          {order.shippingInfo &&
                            `${order.shippingInfo.address},${order.shippingInfo.city},${order.shippingInfo.state},${order.shippingInfo.pinCode},${order.shippingInfo.country}`}
                        </span>
                      </div>
                    </div>
                    <Typography>Payment</Typography>
                    <div className="orderContainerBox">
                      <div>
                        <p
                          className={
                            order.paymentInfo &&
                            order.paymentInfo.status === "succeeded"
                              ? "greenColor"
                              : "redcolor"
                          }
                        >
                          {order.paymentInfo &&
                          order.paymentInfo.status === "succeeded"
                            ? "PAID"
                            : "NOT PAID"}
                        </p>
                      </div>
                      <div>
                        <p>Amount</p>
                        <span>{order.totalPrice && order.totalPrice}</span>
                      </div>
                    </div>
                    <Typography>Order Status</Typography>
                    <div className="orderContainerBox">
                      <div>
                        <p
                          className={
                            order.orderStatus && order.orderStatus === "Delivered"
                              ? "greenColor"
                              : "redcolor"
                          }
                        >
                          {order.orderStatus && order.orderStatus}
                        </p>
                      </div>
                    </div>
                   
                  </div>
                </div>
                <div className="confirmCartItem">
                  <Typography>Your Cart Item</Typography>
                  <div className="confirmCartItemContainer">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div key={item.product}>
                          <img src={item.image} alt="" />
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                          <span>
                            {item.quantity} X {item.price}=
                            <b>₹{item.price * item.quantity}</b>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              {/*  */}
              <div>
              <form  className='createProductForm' encType='multipart/form-data'
                onSubmit={processOrderHandler}>
        <h1>Process Order</h1>
       
        
        <div>
          
        </div>
        <div>
            <AccountTreeIcon/>
            <select name="" id="" onChange={(e)=>setstatus(e.target.value)}>
                <option value="">Choose Category</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                
            </select>
        </div>
      
    
        <Button id='createProductBtn' type='submit' 
        disabled={loading?true:false || status===""?true:false}>
            Create
        </Button>
    </form>
              </div>
            </div>
          </div>
        )
       }
      </div>
    </>
  );
};

export default ProcessOrder;
