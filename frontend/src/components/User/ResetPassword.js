import React, { Fragment, useState, useEffect } from 'react'
import Loader from '../layout/Loader/Loader'
import {  MdLock, MdLockClock, MdMailOutline, MdVpnKey } from 'react-icons/md'
import { useMatch, useNavigate, useParams } from 'react-router-dom'
import './ResetPassword.css'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import { clearError,resetPassword} from '../../actions/userAction'
import { PASSWORD_UPDATE_RESET} from '../../constants/userConstant'
import MetaData from '../layout/MetaData'
const ResetPassword = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch()
    const alert=useAlert()
    const {match}=useMatch()
    const {token}=useParams()
    const {error,success,loading}=useSelector(state=>state.forgotPassword);
    const [password,setPassword]=useState('')
    const [confirmPassword,setconfirmPassword]=useState('');

  const PasswordResetSubmit=()=>{
       const myForm=new FormData();

       myForm.set('password',password);
       myForm.set('confirmPassword',confirmPassword);
       dispatch(resetPassword(token,myForm))
  }
  useEffect(() => {
    
    if (error) {
        alert.error(error)
        dispatch(clearError())
    }
    if(success){

        alert.success("Password Updated SuccessFully")

        navigate('/login')
       

    }
}, [dispatch, error, alert,navigate,success])

  return (
    <Fragment>
    {
        loading?<Loader/>:(
            <>
            <MetaData title={'Reset Password'}></MetaData>
            <div className="ResetPasswordContainer">
              <div className="ResetPasswordBox">
               <h2 className='ResetPasswordText'>Reset Password</h2>
              <form action="" className='ResetPasswordForm'
               encType="multipart/form-data"
                              onSubmit={PasswordResetSubmit}>
                              
                              <div className="newPass">
                              <MdLockClock/>
                                  <input type="password" placeholder='New Password'
                                      required  value={password}
                                      onChange={(e)=>setPassword(e.target.value)} />
                              </div>
                               <div className="newPass">
                               <MdLock/>
                                  <input type="password" placeholder='Confirm Password'
                                      required  value={confirmPassword}
                                      onChange={(e)=>setconfirmPassword(e.target.value)} />
                              </div>
                              
                             
                              <input type="submit" value="Update" className='ResetPasswordBtn'
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

export default ResetPassword
