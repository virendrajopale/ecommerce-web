import React, { useEffect } from 'react'
import { CgMouse } from 'react-icons/cg';
// import './Home.css'
import ProductCard from '../Product/ProductCard';
import MetaData from '../layout/MetaData';
import { clearError, getProduct } from '../../actions/productAction'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../layout/Loader/Loader';
import {useAlert} from 'react-alert'
import { MdArrowDownward } from 'react-icons/md';
import Car from '../layout/Header/Car';




const Home = () => {
  const alert=useAlert();
  const dispatch = useDispatch()
  const { loading, error, products, productsCount } = useSelector((state) => state.products)
  useEffect(() => {
    if(error){
      alert.error(error)
      dispatch(clearError())
    }
    dispatch(getProduct())
  }, [dispatch,error,alert])
 

  return (
    <>
     {
     loading?<Loader/ >:<>
     <MetaData title="Vir Sales" />
   <Car/>

<div className=" flex flex-col text-white font-sign text-xl justify-center items-center gap-4 w-full my-10">
      

        <a href="#container">
          {/* <button className='bg-red-500 rounded-lg w-32 h-12 flex justify-center items-center'> */}
          <MdArrowDownward size={30} className= ' animate-bounce bg-red-400 h-14 w-14 rounded-full'/>
          {/* </button> */}
        </a>
      </div>
      <div className="flex flex-wrap p-28 min-h-[30vh] justify-center" id="container">
        {
          products && products.map(product => (
            <ProductCard product={product} />
          ))}
      </div>
     </>
     }
    </>
  )
}

export default Home
