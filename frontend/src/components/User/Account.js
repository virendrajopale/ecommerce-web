import React from 'react'
import MetaData from '../layout/MetaData'
import {Link,useNavigate} from 'react-router-dom'
// import Loader from '../layout/Loader/Loader'
import {useSelector,useDispatch} from 'react-redux'
import './Account.css'
import Loader from '../layout/Loader/Loader'
import { useEffect } from 'react'
const Account = () => {
    const{user,loading,isAuthenticated}=useSelector(state=>state.user);
    const navigate=useNavigate()
    useEffect(()=>{
        if(isAuthenticated===false){
            navigate('/login')
        }
    },[isAuthenticated,navigate])
  return (
   <>
   {
    loading?<Loader/>:
    ( <>
        <MetaData title={`${user.name}'s Profile`}/>
        <div className="accountContainer">
            <div>
                <h1>My Profile</h1>
                <img src={user.avatar.url} alt={user.name} />
                <Link to={"/me/update"}>Edit Profile</Link>
            </div>
            <div>
                <div className="">
                    <h4>Full Name</h4>
                    <p>{user.name}</p>
                </div>
                <div className="">
                    <h4>Email</h4>
                    <p>{user.email}</p>
                </div>
               
                <div className="">
                    <Link to={"/orders"}>My Orders</Link>
                    <Link to={"/password/update"}>Change Password</Link>
                </div>
            </div>
        </div>
        </>)
   }
   </>
  )
}

export default Account
