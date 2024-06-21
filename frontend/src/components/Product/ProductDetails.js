import React, { Fragment, useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearError, getProductDetails, newProductReview } from '../../actions/productAction';
import ReviewCard from './ReviewCard';
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';
import './ProductDet.css';
import { addToCart } from '../../actions/cartActions';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@material-ui/core';
import { Rating } from '@mui/material';
import { ADD_REEVIEW_RESET } from '../../constants/productConstant';

const ProductDetails = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.productDetails);
    const { error: reviewError, success } = useSelector((state) => state.newReviews);
    const { id } = useParams();
    const alert = useAlert();
    const [qty, setQty] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const increaseQty = () => {
        if (products.Stock <= qty) {
            return;
        }
        setQty(qty + 1);
    };

    const decreaseQty = () => {
        if (qty <= 1) {
            return;
        }
        setQty(qty - 1);
    };

    const addToCartHandler = () => {
        dispatch(addToCart(id, qty));
        alert.success("Item Added to Cart");
    };

    const reviewSubmitHandler = () => {
        const myForm = new FormData();
        myForm.set('rating', rating);
        myForm.set('comment', comment);
        myForm.set('productId', id);
        dispatch(newProductReview(myForm));

        setOpen(false);
    };

    useEffect(() => {
        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearError());
        }
        if (success) {
            alert.success("Review Submitted Successfully");
            dispatch({ type: ADD_REEVIEW_RESET });
        }
        dispatch(getProductDetails(id));
    }, [dispatch, id, error, alert, reviewError, success]);

    const options = {
        size: "large",
        value: products?.ratings,
        readOnly: true,
        precision: 0.5
    };

    const submitReviewToggle = () => {
        setOpen(!open);
    };

    return (
        <>{
            loading ? <Loader /> :
                <Fragment>
                    <MetaData title={`${products?.name} - Vee Shop`} />

                    <div className="bg-gray-100 min-h-screen">
                        <div className="container mx-auto p-4 md:p-10">
                            <div className="bg-white rounded-lg shadow-lg overflow-hidden md:flex">
                                <div className="md:w-1/2">
                                    <img 
                                        src={products?.images?.url} 
                                        alt={products?.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="md:w-1/2 p-6 md:p-8">
                                    <div className="space-y-6">
                                        <div>
                                            <h1 className="text-4xl font-bold text-gray-800">{products?.name}</h1>
                                            <p className="text-gray-500 mt-2">Product # {products?._id}</p>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Rating {...options} />
                                            <span className="text-gray-600">({products?.numberOfReviews} Reviews)</span>
                                        </div>

                                        <div className="border-t border-b py-4">
                                            <h2 className="text-3xl font-semibold text-gray-800">₹ {products?.price}</h2>
                                            <div className="flex items-center space-x-4 mt-4">
                                                <div className="flex items-center space-x-2 border rounded-md">
                                                    <button onClick={decreaseQty} className="bg-gray-200 text-gray-700 px-3 py-2 rounded-l-md hover:bg-gray-300">-</button>
                                                    <input readOnly value={qty} className="w-12 text-center border-x text-black" />
                                                    <button onClick={increaseQty} className="bg-gray-200 text-gray-700 px-3 py-2 rounded-r-md hover:bg-gray-300">+</button>
                                                </div>
                                                <button 
                                                    onClick={addToCartHandler} 
                                                    disabled={products?.Stock < 1} 
                                                    className={`px-6 py-2 rounded-md text-white font-semibold transition-colors duration-300 ${
                                                        products?.Stock < 1 
                                                        ? 'bg-gray-400 cursor-not-allowed' 
                                                        : 'bg-blue-600 hover:bg-blue-700'
                                                    }`}
                                                >
                                                    Add to Cart
                                                </button>
                                            </div>
                                            <p className="mt-4 text-lg">
                                                Status: 
                                                <span className={`font-bold ml-2 ${products?.Stock < 1 ? "text-red-600" : "text-green-600"}`}>
                                                    {products?.Stock < 1 ? "Out of Stock" : "In Stock"}
                                                </span>
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-800">Description</h3>
                                            <p className="text-gray-600 mt-2">{products?.description}</p>
                                        </div>

                                        <button 
                                            onClick={submitReviewToggle} 
                                            className="w-full bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors duration-300"
                                        >
                                            Submit Review
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 bg-white rounded-lg shadow-lg p-6">
                                <h3 className="text-2xl font-semibold text-gray-800 mb-6">REVIEWS</h3>
                                <Dialog aria-labelledby='simple-dialog-title' open={open} onClose={submitReviewToggle}>
                                    <DialogTitle>Submit Review</DialogTitle>
                                    <DialogContent className='submitDialog'>
                                        <Rating onChange={(e) => setRating(e.target.value)} value={rating} size='large' />
                                        <textarea
                                            className='submitDialogTextArea w-full mt-4 p-2 border rounded-md'
                                            cols={'30'}
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            rows={'5'}
                                            placeholder="Write your review here..."
                                        ></textarea>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={submitReviewToggle} color='secondary'>Cancel</Button>
                                        <Button onClick={reviewSubmitHandler} color='primary'>Submit</Button>
                                    </DialogActions>
                                </Dialog>
                                {products?.reviews && products?.reviews[0] ? (
                                    <div className="reviews mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {products?.reviews && products?.reviews.map((review) => (
                                            <ReviewCard key={review._id} review={review} />
                                        ))}
                                    </div>
                                ) : (
                                    <p className='text-center text-xl text-gray-600 mt-6'>No Reviews Yet</p>
                                )}
                            </div>
                        </div>
                    </div>
                </Fragment>
        }
        </>
    );
}

export default ProductDetails;