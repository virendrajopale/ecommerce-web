import axios from "axios"
import { CLEAR_ERRORS, CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, DELETE_ORDER_FAIL, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, DETAILS_ORDER_FAIL, DETAILS_ORDER_REQUEST, DETAILS_ORDER_SUCCESS, MY_ORDER_FAIL, MY_ORDER_REQUEST, MY_ORDER_SUCCESS, UPDATE_ORDER_FAIL, UPDATE_ORDER_REQUEST, UPDATE_ORDER_SUCCESS } from "../constants/orderConsants"
import { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS } from "../constants/productConstant"


export const newOrder=(order)=>async(dispatch)=>{
  try {
    dispatch({type:CREATE_ORDER_REQUEST})
    const config={
        headers:{
            "Content-Type":"application/json",
        }
    }
    const {data}=await axios.post("/api/v1/order/new",order,config)
    dispatch({type:CREATE_ORDER_SUCCESS,payload:data})
  } catch (error) {
    dispatch({
        type:CREATE_ORDER_FAIL,
        payload:error.response.data.message
    })
  }
}

export const myOrders=()=>async(dispatch)=>{
    try {
      dispatch({type:MY_ORDER_REQUEST})
      const {data}=await axios.get("/api/v1/orders/orders")
      dispatch({type:MY_ORDER_SUCCESS,payload:data.orders})
    } catch (error) {
      dispatch({
          type:MY_ORDER_FAIL,
          payload:error.response.data.message
      })
    }
  }

export const orderDetails=(id)=>async(dispatch)=>{
    try {
      dispatch({type:DETAILS_ORDER_REQUEST})
      const {data}=await axios.get(`/api/v1/order/${id}`)
      dispatch({type:DETAILS_ORDER_SUCCESS,payload:data.order})
    } catch (error) {
      dispatch({
          type:DETAILS_ORDER_FAIL,
          payload:error.response.data.message
      })
    }
  }
//by admin getall
  export const getAllOrders=()=>async(dispatch)=>{
    try {
      dispatch({type:ALL_PRODUCT_REQUEST})
      const {data}=await axios.get("/api/v1/admin/orders")
      dispatch({type:ALL_PRODUCT_SUCCESS,payload:data.orders})
    } catch (error) {
      dispatch({
          type:ALL_PRODUCT_FAIL,
          payload:error.response.data.message
      })
    }
  }
// ..update order by admin
  export const updateOrder=(id,order)=>async(dispatch)=>{
    try {
      dispatch({type:UPDATE_ORDER_REQUEST})
      const config={
          headers:{
              "Content-Type":"application/json",
          }
      }
      const {data}=await axios.put(`/api/v1/admin/order/${id}`,order,config)
      dispatch({type:UPDATE_ORDER_SUCCESS,payload:data.success})
    } catch (error) {
      dispatch({
          type:UPDATE_ORDER_FAIL,
          payload:error.response.data.message
      })
    }
  }
  
  // ..delete order by admin
  export const deleteOrder=(id)=>async(dispatch)=>{
    try {
      dispatch({type:DELETE_ORDER_REQUEST})
      
      const {data}=await axios.delete(`/api/v1/admin/order/${id}`)
      dispatch({type:DELETE_ORDER_SUCCESS,payload:data.success})
    } catch (error) {
      dispatch({
          type:DELETE_ORDER_FAIL,
          payload:error.response.data.message
      })
    }
  }
  
export const clearError=()=>async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS})
}
