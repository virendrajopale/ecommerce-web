import React, { Fragment, useEffect, useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { clearError, getProductDetails, newProductReview } from '../../actions/productAction'
import ReactStars from 'react-rating-stars-component'
import ReviewCard from './ReviewCard'
import Loader from '../layout/Loader/Loader'
import { useAlert } from 'react-alert'
import MetaData from '../layout/MetaData'
import './ProductDet.css'
import { addToCart } from '../../actions/cartActions'
import {Dialog,DialogActions,DialogContent,DialogTitle,Button} from '@material-ui/core'
import { Rating } from '@mui/material'
import { ADD_REEVIEW_RESET } from '../../constants/productConstant'
const ProductDetails = () => {
    const dispatch = useDispatch()
    const { products, loading, error } = useSelector((state) => state.productDetails)
    const {error:reviewError,success}=useSelector(state=>state.newReviews)
    const { id } = useParams();
    const alert = useAlert()
     const [qty,setQty]=useState(1)
     const [open,setOpen]=useState(false)
     const [rating,setRating]=useState(0);
     const [comment,setComment]=useState("");
     const increaseQty=()=>{
        if(products.Stock<=qty){
            return;
        }
        const qnt=qty+1;
        setQty(qnt);
     }
     const decreaseQty=()=>{
        if(qty<=1){
            return
        }
        const qnt=qty-1;
        setQty(qnt);
     }

     const addToCartHandler=()=>{
        dispatch(addToCart(id,qty))
        alert.success("Item Added to Cart")
     }
     const reviewSubmitHandler=()=>{
         const myForm=new FormData();
         myForm.set('rating',rating);
         myForm.set('comment',comment);
         myForm.set('productId',id);
         dispatch(newProductReview(myForm));
 
         setOpen(false)
     }
    useEffect(() => {
        // if(alert){
        //     alert.error(error)
        //     dispatch(clearError())
        // }
        if(reviewError){
            alert.error(reviewError)
            dispatch(clearError())
        }
        if(success){
            alert.success("Review Submitted Successfully");
            dispatch({type:ADD_REEVIEW_RESET})
        }
        dispatch(getProductDetails(id))

    }, [dispatch, id, error, alert,reviewError,success])
    const options = {
        
        size: "large",
        value: products.ratings,
        readOnly:true,
       precision:0.5
    }
    const submitReviewToggle=()=>{
     open?setOpen(false):setOpen(true)
    }
    return (
        <>{
            loading ? <Loader /> :
                <Fragment>
                    <MetaData title={`${products.name}--ECOMMERCE`} ></MetaData>

                    <div className="Productdetails flex justify-center items-center">
                        {/* <div> */}

                        <Carousel >
                            {
                                products.images && products.images.map((item, i) => (
                                    <img
                                        className='CarouselImage'
                                        key={item.url}
                                        src={item.url}
                                        alt={`${i} slide`}
                                    />
                                ))

                            }
                        </Carousel>
                        {/* </div> */}

                        <div>
                            <div className="detailsBlock-1">
                                <h2>{products.name}</h2>
                                <p>Product # {products._id}</p>

                            </div>
                            <div className="detailsBlock-2">
                                <Rating {...options} />
                                <span>({products.numberOfreviews} Reviews)</span>

                            </div>
                            <div className="detailsBlock-3 font-sign text-xl">
                                <h1>{`₹${products.price} `}</h1>
                                <div className="detailsBlock-3-1">
                                    <div className="detailsBlock-3-1-1">
                                        <button onClick={decreaseQty}>-</button>
                                        <input readOnly type="text" value={qty} className=' text-black font-sign'/>
                                        <button onClick={increaseQty}>+</button>
                                    </div>
                                    <button disabled={products.Stock<1?true:false} onClick={addToCartHandler} >Add to Cart</button>
                                </div>
                                <p>Status :
                                    <b className={products.Stock <= 1 ? "redColor" : "greenColor"}>
                                        {products.Stock <= 1 ? " Out Of Strock" : " InStock"}
                                    </b>
                                </p>
                            </div>
                            <div className="detailsBlock-4">
                                Description: <p>{products.description}</p>
                            </div>
                            <button onClick={submitReviewToggle} className='submitReview'>Submit Review</button>
                        </div>
                    </div>
                    <h3 className="reviewHeading">REVIEWS</h3>
                    <Dialog aria-labelledby='simple-dialog-title' 
                    open={open}
                    onClose={submitReviewToggle}>
                        <DialogTitle>Submit Review</DialogTitle>
                        <DialogContent className='submitDialog'>
                            <Rating onChange={(e)=>setRating(e.target.value)}
                            value={rating}
                            size='large'/>
                            <textarea
                            className='submitDialogTextArea'
                            cols={'30'}
                                value={comment}
                                onChange={(e)=>setComment(e.target.value)}
                            rows={'5'}
                            >
                            </textarea>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={submitReviewToggle} color='secondary'>Cancel</Button>
                            <Button onClick={reviewSubmitHandler} color='primary'>Submit</Button>
                        </DialogActions>
                    </Dialog>
                    {
                        products.reviews && products.reviews[0] ? (
                            <div className="reviews">
                                {
                                    products.reviews && products.reviews.map((review) =>
                                        <ReviewCard review={review}></ReviewCard>)
                                }
                            </div>
                        ) : (
                            <p className='noReview'>No Reviews Yet</p>
                        )
                    }
                </Fragment>
        }
        </>
    )
}

export default ProductDetails
