import React from 'react'
import {Route, Redirect} from 'react-router-dom'
// import Navbar from '../../../components/module/Navbar'
const PublicRoute = ({ component: Component, ...rest}) => {
  const isAuth = localStorage.getItem('token')
  // const isRole = localStorage.getItem('role')
  return (
    <Route {...rest} render={(props)=>{
      return(
      isAuth ? <Redirect to="/chatroom"/> : (<Component {...props}/> )
      )
    }}/>
  )
}

export default PublicRoute