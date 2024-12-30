import React from 'react'
import NavBar from '../components/NavBar'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const MainLayout = ({setIsAuthenticated, searchText,handelSearchText}) => {
  

  return (
    <>
    
    <NavBar setIsAuthenticated = {setIsAuthenticated} searchText={searchText} handelSearchText= {handelSearchText}/>
    
    <Outlet />
    </>
  )
}

export default MainLayout