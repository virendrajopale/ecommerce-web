import React, { Fragment, useRef, useState, useEffect } from 'react'
import Loader from '../layout/Loader/Loader'
import { MdFaceRetouchingNatural, MdLockOpen, MdMailOutline } from 'react-icons/md'
// import MailOutlineIcon from '@material-ui/icons/MailOutlineIcon'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './LoginSign.css'
import { CgLockUnlock } from 'react-icons/cg'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import { login, clearError, register } from '../../actions/userAction'

const LoginSign = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location=useLocation()
    const { error, loading, isAuthenticated } = useSelector(state => state.user)

    const alert = useAlert()
    //useRef
    const loginTab = useRef(null)
    const registerTab = useRef(null)
    const switcherTab = useRef(null)

    //usestate
    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const [avatarPreview, setAvatarPreview] = useState('/Profile.png')
    const [avatar, setAvatar] = useState('/Profile.png')

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    }
    )

    const { name, email, password } = user;
    const loginSubmit = (e) => {
        // console.log("From submitted");
        e.preventDefault()
        dispatch(login(loginEmail, loginPassword))

    };
    const registerSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData()
        myForm.set("name", name)
        myForm.set("email", email)
        myForm.set("password", password)
        myForm.set("avatar", avatar)
        //sending to action
        dispatch(register(myForm))
    }
    const registerDataChange = (e) => {
        if (e.target.name === 'avatar') {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }

            }
            reader.readAsDataURL(e.target.files[0]);
        }
        else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }
    }
    const redirect=location.search?location.search.split("=")[1]:'/account';
    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError())
        }
        if (isAuthenticated) {
            navigate(redirect)
        }
    }, [dispatch, error, alert, navigate, isAuthenticated,redirect])
    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftNeutral")
            switcherTab.current.classList.remove("shifttoRight")
            registerTab.current.classList.remove("ShiftToNeutralForm")
            loginTab.current.classList.remove("ShiftToLeft")
        }
        else if (tab === 'register') {
            switcherTab.current.classList.add("shifttoRight")
            switcherTab.current.classList.remove("shiftNeutral")
            registerTab.current.classList.add("ShiftToNeutralForm")
            loginTab.current.classList.add("ShiftToLeft")
        }
    }

  

    return (
        <>
            {
                loading ? <Loader /> :
                    <Fragment>
                        <div className="loginSignContainer">
                            <div className="loginSignBox">
                                <div>

                                    <div className="login-sign-toggle">
                                        <p onClick={(e) => switchTabs(e, 'login')}>LOGIN</p>
                                        <p onClick={(e) => switchTabs(e, 'register')}>REGISTER</p>
                                    </div>
                                    <button ref={switcherTab}></button>
                                </div>
                                <form action="" className="loginform" ref={loginTab} onSubmit={loginSubmit}>
                                    <div className="loginEmial" >
                                        <MdMailOutline />
                                        <input type="email" placeholder='Email'
                                            required
                                            value={loginEmail}
                                            onChange={(e) => setLoginEmail(e.target.value)} />
                                    </div>
                                    <div className="loginPassword">
                                        <MdLockOpen />
                                        <input type="password" placeholder='Password'
                                            required
                                            value={loginPassword}
                                            onChange={(e) => setLoginPassword(e.target.value)} />
                                    </div>
                                    <Link to='/password/forgot'>Forgot Password</Link>
                                    <input type="submit" value="Login" className='loginbutton' />
                                </form>

                                {/* //SignUp. */}
                                <form className='signUpForm' ref={registerTab}
                                    encType="multipart/form-data"
                                    onSubmit={registerSubmit}>
                                    <div className="signUpName">
                                        <MdFaceRetouchingNatural />
                                        <input type="text" placeholder='Name'
                                            required name="name" value={name}
                                            onChange={registerDataChange} />
                                    </div>
                                    <div className="signUpEmail">
                                        <MdMailOutline />
                                        <input type="email" placeholder='Email'
                                            required name="email" value={email}
                                            onChange={registerDataChange} />
                                    </div>
                                    <div className="signUpPassword">
                                        <CgLockUnlock />
                                        <input type="password" placeholder='Password'
                                            required name="password" value={password}
                                            onChange={registerDataChange} />
                                    </div>
                                    <div id="registerImage">
                                        <img src={avatarPreview} alt="Avatar Preview" />
                                        <input type="file" name='avatar' accept='image/*'
                                            onChange={registerDataChange} />
                                    </div>
                                    <input type="submit" value="Sign Up" className='signUpBtn'
                                    />
                                </form>
                            </div>

                        </div>
                    </Fragment>
            }
        </>
    )
}

export default LoginSign
