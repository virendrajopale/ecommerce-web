import React,{useEffect} from 'react'
import {DataGrid} from '@material-ui/data-grid'
import LaunchIcon from '@material-ui/icons/Launch'
import './order.css'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader/Loader'
import { Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { clearError, myOrders } from '../../actions/orderAction'
import { Link } from 'react-router-dom'
const MyOrders = () => {
  const dispatch=useDispatch()
  const alert=useAlert();
  const {loading,error,orders}=useSelector(state=>state.myOrders)
  const {user}=useSelector(state=>state.user);
  
  const columns=[
    {
      field:"id",
      headerName:"Order Id",
      minWidth:300,
      flex:1,
      
    },
    {
      field:"status",
      headerName:"Status",
      minWidth:150,
      flex:0.3,
      cellClassName:(params)=>{
        return params.getValue(params.id,"status")==="Delivered"
        ?'greenColor':'redColor'
      }
    },
    {
      field:"itemsQty",
      headerName:"Items Qty",
      type:"number",
      minWidth:230,
      flex:0.5,
      
    },
    {
      field:"amount",
      headerName:"Amount",
      type:"number",
      minWidth:270,
      flex:0.5,
     
    },
    {
      field:"actions",
      flex:0.5,
      headerName:"Actions",
      minWidth:150,
      type:"number",
      sortable:false,
      renderCell:(params)=>
     {
      return (
        <Link to={`/order/${params.getValue(params.id,"id")}`}>
          <LaunchIcon/>
        </Link>
      )
      }
    }

  ];
  const rows=[];
  orders &&orders.forEach((item,index) => {rows.push({
      itemsQty:item.orderItems.length,
      id:item._id,
      status:item.orderStatus,
      amount:item.totalPrice}
    )
    
  });
  console.log(`order :`,orders);
  
  useEffect(() => {
  if(error){
    alert.error(error)
    dispatch(clearError())
  }
  dispatch(myOrders())
  }, [dispatch,error,alert])
  
  return (
    <>
    <MetaData title={`Order -Vee shop`}/>
    {
      loading ?<Loader/>:(
        <div className="myOrderPage">
          <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          className='myOrderTable'
          autoHeight/>
          <Typography id='myOrderHead'> My Orders</Typography>
        </div>
      )
    }
    </>
  )
}

export default MyOrders
