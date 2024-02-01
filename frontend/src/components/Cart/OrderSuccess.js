import React from 'react'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import './orderSuc.css'
import {Link} from 'react-router-dom'
import { Typography } from '@material-ui/core'
const OrderSuccess = () => {
  return (
    <>
    <div className="orderSuccess">
        <CheckCircleIcon/>
        <Typography>Your Order has been places successfully</Typography>
        <Link to='/order'>View Order</Link>
    </div>
    </>
  )
}

export default OrderSuccess
