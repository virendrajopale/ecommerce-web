import React, { Fragment, useState, useEffect } from 'react'
import Loader from '../layout/Loader/Loader'
import {  MdLock, MdLockClock, MdMailOutline, MdVpnKey } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import './UpdatePassword.css'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import { clearError,updateUserpass} from '../../actions/userAction'
import { PASSWORD_UPDATE_RESET} from '../../constants/userConstant'
import MetaData from '../layout/MetaData'
const UpdatePassword = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch()
    const alert=useAlert()
    const {error,isUpdated,loading}=useSelector(state=>state.profile);
    const [oldPassword,setOldPassword]=useState('')
    const [newPassword,setNewPassword]=useState('')
    const [confirmPassword,setconfirmPassword]=useState('');

  const PasswordUpdateSubmit=()=>{
       const myForm=new FormData();
       myForm.set('oldPassword',oldPassword);
       myForm.set('newPassword',newPassword);
       myForm.set('confirmPassword',confirmPassword);
       dispatch(updateUserpass(myForm))
  }
  useEffect(() => {
    
    if (error) {
        alert.error(error)
        dispatch(clearError())
    }
    if(isUpdated){

        alert.success("Profile Updated SuccessFully")

        navigate('/account')
        dispatch({
            type:PASSWORD_UPDATE_RESET,
        })

    }
}, [dispatch, error, alert,navigate,isUpdated])

  return (
    <Fragment>
    {
        loading?<Loader/>:(
            <>
            <MetaData title={'Change Password'}></MetaData>
            <div className="UpdatePasswordContainer">
              <div className="UpdatePasswordBox">
               <h2 className='UpdatePasswordText'>Update Password</h2>
              <form action="" className='UpdatePasswordForm'
               encType="multipart/form-data"
                              onSubmit={PasswordUpdateSubmit}>
                              <div className="oldPass">
                                <MdVpnKey/>
                                  <input type="password" placeholder='Old Password'
                                      required  value={oldPassword}
                                      onChange={(e)=>setOldPassword(e.target.value)} />
                              </div>
                              <div className="newPass">
                              <MdLockClock/>
                                  <input type="password" placeholder='New Password'
                                      required  value={newPassword}
                                      onChange={(e)=>setNewPassword(e.target.value)} />
                              </div>
                               <div className="newPass">
                               <MdLock/>
                                  <input type="password" placeholder='Confirm Password'
                                      required  value={confirmPassword}
                                      onChange={(e)=>setconfirmPassword(e.target.value)} />
                              </div>
                              
                             
                              <input type="submit" value="Update Password" className='UpdatePasswordBtn'
                              />
                          </form>
              </div>
            </div>
            </>
        )
    }
 </Fragment>
  )
}

export default UpdatePassword
