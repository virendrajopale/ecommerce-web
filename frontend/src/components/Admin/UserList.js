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
import { deleteUsers, getAllUsers } from '../../actions/userAction';
import { USERS_DELETE_RESET } from '../../constants/userConstant';

const UserList = () => {
    const dispatch=useDispatch();
    const alert=useAlert();
    const navigate=useNavigate()
    const {error,users}=useSelector(state=>state.allUsers);
    const {error:deleteError,isDeleted,message}=useSelector(state=>state.profile)
    const column=[
        {
            field:"id",
            headerName:"User Id",
            minWidth:200,
            flex:0.5, 
          },
          {
            field:"email",
            headerName:"Email",
            minWidth:250,
            flex:0.5,  
          },
          {
            field:"name",
            headerName:"Name",
            minWidth:150,
            type:"number",
            flex:0.3,  
          },
          {
            field:"role",
            headerName:"Role",
            minWidth:170,
            type:"number",
            flex:0.5,
            cellClassName:(params)=>{
              return params.getValue(params.id,"role")==="admin"
              ?'redColor':' greenColor'
            }  
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
                    <Link to={`/admin/user/${params.getValue(params.id,"id")}`}>
                        <EditIcon/>
                    </Link>
                    <Button onClick={()=>deleteUserHandler(params.getValue(params.id,"id"))}>
                        <DeleteIcon/>
                    </Button>
                    </>
                )
            }
          },
    ];
    const rows=[
    ]
    users && users.forEach((item) => {
        rows.push({
            id:item._id,
            email:item.email,
            name:item.name,
            role:item.role
        })
    });
    const deleteUserHandler=(id)=>{
      dispatch(deleteUsers(id))
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
        alert.success(message)
        navigate('/admin/users')
        dispatch({type:USERS_DELETE_RESET})
        
      }
      dispatch(getAllUsers())
    }, [alert,error,dispatch,deleteError,isDeleted,navigate,message])
    
  return (
   <>
   <MetaData title={"All Users -Admin Vee shop"}></MetaData>
   <div className="dashboard">
    <Sidebar/>
    <div className="productListContainer">
        <h1 id="productHeading">ALL USERS</h1>
        <DataGrid rows={rows} columns={column}
        pageSize={10} disableSelectionOnClick className='productsListTable' autoHeight>

        </DataGrid>
    </div>
   </div>
   </>
  )
}

export default UserList
