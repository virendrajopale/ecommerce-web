import React,{useEffect} from 'react'
import './ProductList.css';
import {DataGrid} from '@material-ui/data-grid'
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import {Link, useNavigate} from 'react-router-dom'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {Button } from '@material-ui/core';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
import { clearError, deleteProduct, getAllProductsAdmin } from '../../actions/productAction';
import { DELETE_RPRODUCT_RESET } from '../../constants/productConstant';
import { deleteOrder, getAllOrders } from '../../actions/orderAction';
import { DELETE_ORDER_RESET } from '../../constants/orderConsants';

const OrderList = () => {
    const dispatch=useDispatch();
    const alert=useAlert();
    const navigate=useNavigate()
    const {error,orders}=useSelector(state=>state.allOrders);
    const {error:deleteError,isDeleted}=useSelector(state=>state.order)
    const column=[
        {
            field:"id",
            headerName:"Order Id",
            minWidth:300,
            flex:0.5,
            
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
            minWidth:130,
            flex:0.3,
            
          },
          {
            field:"amount",
            headerName:"Amount",
            type:"number",
            minWidth:170,
            flex:0.3,
           
          },
          {
            field:"action",
            headerName:"Actions",
            minWidth:150,
            type:"number",
            flex:0.3,  
            sortable:false,
            renderCell:(params)=>{
                return (
                    <>
                    <Link to={`/admin/order/${params.getValue(params.id,"id")}`}>
                        <EditIcon/>
                    </Link>
                    <Button onClick={()=>deleteOrderHandler(params.getValue(params.id,"id"))}>
                        <DeleteIcon/>
                    </Button>
                    </>
                )
            }
          },
    ];
    const rows=[
    ]
    orders && orders.forEach((item) => {
        rows.push({
            id:item._id,
            itemsQty:item.orderItems.length,
            amount:item.totalPrice,
            status:item.orderStatus
        })
    });
    const deleteOrderHandler=(id)=>{
      dispatch(deleteOrder(id))
    }
    useEffect(() => {
      if(error){
        alert.error(error);
        dispatch(clearError());
      }
      if(deleteError){
        alert.error(deleteError);
        dispatch(clearError());
      }
      if(isDeleted){
        alert.success("Order  Deleted Successfully")
        navigate('/admin/orders')
        dispatch({type:DELETE_ORDER_RESET})
        
      }
      dispatch(getAllOrders())
    }, [alert,error,dispatch,deleteError,isDeleted,navigate])
    
  return (
   <>
   <MetaData title={"All Orders-Admin"}></MetaData>
   <div className="dashboard">
    <Sidebar/>
    <div className="productListContainer">
        <h1 id="productHeading">All Products</h1>
        <DataGrid rows={rows} columns={column}
        pageSize={10} disableSelectionOnClick className='productsListTable' autoHeight>

        </DataGrid>
    </div>
   </div>
   </>
  )
}

export default OrderList
