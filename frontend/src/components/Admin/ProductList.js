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

const ProductList = () => {
    const dispatch=useDispatch();
    const alert=useAlert();
    const navigate=useNavigate()
    const {error,products}=useSelector(state=>state.products);
    const {error:deleteError,isDeleted}=useSelector(state=>state.product)
    const column=[
        {
            field:"id",
            headerName:"Product Id",
            minWidth:200,
            flex:0.5, 
          },
          {
            field:"name",
            headerName:"Name",
            minWidth:250,
            flex:0.5,  
          },
          {
            field:"stock",
            headerName:"Stock",
            minWidth:150,
            type:"number",
            flex:0.3,  
          },
          {
            field:"price",
            headerName:"Price",
            minWidth:170,
            type:"number",
            flex:0.5,  
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
                    <Link to={`/admin/product/${params.getValue(params.id,"id")}`}>
                        <EditIcon/>
                    </Link>
                    <Button onClick={()=>deleteProductHandler(params.getValue(params.id,"id"))}>
                        <DeleteIcon/>
                    </Button>
                    </>
                )
            }
          },
    ];
    const rows=[
    ]
    products && products.forEach((item) => {
        rows.push({
            id:item._id,
            stock:item.Stock,
            price:item.price,
            name:item.name
        })
    });
    const deleteProductHandler=(id)=>{
      dispatch(deleteProduct(id))
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
        alert.success("Product Deleted Successfully")
        navigate('/admin/dashboard')
        dispatch({type:DELETE_RPRODUCT_RESET})
        
      }
      dispatch(getAllProductsAdmin())
    }, [alert,error,dispatch,deleteError,isDeleted,navigate])
    
  return (
   <>
   <MetaData title={"All products--Admin"}></MetaData>
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

export default ProductList
