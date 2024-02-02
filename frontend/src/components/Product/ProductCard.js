import React from 'react'
import {Link} from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
// import './Home.css';
import  { Rating } from '@material-ui/lab'
const ProductCard = ({product}) => {
    const options={
      // size: "large",
      value: product.ratings,
      readOnly:true,
     precision:0.5
    }

    
  return (
    <Link className='flex flex-col justify-end no-underline font-sign rounded-sm w-56  border border-white shadow hover:shadow-red-400' 
    to={`/products/product/${product._id}`}>
      <div className='font-sign flex flex-col text-white' >

        <img src={product.images[0].url} alt={product.name} className=' bg-cover w-full h-full'/>
        <p className='font-sign text-white mt-2'>{product.name}</p>
        <div className="">
            <Rating {...options}/>
            <span className='font-sign text-left text-white'>({product.numberOfreview})</span>
        </div>
            <span className='font-sign text-white'> ₹{product.price}</span>
      </div>
      <br />
      <div className=' bg-slate-500 text-white text-center font-sign hover:bg-green-300'>BUY</div>
    </Link>
  )
}

export default ProductCard
