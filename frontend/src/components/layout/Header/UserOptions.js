import React,{useState} from 'react'
import './Useroption.css';
import {useNavigate} from 'react-router-dom'
import {SpeedDial,SpeedDialAction} from '@material-ui/lab'
import DashBoardIcon from '@material-ui/icons/Dashboard'
import ShoppingCart from '@material-ui/icons/ShoppingCart'
import PersonIcon from '@material-ui/icons/Person'
import { MdExitToApp, MdListAlt } from 'react-icons/md';
import {useDispatch, useSelector} from 'react-redux'
import {logout} from '../../../actions/userAction'
// import { tooltipClasses } from '@mui/material';

import {useAlert} from 'react-alert'

import { Backdrop } from '@material-ui/core';
// import CartItems from '../../Cart/CartItems';
const UserOptions = ({user}) => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {cartItems}=useSelector(state=>state.cart)
   const [open, setOpen] = useState(false)
   const alert=useAlert()
   const dashboard=()=>{
       navigate('/admin/dashboard')
    }
    const orders=()=>{
        navigate('/orders')
    }
    const account=()=>{
        navigate('/account')
    }
    const cart=()=>{
        navigate('/cart')
    }
    const logoutUser=()=>{
        dispatch(logout())
        alert.success("Log Out Successfull")
    }
    const dashActions=[
        {icon:<MdListAlt/>,name:"Orders",func:orders},
        {icon:<ShoppingCart style={{color:cartItems.length>0?"tomato":"unset"}}/>,name:`Cart(${cartItems.length})`,func:cart},

        {icon:<PersonIcon/>,name:"Profile",func:account},
        {icon:<MdExitToApp/>,name:"Logout",func:logoutUser}
    ];
    if(user.role==='admin'){
        dashActions.unshift(  {icon:<DashBoardIcon/>,name:"DashBoard",func:dashboard},
        )
    }
    return (
    <>
    <Backdrop open={open} style={{zIndex:"10"}}/>
    <SpeedDial 
    className='speedDial text-black'
    ariaLabel='SpeedDial tooltip example'
    onClose={()=>setOpen(false)}
    onOpen={()=>setOpen(true)}
    style={{zIndex:"11"}}
    open={open}
    direction='down'
    icon={<img 
    className='speedDialIcon'
    src={user.avatar.url?user.avatar.url:"/Profile.png"}
    alt='profile'
    />
    }>
        {dashActions.map((item)=>
            <SpeedDialAction key={item.name} icon={item.icon} tooltipTitle={item.name} onClick={item.func} tooltipOpen={window.innerWidth<=600?true:false}/>
        )}
    </SpeedDial>
</>
  )
}

export default UserOptions
