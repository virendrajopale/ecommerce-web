import React, { useEffect, useId, useState } from 'react'
import './NewProduct.css'
import { Button } from '@material-ui/core'

import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { clearError } from '../../actions/productAction'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../layout/Loader/Loader'
import { USERS_UPDATE_RESET } from '../../constants/userConstant'
import { getUserDetails, updateUsers } from '../../actions/userAction'
import { MdEmail, MdPersonPinCircle, MdVerifiedUser } from 'react-icons/md'
const UpdateUser = () => {


    const dispatch = useDispatch();
    const alert = useAlert()
    const { loading, error, user } = useSelector(state => state.userDetail);
    const { loading: updateLoading, error: updateError, isUpdated } = useSelector(state => state.profile);
    const navigate = useNavigate()
    const {id} = useParams();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const userId=id;

    useEffect(() => {
        if (user && user._id !== userId) {
            dispatch(getUserDetails(userId))

        }
        else {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);

        }
        if (error) {
            alert.error(error);
            dispatch(clearError);
        }
        if (updateError) {
            alert.error(updateError)
            dispatch(clearError)
        }
        if (isUpdated) {
            alert.success("User Updated Successfully")
            navigate("/admin/users");
            dispatch({ type: USERS_UPDATE_RESET })
        }
    }, [alert, isUpdated, updateError, dispatch, navigate, error, user, userId])

    const updateSubmitHandler = (e) => {
        e.preventDefault();
        const myform = new FormData();
        myform.set("name", name);
        myform.set("role", role);
        myform.set("email", email);

        dispatch(updateUsers(id, myform))
    }

    return (
        <>
            <MetaData title={"Create Products Vee shop"}></MetaData>
            <div className="dashboard">
                <Sidebar />
                <div className="newProductContainer">
                    {
                        loading?<Loader/>:(
                            <form className='createProductForm' encType='multipart/form-data'
                        onSubmit={updateSubmitHandler}>
                        <h1>Update User</h1>
                        <div>
                            <MdPersonPinCircle />
                            <input type="text" placeholder=" Name" required
                                value={name} onChange={(e) => setName(e.target.value)} />

                        </div>
                        <div>
                            <MdEmail />
                            <input type="email" placeholder="Email" required
                                value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <MdVerifiedUser />
                            <select value={role} id="" onChange={(e) => setRole(e.target.value)}>
                                <option value={""}> Role</option>
                                <option value={"admin"}>Admin</option>
                                <option value={"user"} >User</option>
                            </select>
                        </div>
                        <Button id='createProductBtn' type='submit'
                            disabled={updateLoading ? true : false || role === "" ? true : false}>
                            Update
                        </Button>
                    </form>
                    
                        )
                    }
                </div>
            </div>

        </>
    )
}

export default UpdateUser;
