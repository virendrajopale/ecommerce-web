import './App.css';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import Home from './components/Home/Home'
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import WebFont from 'webfontloader'
import {React} from 'react';
import { useEffect } from 'react';
import ProductDetails from './components/Product/ProductDetails';
import Products from './components/Product/Products'
import Search from './components/Product/Search'
import LoginSign from './components/User/LoginSign';
import Account from './components/User/Account'
import store from './store'
import { loaduser } from './actions/userAction';
import UserOptions from './components/layout/Header/UserOptions'
import { useSelector } from 'react-redux';
import UpdateProfile from './components/User/UpdateProfile';
import UpdatePassword from './components/User/UpdatePassword';
import ForgotPassword from './components/User/ForgotPassword';
import ResetPassword from './components/User/ResetPassword'
import Cart from './components/Cart/Cart';
import Shipping from './components/Cart/Shipping';
import ConfirmOrder from './components/Cart/ConfirmOrder';
import { useState } from 'react';
import axios from 'axios';
import Payment from './components/Cart/Payment';
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'

import OrderSuccess from './components/Cart/OrderSuccess';
import MyOrders from './components/Orders/MyOrders';
import OrderDetails from './components/Orders/OrderDetails';
import Dashboard from './components/Admin/Dashboard';
import ProductList from './components/Admin/ProductList';
import NewProduct from './components/Admin/NewProduct';
import UpdateProduct from './components/Admin/UpdateProduct';
import OrderList from './components/Admin/OrderList';
import ProcessOrder from './components/Admin/ProcessOrder';
import UserList from './components/Admin/UserList';
import UpdateUser from './components/Admin/UpdateUser';
import ProductReviews from './components/Admin/ProductReviews';
import Navbar from './components/layout/Header/Navbar';

function App() {
  const {user,isAuthenticated}=useSelector(state=>state.user)

  const [stripeApiKey,setStripeKey]=useState("");
  function getStripeApiKey() {
    return new Promise((resolve, reject) => {
      axios.get(`/api/v1/stripeapikey`)
        .then(response => {
          const stripeApiKey = response.data.stripeApiKey;
          setStripeKey(stripeApiKey);
         
          resolve(stripeApiKey);
        })
        .catch(error => {
          // Handle error
          console.error('Error fetching Stripe API key:', error);
          reject(error);
        });
    });
  }
  
  useEffect(()=>{
   WebFont.load({
    google:{
      families:["Roboto","Droid Sans","Chilanka"]
    }
    
  })
  store.dispatch(loaduser())
  getStripeApiKey()
  .then(apiKey => {

  })
  .catch(error => {
    // Handle errors
    console.error('Error getting Stripe API key:', error);
  });

  },[])
 document.body.style.backgroundColor="#365486"
  return (
   <div className=' text-white font-sign'>
    <Router>
       {/* <Header /> */}
       <Navbar/>
       <>
       <Elements stripe={loadStripe(stripeApiKey)}>

       
        {isAuthenticated && <UserOptions user={user}/>}
         <Routes>

         <Route exact path='/' element={<Home/>}/>
         <Route exact path='/products/product/:id' element={<ProductDetails/>}/>
         <Route exact path='/products' element={<Products/>}/>
         <Route path='/products/:keyword' element={<Products/>}/>
         <Route exact path='/search' element={<Search/>}/> 
         <Route exact path='/login' element={<LoginSign/>}/>
         <Route exact path='/account' element={(isAuthenticated)?<Account/>:<LoginSign/>}/>
         <Route exact path='/me/update' element={(isAuthenticated)?<UpdateProfile/>:<LoginSign/>}/>
         <Route exact path='/password/update' element={(isAuthenticated)?<UpdatePassword/>:<LoginSign/>}/>
         <Route exact path='/password/forgot' element={<ForgotPassword/>}/>
         <Route exact path='/password/reset/:token' element={<ResetPassword/>}/>
         <Route exact path='/cart' element={<Cart/>}/>
         <Route exact path='/login/shipping' element={(isAuthenticated)?<Shipping/>:<LoginSign/>}/>
         <Route exact path='/order/confirm' element={(isAuthenticated)?<ConfirmOrder/>:<LoginSign/>}/>

        <Route  exact path='/process/payment' element={(isAuthenticated)?<Payment/>:<LoginSign/>}></Route>
        <Route  exact path='/success' element={(isAuthenticated)?<OrderSuccess/>:<LoginSign/>}></Route>
        <Route  exact path='/orders' element={(isAuthenticated)?<MyOrders/>:<LoginSign/>}></Route>
        <Route  exact path='/order/:id' element={(isAuthenticated)?<OrderDetails/>:<LoginSign/>}></Route>
        <Route  exact path='/admin/dashboard' element={(isAuthenticated&&user.role==='admin')?<Dashboard/>:<LoginSign/>}></Route>)
        <Route  exact path='/admin/products' element={(isAuthenticated&&user.role==='admin')?<ProductList/>:<LoginSign/>}></Route>)
        <Route  exact path='/admin/product' element={(isAuthenticated&&user.role==='admin')?<NewProduct/>:<LoginSign/>}></Route>)
        <Route  exact path='/admin/product/:id' element={(isAuthenticated&&user.role==='admin')?<UpdateProduct/>:<LoginSign/>}></Route>)
        <Route  exact path='/admin/orders' element={(isAuthenticated&&user.role==='admin')?<OrderList/>:<LoginSign/>}></Route>)
        <Route  exact path='/admin/order/:id' element={(isAuthenticated&&user.role==='admin')?<ProcessOrder/>:<LoginSign/>}></Route>)
        <Route  exact path='/admin/users' element={(isAuthenticated&&user.role==='admin')?<UserList/>:<LoginSign/>}></Route>)
        <Route  exact path='/admin/user/:id' element={(isAuthenticated&&user.role==='admin')?<UpdateUser/>:<LoginSign/>}></Route>)
        <Route  exact path='/admin/reviews' element={(isAuthenticated&&user.role==='admin')?<ProductReviews/>:<LoginSign/>}></Route>)
      
      
       

       </Routes>
       </Elements>
       </>
      
       {/* <Footer/> */}
    </Router>
   </div>
  );
}

export default App;
