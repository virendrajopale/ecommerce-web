import React, { Fragment, useState, useEffect } from 'react'
import Loader from '../layout/Loader/Loader'
import { MdFaceRetouchingNatural, MdMailOutline } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import './UpdateProfile.css'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import { clearError,updateUserProfile, loaduser} from '../../actions/userAction'
import { PROFILE_UPDATE_RESET } from '../../constants/userConstant'
import MetaData from '../layout/MetaData'
const UpdateProfile = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const alert=useAlert()
    const {error,isUpdated,user,loading}=useSelector(state=>state.profile)
   
    const [avatarPreview, setAvatarPreview] = useState('/Profile.png')
    const [avatar, setAvatar] = useState("");
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")

    const profileUpdateSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData()
        myForm.set("name", name)
        myForm.set("email", email)
        myForm.set("avatar", avatar)
        dispatch(updateUserProfile(myForm))
        
    }
    const profileUpdateDataChange = (e) => {
    
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }

            }
            reader.readAsDataURL(e.target.files[0]);
        
        
    }
  
    useEffect(() => {
        if(user){
            setName(user.name)
            setEmail(user.email)
            setAvatarPreview(user.avatar.url)
            console.log("hiiii");
        }
        if (error) {
            alert.error(error)
            dispatch(clearError())
        }
        if(isUpdated){
            // history.push("/account")
            alert.success("Profile Updated SuccessFully")
            // dispatch(loaduser())
            navigate('/account')
            dispatch({
                type:PROFILE_UPDATE_RESET,
            })

        }
    }, [dispatch, error, alert,navigate,user,isUpdated])

  return (
 <Fragment>
    {
        loading?<Loader/>:(
            <>
            <MetaData title={'Update Profile'}></MetaData>
            <div className="UpdateProfileContainer">
              <div className="UpdateProfileBox">
                  <h2 className='UpdateProfileText'>Update Profile</h2>
              <form action="" className='UpdateProfileForm'
                              encType="multipart/form-data"
                              onSubmit={profileUpdateSubmit}>
                              <div className="UpdateProfileName">
                                  <MdFaceRetouchingNatural />
                                  <input type="text" placeholder='Name'
                                      required name="name" value={name}
                                      onChange={(e)=>setName(e.target.value)} />
                              </div>
                              <div className="UpdateProfileEmail">
                                  <MdMailOutline />
                                  <input type="email" placeholder='Email'
                                      required name="email" value={email}
                                      onChange={(e)=>setEmail(e.target.value)} />
                              </div>
                              
                              <div id="profileUpdateImage">
                                  <img src={avatarPreview} alt="Avatar Preview" />
                                  <input type="file" name='avatar' accept='image/*'
                                      onChange={profileUpdateDataChange} />
                              </div>
                              <input type="submit" value="Update Profile" className='UpdateProfileBtn'
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

export default UpdateProfile
