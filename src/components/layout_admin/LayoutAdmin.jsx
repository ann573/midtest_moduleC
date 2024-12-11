import React from 'react'
import {Outlet} from 'react-router-dom'
import HeaderAdmin from './HeaderAdmin';
import FooterAdmin from './FooterAdmin';
import { Navigate } from 'react-router-dom';

const LayoutAdmin = () => {

  const role = localStorage.getItem("role");

  return (
    <>
    {role !== "admin" ? <Navigate to="/"/> : (<>
    <HeaderAdmin/>
    <Outlet/>
    <FooterAdmin/>
    
    </>) }
    </>
  )
}

export default LayoutAdmin