import {ALL_PRODUCT_REQUEST,
        ALL_PRODUCT_SUCCESS,
        ALL_PRODUCT_FAIL,
        PRODUCT_DETAILS_REQUEST,
        PRODUCT_DETAILS_SUCCESS,
        PRODUCT_DETAILS_FAIL,
        CLEAR_ERRORS,
        ADD_REEVIEW_REQUEST,
        ADD_REEVIEW_SUCCESS,
        ADD_REEVIEW_FAIL,
        ADD_REEVIEW_RESET,
        ADMIN_PRODUCT_REQUEST,
        ADMIN_PRODUCT_FAIL,
        ADMIN_PRODUCT_SUCCESS,
        NEW_PRODUCT_REQUEST,
        NEW_PRODUCT_SUCCESS,
        NEW_PRODUCT_FAIL,
        NEW_RPRODUCT_RESET,
        DELETE_PRODUCT_REQUEST,
        DELETE_PRODUCT_SUCCESS,
        DELETE_PRODUCT_FAIL,
        DELETE_RPRODUCT_RESET,
        UPDATE_PRODUCT_REQUEST,
        UPDATE_PRODUCT_SUCCESS,
        UPDATE_PRODUCT_FAIL,
        UPDATE_RPRODUCT_RESET,
        DELETE_REVIEW_REQUEST,
        DELETE_REVIEW_SUCCESS,
        DELETE_REVIEW_FAIL,
        ALL_REVIEWS_REQUEST,
        ALL_REVIEWS_SUCCESS,
        ALL_REVIEWS_FAIL,
        DELETE_RREVIEW_RESET} from '../constants/productConstant'

export const productReducer=(state={products:[]},action)=>{
 switch (action.type) {
    case ALL_PRODUCT_REQUEST:
    case ADMIN_PRODUCT_REQUEST:    
        return {
           loading:true,
           products:[]
        }
       
 
    case ALL_PRODUCT_SUCCESS:
        return {
            loading:false,
            products:action.payload.products,
            productsCount:action.payload.productsCount,
            resultperPage:action.payload.resultperPage,
            filteredProductsCount:action.payload.filteredProductsCount,
         }
     case ADMIN_PRODUCT_SUCCESS:    
         return {
             loading:false,
             products:action.payload
         }    
    case ALL_PRODUCT_FAIL:
    case ADMIN_PRODUCT_FAIL:    
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


export const productDetailsReducer=(state={products:{}},action)=>{
    switch (action.type) {
       case PRODUCT_DETAILS_REQUEST:
           return {
              loading:true,
              ...state
           }
          
    
       case PRODUCT_DETAILS_SUCCESS:
           return {
               loading:false,
               products:action.payload
            }
   
       case PRODUCT_DETAILS_FAIL:
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
export const newReviewReducer=(state={},action)=>{
    switch (action.type) {
       case ADD_REEVIEW_REQUEST:
         
           return {
               ...state,
              loading:true,
           }
       case ADD_REEVIEW_SUCCESS:
           return {
               loading:false,
               success:action.payload
            }
   
       case ADD_REEVIEW_FAIL:
           return {
                ...state,
               loading:false,
               error:action.payload
           }
     case ADD_REEVIEW_RESET:
            return {
                ...state,
                success:false
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

   //NEW PRD BY ADMIN
   export const newProductReducer=(state={product:{}},action)=>{

    switch (action.type) {
       case NEW_PRODUCT_REQUEST:
         
           return {
               ...state,
              loading:true,
           }
          
    
       case NEW_PRODUCT_SUCCESS:
           return {
               loading:false,
               success:action.payload.success,
               product:action.payload.product
            }
   
       case NEW_PRODUCT_FAIL:
           return {
                ...state,
               loading:false,
               error:action.payload
           }
     case NEW_RPRODUCT_RESET:
            return {
                ...state,
                success:false
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
//admin
   export const productDeleteUpdateReducer=(state={product:{}},action)=>{
    switch (action.type) {
       case DELETE_PRODUCT_REQUEST:
        case UPDATE_PRODUCT_REQUEST: 
           return {
               ...state,
              loading:true,
           }
          
    
       case DELETE_PRODUCT_SUCCESS:
        
           return {
               ...state,
               loading:false,
               isDeleted:action.payload,
            }
    case UPDATE_PRODUCT_SUCCESS:
        return {
            ...state,
            loading:false,
            isUpdated:action.payload,
         }
       case DELETE_PRODUCT_FAIL:
        case UPDATE_PRODUCT_FAIL:
           return {
                ...state,
               loading:false,
               error:action.payload
           }
     case DELETE_RPRODUCT_RESET:
        
            return {
                ...state,
                isDeleted:false
             }
     case UPDATE_RPRODUCT_RESET:  
             return {
                 ...state,
                 isUpdated:false
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
   //reviews
export const productRewviewsReducer=(state={reviews:[]},action)=>{
    switch (action.type) {
       case ALL_REVIEWS_REQUEST:
           return {
               ...state,
              loading:true,
           }
          
    
       case ALL_REVIEWS_SUCCESS:
           return {
               loading:false,
               reviews:action.payload
            }
   
       case ALL_REVIEWS_FAIL:
           return {
               loading:false,
               ...state,
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
   //
   export const reviewsReducer=(state={},action)=>{
    switch (action.type) {
       case DELETE_REVIEW_REQUEST:
         
           return {
               ...state,
              loading:true,
           }
          
    
       case DELETE_REVIEW_SUCCESS:
           return {
               loading:false,
               isDeleted:action.payload.success,

            }
   
       case DELETE_REVIEW_FAIL:
           return {
                ...state,
               loading:false,
               error:action.payload
           }
     case DELETE_RREVIEW_RESET:
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