import React, { Fragment, useState, useEffect } from 'react'
import Loader from '../layout/Loader/Loader'
import { MdFaceRetouchingNatural, MdMailOutline } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import './ForgotPassword.css'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import { clearError,forgotPassword} from '../../actions/userAction'
import { PROFILE_UPDATE_RESET } from '../../constants/userConstant'
import MetaData from '../layout/MetaData'
const ForgotPassword = () => {
    const dispatch=useDispatch();
    const alert=useAlert();
    const {loading,error,message}=useSelector(state=>state.forgotPassword);
    const [email,setEmail]=useState();

    const ForgotPasswordSubmit=(e)=>{
        e.preventDefault();
        const myForm = new FormData()
      
        myForm.set("email", email)
       
        dispatch(forgotPassword(myForm))
    }
    useEffect(() => {
      
        if (error) {
            alert.error(error)
            dispatch(clearError())
        }
        if(message){
            // history.push("/account")
            alert.success(message)
           

        }
    }, [dispatch, error, alert,message])
  return (
    <Fragment>
    {
        loading?<Loader/>:(
            <>
            <MetaData title={'Forgot Password'}></MetaData>
            <div className="forgotPasswordContainer">
              <div className="ForgotPasswordBox">
                  <h2 className='ForgotPasswordText'>Forgot Password</h2>

              <form action="" className='ForgotPasswordForm'
                              onSubmit={ForgotPasswordSubmit}>
                            
                              <div className="ForgotPasswordEmail">
                                  <MdMailOutline />
                                  <input type="email" placeholder='Email'
                                      required name="email" value={email}
                                      onChange={(e)=>setEmail(e.target.value)} />
                              </div>
                              
                            
                              <input type="submit" value="Send" className='ForgotPasswordBtn'/>
                          </form>
              </div>
            </div>
            </>
        )
    }
 </Fragment>
  )
}

export default ForgotPassword
