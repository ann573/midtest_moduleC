import React from 'react'
import HeaderClient from './HeaderClient';
import {Outlet} from 'react-router-dom'
import FooterClient from './FooterClient';
const LayoutClient = () => {
  return (
    <>
        <HeaderClient/>
        {<Outlet/>}
        <FooterClient/>
    </>
  )
}

export default LayoutClient