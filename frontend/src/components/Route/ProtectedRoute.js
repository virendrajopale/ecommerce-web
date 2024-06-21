import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Route, redirect } from 'react-router-dom'

const ProtectedRoute = ({component:Component,...rest}) => {
    const {loading,isAuthenticated}=useSelector(state=>state.user)
  return (
   <Fragment>
   {!loading&&(
    <Route
    {...rest}
    render={(props)=>{
        if(!isAuthenticated){
            return redirect('/login')
        }
        return <Component {...props}/>
    }}
    />
   )

   }
   </Fragment>
  )
}

export default ProtectedRoute
