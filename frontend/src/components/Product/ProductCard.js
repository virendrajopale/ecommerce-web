import React from 'react';
import { Link } from 'react-router-dom';
import { Rating } from '@material-ui/lab';

const ProductCard = ({ product }) => {
    const options = {
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
        size: 'small'
    };

    return (
        <div className="w-60 h-80 bg-gray-50 p-3 flex flex-col gap-1  shadow-md">
            <Link to={`/products/product/${product._id}`} className="block h-48 overflow-hidden">
                <img 
                    src={product.images.url} 
                    alt={product.name} 
                    className="w-full h-full object-cover duration-500 contrast-50 hover:contrast-100"
                />
            </Link>
            <div className="flex flex-col gap-4">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col">
                        <span className="text-xl font-bold line-clamp-1 text-yellow-300">{product.name}</span>
                        <p className="text-xs text-gray-700">ID: {product._id}</p>
                    </div>
                    <span className="font-bold text-red-600">₹{product.price}</span>
                </div>
                <div className="flex items-center justify-between">
                    <Rating {...options} />
                    <span className="text-xs text-gray-600">({product.numberOfreview})</span>
                </div>
                <button className="hover:bg-sky-700 text-gray-50 bg-sky-800 py-2 rounded transition duration-300">
                  <Link to={`/products/product/${product._id}`}>
                  BUY
                  </Link>  
                </button>
            </div>
        </div>
    );
};

export default ProductCard;