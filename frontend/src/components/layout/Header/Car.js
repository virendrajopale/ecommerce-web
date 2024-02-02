import React, { useState } from 'react'

import {BsChevronCompactLeft,BsChevronCompactRight} from 'react-icons/bs'
import {RxDotFilled} from 'react-icons/rx'

const Car = () => {
    const slides = [
        {
            id:1,
          url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
        },
        {
            id:2,
          url: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
        },
        {
            id:3,
          url: 'https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80',
        },
    
        {
            id:4,
          url: 'https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2253&q=80',
        },
        {
            id:5,
          url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80',
        },
      ];

   const [currI, setCurrI] = useState(0)
   
      const prevSlide=()=>{
        const isFirst=currI===0;
        const newInd=isFirst? slides.length-1:currI-1
        setCurrI(newInd);
      }
      const nextSlide=()=>{
        const isLast=currI===slides.length-1;
        const newInd=isLast? 0:currI+1
        setCurrI(newInd);
      }
   
  return (
    <div className=' max-w-[1400px] h-[480px] w-full mx-auto py-1 px-4 relative group'>
         <div className=" w-full h-full rounded-sm bg-center bg-cover duration-500" style={{backgroundImage:`url(${slides[currI].url})`}}></div>
        
        <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-4xl rounded-full p-2 bg-white/20 text-white cursor-pointer '>
            <BsChevronCompactLeft size={30} onClick={prevSlide}/>
        </div>
        
        <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-4xl rounded-full p-2 bg-white/20 text-white cursor-pointer '>

        <BsChevronCompactRight  size={30} onClick={nextSlide}/>
        </div>
        <div className='flex justify-center top-4 py-1 '>
            {
                slides.map((slide,slideIndex)=>(
            <div key={slideIndex} className=' cursor-pointer text-2xl ' onClick={()=>setCurrI(slideIndex)}>
            <RxDotFilled className=''/>
            </div>
                ))
            }
        </div>
    </div>
  )
}

export default Car
