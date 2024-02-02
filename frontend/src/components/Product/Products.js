import React, { Fragment, useEffect,useState } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {clearError,getProduct} from '../../actions/productAction'
import Loader from '../layout/Loader/Loader'
import {useMatch, useParams} from 'react-router-dom'
import ProductCard from './ProductCard'
 import Pagination from 'react-js-pagination'
 import Typography from '@material-ui/core/Typography'
 import Slider from '@material-ui/core/Slider'
 import MetaData from '../layout/MetaData'

import './Products.css'

const categories=[
  "Laptop",
"Product",
"Bottom",
"Tops",
"Attire",
"Camera",
"SmartPhones",]
const Products = () => {
    const {loading,products,error,resultperPage,productsCount,filteredProductsCount}=useSelector((state)=>state.products);
    const dispatch=useDispatch()
    const {keyword}=useParams()
    
    const [currentPage,setCurrentPage]=useState(1)
    const [price, setPrice] = useState([0,25000])
    const [category, setCategory] = useState("")
    const [ratings, setRating] = useState()
    
    const PriceHandler=(e,newPrice)=>{
      setPrice(newPrice)
    }
    
    const setCurrentPageNo=(e)=>{
      setCurrentPage(e)
    }
    useEffect(()=>{
      dispatch(getProduct(keyword,currentPage,price,category,ratings))
    },[dispatch,keyword,currentPage,price,category,ratings])
    // console.log(products)
//  let count=filteredProductsCount;
  return (
   <>{
    loading? <Loader/>:
    <>
    <MetaData title={"PRODUCTS Vee shop"}></MetaData>
    <h2 className=" m-auto width-[15vh] text-center font-sign text-4xl text-white">Products</h2>
    <div className=" flex flex-wrap p-28 min-h-[30vh] justify-center">
    {
          products && products.map(product => (
            <ProductCard product={product} />
          ))}
    </div>
 <div className=" w-16 absolute top-[10vmax] left-[3vmax] text-white">
   <Typography>Price
     </Typography>
    <Slider
    value={price}
    onChange={PriceHandler}
    valueLabelDisplay="auto"
    aria-labelledby="range-slider"
    min={0}
    max={25000}
    />


   <Typography>Categories</Typography>
   <ul className="categoryBox">
    {categories.map((category)=>(
      <li className='CategoryLink'
      key={category}
      onClick={()=>setCategory(category)}>
        {category}
      </li>
    ))}
   </ul>
   <fieldset>
    <Typography component="legend" className='rating'>Ratings Above</Typography>
    <Slider 
    value={ratings}
    onChange={(e,newRating)=>{
      setRating(newRating)
    }
  }
      aria-labelledby="contionous-slider"
      min={0}
      max={5}
      valueLabelDisplay="auto"
    />

   </fieldset>
 </div>
    {
      resultperPage && (
      <div className="paginationBox">
      <Pagination
     activePage={currentPage}
     itemsCountPerPage={resultperPage}
     totalItemsCount={productsCount}
     onChange={setCurrentPageNo}
     nextPageText="⟩"
     prevPageText="⟨	"
     firstPageText="«"
     lastPageText="»	"
     itemClass="page-item"
     linkClass="page-link"
     activeClass="pageItemActive"
     activeLinkClass="pageLinkActive"
     />
    </div> 
    )
    }
    </>
   }
   </>
  )
}

export default Products
