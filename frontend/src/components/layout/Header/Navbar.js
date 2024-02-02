import React, { useState } from 'react'
import './nbar.css';
import {FaBars,FaBeer,FaTimes} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import Products from '../../Product/Products';

const Navbar = () => {
  const menubar=[
    {
    id:1,
    link:'Home',
    url:"/"
    
    },
    {
      id:2,
      link:'Products',
      url:"/products"
    },
    {
      id:3,
      link:'Cart',
      url:"/cart"
    },
    {
      id:4,
      link:'Search',
      url:"/search"
    },
    {
      id:5,
      link:'Login',
      url:"/login"
    },
  
]
  const [nav, setNav] = useState(false)
  
  return (
  
      <div className='flex   items-center justify-evenly sticky top-0 w-full h-20 px-4 z-10  '>
        {/* <div className="text-4xl font-sign capitalize px-4">
         <Link to={'/'}>V Sales</Link>
        </div> */}
        <ul className='hidden md:flex z-10 ml-9' >
      {
        menubar.map((links,menubarIndex)=>(
          <li className='px-4 cursor-pointer font-medium
          text-white hover:scale-105 duration-200 capitalize
          bg-red-500 p-2 m-2 rounded-full ' key={menubarIndex}>
            <Link to={links.url} className=' font-sign '> {links.link}</Link>
            </li>
        ))
      }
       
        </ul>
        <div onClick={()=>setNav(!nav)}
  
        className="pr-4 z-10 cursor-pointer md:hidden text-black">
          {nav?<FaTimes size={30}/>:
          <FaBars size={30}/>
          }
        </div>
        {
          nav && 
          <ul className='flex flex-col justify-center items-center
          absolute top-0 left-0 w-full h-screen bg-white font-sign'>
            {
              menubar.map((links)=>(
                <li  className='capitalize cursor-pointer px-4 py-6 text-4xl font-sign text-black' >
               <Link to={links.url} onClick={()=>setNav(!nav)}> {links.link}</Link>
               </li>
              ))
            }
          </ul>
        }
           
      </div>
  
  )
}

export default Navbar
