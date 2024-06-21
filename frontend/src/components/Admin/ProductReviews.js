import React,{useEffect,useState} from 'react'
import './Reviews.css';
import {DataGrid} from '@material-ui/data-grid'
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import {Link, useNavigate, useParams} from 'react-router-dom'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {Button } from '@material-ui/core';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
import { clearError, deleteProduct, deleteReviews, getAllProductsAdmin, getAllReviews } from '../../actions/productAction';
import { DELETE_REVIEW_SUCCESS, DELETE_RPRODUCT_RESET, DELETE_RREVIEW_RESET } from '../../constants/productConstant';
import { MdStar } from 'react-icons/md';

const ProductReviews = () => {
    const dispatch=useDispatch();
    const alert=useAlert();
    const navigate=useNavigate();
    const id=useParams();
    const {error:deleteError,isDeleted}=useSelector(state=>state.reviews);
    const {error,reviews,loading}=useSelector(state=>state.productReviews);
    const  [productId, setProductId] = useState("");

   
    const column=[
        {
            field:"id",
            headerName:"Review Id",
            minWidth:200,
            flex:0.5, 
          },
          
          {
            field:"comment",
            headerName:"Comment",
            minWidth:520,
            flex:0.7,  
          },
          {
            field:"rating",
            headerName:"Rating",
            minWidth:170,
            type:"number",
            flex:0.5,  
            cellClassName:(params)=>{
              return params.getValue(params.id,"rating")>=3
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
  
                    <Button onClick={()=>deleteReviewHandler(params.getValue(params.id,"id"))}>
                        <DeleteIcon/>
                    </Button>
                    </>
                )
            }
          },
    ];
    const deleteReviewHandler=(reviewId)=>{
      dispatch(deleteReviews(reviewId,productId))
    }
    const rows=[]
    reviews && reviews.forEach((item) => {
        rows.push({
            id:item._id,
            rating:item.rating,
            comment:item.comment,

        })
    });
    const reviewSubmitHandler=(e)=>{
      e.preventDefault();

      dispatch(getAllReviews(productId))
    }
    useEffect(() => {
      if(productId.length===24){
        dispatch(getAllReviews(productId))
      }
      if(error){
        alert.error(error);
        dispatch(clearError());
      }
      if(deleteError){
        alert.error(deleteError);
        dispatch(clearError());
      }
      if(isDeleted){
        alert.success("Review Deleted Successfully")
        navigate('/admin/reviews')
        dispatch({type:DELETE_RREVIEW_RESET})
        
      }

    }, [alert,error,dispatch,deleteError,isDeleted,navigate,productId])
    
  return (
   <>
   <MetaData title={"All Reviews--Admin"}></MetaData>
   <div className="dashboard">
    <Sidebar/>
    <div className="ReviewsContainer">
    <form className='ReviewsForm' encType='multipart/form-data'
                        onSubmit={reviewSubmitHandler}>
                        <h1>ALL REVIEWS </h1>
                        <div>
                            <MdStar />
                            <input type="text" placeholder=" Product Id" required
                                value={productId} onChange={(e) => setProductId(e.target.value)} />

                        </div>
                        
                        
                        <Button id='createProductBtn' type='submit'
                            disabled={loading ? true : false || productId === "" ? true : false}>
                            Search
                        </Button>
                    </form>

                    {reviews && reviews.length>0? <DataGrid rows={rows} columns={column}
        pageSize={10} disableSelectionOnClick className='productsReviewTable' autoHeight>

        </DataGrid>:<h1 className='ProductreveiesFormhead'>
          No reviews</h1>}
    </div>
   </div>
   </>
  )
}

export default ProductReviews
