import { LOGIN_USER_REQUEST,
     LOGIN_USER_SUCCESS, 
     LOGIN_USER_FAIL,
     CLEAR_ERRORS, LOAD_USER_REQUEST,
      LOAD_USER_SUCCESS, PROFILE_UPDATE_REQUEST,
       PROFILE_UPDATE_SUCCESS, PROFILE_UPDATE_FAIL, 
       PROFILE_UPDATE_RESET, 
       PASSWORD_UPDATE_REQUEST,
       PASSWORD_UPDATE_SUCCESS,
       PASSWORD_UPDATE_FAIL,
       PASSWORD_UPDATE_RESET,
       PASSWORD_FORGOT_REQUEST,
       PASSWORD_FORGOT_SUCCESS,
       PASSWORD_FORGOT_FAIL,
       PASSWORD_RESET_REQUEST,
       PASSWORD_RESET_SUCCESS,
       PASSWORD_RESET_FAIL,
       ALL_USER_REQUEST,
       ALL_USER_SUCCESS,
       ALL_USER_FAIL,
       USERS_DELETE_REQUEST,
       USERS_DELETE_SUCCESS,
       USERS_DELETE_FAIL,
       USERS_UPDATE_REQUEST,
       USERS_UPDATE_SUCCESS,
       USERS_DETAILS_REQUEST,
       USERS_DETAILS_SUCCESS,
       USERS_DETAILS_FAIL,
       USERS_UPDATE_FAIL,
       USERS_UPDATE_RESET,
       USERS_DELETE_RESET} 
       from '../constants/userConstant'
import {SIGNUP_USER_REQUEST,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER_FAIL,
    LOAD_USER_FAIL,
    LOG_OUT_SUCCESS,LOG_OUT_FAIL} from '../constants/userConstant'



export const UserReducer = (state = { user:{} }, action) => {
    switch (action.type) {
        case LOGIN_USER_REQUEST:
            case SIGNUP_USER_REQUEST:
            case LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false
            }
        case LOGIN_USER_SUCCESS:
            case SIGNUP_USER_SUCCESS:
             case LOAD_USER_SUCCESS:   
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }
        case LOGIN_USER_FAIL:
        case SIGNUP_USER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            }
            case LOAD_USER_FAIL: 
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            }  
         case LOG_OUT_SUCCESS:
            return{
                loading:false,
                user:null,
                isAuthenticated:false
            }  
        case LOG_OUT_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload,
            }     
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;    
    }
}

// export const SignUpReducer = (state = { user:{} }, action) => {
// }
export const ProfileUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case PROFILE_UPDATE_REQUEST:
        case PASSWORD_UPDATE_REQUEST:
          case USERS_UPDATE_REQUEST:   
          case USERS_DELETE_REQUEST:   
            return {
                ...state,
                loading: true,
            }
        case PROFILE_UPDATE_SUCCESS  :
        case PASSWORD_UPDATE_SUCCESS:
        case USERS_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            }
        case USERS_DELETE_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    isDeleted: action.payload.success,
                    message:action.payload.message
                }    
        case PROFILE_UPDATE_FAIL:
         case PASSWORD_UPDATE_FAIL:   
         case USERS_UPDATE_FAIL:
         case USERS_DELETE_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload,
            }
         case PROFILE_UPDATE_RESET:
         case PASSWORD_UPDATE_RESET:   
         case USERS_UPDATE_RESET:   
            return{
                ...state,
                isUpdated:false
            }   
        case USERS_DELETE_RESET:   
            return{
                ...state,
                isDeleted:false
            }    
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;    
    }
}
export const forgotPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case PASSWORD_FORGOT_REQUEST:
        case PASSWORD_RESET_REQUEST:    
            return {
                ...state,
                loading: true,
                error:null
            }
        case PASSWORD_FORGOT_SUCCESS:
         
            return {
                ...state,
                loading: false,
                message: action.payload,
            }
        case PASSWORD_RESET_SUCCESS: 
        return {
            ...state,
            loading: false,
            success: action.payload,
        }
        case PASSWORD_FORGOT_FAIL:
        case PASSWORD_RESET_FAIL:       
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
         
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;    
    }
}

export const allUsersReducer = (state = {users:[]}, action) => {
    switch (action.type) {

        case ALL_USER_REQUEST:    
            return {
                ...state,
                loading: true,

            }
        case ALL_USER_SUCCESS:
         
            return {
                ...state,
                loading: false,
                users: action.payload,
            }
       

        case ALL_USER_FAIL:       
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
         
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;    
    }
}

export const usersDetReducer = (state = {user:{}}, action) => {
    switch (action.type) {

        case USERS_DETAILS_REQUEST:    
            return {
                ...state,
                loading: true,

            }
        case USERS_DETAILS_SUCCESS:
         
            return {
                ...state,
                loading: false,
                user: action.payload,
            }
       

        case USERS_DETAILS_FAIL:       
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
         
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;    
    }
}