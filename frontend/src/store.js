import {combineReducers,applyMiddleware} from 'redux'
import { legacy_createStore as createStore} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { newProductReducer, newReviewReducer, productDeleteUpdateReducer, productDetailsReducer, productReducer, productReviewReducer, productRewviewsReducer, reviewsReducer } from './reducers/productReducer'
import { ProfileUpdateReducer, UserReducer, allUsersReducer, forgotPasswordReducer, usersDetReducer } from './reducers/UserReducer'
import { cartReducer } from './reducers/cartReducer'
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from './reducers/orderReducer'

const reducer=combineReducers({
    products:productReducer,
    productDetails:productDetailsReducer,
    user:UserReducer,
    profile:ProfileUpdateReducer,
    forgotPassword:forgotPasswordReducer,
    cart:cartReducer,
    newOrder:newOrderReducer,
    myOrders:myOrdersReducer,
    orderDetails:orderDetailsReducer,
    newReviews:newReviewReducer,
    newProduct:newProductReducer,
    product:productDeleteUpdateReducer,
    allOrders:allOrdersReducer,
    order:orderReducer,
    allUsers:allUsersReducer,
    userDetail:usersDetReducer,
    productReviews:productRewviewsReducer,
    reviews:reviewsReducer
    

})
let initialState={
    cart:{
        cartItems:localStorage.getItem("cartItems")
        ?JSON.parse(localStorage.getItem("cartItems")):[],
        
        shippingInfo:localStorage.getItem("shippingInfo")
        ?JSON.parse(localStorage.getItem("shippingInfo")):{},
    }
}

const midleware=[thunk];

const store=createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...midleware)))

export default store