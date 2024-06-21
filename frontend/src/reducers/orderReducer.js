import { CLEAR_ERRORS, CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, DELETE_ORDER_FAIL, DELETE_ORDER_REQUEST, DELETE_ORDER_RESET, DELETE_ORDER_SUCCESS, DETAILS_ORDER_FAIL, DETAILS_ORDER_REQUEST, DETAILS_ORDER_SUCCESS, MY_ORDER_FAIL, MY_ORDER_REQUEST, MY_ORDER_SUCCESS, UPDATE_ORDER_FAIL, UPDATE_ORDER_REQUEST, UPDATE_ORDER_RESET, UPDATE_ORDER_SUCCESS } from "../constants/orderConsants";
import { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS } from "../constants/productConstant";

export const newOrderReducer=(state={},action)=>{
   switch (action.type) {
    case CREATE_ORDER_REQUEST:
        return {
            ...state,
            loading:true
        }
    case CREATE_ORDER_SUCCESS:
        return {
            loading:false,
            orders:action.payload
        }    
    case CREATE_ORDER_FAIL:
        return {
            loading:true,
            error:action.payload
        }    
     case CLEAR_ERRORS:
        return {
            ...state,
            error:null
        }   
   
    default:
        return state;
   }
}
export const myOrdersReducer=(state={orders:[]},action)=>{
    switch (action.type) {
     case MY_ORDER_REQUEST:
         return {
             loading:true
         }
     case MY_ORDER_SUCCESS:
         return {
             loading:false,
             orders:action.payload,
         }    
     case MY_ORDER_FAIL:
         return {
             loading:true,
             error:action.payload
         }    
      case CLEAR_ERRORS:
         return {
             ...state,
             error:null
         }   
    
     default:
         return state;
    }
 }

 export const orderDetailsReducer=(state={order:{}},action)=>{
    switch (action.type) {
     case DETAILS_ORDER_REQUEST:
         return {
             loading:true
         }
     case DETAILS_ORDER_SUCCESS:
         return {
             loading:false,
             order:action.payload,
         }    
     case DETAILS_ORDER_FAIL:
         return {
             loading:false,
             error:action.payload
         }    
      case CLEAR_ERRORS:
         return {
             ...state,
             error:null
         }   
    
     default:
         return state;
    }
 }

export const allOrdersReducer=(state={orders:[]},action)=>{
    switch (action.type) {
     case ALL_PRODUCT_REQUEST:
         return {
             loading:true
         }
     case ALL_PRODUCT_SUCCESS:
         return {
             loading:false,
             orders:action.payload,
         }    
     case ALL_PRODUCT_FAIL:
         return {
             loading:true,
             error:action.payload
         }    
      case CLEAR_ERRORS:
         return {
             ...state,
             error:null
         }   
    
     default:
         return state;
    }
 }

 export const orderReducer=(state={orders:[]},action)=>{
    switch (action.type) {
     case UPDATE_ORDER_REQUEST:
     case DELETE_ORDER_REQUEST:   
         return {
            ...state,
             loading:true
         }
     case UPDATE_ORDER_SUCCESS:

         return {
            ...state,
             loading:false,
             isUpdated:action.payload,
         }
    case DELETE_ORDER_SUCCESS:

         return {
            ...state,
             loading:false,
             isDeleted:action.payload,
         }         
     case UPDATE_ORDER_FAIL:
     case DELETE_ORDER_FAIL:   
         return {
            ...state,
             loading:true,
             error:action.payload
         } 
    case UPDATE_ORDER_RESET:
            return {
               ...state,
                isUpdated:false
            }    
    case DELETE_ORDER_RESET:
                return {
                   ...state, 
                    isDeleted:false
                }                 
      case CLEAR_ERRORS:
         return {
             ...state,
             error:null
         }   
    
     default:
         return state;
    }
 }
