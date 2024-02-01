
import {
    LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL, SIGNUP_USER_FAIL, CLEAR_ERRORS,
    SIGNUP_USER_REQUEST, SIGNUP_USER_SUCCESS,
    LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAIL,
    LOG_OUT_SUCCESS, LOG_OUT_FAIL, PROFILE_UPDATE_REQUEST, 
    PROFILE_UPDATE_FAIL, PROFILE_UPDATE_SUCCESS, 
    PASSWORD_UPDATE_REQUEST, PASSWORD_UPDATE_SUCCESS, 
    PASSWORD_UPDATE_FAIL, PASSWORD_FORGOT_REQUEST, 
    PASSWORD_FORGOT_SUCCESS, PASSWORD_FORGOT_FAIL, 
    PASSWORD_RESET_REQUEST, PASSWORD_RESET_SUCCESS,
     PASSWORD_RESET_FAIL, USERS_DETAILS_REQUEST, 
     ALL_USER_REQUEST, ALL_USER_SUCCESS, ALL_USER_FAIL, 
     USERS_DETAILS_SUCCESS, USERS_DETAILS_FAIL, 
     USERS_UPDATE_REQUEST, USERS_UPDATE_SUCCESS, 
     USERS_UPDATE_FAIL, USERS_DELETE_REQUEST,
      USERS_DELETE_SUCCESS, USERS_DELETE_FAIL
} from '../constants/userConstant'
import axios from 'axios'


export const login = (email, password) => async (dispatch) => {

    try {
        dispatch({ type: LOGIN_USER_REQUEST })
        const config = { headers: { "Content-Type": "application/json" } }
        const { data } = await axios.post(`/api/v1/login`, {
            email, password
        }, config)

        dispatch({ type: LOGIN_USER_SUCCESS, payload: data.user })
    }
    catch (err) {
        dispatch({ type: LOGIN_USER_FAIL, payload: err.response.data.message })
    }
}


export const register = (userData) => async (dispatch) => {

    try {
        dispatch({ type: SIGNUP_USER_REQUEST })
        const config = { headers: { "Content-Type": "multipart/form-data" } }
        const { data } = await axios.post(`/api/v1/register`, userData, config)
        dispatch({ type: SIGNUP_USER_SUCCESS, payload: data.user })
    } catch (error) {
        dispatch({ type: SIGNUP_USER_FAIL, payload: error.response.data.message })
    }
}

//load user
export const loaduser = () => async (dispatch) => {

    try {
        dispatch({ type: LOAD_USER_REQUEST })

        const { data } = await axios.get(`/api/v1/me`)

        dispatch({ type: LOAD_USER_SUCCESS, payload: data.user })
    }
    catch (err) {
        dispatch({ type: LOAD_USER_FAIL, payload: err.response.data.message })
    }
}
//log out user
export const logout = () => async (dispatch) => {

    try {

        await axios.get(`/api/v1/logout`)

        dispatch({ type: LOG_OUT_SUCCESS })
    }
    catch (err) {
        dispatch({ type: LOG_OUT_FAIL, payload: err.response.data.message })
    }
}
//profile updt
export const updateUserProfile = (userData) => async (dispatch) => {

    try {
        dispatch({ type: PROFILE_UPDATE_REQUEST })
        const config = { headers: { "Content-Type": "multipart/form-data" } }
        const { data } = await axios.put(`/api/v1/me/update`, userData, config)
        dispatch({ type: PROFILE_UPDATE_SUCCESS, payload: data.success })
    } catch (error) {
        dispatch({
            type: PROFILE_UPDATE_FAIL,
            payload: error.response.data.message
        })
    }
}
//pass updt
export const updateUserpass = (passwords) => async (dispatch) => {

    try {
        dispatch({ type: PASSWORD_UPDATE_REQUEST })
        const config = { headers: { "Content-Type": "application/json" } }
        const { data } = await axios.put(`/api/v1/password/update`, passwords, config)
        dispatch({ type: PASSWORD_UPDATE_SUCCESS, payload: data.success })
    } catch (error) {
        dispatch({
            type: PASSWORD_UPDATE_FAIL,
            payload: error.response.data.message
        })
    }
}

export const forgotPassword = (email) => async (dispatch) => {

    try {
        dispatch({ type: PASSWORD_FORGOT_REQUEST })
        const config = { headers: { "Content-Type": "application/json" } }
        const { data } = await axios.post(`/api/v1/password/forgot`, email, config)

        dispatch({ type: PASSWORD_FORGOT_SUCCESS, payload: data.message })
    }
    catch (err) {
        dispatch({ type: PASSWORD_FORGOT_FAIL, payload: err.response.data.message })
    }
}
export const resetPassword = (token, password) => async (dispatch) => {

    try {
        dispatch({ type: PASSWORD_RESET_REQUEST })
        const config = { headers: { "Content-Type": "application/json" } }
        const { data } = await axios.put(`/api/v1/password/reset/${token}`, password, config)

        dispatch({ type: PASSWORD_RESET_SUCCESS, payload: data.success })
    }
    catch (err) {
        dispatch({ type: PASSWORD_RESET_FAIL, payload: err.response.data.message })
    }
}



// get users all by admin
export const getAllUsers = () => async (dispatch) => {

    try {
        dispatch({ type: ALL_USER_REQUEST })
        const { data } = await axios.get(`/api/v1/admin/users`)

        dispatch({ type: ALL_USER_SUCCESS, payload: data.user })
    }
    catch (err) {
        dispatch({ type: ALL_USER_FAIL, payload: err.response.data.message })
    }
}

// get users all by admin
export const getUserDetails = (id) => async (dispatch) => {

    try {
        dispatch({ type: USERS_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/v1/admin/user/${id}`)

        dispatch({ type: USERS_DETAILS_SUCCESS, payload: data.user })
    }
    catch (err) {
        dispatch({ type: USERS_DETAILS_FAIL, payload: err.response.data.message })
    }
}
//usser update  by admin
export const updateUsers = (id, userData) => async (dispatch) => {

    try {
        dispatch({ type: USERS_UPDATE_REQUEST })
        const config = { headers: { "Content-Type": "application/json" } }
        const { data } = await axios.put(`/api/v1/admin/user/${id}`, userData, config)
        dispatch({ type: USERS_UPDATE_SUCCESS, payload: data.success })
    } catch (error) {
        dispatch({
            type: USERS_UPDATE_FAIL,
            payload: error.response.data.message
        })
    }
}

//usser delete  by admin
export const deleteUsers = (id) => async (dispatch) => {

    try {
        dispatch({ type: USERS_DELETE_REQUEST })

        const { data } = await axios.delete(`/api/v1/admin/user/${id}`)
        dispatch({ type: USERS_DELETE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: USERS_DELETE_FAIL,
            payload: error.response.data.message
        })
    }
}

///imp
export const clearError = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}